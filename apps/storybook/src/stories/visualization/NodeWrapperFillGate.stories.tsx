import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  Node,
  VisualizationStyleGuideProvider,
  useVizWrapperComponent,
  vvar,
} from '@centurio1987/bbangto-ui-visualization';
import type { NodeProps } from '@centurio1987/bbangto-ui-visualization';
import { vizStyleGuideCatalog } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { compositeOver, contrastRatio, parseColor } from '@centurio1987/bbangto-ui-tokens';
import { expect } from 'storybook/test';

/**
 * Node 래퍼 면 색 게이트 (KAN-083) — 프리셋의 Node 래퍼에 fill · stroke 를 넘기면 그 색으로 칠해지는가.
 *
 * README 구현 규약의 「명시한 prop 이 이긴다」를 프리셋 래퍼까지 넓힌 것이다. 래퍼가 넘겨받은 색을 버리면
 * 소비자(publish-report 조립층처럼 면을 골라 칠하는 쪽)가 그 위에 한 겹 덧칠해야 하고, 덧칠은 래퍼 모양을 덮는다.
 * 카탈로그 가이드마다 Node 하나를 래퍼로 그리고, shape 요소(`data-viz-part="shape"`) 가운데 넘긴 fill · stroke 로
 * 계산되는 것이 있는지 잰다. 첫 요소만 보지 않는 것은 래퍼가 그림자 · 테 같은 장식 층을 노드 앞에 그리기 때문이다
 * (colorful-flat 의 오프셋 그림자 등). 색을 넘기지 않았을 때 가이드가 칠하는 것은 Paint Gate 의 몫이라 여기서는 안 본다.
 */
const FILL = '#123456';
const STROKE = '#654321';

function WrappedNode(props: NodeProps) {
  const Resolved = useVizWrapperComponent<NodeProps>('Node', Node);
  return <Resolved {...props} />;
}

const meta = {
  title: 'VISUALIZATION/Templates/Node Wrapper Fill Gate',
  tags: ['autodocs'],
  // 검사 전용 화면이다. 그림 30장이 같은 모양이라 axe 검사로 더 알 것이 없다.
  parameters: { layout: 'padded', a11y: { test: 'off' } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const rgb = (value: string): string => {
  const c = parseColor(value);
  return c ? `${c.r},${c.g},${c.b}` : value;
};

export const NodeWrapperFillGate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {vizStyleGuideCatalog.map((sg) => (
        <div key={sg.name} data-gate-guide={sg.name}>
          <VisualizationStyleGuideProvider styleGuide={sg} fonts="none">
            <Canvas viewBox="0 0 160 80" width={160} height={80} title={`${sg.name} Node 면 색`}>
              <WrappedNode id="n" x={20} y={12} width={120} height={56} fill={FILL} stroke={STROKE} />
            </Canvas>
          </VisualizationStyleGuideProvider>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const boxes = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-gate-guide]'));
    await expect(boxes.length).toBe(vizStyleGuideCatalog.length);
    const wrong: string[] = [];
    for (const box of boxes) {
      const name = box.dataset.gateGuide;
      const shapes = Array.from(box.querySelectorAll<SVGElement>('[data-viz-part="shape"]')).map((el) => getComputedStyle(el));
      if (!shapes.length) {
        wrong.push(`${name}: shape 요소 없음`);
        continue;
      }
      if (!shapes.some((cs) => rgb(cs.fill) === rgb(FILL))) wrong.push(`${name} fill: ${shapes.map((cs) => cs.fill).join(' | ')}`);
      if (!shapes.some((cs) => rgb(cs.stroke) === rgb(STROKE))) wrong.push(`${name} stroke: ${shapes.map((cs) => cs.stroke).join(' | ')}`);
    }
    await expect(wrong).toEqual([]);
  },
};

/**
 * 진한 면 글자색 게이트 (KAN-083) — 도형 선 색(`shape.stroke`)으로 칠한 면 위에 `vvar('on', 'shape', 'stroke')` 로 쓴 글자가
 * 가이드 전부(preset 포함)에서 4.5:1 을 넘는가. 단위 시험(카탈로그 `onInk.test.ts`)은 토큰 값으로 재고, 여기서는 Provider 가
 * 실제로 낸 CSS 변수를 브라우저가 계산한 색으로 잰다. 변수가 비면 글자는 SVG 기본값(검정)으로 칠해져 여기서 걸린다.
 */
const targets = vizStyleGuideCatalog.flatMap((sg) =>
  (sg.foundationPresets?.length ? sg.foundationPresets.map((p) => p.key) : [undefined]).map((key) => ({ sg, key })),
);

export const StrongFaceInkGate: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {targets.map(({ sg, key }) => (
        <div key={`${sg.name}/${key ?? ''}`} data-gate-face={`${sg.name}/${key ?? 'default'}`}>
          <VisualizationStyleGuideProvider styleGuide={sg} foundationKey={key} fonts="none">
            <Canvas viewBox="0 0 160 48" width={160} height={48} title={`${sg.name} 진한 면 글자`}>
              <rect data-gate-part="face" x={0} y={0} width={160} height={48} style={{ fill: vvar('shape', 'stroke') }} />
              <text data-gate-part="ink" x={12} y={30} fontSize={14} style={{ fill: vvar('on', 'shape', 'stroke') }}>
                진한 면 글자
              </text>
            </Canvas>
          </VisualizationStyleGuideProvider>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const boxes = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-gate-face]'));
    await expect(boxes.length).toBe(targets.length);
    const white = { r: 255, g: 255, b: 255, a: 1 };
    const wrong: string[] = [];
    for (const box of boxes) {
      const name = box.dataset.gateFace;
      const svg = box.querySelector<SVGSVGElement>('svg')!;
      const vars = getComputedStyle(svg);
      const bg = parseColor(vars.getPropertyValue('--bbangto-viz-canvas-bg').trim());
      const canvas = bg ? compositeOver(bg, white) : white;
      const face = parseColor(getComputedStyle(box.querySelector('[data-gate-part="face"]')!).fill);
      const ink = parseColor(getComputedStyle(box.querySelector('[data-gate-part="ink"]')!).fill);
      if (!vars.getPropertyValue('--bbangto-viz-on-shape-stroke').trim()) wrong.push(`${name}: --bbangto-viz-on-shape-stroke 없음`);
      if (!face || !ink) {
        wrong.push(`${name}: 색을 읽지 못함`);
        continue;
      }
      const r = contrastRatio(compositeOver(ink, canvas), compositeOver(face, canvas));
      if (r === null || r < 4.5) wrong.push(`${name}: ${r?.toFixed(2)}`);
    }
    await expect(wrong).toEqual([]);
  },
};
