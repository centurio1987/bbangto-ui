import type { Meta, StoryObj } from '@storybook/react';
import {
  VisualizationStyleGuideProvider,
  visualizationFoundationToStyleObject,
  resolveVizFoundationPreset,
  vvar,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'VISUALIZATION/Provider',
  component: VisualizationStyleGuideProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof VisualizationStyleGuideProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

const sg = blueprintTechnical01VizStyleGuide;

export const Blueprint: Story = {
  args: { styleGuide: sg, children: null },
  render: () => (
    <VisualizationStyleGuideProvider styleGuide={sg}>
      <div
        data-testid="viz-content"
        style={{ padding: 16, fontFamily: 'monospace', fontSize: 13 }}
      >
        Blueprint_Technical_01 active — CSS vars injected on parent element.
      </div>
    </VisualizationStyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. 스타일 가이드 루트 + 활성 foundation 속성
    const provider = canvasElement.querySelector(
      '[data-bbangto-viz-style-guide="blueprint-technical-01"]',
    );
    await expect(provider).not.toBeNull();
    await expect(provider!.getAttribute('data-bbangto-viz-foundation')).toBe('default');

    // 2. --bbangto-viz-node-person-fill = blueprint palette p2 (#C5B6EE) — 승격 후 값 보존 증명
    const style = getComputedStyle(provider!);
    await expect(style.getPropertyValue('--bbangto-viz-node-person-fill').trim()).toBe('#C5B6EE');

    // 3. 토큰 케이싱 패리티: flattenToCSSVars 출력과 vvar() 키 생성 일치
    const vars = visualizationFoundationToStyleObject(sg.foundations);
    await expect(vars['--bbangto-viz-canvas-grid-unit']).toBe('8');
    await expect(vvar('canvas', 'gridUnit')).toBe('var(--bbangto-viz-canvas-grid-unit)');

    await expect(vars['--bbangto-viz-node-person-keyline-width']).toBe('2.5');
    await expect(vvar('node', 'person', 'keylineWidth')).toBe(
      'var(--bbangto-viz-node-person-keyline-width)',
    );

    await expect(vars['--bbangto-viz-boundary-dash-pattern']).toBe('8 6');
    await expect(vvar('boundary', 'dashPattern')).toBe('var(--bbangto-viz-boundary-dash-pattern)');

    await expect(vars['--bbangto-viz-c4-l1-border-width']).toBe('3');
    await expect(vvar('c4', 'l1', 'borderWidth')).toBe('var(--bbangto-viz-c4-l1-border-width)');

    await canvas.findByTestId('viz-content');
  },
};

export const FoundationPresetResolution: Story = {
  args: { styleGuide: sg, children: null },
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <VisualizationStyleGuideProvider className="preset-case" styleGuide={sg}>
        <div data-testid="preset-default" style={{ padding: 8 }}>default</div>
      </VisualizationStyleGuideProvider>
      <VisualizationStyleGuideProvider className="preset-case" styleGuide={sg} foundationKey="whiteprint">
        <div data-testid="preset-whiteprint" style={{ padding: 8 }}>whiteprint</div>
      </VisualizationStyleGuideProvider>
      <VisualizationStyleGuideProvider className="preset-case" styleGuide={sg} foundationKey="__nonexistent__">
        <div data-testid="preset-fallback" style={{ padding: 8 }}>fallback</div>
      </VisualizationStyleGuideProvider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    // resolveVizFoundationPreset 순수함수 규칙
    const def = resolveVizFoundationPreset(sg);
    await expect(def.activeKey).toBe('default');
    // 첫 preset foundations는 base와 동일 객체 참조(카탈로그 불변식)
    await expect(def.foundations).toBe(sg.foundations);

    const wp = resolveVizFoundationPreset(sg, 'whiteprint');
    await expect(wp.activeKey).toBe('whiteprint');
    await expect(wp.foundations.canvas.bg).toBe('#152238');

    // 잘못된 key → default로 fallback
    const bad = resolveVizFoundationPreset(sg, '__nonexistent__');
    await expect(bad.activeKey).toBe('default');

    // DOM: preset별 var 주입이 서로 독립 (전역 데코레이터 Provider 제외 — 스토리 내부 3개만)
    const roots = canvasElement.querySelectorAll('.preset-case[data-bbangto-viz-style-guide]');
    await expect(roots.length).toBe(3);
    const bgOf = (el: Element) =>
      getComputedStyle(el).getPropertyValue('--bbangto-viz-canvas-bg').trim();
    await expect(bgOf(roots[0])).toBe('#F9F8F6');
    await expect(bgOf(roots[1])).toBe('#152238');
    await expect(bgOf(roots[2])).toBe('#F9F8F6');
    await expect(roots[2].getAttribute('data-bbangto-viz-foundation')).toBe('default');
  },
};
