import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as viz from '../index';

// KAN-082.2 — 화살표 종류와 범례.
//
// 원문 규칙: 「도식 하나에는 노드 종류 하나, 화살표 의미 하나만 담습니다 … 섞어야 한다면 범례로 화살표 종류를 구분해
// 표시하는 게 좋습니다.」 그래서 화살표 뜻을 고정 목록(정할 것 2 추천)으로 내고, 선 모양(대시 · 화살촉)과 범례 견본이
// 같은 목록을 읽게 한다. 여기서는 ① 목록 · 매핑이 패키지에서 나오는지 ② 종류마다 선 모양이 서로 다른지
// ③ 템플릿 선과 범례 견본 선이 같은 모양인지를 본다.

const api = viz as unknown as Record<string, unknown>;

const KINDS = [
  'call',
  'asyncMessage',
  'dataFlow',
  'controlFlow',
  'deployment',
  'network',
  'dependency',
  'inheritance',
  'composition',
  'aggregation',
] as const;

interface LineStyle {
  strokeDasharray?: string;
  markerStart?: string;
  markerEnd?: string;
}

describe('관계 종류 목록과 선 모양 매핑 (KAN-082 .2)', () => {
  it('패키지가 관계 종류 목록을 낸다 — 원문 여섯 도식의 화살표 뜻 열 가지', () => {
    expect(api.RELATION_KINDS).toEqual(KINDS);
  });

  it('종류마다 선 모양이 있고, 열 가지가 모두 서로 다르다', () => {
    const styles = api.RELATION_LINE_STYLES as Record<string, LineStyle> | undefined;
    expect(styles).toBeDefined();
    const keys = KINDS.map((k) => {
      const s = styles![k];
      expect({ kind: k, has: !!s }).toEqual({ kind: k, has: true });
      return `${s.strokeDasharray ?? '-'}|${s.markerStart ?? '-'}|${s.markerEnd ?? '-'}`;
    });
    expect(new Set(keys).size).toBe(KINDS.length);
  });

  it('실선 종류는 대시를 none 으로 고정한다 — 가이드의 연결선 대시가 뜻을 바꾸지 않게', () => {
    const styles = api.RELATION_LINE_STYLES as Record<string, LineStyle> | undefined;
    expect(styles).toBeDefined();
    for (const k of KINDS) expect({ kind: k, dash: typeof styles![k].strokeDasharray }).toEqual({ kind: k, dash: 'string' });
  });

  it('종류마다 범례에 쓰는 이름이 있다', () => {
    const names = api.RELATION_KIND_NAMES as Record<string, string> | undefined;
    expect(names).toBeDefined();
    for (const k of KINDS) expect({ kind: k, name: (names![k] ?? '').length > 0 }).toEqual({ kind: k, name: true });
  });

  it('바깥 보고서 P11 ① — Class 관계 · ER 카디널리티 매핑을 낸다', () => {
    const cls = api.classRelationshipLineStyle as ((k: string) => LineStyle) | undefined;
    const er = api.erCardinalityMarker as ((c: string) => string) | undefined;
    expect({ cls: typeof cls, er: typeof er }).toEqual({ cls: 'function', er: 'function' });
    expect(cls!('composition')).toMatchObject({ markerStart: 'diamond', markerEnd: 'none' });
    expect(cls!('inheritance')).toMatchObject({ markerEnd: 'triangleOpen' });
    expect(er!('zeroOrMany')).toBe('erZeroOrMany');
  });
});

// ──────────────────────────────────────────────
// 템플릿 선과 범례 견본 선이 같은 모양인가
// ──────────────────────────────────────────────

const A = { width: 120, height: 60 };

type Kind = (typeof KINDS)[number];
interface Case {
  el: React.ReactElement;
  /** 이 템플릿이 받는 종류 가운데 둘 — RELATION_KINDS 순서 */
  kinds: [Kind, Kind];
}

/** 관계 종류 칸을 받는 템플릿 — 그 템플릿이 받는 종류 둘을 넣어 그린다(정할 것 2 — 템플릿은 쓰는 종류만 받는다) */
function cases(): Record<string, Case> {
  const C = viz as unknown as Record<string, React.ComponentType<{ data: unknown }>>;
  const rels = (k: [Kind, Kind]) => [
    { id: 'r1', from: 'a', to: 'b', label: 'L1', kind: k[0] },
    { id: 'r2', from: 'b', to: 'c', label: 'L2', kind: k[1] },
  ];
  const boxes = (key: string) => [
    { id: 'a', x: 20, y: 20, ...A, [key]: 'Aa' },
    { id: 'b', x: 260, y: 20, ...A, [key]: 'Bb' },
    { id: 'c', x: 500, y: 20, ...A, [key]: 'Cc' },
  ];
  const c4: [Kind, Kind] = ['call', 'asyncMessage'];
  const comp: [Kind, Kind] = ['call', 'dependency'];
  const dep: [Kind, Kind] = ['deployment', 'network'];
  const arch: [Kind, Kind] = ['call', 'dataFlow'];
  const topo: [Kind, Kind] = ['dataFlow', 'network'];
  return {
    C4ContextDiagram: { kinds: c4, el: <C.C4ContextDiagram data={{ systems: boxes('name'), relationships: rels(c4) }} /> },
    C4ContainerDiagram: { kinds: c4, el: <C.C4ContainerDiagram data={{ containers: boxes('name'), relationships: rels(c4) }} /> },
    C4ComponentDiagram: { kinds: c4, el: <C.C4ComponentDiagram data={{ components: boxes('name'), relationships: rels(c4) }} /> },
    C4CodeDiagram: { kinds: c4, el: <C.C4CodeDiagram data={{ elements: boxes('name'), relationships: rels(c4) }} /> },
    C4SystemLandscapeDiagram: {
      kinds: c4,
      el: <C.C4SystemLandscapeDiagram data={{ systems: boxes('name'), relationships: rels(c4) }} />,
    },
    UMLComponentDiagram: { kinds: comp, el: <C.UMLComponentDiagram data={{ components: boxes('name'), dependencies: rels(comp) }} /> },
    UMLDeploymentDiagram: { kinds: dep, el: <C.UMLDeploymentDiagram data={{ nodes: boxes('name'), edges: rels(dep) }} /> },
    ArchitectureDiagram: { kinds: arch, el: <C.ArchitectureDiagram data={{ services: boxes('label'), edges: rels(arch) }} /> },
    NetworkTopology: {
      kinds: topo,
      el: (
        <C.NetworkTopology
          data={{
            zones: [],
            nodes: [
              { id: 'a', x: 80, y: 50, label: 'Aa' },
              { id: 'b', x: 320, y: 50, label: 'Bb' },
              { id: 'c', x: 560, y: 50, label: 'Cc' },
            ],
            links: rels(topo).map(({ from, to, kind }) => ({ from, to, kind })),
          }}
        />
      ),
    },
  };
}

