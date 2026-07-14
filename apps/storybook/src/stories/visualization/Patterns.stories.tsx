import type { Meta, StoryObj } from '@storybook/react';
import {
  ProcessSteps,
  Comparison,
  TimelineRoadmap,
  Hierarchy,
  Cycle,
  Statistics,
  Venn,
  Pathways,
  GeoMap,
  BentoGrid,
  Sketchnote,
  PosterEditorial,
  SpectrumSlider,
  Funnel,
  ListInfographic,
  AnnotatedIllustration,
  SwotMatrix,
  OnionDiagram,
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

// waffle 모드 (VT-513) — 100셀 격자 비율 채움 (ORD-011)
export const StatisticsWaffle: Story = {
  render: () => (
    <Statistics
      mode="waffle"
      data={{
        items: [
          { label: 'Mobile', value: 60 },
          { label: 'Desktop', value: 30 },
          { label: 'Tablet', value: 10 },
        ],
      }}
      viewBox="0 0 420 320"
      width={420}
      height={320}
      title="Statistics waffle"
    />
  ),
  play: async ({ canvasElement }) => {
    // 10×10 = 100 셀
    const cells = canvasElement.querySelectorAll('[data-bbangto-viz-cell]');
    await expect(cells.length).toBe(100);
    // 카테고리별 채움 셀 수 = round(비율×100): 60/30/10
    const filled = (cat: string) => canvasElement.querySelectorAll(`[data-bbangto-viz-cell-cat="${cat}"]`).length;
    await expect(filled('Mobile')).toBe(60);
    await expect(filled('Desktop')).toBe(30);
    await expect(filled('Tablet')).toBe(10);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="statistics"]')!;
    await expect(root.textContent).toContain('Mobile');
    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// Venn — 집합 겹침 (VT-306). 2원 정밀 + 3원 대칭 근사, 교집합 라벨 텍스트 병기
// ──────────────────────────────────────────────────────────────────────
export const VennThreeSets: Story = {
  render: () => (
    <Venn
      data={{
        sets: [
          { id: 'a', label: 'Design', size: 10 },
          { id: 'b', label: 'Eng', size: 10 },
          { id: 'c', label: 'Product', size: 10 },
        ],
        intersections: [{ ids: ['a', 'b', 'c'], label: 'MVP' }],
      }}
      viewBox="0 0 420 360"
      width={420}
      height={360}
      title="Venn"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const circles = canvasElement.querySelectorAll('[data-bbangto-viz-venn-circle]');
    await expect(circles.length).toBe(3);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="venn"]')!;
    await expect(root.textContent).toContain('MVP');
  },
};

// ──────────────────────────────────────────────────────────────────────
// Cycle — spiral 모드 (VT-405). 나선 위 단계 노드
// ──────────────────────────────────────────────────────────────────────
export const CycleSpiral: Story = {
  render: () => (
    <Cycle
      mode="spiral"
      data={{ items: [{ label: 'Plan' }, { label: 'Do' }, { label: 'Check' }, { label: 'Act' }, { label: 'Scale' }], center: 'Growth' }}
      viewBox="0 0 420 420"
      width={420}
      height={420}
      title="Cycle spiral"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="cycle"]');
    await expect(root).not.toBeNull();
    const nodes = canvasElement.querySelectorAll('[data-viz-cycle-node]');
    await expect(nodes.length).toBe(5);
    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// Pathways — 여정형 경로 (VT-208). curved path 위 이정표 + 순번
// ──────────────────────────────────────────────────────────────────────
export const PathwaysBasic: Story = {
  render: () => (
    <Pathways
      data={{
        steps: [
          { id: 'p1', label: 'Enroll', description: 'Kick-off' },
          { id: 'p2', label: 'Learn', description: 'Core modules' },
          { id: 'p3', label: 'Practice', description: 'Hands-on' },
          { id: 'p4', label: 'Certify', description: 'Final exam' },
        ],
      }}
      viewBox="0 0 720 260"
      width={720}
      height={260}
      title="Pathways"
    />
  ),
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="pathways"]');
    await expect(root).not.toBeNull();
    const marks = canvasElement.querySelectorAll('[data-bbangto-viz-pathway-step]');
    await expect(marks.length).toBe(4);
    // 순번 DOM 순서
    const badges = canvasElement.querySelectorAll('[data-viz-index-badge]');
    await expect(badges[0].textContent).toContain('01');
    await expect(badges[3].textContent).toContain('04');
    await expectVizPaintResolved(canvasElement);
  },
};

