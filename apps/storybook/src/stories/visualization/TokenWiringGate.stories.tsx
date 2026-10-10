import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Boundary,
  C4Box,
  Canvas,
  GridLayer,
  VisualizationStyleGuideProvider,
  type VisualizationFoundation,
  type VisualizationStyleGuide,
} from '@centurio1987/bbangto-ui-visualization';
import {
  blueprintTechnical01VizStyleGuide,
  vizStyleGuideCatalog,
} from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';

/**
 * 토큰 잇기 게이트 — 스타일 가이드가 적은 경계선·C4 테두리·화살촉·격자 값이 그림에 그대로 나오는가 (KAN-069).
 *
 * 이 넷은 한때 선언만 있고 그림 코드가 안 읽었다. 컴포넌트가 자기 상수(경계 `'8 6'`·1.5·8, C4 3·2·1.4,
 * 화살촉 8, 격자 8)로 그렸고, 그래서 카탈로그 가이드가 다른 값을 적어도 그림이 안 바뀌었다.
 * blueprint 에서 그 값만 상수와 겹치지 않게 바꾼 가이드 아래에서 그리고, 계산된 값으로 잰다.
 * 선언한 잎이 모두 읽히는지는 viz 단위 테스트 `tokens/tokenUsage.test.ts` 가 따로 본다.
 */
const meta = {
  title: 'VISUALIZATION/Templates/Token Wiring Gate',
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ────────────────────────────────────────────────────────────────────────
// 값을 바꾼 가이드
// ────────────────────────────────────────────────────────────────────────

const sg = blueprintTechnical01VizStyleGuide;

const withFoundation = (
  name: string,
  patch: (f: VisualizationFoundation) => VisualizationFoundation,
): VisualizationStyleGuide => ({
  ...sg,
  name: `${sg.name}-${name}`,
  foundations: patch(sg.foundations),
  foundationPresets: sg.foundationPresets?.map((p) => ({ ...p, foundations: patch(p.foundations) })),
});

const BOUNDARY = { dashPattern: '3 2', width: 2.5, radius: 14 };
const WIRED_GUIDE = withFoundation('token-wiring', (f) => ({
  ...f,
  boundary: { ...f.boundary, ...BOUNDARY },
  c4: {
    l1: { ...f.c4.l1, borderWidth: 4 },
    l2: { ...f.c4.l2, borderWidth: 3 },
    l3: { ...f.c4.l3, borderWidth: 2 },
  },
  edge: { ...f.edge, marker: { ...f.edge.marker, size: 12 } },
  canvas: { ...f.canvas, gridUnit: 16 },
}));
const SOLID_GUIDE = withFoundation('token-wiring-solid', (f) => ({
  ...f,
  boundary: { ...f.boundary, dashPattern: '' },
}));

/** 가이드 대시 문자열 → 계산된 `stroke-dasharray` (`'3 2'` → `'3px, 2px'`, `''` → `'none'`). */
const computedDash = (dash: string): string => {
  const parts = dash.trim().split(/[\s,]+/).filter(Boolean);
  return parts.length === 0 ? 'none' : parts.map((n) => `${n}px`).join(', ');
};

const frameOf = (root: Element, key: string) =>
  root.querySelector<SVGRectElement>(`[data-wiring="${key}"] [data-bbangto-viz-boundary] rect`)!;
const labelOf = (root: Element, key: string) =>
  root.querySelector<SVGTextElement>(`[data-wiring="${key}"] [data-bbangto-viz-boundary-label]`)!;

const BoundaryCell = ({ k, children }: { k: string; children: ReactNode }) => (
  <g data-wiring={k}>{children}</g>
);

// ────────────────────────────────────────────────────────────────────────
// ① 경계선 — 가이드 값을 따르고, 적은 prop 이 가이드를 이긴다
// ────────────────────────────────────────────────────────────────────────

export const BoundaryFollowsGuide: Story = {
  render: () => (
    <VisualizationStyleGuideProvider styleGuide={WIRED_GUIDE} style={{ padding: 8 }}>
      <Canvas viewBox="0 0 520 140" width={520} height={140} title="경계선 토큰">
        <BoundaryCell k="guide">
          <Boundary x={20} y={30} width={150} height={90} label="Guide" labelPlacement="outside" />
        </BoundaryCell>
        <BoundaryCell k="prop">
          <Boundary x={200} y={30} width={150} height={90} dashPattern="1 1" strokeWidth={5} radius={0} />
        </BoundaryCell>
        <BoundaryCell k="on-line">
          <Boundary x={380} y={30} width={120} height={90} label="Halo" />
        </BoundaryCell>
      </Canvas>
    </VisualizationStyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    const guide = frameOf(canvasElement, 'guide');
    await expect(getComputedStyle(guide).strokeDasharray).toBe(computedDash(BOUNDARY.dashPattern));
    await expect(getComputedStyle(guide).strokeWidth).toBe(`${BOUNDARY.width}px`);
    await expect(guide.getAttribute('rx')).toBe(String(BOUNDARY.radius));

    // 바깥 라벨은 선 두께의 절반 + 3 만큼 비킨다 — 가이드 두께로 계산해야 한다
    const label = labelOf(canvasElement, 'guide');
    await expect(Number(label.getAttribute('y'))).toBeCloseTo(30 - 11 / 2 - (BOUNDARY.width / 2 + 3), 5);

    // 적은 prop 은 가이드를 이긴다
    const prop = frameOf(canvasElement, 'prop');
    await expect(getComputedStyle(prop).strokeDasharray).toBe('1px, 1px');
    await expect(getComputedStyle(prop).strokeWidth).toBe('5px');
    await expect(prop.getAttribute('rx')).toBe('0');

    // 선 위 라벨의 halo 는 선을 끊을 만큼 두껍다(기본 3 이상, 선 두께 이상)
    const halo = labelOf(canvasElement, 'on-line');
    await expect(parseFloat(getComputedStyle(halo).strokeWidth)).toBeGreaterThanOrEqual(Math.max(3, BOUNDARY.width));
  },
};

// ────────────────────────────────────────────────────────────────────────
// ② 실선 가이드를 대시 가이드 안에 겹쳐도 안쪽은 실선이다
// ────────────────────────────────────────────────────────────────────────

export const SolidGuideInsideDashed: Story = {
  render: () => (
    <VisualizationStyleGuideProvider styleGuide={WIRED_GUIDE} style={{ padding: 8 }}>
      <Canvas viewBox="0 0 200 120" width={200} height={120} title="바깥 대시 가이드">
        <BoundaryCell k="outer">
          <Boundary x={20} y={20} width={160} height={80} />
        </BoundaryCell>
      </Canvas>
      <VisualizationStyleGuideProvider styleGuide={SOLID_GUIDE} style={{ padding: 8 }}>
        <Canvas viewBox="0 0 200 120" width={200} height={120} title="안쪽 실선 가이드">
          <BoundaryCell k="inner">
            <Boundary x={20} y={20} width={160} height={80} />
          </BoundaryCell>
        </Canvas>
      </VisualizationStyleGuideProvider>
    </VisualizationStyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(frameOf(canvasElement, 'outer')).strokeDasharray).toBe(
      computedDash(BOUNDARY.dashPattern),
    );
    await expect(getComputedStyle(frameOf(canvasElement, 'inner')).strokeDasharray).toBe('none');
  },
};

