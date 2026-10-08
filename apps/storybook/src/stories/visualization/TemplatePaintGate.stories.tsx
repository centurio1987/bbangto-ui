import type { Meta, StoryObj } from '@storybook/react';
import { VisualizationStyleGuideProvider } from '@centurio1987/bbangto-ui-visualization';
import type { VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';
import {
  blueprintTechnical01VizStyleGuide,
  vizStyleGuideCatalog,
} from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { compositeOver, contrastRatio, parseColor } from '@centurio1987/bbangto-ui-tokens';
import type { RGBA } from '@centurio1987/bbangto-ui-tokens';
import { expect } from 'storybook/test';
import { LABEL_CONTRAST_BASELINE } from './_labelContrastBaseline';
import { PAINT_GATE_FIXTURES } from './_paintGateFixtures';

/**
 * 템플릿 paint 게이트 — 스타일 가이드를 바꾸면 템플릿의 색도 바뀌는가 (KAN-056).
 *
 * 같은 데이터를 두 가이드에서 그린다. A 는 blueprint foundation 이고 B 는 A 의 색을 전부
 * 반전(채널마다 255−값, 알파 유지)한 것이다. 반전한 색은 원래 색과 같을 수 없으므로
 * (255−v = v 이면 v = 127.5), 두 화면의 같은 자리 요소가 같은 불투명 fill·stroke 를 내면
 * 그 색은 가이드에서 온 것이 아니다 — 템플릿이 리터럴로 넣었거나 paint 를 아예 안 준 것이다.
 *
 * `TemplateStyleMatrix` 의 ExpandedMatrix 는 「가이드 둘 이상에서 지문이 다르다」만 봐서,
 * 리터럴이 일부 남아도 다른 부분이 바뀌면 통과한다. 이 게이트는 요소 하나하나를 본다.
 *
 * - 빼는 것: `none`, 반투명 검정(알파 1 미만이거나 fill/stroke-opacity 1 미만인 검정).
 *   어떤 가이드 위에서도 같은 명암을 내는 음영 장치라 계약 밖이다(viz README 구현 규약).
 * - 두 가이드에는 wrapperComponents 를 넣지 않는다. 모티프가 그리는 색은 템플릿 몫이 아니다.
 * - fixture 는 fill·stroke 를 명시하지 않는다. 명시한 prop 은 가이드를 이기는 것이 정상이다.
 */
const meta = {
  title: 'VISUALIZATION/Templates/Paint Gate',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ────────────────────────────────────────────────────────────────────────
// 가이드 A · B
// ────────────────────────────────────────────────────────────────────────

function invertColor(value: string): string {
  const c = parseColor(value);
  if (!c) return value;
  return `rgba(${255 - c.r}, ${255 - c.g}, ${255 - c.b}, ${c.a})`;
}

/** 색으로 읽히는 문자열만 반전한다. 글꼴·숫자·대시 패턴 같은 값은 그대로다. */
function invertDeep<T>(value: T): T {
  if (typeof value === 'string') return invertColor(value) as T;
  if (Array.isArray(value)) return value.map(invertDeep) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([k, v]) => [k, invertDeep(v)]),
    ) as T;
  }
  return value;
}

const GUIDE_A: VisualizationStyleGuide = {
  name: 'paint-gate-a',
  foundations: blueprintTechnical01VizStyleGuide.foundations,
};
const GUIDE_B: VisualizationStyleGuide = {
  name: 'paint-gate-b',
  foundations: invertDeep(blueprintTechnical01VizStyleGuide.foundations),
};

// ────────────────────────────────────────────────────────────────────────
// fixture — `_paintGateFixtures.tsx` 에 templates 가 내보내는 템플릿마다 하나씩 있다(KAN-063)
// ────────────────────────────────────────────────────────────────────────

/** KAN-056 이 고친 13개. 글자 대비 검사는 아직 이 13개만 그린다. play 가 이 수를 확인한다. */
const KAN056_TARGET_KEYS = [
  'architecture',
  'block-diagram',
  'kanban-board',
  'mindmap',
  'uml-component',
  'bpmn',
  'archimate-business',
  'bpmn-collaboration',
  'c4-code',
  'requirement',
  'timeline',
  'uml-deployment',
  'uml-sequence',
];
const TARGET_FIXTURES = PAINT_GATE_FIXTURES.filter((f) => KAN056_TARGET_KEYS.includes(f.key));

/** 리터럴 검사는 표본 전부를 그린다. 표본이 빠진 템플릿은 `vizPaintGateCoverage.test.ts` 가 `test:unit` 에서 잡는다. */
const GATE_FIXTURES = PAINT_GATE_FIXTURES;

// ────────────────────────────────────────────────────────────────────────
// 비교
// ────────────────────────────────────────────────────────────────────────

const PAINT_TAGS = 'rect, circle, ellipse, path, line, polyline, polygon, text';

function paintedElements(cell: Element): SVGElement[] {
  return Array.from(cell.querySelectorAll<SVGElement>(PAINT_TAGS)).filter((el) => !el.closest('defs'));
}

