import type { Meta, StoryObj } from '@storybook/react';
import {
  Cycle,
  Flowchart,
  Hierarchy,
  ProcessSteps,
  Sketchnote,
  TimelineRoadmap,
  VisualizationStyleGuideProvider,
  type VisualizationFoundation,
  type VisualizationStyleGuide,
} from '@centurio1987/bbangto-ui-visualization';
import { vizTypeRegistry } from '@centurio1987/bbangto-ui-visualization/type-meta';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { PAINT_GATE_FIXTURES } from './_paintGateFixtures';

/**
 * 연결선 대시 게이트 — 스타일 가이드가 연결선 대시(`edge.dashPattern`)를 정하면 어느 선이 따라가는가 (KAN-070).
 *
 * 카탈로그 가이드는 모두 실선('')이라, blueprint 에서 대시만 `7 3` 으로 바꾼 가이드 아래에서 그리고
 * 계산된 `stroke-dasharray` 로 잰다. `7 3` 은 템플릿이 직접 넘기는 대시(`5 3`·`6 4`·`4 3` …)와 겹치지 않게 골랐다.
 *
 * - 관계선은 템플릿과 상관없이 가이드 대시를 따른다. 연결선 훅은 `data-viz-part="connector"` 다.
 * - 표준 표기법 템플릿(유형 메타의 `standard` 태그)은 바깥 `<svg>` 에 `data-viz-notation` 을 달고, 그 안의 연결선은
 *   가이드 대시를 끈다. 표기법에서 실선과 대시가 서로 다른 관계를 뜻하기 때문이다. 템플릿이 직접 넘긴 대시는 남는다.
 * - 한 그림 안에서 대시 선과 대비돼 뜻을 갖는 실선(Flowchart 의 `dashed` 가 섞일 때)과 축은 실선이다.
 *
 * 표준 템플릿 목록은 레지스트리에서 읽는다. 새 표준 템플릿이 훅을 빠뜨리면 ① 이 그 이름으로 실패한다.
 */
const meta = {
  title: 'VISUALIZATION/Templates/Dash Gate',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ────────────────────────────────────────────────────────────────────────
// 대시 가이드
// ────────────────────────────────────────────────────────────────────────

const GUIDE_DASH = '7 3';
const GUIDE_DASH_COMPUTED = '7px, 3px';

const sg = blueprintTechnical01VizStyleGuide;
const withEdgeDash = (f: VisualizationFoundation): VisualizationFoundation => ({
  ...f,
  edge: { ...f.edge, dashPattern: GUIDE_DASH },
});
const DASH_GUIDE: VisualizationStyleGuide = {
  ...sg,
  name: `${sg.name}-dash-gate`,
  foundations: withEdgeDash(sg.foundations),
  foundationPresets: sg.foundationPresets?.map((p) => ({ ...p, foundations: withEdgeDash(p.foundations) })),
};

const dashOf = (el: Element) => getComputedStyle(el).strokeDasharray;
const connectorsIn = (root: Element) => Array.from(root.querySelectorAll<SVGElement>('[data-viz-part="connector"]'));
const rootSvgOf = (cell: Element) => cell.querySelector('svg[data-bbangto-viz-canvas]');

// ────────────────────────────────────────────────────────────────────────
// 분류
// ────────────────────────────────────────────────────────────────────────

/** 유형 메타에서 `standard` 태그가 붙은 템플릿의 내보낸 이름 전부. */
const STANDARD_TEMPLATES = new Set(
  vizTypeRegistry
    .filter((e) => e.kind === 'template' && e.meta?.tags.includes('standard'))
    .flatMap((e) => e.exportNames),
);

/**
 * 가이드 대시를 따르는 관계선이 있는 비표준 템플릿. Edge 를 쓰는 10개와, Edge 없이 관계선을 그리는 셋
 * (SitemapTree · WorkBreakdownStructure 의 트리 가지, IsometricScene 의 입체 연결선)이다.
 * GitGraph 의 선은 브랜치 색으로 칠하는 계열선이라 넣지 않는다.
 */
const RELATION_TEMPLATES = [
  'ArchitectureDiagram',
  'BlockDiagram',
  'ConceptMap',
  'DataFlowDiagram',
  'DataLineage',
  'Flowchart',
  'Mindmap',
  'NetworkGraph',
  'NetworkTopology',
  'ScreenFlow',
  'SitemapTree',
  'WorkBreakdownStructure',
  'IsometricScene',
];

const GatedFixtures = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    {PAINT_GATE_FIXTURES.map((fx) => (
      <section key={fx.key} data-dash-gate-row={fx.key} data-dash-gate-template={fx.template}>
        <h4 style={{ margin: '0 0 6px', fontSize: 13 }}>{fx.key}</h4>
        <VisualizationStyleGuideProvider styleGuide={DASH_GUIDE} style={{ padding: 8 }}>
          {fx.render()}
        </VisualizationStyleGuideProvider>
      </section>
    ))}
  </div>
);

