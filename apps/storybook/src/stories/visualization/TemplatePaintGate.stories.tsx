import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';
import {
  ArchiMateBusinessDiagram,
  BPMNCollaborationDiagram,
  C4CodeDiagram,
  RequirementDiagram,
  TimelineDiagram,
  UMLDeploymentDiagram,
  UMLSequenceDiagram,
  VisualizationStyleGuideProvider,
} from '@centurio1987/bbangto-ui-visualization';
import type { VisualizationStyleGuide } from '@centurio1987/bbangto-ui-visualization';
import {
  blueprintTechnical01VizStyleGuide,
  vizStyleGuideCatalog,
} from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { compositeOver, contrastRatio, parseColor } from '@centurio1987/bbangto-ui-tokens';
import type { RGBA } from '@centurio1987/bbangto-ui-tokens';
import { expect } from 'storybook/test';
import { LABEL_CONTRAST_BASELINE } from './_labelContrastBaseline';
import { MATRIX_FIXTURES } from './_matrixFixtures';

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
// fixture — KAN-056 대상 13개 + 회귀 가드로 나머지 matrix fixture
// ────────────────────────────────────────────────────────────────────────

interface GateFixture {
  key: string;
  render: () => ReactNode;
}

/** KAN-056 대상 중 `_matrixFixtures.tsx` 에 이미 있는 6개. */
const REUSED_KEYS = ['architecture', 'block-diagram', 'kanban-board', 'mindmap', 'uml-component', 'bpmn'];

/** 나머지 7개 — G1·G2·G4·DiagramsP3 스토리의 검증된 데이터를 줄여 옮겼다. */
const NEW_FIXTURES: GateFixture[] = [
  {
    key: 'archimate-business',
    render: () => (
      <ArchiMateBusinessDiagram
        data={{
          elements: [
            { id: 'role1', x: 20, y: 40, width: 120, height: 70, name: 'Customer', kind: 'role' },
            { id: 'process1', x: 190, y: 40, width: 120, height: 70, name: 'Order Proc', kind: 'process' },
          ],
          relationships: [{ id: 'r1', from: 'role1', to: 'process1', kind: 'triggering' }],
        }}
        viewBox="0 0 340 150"
        width={340}
        height={150}
        title="ArchiMate Business"
      />
    ),
  },
  {
    key: 'bpmn-collaboration',
    render: () => (
      <BPMNCollaborationDiagram
        data={{
          pools: [
            { id: 'customer', label: 'Customer', x: 20, y: 20, width: 520, height: 90 },
            { id: 'shop', label: 'Shop', x: 20, y: 130, width: 520, height: 90 },
          ],
          events: [
            { id: 'start', x: 90, y: 65, kind: 'start' },
            { id: 'end', x: 500, y: 175, kind: 'end' },
          ],
          tasks: [
            { id: 'order', x: 160, y: 45, width: 100, height: 40, label: 'Place order' },
            { id: 'fulfil', x: 300, y: 155, width: 100, height: 40, label: 'Fulfil order' },
          ],
          gateways: [{ id: 'g1', x: 430, y: 175, kind: 'exclusive' }],
          sequenceFlows: [
            { id: 's1', from: 'start', to: 'order' },
            { id: 's2', from: 'fulfil', to: 'g1' },
            { id: 's3', from: 'g1', to: 'end' },
          ],
          messageFlows: [{ id: 'm1', from: 'order', to: 'fulfil', label: 'order msg' }],
        }}
        viewBox="0 0 560 240"
        width={560}
        height={240}
        title="BPMN collaboration"
      />
    ),
  },
  {
    key: 'c4-code',
    render: () => (
      <C4CodeDiagram
        data={{
          elements: [
            { id: 'cls1', x: 20, y: 20, width: 160, height: 120, name: 'User', kind: 'class', attributes: ['- id: string'], methods: ['+ login(): void'] },
            { id: 'cls2', x: 220, y: 20, width: 160, height: 120, name: 'Account', kind: 'class', attributes: ['- balance: number'], methods: ['+ deposit(n): void'] },
          ],
          relationships: [{ id: 'r1', from: 'cls1', to: 'cls2', label: 'has' }],
        }}
        viewBox="0 0 420 170"
        width={420}
        height={170}
        title="C4 Code"
      />
    ),
  },
  {
    key: 'requirement',
    render: () => (
      <RequirementDiagram
        data={{
          requirements: [
            { id: 'r1', x: 20, y: 20, width: 160, height: 100, name: 'Authenticate', text: 'User must log in', kind: 'requirement' },
            { id: 'r2', x: 220, y: 20, width: 160, height: 100, name: 'Authorize', text: 'Role-based access', kind: 'functionalRequirement' },
          ],
          edges: [{ id: 're1', from: 'r1', to: 'r2', kind: 'derives' }],
        }}
        viewBox="0 0 420 150"
        width={420}
        height={150}
        title="Requirement diagram"
      />
    ),
  },
  {
    key: 'timeline',
    render: () => (
      <TimelineDiagram
        data={{
          axisY: 110,
          events: [
            { id: 'ev1', x: 80, y: 20, width: 110, height: 50, label: 'Phase 1', date: '2024 Q1' },
            { id: 'ev2', x: 230, y: 20, width: 110, height: 50, label: 'Phase 2', date: '2024 Q2' },
          ],
        }}
        viewBox="0 0 360 160"
        width={360}
        height={160}
        title="Timeline"
      />
    ),
  },
  {
    key: 'uml-deployment',
    render: () => (
      <UMLDeploymentDiagram
        data={{
          environments: [{ x: 10, y: 10, width: 420, height: 170, label: 'Production' }],
          nodes: [
            { id: 'web', x: 30, y: 40, width: 160, height: 100, name: 'Web Server' },
            { id: 'db', x: 240, y: 40, width: 160, height: 100, name: 'DB Server' },
          ],
          edges: [{ id: 'e1', from: 'web', to: 'db', label: 'JDBC' }],
        }}
        viewBox="0 0 450 200"
        width={450}
        height={200}
        title="UML Deployment"
      />
    ),
  },
  {
    key: 'uml-sequence',
    render: () => (
      <UMLSequenceDiagram
        data={{
          participants: [
            { id: 'client', x: 40, name: 'Client', width: 100 },
            { id: 'server', x: 240, name: 'Server', width: 100 },
          ],
          messages: [
            { id: 'm1', from: 'client', to: 'server', y: 100, label: 'POST /login', kind: 'sync' },
            { id: 'm2', from: 'server', to: 'client', y: 140, label: '200 OK', kind: 'return' },
          ],
        }}
        lifelineHeight={140}
        viewBox="0 0 380 200"
        width={380}
        height={200}
        title="UML Sequence"
      />
    ),
  },
];

/** KAN-056 이 고친 13개. play 가 이 수를 확인한다. */
const TARGET_FIXTURES: GateFixture[] = [
  ...MATRIX_FIXTURES.filter((f) => REUSED_KEYS.includes(f.key)),
  ...NEW_FIXTURES,
];

/**
 * 회귀 가드 — matrix 의 나머지 fixture. KAN-056 S1 에서 같은 게이트로 재 보니 이미 깨끗했다.
 * 새 리터럴이 들어오면 여기서 걸린다.
 */
const GUARD_FIXTURES: GateFixture[] = MATRIX_FIXTURES.filter((f) => !REUSED_KEYS.includes(f.key));

const GATE_FIXTURES: GateFixture[] = [...TARGET_FIXTURES, ...GUARD_FIXTURES];

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