/** `none` 과 반투명 검정은 계약 밖이라 비교하지 않는다. */
function isExempt(value: string, opacity: string): boolean {
  if (value === 'none' || value === '') return true;
  const c = parseColor(value);
  if (!c) return false;
  const black = c.r === 0 && c.g === 0 && c.b === 0;
  return black && (c.a < 1 || parseFloat(opacity) < 1);
}

/** 같은 자리 요소가 두 가이드에서 같은 불투명 색을 내는 곳을 모은다. */
function collectViolations(key: string, cellA: Element, cellB: Element): { violations: string[]; compared: number } {
  const a = paintedElements(cellA);
  const b = paintedElements(cellB);
  if (a.length !== b.length) {
    return { violations: [`${key}: 요소 수가 다르다 (A ${a.length} · B ${b.length})`], compared: 0 };
  }
  const violations: string[] = [];
  let compared = 0;
  a.forEach((elA, i) => {
    const csA = getComputedStyle(elA);
    const csB = getComputedStyle(b[i]!);
    const pairs: Array<[string, string, string, string]> = [
      ['stroke', csA.stroke, csB.stroke, csA.strokeOpacity],
    ];
    // <line> 은 안쪽 면이 없어 fill 이 화면에 안 그려진다(computed 는 initial 검정으로 남는다)
    if (elA.tagName.toLowerCase() !== 'line') pairs.unshift(['fill', csA.fill, csB.fill, csA.fillOpacity]);
    for (const [prop, va, vb, opacity] of pairs) {
      if (isExempt(va, opacity)) continue;
      compared += 1;
      if (va === vb) violations.push(`${key} <${elA.tagName}>[${i}] ${prop}=${va}`);
    }
  });
  return { violations, compared };
}

export const LiteralPaintGate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {GATE_FIXTURES.map((fx) => (
        <section key={fx.key} data-paint-gate-row={fx.key}>
          <h4 style={{ margin: '0 0 6px', fontSize: 13 }}>{fx.key}</h4>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <VisualizationStyleGuideProvider styleGuide={GUIDE_A} className="paint-gate-a" style={{ padding: 8 }}>
              {fx.render()}
            </VisualizationStyleGuideProvider>
            <VisualizationStyleGuideProvider styleGuide={GUIDE_B} className="paint-gate-b" style={{ padding: 8 }}>
              {fx.render()}
            </VisualizationStyleGuideProvider>
          </div>
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    // fixture 가드 — KAN-056 대상 13개가 모두 있고 key 가 겹치지 않는다
    const keys = GATE_FIXTURES.map((f) => f.key);
    await expect(new Set(keys).size).toBe(keys.length);
    await expect(TARGET_FIXTURES.length).toBe(13);

    const rows = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-paint-gate-row]'));
    await expect(rows.length).toBe(GATE_FIXTURES.length);

    const violations: string[] = [];
    for (const row of rows) {
      const key = row.dataset.paintGateRow!;
      const cellA = row.querySelector('.paint-gate-a');
      const cellB = row.querySelector('.paint-gate-b');
      await expect(cellA).not.toBeNull();
      await expect(cellB).not.toBeNull();

      const result = collectViolations(key, cellA!, cellB!);
      // 비교할 paint 가 하나도 없으면 게이트가 아무것도 안 잰 것이다
      await expect(result.compared, `${key}: 비교한 paint 수`).toBeGreaterThan(0);
      violations.push(...result.violations);
    }

    await expect(violations).toEqual([]);
  },
};

// ────────────────────────────────────────────────────────────────────────
// 글자 대비 — 가이드가 칠한 면 위의 글자가 읽히는가
// ────────────────────────────────────────────────────────────────────────

/**
 * 리터럴을 토큰으로 바꾸면 글자색과 그 뒤 면 색이 서로 다른 토큰에서 오게 된다. 기본 가이드에서
 * 멀쩡해도 다른 가이드에서는 두 토큰이 같은 색일 수 있다(KAN-056 검토 항목 4: synthwave 에서
 * 시퀀스 머리 바탕 p2 와 이름 글자 edge.stroke 가 둘 다 #28E0F0 이었다). 그래서 대상 13개를
 * 카탈로그 가이드 전부에서 그리고, 글자마다 그 아래 깔린 면을 합성해 대비를 잰다.
 *
 * - 배경: 캔버스 바탕(svg background) 위에, 글자 중심점을 칠하는 도형(rect·circle·ellipse·path·
 *   polygon 중 문서 순서상 글자보다 앞선 것)의 fill 을 fill-opacity·opacity 까지 반영해 차례로 얹는다.
 * - 기준: WCAG AA — 보통 글자 4.5:1, 큰 글자(화면 24px 이상, 굵게면 18.66px 이상) 3:1.
 * - wrapperComponents 는 넣지 않는다. 모티프 장식은 템플릿 몫이 아니다.
 */
const TEXT_CONTRAST_MIN = 4.5;
const LARGE_TEXT_CONTRAST_MIN = 3;
const BACKDROP_TAGS = 'rect, circle, ellipse, path, polygon';
const PAGE_WHITE: RGBA = { r: 255, g: 255, b: 255, a: 1 };