const rowsOf = (canvasElement: HTMLElement) =>
  Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-dash-gate-row]'));

// ────────────────────────────────────────────────────────────────────────
// ① 표준 표기 템플릿 — 가이드 대시를 끈다
// ────────────────────────────────────────────────────────────────────────

export const NotationTemplatesKeepTheirLines: Story = {
  render: () => <GatedFixtures />,
  play: async ({ canvasElement }) => {
    // 레지스트리를 읽지 못하면 게이트가 아무것도 안 잰다
    await expect(STANDARD_TEMPLATES.size).toBeGreaterThan(20);

    const rows = rowsOf(canvasElement).filter((r) => STANDARD_TEMPLATES.has(r.dataset.dashGateTemplate!));
    // 표준 템플릿마다 표본이 있다(표본 커버리지는 test:unit 의 vizPaintGateCoverage 가 강제한다)
    await expect(new Set(rows.map((r) => r.dataset.dashGateTemplate)).size).toBe(STANDARD_TEMPLATES.size);

    const missingHook: string[] = [];
    const mismatched: string[] = [];
    let measured = 0;
    for (const row of rows) {
      const key = row.dataset.dashGateRow!;
      if (!rootSvgOf(row)?.hasAttribute('data-viz-notation')) missingHook.push(key);
      connectorsIn(row).forEach((c, i) => {
        // 템플릿이 대시를 직접 넘긴 선(UML 의존 등)은 그 값이 남아야 한다 — 표기 규칙이 인라인을 덮으면 안 된다
        if (c.style.strokeDasharray !== '') {
          if (c.style.strokeDasharray !== 'none' && dashOf(c) === 'none') mismatched.push(`${key} 연결선[${i}] 대시가 지워짐`);
          return;
        }
        measured += 1;
        if (dashOf(c) !== 'none') mismatched.push(`${key} 연결선[${i}]=${dashOf(c)}`);
      });
    }
    await expect(missingHook).toEqual([]);
    // 잰 연결선이 없으면 게이트가 아무것도 안 잰 것이다
    await expect(measured).toBeGreaterThan(0);
    await expect(mismatched).toEqual([]);
  },
};

// ────────────────────────────────────────────────────────────────────────
// ② 관계선 템플릿 — 가이드 대시를 따른다
// ────────────────────────────────────────────────────────────────────────

export const RelationLinesFollowGuide: Story = {
  render: () => <GatedFixtures />,
  play: async ({ canvasElement }) => {
    const rows = rowsOf(canvasElement);
    const templates = new Set(rows.map((r) => r.dataset.dashGateTemplate));
    for (const name of RELATION_TEMPLATES) {
      await expect(templates.has(name), `${name} 표본`).toBe(true);
      await expect(STANDARD_TEMPLATES.has(name), `${name} 은 표준 표기 템플릿이 아니다`).toBe(false);
    }

    const noGuideDash: string[] = [];
    const strayInline: string[] = [];
    for (const row of rows) {
      const name = row.dataset.dashGateTemplate!;
      if (!RELATION_TEMPLATES.includes(name)) continue;
      const connectors = connectorsIn(row);
      if (!connectors.some((c) => dashOf(c) === GUIDE_DASH_COMPUTED)) noGuideDash.push(row.dataset.dashGateRow!);
      // 대시를 직접 넘기지 않은 연결선은 모두 가이드 대시다
      connectors.forEach((c, i) => {
        if (c.style.strokeDasharray === '' && dashOf(c) !== GUIDE_DASH_COMPUTED) {
          strayInline.push(`${row.dataset.dashGateRow} 연결선[${i}]=${dashOf(c)}`);
        }
      });
    }
    await expect(noGuideDash).toEqual([]);
    await expect(strayInline).toEqual([]);

    // 표준이 아닌 템플릿은 훅을 달지 않는다 — 달면 그 템플릿의 연결선이 가이드를 못 따른다
    const strayHook = rows
      .filter((r) => !STANDARD_TEMPLATES.has(r.dataset.dashGateTemplate!))
      .filter((r) => r.querySelector('[data-viz-notation]'))
      .map((r) => r.dataset.dashGateRow);
    await expect(strayHook).toEqual([]);
  },
};