// ──────────────────────────────────────────────────────────────────────
// GeoMap — 지도 인포그래픽 (VT-605). caller-supplied region path + pins
// ──────────────────────────────────────────────────────────────────────
export const GeoMapBasic: Story = {
  render: () => (
    <GeoMap
      data={{
        regions: [
          { id: 'r1', d: 'M40 40 L200 30 L220 160 L60 180 Z', label: 'West', value: 42 },
          { id: 'r2', d: 'M220 30 L400 50 L380 170 L230 160 Z', label: 'East', value: 68 },
        ],
        pins: [
          { id: 'c1', x: 120, y: 110, label: 'HQ', value: 12 },
          { id: 'c2', x: 300, y: 100, label: 'Branch' },
        ],
      }}
      viewBox="0 0 440 220"
      width={440}
      height={220}
      title="Geo map"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const regions = canvasElement.querySelectorAll('[data-bbangto-viz-geo-region]');
    await expect(regions.length).toBe(2);
    const pins = canvasElement.querySelectorAll('[data-bbangto-viz-geo-pin]');
    await expect(pins.length).toBe(2);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="geo-map"]')!;
    await expect(root.textContent).toContain('HQ');
  },
};

// ──────────────────────────────────────────────────────────────────────
// BentoGrid — 비대칭 모듈 격자 (VT-607)
// ──────────────────────────────────────────────────────────────────────
export const BentoGridBasic: Story = {
  render: () => (
    <BentoGrid
      data={{
        cols: 4,
        rows: 3,
        cells: [
          { id: 'a', col: 0, row: 0, colSpan: 2, rowSpan: 2, title: 'Hero', value: '2.4M' },
          { id: 'b', col: 2, row: 0, colSpan: 2, rowSpan: 1, title: 'Growth', value: '+18%' },
          { id: 'c', col: 2, row: 1, colSpan: 1, rowSpan: 1, title: 'Users' },
          { id: 'd', col: 3, row: 1, colSpan: 1, rowSpan: 2, title: 'Retention' },
          { id: 'e', col: 0, row: 2, colSpan: 3, rowSpan: 1, title: 'Timeline' },
        ],
      }}
      viewBox="0 0 480 360"
      width={480}
      height={360}
      title="Bento grid"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const cells = canvasElement.querySelectorAll('[data-bbangto-viz-bento-cell]');
    await expect(cells.length).toBe(5);
    // 셀 겹침 없음: 각 rect의 경계 상자가 서로 교차하지 않음
    const rects = Array.from(cells).map((c) => {
      const r = c.querySelector('rect')!;
      return {
        x: parseFloat(r.getAttribute('x')!),
        y: parseFloat(r.getAttribute('y')!),
        w: parseFloat(r.getAttribute('width')!),
        h: parseFloat(r.getAttribute('height')!),
      };
    });
    const overlap = (a: typeof rects[0], b: typeof rects[0]) =>
      a.x < b.x + b.w - 1 && a.x + a.w - 1 > b.x && a.y < b.y + b.h - 1 && a.y + a.h - 1 > b.y;
    for (let i = 0; i < rects.length; i++)
      for (let j = i + 1; j < rects.length; j++)
        await expect(overlap(rects[i], rects[j])).toBe(false);
  },
};