function opacityChain(el: Element, stop: Element): number {
  let o = 1;
  for (let n: Element | null = el; n && n !== stop.parentElement; n = n.parentElement) {
    o *= parseFloat(getComputedStyle(n).opacity || '1');
  }
  return o;
}

function fillPaint(el: SVGElement, svg: SVGSVGElement): RGBA | null {
  const cs = getComputedStyle(el);
  const c = parseColor(cs.fill);
  if (!c) return null; // none · url(#…) 패턴/그라디언트
  return { ...c, a: c.a * parseFloat(cs.fillOpacity || '1') * opacityChain(el, svg) };
}

function backdropOf(text: SVGTextElement, svg: SVGSVGElement): RGBA {
  const box = text.getBoundingClientRect();
  const point = new DOMPoint(box.left + box.width / 2, box.top + box.height / 2);
  const svgBg = parseColor(getComputedStyle(svg).backgroundColor);
  let color = svgBg ? compositeOver(svgBg, PAGE_WHITE) : PAGE_WHITE;
  const shapes = Array.from(svg.querySelectorAll<SVGGeometryElement>(BACKDROP_TAGS)).filter(
    (el) => !el.closest('defs') && Boolean(el.compareDocumentPosition(text) & Node.DOCUMENT_POSITION_FOLLOWING),
  );
  for (const shape of shapes) {
    const ctm = shape.getScreenCTM();
    if (!ctm || !shape.isPointInFill(point.matrixTransform(ctm.inverse()))) continue;
    const paint = fillPaint(shape, svg);
    if (paint && paint.a > 0) color = compositeOver(paint, color);
  }
  return color;
}

interface LowContrast {
  id: string;
  ratio: number;
}

function collectLowContrast(guide: string, key: string, cell: Element): { low: LowContrast[]; measured: number } {
  const low: LowContrast[] = [];
  let measured = 0;
  cell.querySelectorAll<SVGSVGElement>('svg[data-bbangto-viz-canvas]').forEach((svg) => {
    svg.querySelectorAll<SVGTextElement>('text').forEach((text, i) => {
      const label = (text.textContent ?? '').trim();
      if (!label || text.closest('defs')) return;
      const paint = fillPaint(text, svg);
      if (!paint || paint.a === 0) return;
      const bg = backdropOf(text, svg);
      const ratio = contrastRatio(compositeOver(paint, bg), bg) ?? 0;
      const cs = getComputedStyle(text);
      const px = parseFloat(cs.fontSize) * (text.getScreenCTM()?.a ?? 1);
      const bold = parseInt(cs.fontWeight, 10) >= 700;
      const min = px >= 24 || (bold && px >= 18.66) ? LARGE_TEXT_CONTRAST_MIN : TEXT_CONTRAST_MIN;
      measured += 1;
      if (ratio < min) low.push({ id: `${guide} · ${key} · text[${i}] "${label.slice(0, 24)}"`, ratio });
    });
  });
  return { low, measured };
}

export const LabelContrastGate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {vizStyleGuideCatalog.map((sg) => (
        <section key={sg.name} data-contrast-gate-guide={sg.name}>
          <h4 style={{ margin: '0 0 6px', fontSize: 13 }}>{sg.name}</h4>
          <VisualizationStyleGuideProvider
            styleGuide={{ name: sg.name, foundations: sg.foundations }}
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 8 }}
          >
            {TARGET_FIXTURES.map((fx) => (
              <div key={fx.key} data-contrast-gate-cell={fx.key}>
                {fx.render()}
              </div>
            ))}
          </VisualizationStyleGuideProvider>
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const sections = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-contrast-gate-guide]'));
    await expect(sections.length).toBe(vizStyleGuideCatalog.length);

    const low: LowContrast[] = [];
    for (const section of sections) {
      const guide = section.dataset.contrastGateGuide!;
      const cells = Array.from(section.querySelectorAll<HTMLElement>('[data-contrast-gate-cell]'));
      await expect(cells.length).toBe(TARGET_FIXTURES.length);
      for (const cell of cells) {
        const key = cell.dataset.contrastGateCell!;
        const result = collectLowContrast(guide, key, cell);
        await expect(result.measured, `${guide} · ${key}: 잰 글자 수`).toBeGreaterThan(0);
        low.push(...result.low);
      }
    }
    // 기준 목록과 견준다 — 새 미달 · 더 떨어진 대비 · 이제 통과해 지워야 할 항목이 모두 실패다
    const problems: string[] = [];
    const seen = new Set<string>();
    for (const { id, ratio } of low) {
      seen.add(id);
      const floor = LABEL_CONTRAST_BASELINE[id];
      if (floor === undefined) problems.push(`새 미달 ${id} ${ratio.toFixed(2)}`);
      else if (ratio < floor - 0.01) problems.push(`더 떨어짐 ${id} ${floor} → ${ratio.toFixed(2)}`);
    }
    for (const id of Object.keys(LABEL_CONTRAST_BASELINE)) {
      if (!seen.has(id)) problems.push(`이제 통과 — 기준 목록에서 지울 것 ${id}`);
    }
    await expect(problems).toEqual([]);
  },
};