// ────────────────────────────────────────────────────────────────────────
// ③ C4 테두리 · 화살촉 · 격자
// ────────────────────────────────────────────────────────────────────────

export const C4MarkerGridFollowGuide: Story = {
  render: () => (
    <VisualizationStyleGuideProvider styleGuide={WIRED_GUIDE} style={{ padding: 8 }}>
      <Canvas viewBox="0 0 520 140" width={520} height={140} title="C4 테두리와 화살촉 토큰">
        <C4Box x={10} y={20} width={150} height={90} level="l1" title="L1" />
        <C4Box x={180} y={20} width={150} height={90} level="l2" title="L2" />
        <C4Box x={350} y={20} width={150} height={90} level="l3" title="L3" />
      </Canvas>
      <Canvas viewBox="0 0 64 32" width={64} height={32} title="격자 토큰">
        <GridLayer width={64} height={32} />
      </Canvas>
    </VisualizationStyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    const widths = (['l1', 'l2', 'l3'] as const).map((l) => {
      const shape = canvasElement.querySelector(`[data-bbangto-viz-c4-box="${l}"] [data-viz-part="shape"]`)!;
      return getComputedStyle(shape).strokeWidth;
    });
    await expect(widths).toEqual(['4px', '3px', '2px']);

    const arrow = canvasElement.querySelector('svg[data-bbangto-viz-canvas] marker[id$="-arrow"]')!;
    await expect(arrow.getAttribute('markerWidth')).toBe('12');

    const verticals = Array.from(canvasElement.querySelectorAll('[data-bbangto-viz-grid] line')).filter(
      (l) => l.getAttribute('x1') === l.getAttribute('x2'),
    );
    await expect(Number(verticals[1].getAttribute('x1')) - Number(verticals[0].getAttribute('x1'))).toBe(16);
  },
};

// ────────────────────────────────────────────────────────────────────────
// ④ 카탈로그 전수 — 가이드마다 경계선이 그 가이드 값으로 그려진다
// ────────────────────────────────────────────────────────────────────────

export const CatalogBoundaries: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 8 }}>
      {vizStyleGuideCatalog.map((g) => (
        <VisualizationStyleGuideProvider key={g.name} styleGuide={g} style={{ padding: 4 }}>
          <Canvas viewBox="0 0 170 80" width={170} height={80} title={`${g.name} 경계선`}>
            <BoundaryCell k={g.name}>
              <Boundary x={10} y={16} width={150} height={56} label={g.name} />
            </BoundaryCell>
          </Canvas>
        </VisualizationStyleGuideProvider>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(vizStyleGuideCatalog.length).toBeGreaterThanOrEqual(30);
    const mismatched: string[] = [];
    for (const g of vizStyleGuideCatalog) {
      // Provider 의 활성 foundation 은 기본 preset 이다
      const key = g.defaultFoundationKey ?? g.foundationPresets?.[0]?.key;
      const b = (g.foundationPresets?.find((p) => p.key === key)?.foundations ?? g.foundations).boundary;
      const rect = frameOf(canvasElement, g.name);
      const got = {
        dash: getComputedStyle(rect).strokeDasharray,
        width: getComputedStyle(rect).strokeWidth,
        rx: rect.getAttribute('rx'),
      };
      const want = { dash: computedDash(b.dashPattern), width: `${b.width}px`, rx: String(b.radius) };
      if (JSON.stringify(got) !== JSON.stringify(want)) {
        mismatched.push(`${g.name}: ${JSON.stringify(got)} ≠ ${JSON.stringify(want)}`);
      }
    }
    await expect(mismatched).toEqual([]);
  },
};
