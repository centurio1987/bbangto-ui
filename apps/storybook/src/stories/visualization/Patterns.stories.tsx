import type { Meta, StoryObj } from '@storybook/react';
import {
  ProcessSteps,
  Comparison,
  TimelineRoadmap,
  Hierarchy,
  Cycle,
  Statistics,
} from '@centurio1987/bbangto-ui-visualization';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

const meta = {
  title: 'VISUALIZATION/Patterns',
  component: ProcessSteps,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ProcessSteps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ──────────────────────────────────────────────────────────────────────
// 1. ProcessSteps — 순차 스텝 체인 (레퍼런스: infographic minimal_04/05, colorful_04)
//    수용 기준: step 수 = 데이터 길이, 각 step에 IndexBadge+라벨, step 간 커넥터
// ──────────────────────────────────────────────────────────────────────
const STEPS = [
  { id: 's1', title: 'Discover', description: 'Collect raw signals' },
  { id: 's2', title: 'Define', description: 'Frame the problem' },
  { id: 's3', title: 'Design', description: 'Explore solutions' },
  { id: 's4', title: 'Deliver', description: 'Ship and measure' },
];

export const ProcessStepsHorizontal: Story = {
  render: () => (
    <ProcessSteps
      data={{ steps: STEPS }}
      orientation="horizontal"
      viewBox="0 0 720 160"
      width={720}
      height={160}
      title="Process steps horizontal"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="process-steps"]');
    await expect(root).not.toBeNull();

    const steps = canvasElement.querySelectorAll('[data-viz-step]');
    await expect(steps.length).toBe(STEPS.length);

    // 각 step: IndexBadge(01…) + 제목 라벨
    const badges = canvasElement.querySelectorAll('[data-viz-index-badge]');
    await expect(badges.length).toBe(STEPS.length);
    await expect(badges[0].textContent).toContain('01');
    await expect(badges[3].textContent).toContain('04');
    await expect(steps[0].textContent).toContain('Discover');

    // step 간 커넥터 = n-1
    const connectors = canvasElement.querySelectorAll('[data-viz-step-connector]');
    await expect(connectors.length).toBe(STEPS.length - 1);

    // 순번은 DOM 순서와 일치(스크린리더 호환)
    const order = Array.from(badges).map((b) => b.textContent?.trim());
    await expect(order).toEqual(['01', '02', '03', '04']);

    await expectVizPaintResolved(canvasElement);
  },
};

