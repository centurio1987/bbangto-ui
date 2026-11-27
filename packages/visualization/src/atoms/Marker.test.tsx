import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Canvas } from './Canvas';
import { Node } from './Node';
import { Edge } from './Edge';
import type { MarkerVariant } from './Marker';

// KAN-082.1 검토 2번 — 「화살표 끝이 클래스와 겹쳐 있다. qa 필요」(S18).
//
// 마커 종류마다 선 양 끝에서 마커의 그려진 범위(선 굵기 절반까지)가 노드 테두리 바깥 가장자리를 넘는지 계산한다.
// 노드 두 개를 가로로 놓고(테두리 굵기 2 — ClassBox 기본값), 선(굵기 1.5 — ClassDiagram)을 A → B 로 긋는다.
// 끝 마커는 B 의 왼쪽 테두리 바깥(x = 299)을, 시작 마커는 A 의 오른쪽 테두리 바깥(x = 141)을 넘으면 안 된다.
// 원(circle) · 가위표(cross)는 선 끝에 가운데를 맞춘 표시(BPMN 메시지 흐름 시작 원 등)라 대상에서 뺐다.

const VARIANTS: MarkerVariant[] = [
  'arrow',
  'arrowOpen',
  'triangleOpen',
  'diamond',
  'diamondOpen',
  'erOne',
  'erMany',
  'erZeroOrOne',
  'erOneOrMany',
  'erZeroOrMany',
];

const NODE_STROKE = 2;
const A = { x: 20, y: 40, width: 120, height: 60 }; // 오른쪽 테두리 140 → 바깥 141
const B = { x: 300, y: 40, width: 120, height: 60 }; // 왼쪽 테두리 300 → 바깥 299

function render(at: 'start' | 'end', v: MarkerVariant): string {
  return renderToStaticMarkup(
    <Canvas viewBox="0 0 440 140" width={440} height={140}>
      <Node id="a" {...A} shape="rect" strokeWidth={NODE_STROKE} />
      <Node id="b" {...B} shape="rect" strokeWidth={NODE_STROKE} />
      <Edge
        from="a"
        to="b"
        routing="straight"
        strokeWidth={1.5}
        markerStart={at === 'start' ? v : undefined}
        markerEnd={at === 'end' ? v : 'none'}
      />
    </Canvas>,
  );
}

const MARKER_NAME: Record<MarkerVariant, string> = {
  arrow: 'arrow',
  arrowOpen: 'arrow-open',
  diamond: 'diamond',
  diamondOpen: 'diamond-open',
  circle: 'circle',
  cross: 'cross',
  triangleOpen: 'triangle-open',
  erOne: 'er-one',
  erMany: 'er-many',
  erZeroOrOne: 'er-zero-or-one',
  erOneOrMany: 'er-one-or-many',
  erZeroOrMany: 'er-zero-or-many',
  none: 'none',
};

/** 마커 정의 하나 — refX · orient 와, 그린 모양의 x 범위(선이 있는 모양은 선 굵기 절반까지) */
function markerDef(html: string, v: MarkerVariant): { refX: number; orient: string; minX: number; maxX: number } {
  const m = html.match(new RegExp(`<marker id="[^"]*-${MARKER_NAME[v]}"([^>]*)>([\\s\\S]*?)</marker>`));
  if (!m) throw new Error(`marker ${v} 없음`);
  const attr = (name: string) => m[1].match(new RegExp(`${name}="([^"]+)"`))?.[1] ?? '';
  const xs: number[] = [];
  for (const el of m[2].matchAll(/<(path|line|circle)([^>]*)\/?>/g)) {
    const a = el[2];
    const get = (n: string) => Number(a.match(new RegExp(`\\b${n}="([^"]+)"`))?.[1] ?? NaN);
    const sw = /stroke:\s*none/.test(a) ? 0 : Number(a.match(/stroke-width:\s*([\d.]+)/)?.[1] ?? 0);
    let pts: number[] = [];
    if (el[1] === 'path') {
      const nums = (a.match(/\bd="([^"]+)"/)?.[1] ?? '').match(/-?[\d.]+/g)?.map(Number) ?? [];
      pts = nums.filter((_, i) => i % 2 === 0);
    } else if (el[1] === 'line') pts = [get('x1'), get('x2')];
    else pts = [get('cx') - get('r'), get('cx') + get('r')];
    for (const x of pts) xs.push(x - sw / 2, x + sw / 2);
  }
  return { refX: Number(attr('refX')), orient: attr('orient'), minX: Math.min(...xs), maxX: Math.max(...xs) };
}

function pathEnds(html: string): { start: number; end: number } {
  const d = html.match(/<path[^>]*data-viz-part="connector"[^>]*\bd="([^"]+)"/)?.[1] ?? html.match(/<path[^>]*\bd="(M [^"]+)"[^>]*data-viz-part="connector"/)?.[1];
  const nums = (d ?? '').match(/-?[\d.]+/g)!.map(Number);
  return { start: nums[0], end: nums[nums.length - 2] };
}

describe('마커가 노드 테두리를 넘지 않는다 (KAN-082 S18)', () => {
  it.each(VARIANTS)('%s — 끝(markerEnd)', (v) => {
    const html = render('end', v);
    const def = markerDef(html, v);
    const { end } = pathEnds(html);
    // 끝에서는 마커의 +x 가 선 진행 방향(B 쪽)이다
    const reach = end + (def.maxX - def.refX);
    expect({ v, reach: Math.round(reach * 100) / 100, ok: reach <= B.x - NODE_STROKE / 2 + 0.01 }).toMatchObject({ v, ok: true });
  });

  it.each(VARIANTS)('%s — 시작(markerStart)', (v) => {
    const html = render('start', v);
    const def = markerDef(html, v);
    const { start } = pathEnds(html);
    // 시작에서는 orient="auto-start-reverse" 면 +x 가 A 쪽(선 반대 방향)이고, "auto" 면 B 쪽이다
    const reversed = def.orient === 'auto-start-reverse';
    const reach = reversed ? start - (def.maxX - def.refX) : start + (def.minX - def.refX);
    expect({ v, reach: Math.round(reach * 100) / 100, ok: reach >= A.x + A.width + NODE_STROKE / 2 - 0.01 }).toMatchObject({ v, ok: true });
  });

  it('까마귀발(많음)은 갈래가 엔티티 쪽으로 벌어진다 — 엔티티 쪽 끝의 세로 폭이 반대쪽보다 넓다', () => {
    const html = render('end', 'erMany');
    const m = html.match(/<marker id="[^"]*-er-many"[^>]*>([\s\S]*?)<\/marker>/)![1];
    const nums = (m.match(/\bd="([^"]+)"/)?.[1] ?? '').match(/-?[\d.]+/g)!.map(Number);
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i + 1 < nums.length; i += 2) pts.push({ x: nums[i], y: nums[i + 1] });
    const maxX = Math.max(...pts.map((p) => p.x));
    const minX = Math.min(...pts.map((p) => p.x));
    const spread = (x: number) => {
      const ys = pts.filter((p) => p.x === x).map((p) => p.y);
      return Math.max(...ys) - Math.min(...ys);
    };
    // 끝에서 +x 가 엔티티 쪽이다 — 엔티티 쪽(maxX)이 벌어지고 선 쪽(minX)이 모인다
    expect(spread(maxX)).toBeGreaterThan(spread(minX));
  });
});