// ──────────────────────────────────────────────────────────────────────
// Sketchnote — 손그림형 구성 (VT-608, 지터 없음 — 구조만)
// ──────────────────────────────────────────────────────────────────────
export const SketchnoteBasic: Story = {
  render: () => (
    <Sketchnote
      data={{
        nodes: [
          { id: 'idea', label: 'Idea', x: 80, y: 80 },
          { id: 'plan', label: 'Plan', x: 300, y: 60 },
          { id: 'ship', label: 'Ship', x: 520, y: 120 },
        ],
        connectors: [
          { from: 'idea', to: 'plan' },
          { from: 'plan', to: 'ship' },
        ],
      }}
      viewBox="0 0 640 240"
      width={640}
      height={240}
      title="Sketchnote"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const nodes = canvasElement.querySelectorAll('[data-bbangto-viz-sketch-node]');
    await expect(nodes.length).toBe(3);
    await expect(canvasElement.querySelectorAll('[data-bbangto-viz-edge]').length).toBe(2);
  },
};

// ──────────────────────────────────────────────────────────────────────
// PosterEditorial — 타이포 위계 지면 (VT-609)
// ──────────────────────────────────────────────────────────────────────
export const PosterEditorialBasic: Story = {
  render: () => (
    <PosterEditorial
      data={{
        eyebrow: 'DESIGN SYSTEM',
        title: 'Visualization',
        subtitle: 'Headless charts and diagrams',
        items: ['26 new types', 'Zero runtime deps', '6 style guides'],
      }}
      viewBox="0 0 520 360"
      width={520}
      height={360}
      title="Poster editorial"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="poster-editorial"]')!;
    await expect(root).not.toBeNull();
    const heading = canvasElement.querySelector('[data-bbangto-viz-poster-title]');
    await expect(heading?.textContent).toContain('Visualization');
  },
};

// ──────────────────────────────────────────────────────────────────────
// SpectrumSlider — 대립축 다축 척도 (VT-710)
// ──────────────────────────────────────────────────────────────────────
export const SpectrumSliderBasic: Story = {
  render: () => (
    <SpectrumSlider
      data={{
        axes: [
          { id: 'a1', leftLabel: 'Simple', rightLabel: 'Complex', value: 30 },
          { id: 'a2', leftLabel: 'Manual', rightLabel: 'Automated', value: 75 },
          { id: 'a3', leftLabel: 'Local', rightLabel: 'Global', value: 50 },
        ],
      }}
      viewBox="0 0 560 260"
      width={560}
      height={260}
      title="Spectrum slider"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const axes = canvasElement.querySelectorAll('[data-bbangto-viz-spectrum-axis]');
    await expect(axes.length).toBe(3);
    const dots = canvasElement.querySelectorAll('[data-bbangto-viz-spectrum-dot]');
    await expect(dots.length).toBe(3);
    // 값 텍스트 병기
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="spectrum-slider"]')!;
    await expect(root.textContent).toContain('75');
  },
};

// ══════════════════════════════════════════════════════════════════════
// P2 패턴 (ORD-011) — Funnel/List/Annotated/SWOT/Onion + Cycle flywheel
// ══════════════════════════════════════════════════════════════════════

// Funnel (VT-207) — 단계 축소 전환 (funnelTrapezoids geometry)
export const FunnelBasic: Story = {
  render: () => (
    <Funnel
      data={{
        stages: [
          { id: 'v', label: 'Visits', value: 1000 },
          { id: 'l', label: 'Leads', value: 620 },
          { id: 'q', label: 'Qualified', value: 280 },
          { id: 'w', label: 'Won', value: 90 },
        ],
      }}
      viewBox="0 0 420 320"
      width={420}
      height={320}
      title="Funnel"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const stages = canvasElement.querySelectorAll('[data-bbangto-viz-funnel-stage]');
    await expect(stages.length).toBe(4);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="funnel"]')!;
    await expect(root.textContent).toContain('1000');
    await expect(root.textContent).toContain('Won');
  },
};