/** 마커 참조 — 범례는 같은 Canvas 안이라 견본과 템플릿 선이 같은 uid 의 마커를 가리킨다. 문자열 그대로 견준다 */
function markerName(attr: string | undefined): string {
  return attr ?? '-';
}

function lineOf(tag: string): string {
  const dash = tag.match(/stroke-dasharray:\s*([^;"]+)/)?.[1]?.trim() ?? '-';
  const ms = markerName(tag.match(/marker-start="([^"]+)"/)?.[1]);
  const me = markerName(tag.match(/marker-end="([^"]+)"/)?.[1]);
  return `${dash}|${ms}|${me}`;
}

describe('템플릿 선과 범례 견본 선이 같은 매핑을 읽는다 (KAN-082 .2)', () => {
  it.each(Object.entries(cases()))('%s — 종류가 둘이면 범례 둘, 견본 선 = 그 종류의 선', (_name, { el, kinds }) => {
    const html = renderToStaticMarkup(el);
    const legend = html.match(/<g[^>]*data-bbangto-viz-legend(?:="[^"]*")?[^>]*>[\s\S]*<\/g>/)?.[0] ?? '';
    expect({ legend: legend.length > 0 }).toEqual({ legend: true });
    const items = [...legend.matchAll(/data-bbangto-viz-legend-item="([^"]+)"/g)].map((m) => m[1]);
    expect(items).toEqual([...kinds]);
    for (const kind of kinds) {
      const body = html.replace(legend, '');
      const edgeTag = body.match(new RegExp(`<path[^>]*data-bbangto-viz-relation-kind="${kind}"[^>]*>`))?.[0];
      const swatchTag = legend
        .split('data-bbangto-viz-legend-item=')
        .find((s) => s.startsWith(`"${kind}"`))
        ?.match(/<path[^>]*data-viz-part="connector"[^>]*>/)?.[0];
      expect({ kind, edge: !!edgeTag, swatch: !!swatchTag }).toEqual({ kind, edge: true, swatch: true });
      expect({ kind, swatch: lineOf(swatchTag!) }).toEqual({ kind, swatch: lineOf(edgeTag!) });
    }
  });

  it.each(Object.entries(cases()))('%s — 종류를 안 적으면 범례를 그리지 않는다', (_name, { el }) => {
    const props = el.props as { data: Record<string, unknown> };
    const strip = (arr: unknown) =>
      Array.isArray(arr) ? arr.map((o) => ({ ...(o as object), kind: undefined })) : arr;
    const data = Object.fromEntries(Object.entries(props.data).map(([k, v]) => [k, strip(v)]));
    const html = renderToStaticMarkup(React.cloneElement(el as React.ReactElement<{ data: unknown }>, { data }));
    expect(html).not.toContain('data-bbangto-viz-legend');
  });
});

describe('LegendBlock — 시작 끝 마커가 범례 상자 안에 든다 (KAN-082)', () => {
  it('포함 · 집합 견본의 마름모 자리가 상자 왼쪽 테두리에서 떨어져 있다', () => {
    const L = (viz as unknown as Record<string, React.ComponentType<Record<string, unknown>>>).LegendBlock;
    const Canvas = (viz as unknown as Record<string, React.ComponentType<Record<string, unknown>>>).Canvas;
    const html = renderToStaticMarkup(
      <Canvas viewBox="0 0 200 120" width={200} height={120}>
        <L x={10} y={10} kinds={['composition', 'aggregation']} />
      </Canvas>,
    );
    for (const kind of ['composition', 'aggregation']) {
      const part = html.split(`data-bbangto-viz-legend-item="${kind}"`)[1] ?? '';
      const d = part.match(/<path[^>]*\bd="M ([\d.]+) /)?.[1];
      // 마름모는 선 시작점에서 왼쪽으로 마커 크기(8)만큼 나간다 — 시작점이 상자 테두리(x=10)에서 그보다 멀어야 한다
      expect({ kind, startX: Number(d) - 10 >= 12 }).toEqual({ kind, startX: true });
    }
  });
});