export const ProcessStepsZigzag: Story = {
  render: () => (
    <ProcessSteps
      data={{ steps: STEPS }}
      orientation="zigzag"
      viewBox="0 0 520 420"
      width={520}
      height={420}
      title="Process steps zigzag"
    />
  ),
  play: async ({ canvasElement }) => {
    const steps = canvasElement.querySelectorAll('[data-viz-step]');
    await expect(steps.length).toBe(STEPS.length);
    // zigzag: 라벨 좌우 교차 배치
    const sides = Array.from(steps).map((s) => s.getAttribute('data-viz-side'));
    await expect(sides).toEqual(['left', 'right', 'left', 'right']);
    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 2. Comparison — vs 레이아웃 (레퍼런스: infographic colorful_03/06)
//    수용 기준: 좌/우 패널 + 중앙 VsDivider, 항목 수 = 데이터 길이
// ──────────────────────────────────────────────────────────────────────
const COMPARE = {
  left: { label: 'Plan A', items: ['Fast setup', 'Low cost', 'Basic support'] },
  right: { label: 'Plan B', items: ['Custom setup', 'Scaled cost', 'Full support'] },
};

export const ComparisonSplit: Story = {
  render: () => (
    <Comparison
      data={COMPARE}
      viewBox="0 0 640 320"
      width={640}
      height={320}
      title="Comparison split"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="comparison"]');
    await expect(root).not.toBeNull();

    const left = canvasElement.querySelector('[data-viz-pane="left"]');
    const right = canvasElement.querySelector('[data-viz-pane="right"]');
    await expect(left).not.toBeNull();
    await expect(right).not.toBeNull();
    await expect(left!.textContent).toContain('Plan A');
    await expect(right!.textContent).toContain('Full support');

    // 중앙 디바이더 + VS 라벨
    const divider = canvasElement.querySelector('[data-viz-vs-divider]');
    await expect(divider).not.toBeNull();
    await expect(divider!.textContent).toContain('VS');

    // 항목 행 수 = 좌+우
    const rows = canvasElement.querySelectorAll('[data-viz-compare-item]');
    await expect(rows.length).toBe(COMPARE.left.items.length + COMPARE.right.items.length);

    await expectVizPaintResolved(canvasElement);
  },
};

export const ComparisonMagnitude: Story = {
  render: () => (
    <Comparison
      mode="magnitude"
      data={{
        left: { label: 'Before', value: 80 },
        right: { label: 'After', value: 40 },
      }}
      viewBox="0 0 640 300"
      width={640}
      height={300}
      title="Comparison magnitude"
    />
  ),
  play: async ({ canvasElement }) => {
    const blocks = canvasElement.querySelectorAll<SVGRectElement>('[data-viz-proportion-block]');
    await expect(blocks.length).toBe(2);
    // 크기 인코딩: 면적이 값에 비례 (80 vs 40 → 좌가 더 큼)
    const areaOf = (r: SVGRectElement) =>
      Number(r.getAttribute('width')) * Number(r.getAttribute('height'));
    await expect(areaOf(blocks[0])).toBeGreaterThan(areaOf(blocks[1]));
    // 값의 텍스트 병기(크기 인코딩 단독 금지)
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="comparison"]')!;
    await expect(root.textContent).toContain('80');
    await expect(root.textContent).toContain('40');
    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 3. TimelineRoadmap — 연대기 (레퍼런스: infographic iso_06, mermaid minimal_01/03)
//    수용 기준: 마일스톤 수 = 데이터 길이, 각각 기간 슬롯 + 라벨, 수평 시 상하 교차
// ──────────────────────────────────────────────────────────────────────
const MILESTONES = [
  { period: '2023', label: 'Foundation', description: 'Token system' },
  { period: '2024', label: 'Components', description: 'Atomic set' },
  { period: '2025', label: 'Style Guides', description: 'Catalog launch' },
  { period: '2026', label: 'Visualization', description: 'Headless viz' },
];

export const TimelineRoadmapHorizontal: Story = {
  render: () => (
    <TimelineRoadmap
      data={{ milestones: MILESTONES }}
      viewBox="0 0 760 260"
      width={760}
      height={260}
      title="Timeline roadmap"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="timeline-roadmap"]');
    await expect(root).not.toBeNull();

    // 축 존재
    await expect(canvasElement.querySelector('[data-viz-axis]')).not.toBeNull();

    // 마일스톤 = 데이터 길이, 기간/라벨 텍스트
    const marks = canvasElement.querySelectorAll('[data-viz-milestone]');
    await expect(marks.length).toBe(MILESTONES.length);
    await expect(marks[0].textContent).toContain('2023');
    await expect(marks[3].textContent).toContain('Visualization');

    // 수평 모드: 라벨 상하 교차
    const sides = Array.from(marks).map((m) => m.getAttribute('data-viz-side'));
    await expect(sides).toEqual(['above', 'below', 'above', 'below']);

    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 4. Hierarchy — 계층 (레퍼런스: infographic iso_05/06, system minimal_01/02)
//    수용 기준: tree=루트1+간선(n-1), pyramid=층수=데이터 길이·폭 비례
// ──────────────────────────────────────────────────────────────────────
const TREE = {
  id: 'ceo',
  label: 'Design System',
  children: [
    { id: 'core', label: 'Core', children: [{ id: 'atoms', label: 'Atoms' }, { id: 'motion', label: 'Motion' }] },
    { id: 'viz', label: 'Visualization', children: [{ id: 'patterns', label: 'Patterns' }] },
  ],
};

export const HierarchyTree: Story = {
  render: () => (
    <Hierarchy
      data={{ root: TREE }}
      viewBox="0 0 640 320"
      width={640}
      height={320}
      title="Hierarchy tree"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="hierarchy"]');
    await expect(root).not.toBeNull();

    // 노드 6개 (루트 + 5)
    const nodes = canvasElement.querySelectorAll('[data-viz-hierarchy-node]');
    await expect(nodes.length).toBe(6);
    // 트리 간선 = 노드 수 - 1
    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
    await expect(edges.length).toBe(5);
    await expect(root!.textContent).toContain('Design System');
    await expectVizPaintResolved(canvasElement);
  },
};

export const HierarchyPyramid: Story = {
  render: () => (
    <Hierarchy
      mode="pyramid"
      data={{ layers: [{ label: 'Vision' }, { label: 'Strategy' }, { label: 'Execution' }] }}
      viewBox="0 0 520 340"
      width={520}
      height={340}
      title="Hierarchy pyramid"
    />
  ),
  play: async ({ canvasElement }) => {
    const layers = canvasElement.querySelectorAll<SVGElement>('[data-viz-pyramid-layer]');
    await expect(layers.length).toBe(3);
    // 위로 갈수록 폭이 좁아짐 (사다리꼴 bbox 비교)
    const widths = Array.from(layers).map((l) => l.getBoundingClientRect().width);
    await expect(widths[0]).toBeLessThan(widths[1]);
    await expect(widths[1]).toBeLessThan(widths[2]);
    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 5. Cycle — 순환 (레퍼런스: infographic hd_06, system minimal_08/hd_04)
//    수용 기준: 세그먼트/노드 수 = 데이터 길이, 마지막→처음 연결(순환 폐쇄)
// ──────────────────────────────────────────────────────────────────────
const CYCLE_ITEMS = [
  { label: 'Listen' },
  { label: 'Process' },
  { label: 'Visualise' },
  { label: 'Recall' },
];

export const CycleRing: Story = {
  render: () => (
    <Cycle
      data={{ items: CYCLE_ITEMS }}
      viewBox="0 0 420 420"
      width={420}
      height={420}
      title="Cycle ring"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="cycle"]');
    await expect(root).not.toBeNull();

    // 링 세그먼트 수 = 항목 수 (아크가 전체 원을 순환 폐쇄)
    const segments = canvasElement.querySelectorAll('[data-viz-ring-segment]');
    await expect(segments.length).toBe(CYCLE_ITEMS.length);

    // 라벨은 텍스트로도 노출(아크 단독 금지)
    for (const item of CYCLE_ITEMS) {
      await expect(root!.textContent).toContain(item.label);
    }
    await expectVizPaintResolved(canvasElement);
  },
};

export const CycleOrbit: Story = {
  render: () => (
    <Cycle
      mode="orbit"
      data={{ items: CYCLE_ITEMS, center: 'Loop' }}
      viewBox="0 0 420 420"
      width={420}
      height={420}
      title="Cycle orbit"
    />
  ),
  play: async ({ canvasElement }) => {
    const nodes = canvasElement.querySelectorAll('[data-viz-cycle-node]');
    await expect(nodes.length).toBe(CYCLE_ITEMS.length);
    // 순환 폐쇄: 커넥터 수 = 노드 수 (마지막→처음 포함)
    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
    await expect(edges.length).toBe(CYCLE_ITEMS.length);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="cycle"]')!;
    await expect(root.textContent).toContain('Loop');
    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// 6. Statistics — 수치 강조 (레퍼런스: infographic minimal_02/06, colorful_05)
//    수용 기준: 카드/행 수 = 데이터 길이, 값은 반드시 텍스트로도 노출
// ──────────────────────────────────────────────────────────────────────
const STATS = [
  { label: 'Adoption', value: 79.2, unit: '%', delta: 4.1 },
  { label: 'Avg. Session', value: 14, unit: 'h', delta: -1.2 },
  { label: 'Conversion', value: 7.5, unit: '%' },
];

export const StatisticsCards: Story = {
  render: () => (
    <Statistics
      data={{ items: STATS }}
      viewBox="0 0 720 220"
      width={720}
      height={220}
      title="Statistics cards"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="statistics"]');
    await expect(root).not.toBeNull();

    const cards = canvasElement.querySelectorAll('[data-viz-stat-card]');
    await expect(cards.length).toBe(STATS.length);

    // 수치 강조 위계: 값 텍스트가 라벨보다 크게
    const value = cards[0].querySelector<SVGTextElement>('[data-viz-stat-value]');
    const label = cards[0].querySelector<SVGTextElement>('[data-viz-stat-label]');
    await expect(value).not.toBeNull();
    await expect(label).not.toBeNull();
    const fs = (el: SVGTextElement) => parseFloat(getComputedStyle(el).fontSize);
    await expect(fs(value!)).toBeGreaterThan(fs(label!));

    // 값+단위+델타 텍스트 병기
    await expect(cards[0].textContent).toContain('79.2');
    await expect(cards[0].textContent).toContain('%');
    await expect(cards[0].textContent).toContain('+4.1');
    await expect(cards[1].textContent).toContain('-1.2');

    await expectVizPaintResolved(canvasElement);
  },
};

export const StatisticsIsotype: Story = {
  render: () => (
    <Statistics
      mode="isotype"
      data={{
        items: [
          { label: 'Seoul', value: 7, count: 7 },
          { label: 'Busan', value: 4, count: 4 },
        ],
      }}
      viewBox="0 0 640 200"
      width={640}
      height={200}
      title="Statistics isotype"
    />
  ),
  play: async ({ canvasElement }) => {
    // 아이소타입: 반복 단위 수 = count 합
    const units = canvasElement.querySelectorAll('[data-viz-pictograph-unit]');
    await expect(units.length).toBe(11);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="statistics"]')!;
    await expect(root.textContent).toContain('Seoul');
    await expect(root.textContent).toContain('7');
    await expectVizPaintResolved(canvasElement);
  },
};