// ListInfographic (VT-603) — 아이콘 + 항목 목록
export const ListInfographicBasic: Story = {
  render: () => (
    <ListInfographic
      data={{
        items: [
          { id: '1', title: 'Fast', description: 'Ships in milliseconds' },
          { id: '2', title: 'Safe', description: 'Type-checked contracts' },
          { id: '3', title: 'Simple', description: 'One import to start' },
        ],
      }}
      viewBox="0 0 480 260"
      width={480}
      height={260}
      title="List infographic"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const rows = canvasElement.querySelectorAll('[data-bbangto-viz-list-item]');
    await expect(rows.length).toBe(3);
    await expect(canvasElement.textContent).toContain('Type-checked contracts');
  },
};

// AnnotatedIllustration (VT-606) — caller 삽화 slot + CalloutLeader 주석
export const AnnotatedIllustrationBasic: Story = {
  render: () => (
    <AnnotatedIllustration
      data={{
        annotations: [
          { id: 'a', x: 120, y: 90, label: 'Lid', side: 'left' },
          { id: 'b', x: 200, y: 150, label: 'Body', side: 'right' },
          { id: 'c', x: 160, y: 220, label: 'Base', side: 'right' },
        ],
      }}
      illustration={<rect x={120} y={80} width={80} height={150} rx={8} data-viz-part="shape" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2 }} />}
      viewBox="0 0 420 300"
      width={420}
      height={300}
      title="Annotated illustration"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const callouts = canvasElement.querySelectorAll('[data-viz-callout-leader]');
    await expect(callouts.length).toBe(3);
    await expect(canvasElement.textContent).toContain('Body');
  },
};

// SwotMatrix (VT-703) — 강점/약점/기회/위협 4분면
export const SwotMatrixBasic: Story = {
  render: () => (
    <SwotMatrix
      data={{
        strengths: ['Brand', 'Team'],
        weaknesses: ['Cash flow'],
        opportunities: ['New market', 'Partnerships'],
        threats: ['Competition'],
      }}
      viewBox="0 0 440 360"
      width={440}
      height={360}
      title="SWOT"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const quads = canvasElement.querySelectorAll('[data-bbangto-viz-swot-quadrant]');
    await expect(quads.length).toBe(4);
    await expect(canvasElement.textContent).toContain('Strengths');
    await expect(canvasElement.textContent).toContain('New market');
  },
};

// OnionDiagram (VT-705) — 동심원 근접 레이어
export const OnionDiagramBasic: Story = {
  render: () => (
    <OnionDiagram
      data={{
        layers: [
          { id: 'core', label: 'Core' },
          { id: 'team', label: 'Team' },
          { id: 'org', label: 'Org' },
          { id: 'ext', label: 'External' },
        ],
      }}
      viewBox="0 0 400 400"
      width={400}
      height={400}
      title="Onion"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const rings = canvasElement.querySelectorAll('[data-bbangto-viz-onion-layer]');
    await expect(rings.length).toBe(4);
    await expect(canvasElement.textContent).toContain('Core');
    await expect(canvasElement.textContent).toContain('External');
  },
};

// Cycle flywheel 모드 (VT-708, 🔶→✅)
export const CycleFlywheel: Story = {
  render: () => (
    <Cycle
      mode="flywheel"
      data={{
        center: 'Growth',
        items: [{ label: 'Acquire' }, { label: 'Activate' }, { label: 'Retain' }, { label: 'Refer' }],
      }}
      viewBox="0 0 420 420"
      width={420}
      height={420}
      title="Flywheel"
    />
  ),
  play: async ({ canvasElement }) => {
    await expectVizPaintResolved(canvasElement);
    const nodes = canvasElement.querySelectorAll('[data-viz-cycle-node]');
    await expect(nodes.length).toBe(4);
    // 모멘텀: 커브 커넥터 = 노드 수(순환 폐쇄)
    const conns = canvasElement.querySelectorAll('[data-bbangto-viz-flywheel-arrow]');
    await expect(conns.length).toBe(4);
    const root = canvasElement.querySelector('[data-bbangto-viz-pattern="cycle"]')!;
    await expect(root.textContent).toContain('Growth');
  },
};