// ────────────────────────────────────────────────────────────────────────
// ③ Flowchart — 대시 선이 섞이면 나머지 실선은 실선으로 남는다
// ────────────────────────────────────────────────────────────────────────

const FLOW_NODES = [
  { id: 'a', x: 30, y: 30, width: 110, height: 50, label: 'Start', shape: 'stadium' as const },
  { id: 'b', x: 200, y: 30, width: 110, height: 50, label: 'Work' },
  { id: 'c', x: 370, y: 30, width: 110, height: 50, label: 'Done', shape: 'stadium' as const },
];

export const FlowchartDashedContrast: Story = {
  render: () => (
    <VisualizationStyleGuideProvider styleGuide={DASH_GUIDE} style={{ padding: 8 }}>
      <div data-flow="mixed">
        <Flowchart
          data={{
            nodes: FLOW_NODES,
            edges: [
              { id: 'e1', from: 'a', to: 'b' },
              { id: 'e2', from: 'b', to: 'c', dashed: true },
            ],
          }}
          viewBox="0 0 510 110"
          width={510}
          height={110}
          title="Flowchart mixed"
        />
      </div>
      <div data-flow="plain">
        <Flowchart
          data={{
            nodes: FLOW_NODES,
            edges: [
              { id: 'e1', from: 'a', to: 'b' },
              { id: 'e2', from: 'b', to: 'c' },
            ],
          }}
          viewBox="0 0 510 110"
          width={510}
          height={110}
          title="Flowchart plain"
        />
      </div>
    </VisualizationStyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    const mixed = connectorsIn(canvasElement.querySelector('[data-flow="mixed"]')!);
    await expect(mixed.map(dashOf)).toEqual(['none', '6px, 4px']);
    const plain = connectorsIn(canvasElement.querySelector('[data-flow="plain"]')!);
    await expect(plain.map(dashOf)).toEqual([GUIDE_DASH_COMPUTED, GUIDE_DASH_COMPUTED]);
  },
};

// ────────────────────────────────────────────────────────────────────────
// ④ 패턴 — 축은 실선, 관계선은 가이드 대시
// ────────────────────────────────────────────────────────────────────────

export const PatternLines: Story = {
  render: () => (
    <VisualizationStyleGuideProvider styleGuide={DASH_GUIDE} style={{ padding: 8 }}>
      <div data-pattern="timeline-roadmap">
        <TimelineRoadmap
          data={{
            milestones: [
              { period: '2025', label: 'Style Guides' },
              { period: '2026', label: 'Visualization' },
            ],
          }}
          viewBox="0 0 520 200"
          width={520}
          height={200}
          title="Timeline roadmap"
        />
      </div>
      <div data-pattern="process-steps">
        <ProcessSteps
          data={{
            steps: [
              { id: 's1', title: 'Discover' },
              { id: 's2', title: 'Define' },
              { id: 's3', title: 'Deliver' },
            ],
          }}
          orientation="horizontal"
          viewBox="0 0 560 160"
          width={560}
          height={160}
          title="Process steps"
        />
      </div>
      <div data-pattern="cycle">
        <Cycle
          data={{ items: [{ label: 'Listen' }, { label: 'Process' }, { label: 'Recall' }] }}
          mode="orbit"
          viewBox="0 0 360 360"
          width={360}
          height={360}
          title="Cycle orbit"
        />
      </div>
      <div data-pattern="hierarchy">
        <Hierarchy
          data={{ root: { id: 'r', label: 'Root', children: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }] } }}
          viewBox="0 0 420 240"
          width={420}
          height={240}
          title="Hierarchy"
        />
      </div>
      <div data-pattern="sketchnote">
        <Sketchnote
          data={{
            nodes: [
              { id: 'idea', label: 'Idea', x: 80, y: 80 },
              { id: 'ship', label: 'Ship', x: 320, y: 100 },
            ],
            connectors: [{ from: 'idea', to: 'ship' }],
          }}
          viewBox="0 0 420 200"
          width={420}
          height={200}
          title="Sketchnote"
        />
      </div>
    </VisualizationStyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    const axis = canvasElement.querySelector('[data-pattern="timeline-roadmap"] [data-viz-axis]');
    await expect(axis).not.toBeNull();
    await expect(dashOf(axis!)).toBe('none');

    for (const name of ['process-steps', 'cycle', 'hierarchy', 'sketchnote']) {
      const connectors = connectorsIn(canvasElement.querySelector(`[data-pattern="${name}"]`)!);
      await expect(connectors.length, `${name} 연결선 수`).toBeGreaterThan(0);
      await expect(connectors.map(dashOf), name).toEqual(connectors.map(() => GUIDE_DASH_COMPUTED));
    }
  },
};
