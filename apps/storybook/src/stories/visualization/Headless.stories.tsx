import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  Node,
  Edge,
  PersonNode,
  VisualizationStyleGuideProvider,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';

const meta = {
  title: 'VISUALIZATION/Headless',
  component: Canvas,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Canvas>;

export default meta;
type Story = StoryObj<typeof meta>;

const sg = blueprintTechnical01VizStyleGuide;

/**
 * headless 증명 — 컴포넌트는 리터럴 paint를 인라인으로 방출하지 않는다.
 * (전역 데코레이터의 Provider 아래에서도 인라인 style 검사로 성립.)
 * 기본 paint는 계약 스타일시트가 공급하며, blueprint 하 computed 값은
 * 구 리터럴 기본값(white/#111111/2.5)과 동일해야 한다(시각 무회귀).
 */
export const HeadlessProof: Story = {
  render: () => (
    <Canvas viewBox="0 0 400 200" width={400} height={200} title="Headless proof">
      <Node id="h1" x={20} y={60} width={120} height={60} shape="rect" />
      <Node id="h2" x={260} y={60} width={120} height={60} shape="rounded" />
      <Edge from="h1" to="h2" markerEnd="arrow" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const shape = canvasElement.querySelector<SVGElement>('[data-bbangto-viz-node-shape="rect"]');
    await expect(shape).not.toBeNull();

    // 1. 인라인 paint 부재 — prop 미지정 시 컴포넌트는 style에 fill/stroke를 쓰지 않는다.
    await expect(shape!.style.fill).toBe('');
    await expect(shape!.style.stroke).toBe('');
    await expect(shape!.style.strokeWidth).toBe('');

    // 2. 시맨틱 파트 속성 존재
    await expect(shape!.getAttribute('data-viz-part')).toBe('shape');

    // 3. computed 값 = 구 리터럴 기본값 (계약 스타일시트 경유 시각 무회귀)
    const cs = getComputedStyle(shape!);
    await expect(cs.fill).toBe('rgb(255, 255, 255)');
    await expect(cs.stroke).toBe('rgb(17, 17, 17)');
    await expect(parseFloat(cs.strokeWidth)).toBe(2.5);

    // 4. Edge도 동일 — 인라인 stroke 부재 + 계약 값 해석
    const edge = canvasElement.querySelector<SVGElement>('[data-bbangto-viz-edge]');
    await expect(edge).not.toBeNull();
    await expect(edge!.style.stroke).toBe('');
    const ecs = getComputedStyle(edge!);
    await expect(ecs.stroke).toBe('rgb(17, 17, 17)');
    await expect(parseFloat(ecs.strokeWidth)).toBe(2.5);

    // 5. 명시적 사용자 prop은 인라인 style로 계약 시트를 이긴다
  },
};

export const UserPropOverridesContract: Story = {
  render: () => (
    <Canvas viewBox="0 0 200 120" width={200} height={120} title="Override proof">
      <Node id="o1" x={20} y={30} width={120} height={60} shape="rect" fill="#87B79A" stroke="#EE7B4D" strokeWidth={4} />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const shape = canvasElement.querySelector<SVGElement>('[data-bbangto-viz-node-shape="rect"]');
    const cs = getComputedStyle(shape!);
    // SVG presentation attribute가 아니라 인라인 style로 매핑되어 계약 시트보다 우선한다
    await expect(cs.fill).toBe('rgb(135, 183, 154)');
    await expect(cs.stroke).toBe('rgb(238, 123, 77)');
    await expect(parseFloat(cs.strokeWidth)).toBe(4);
  },
};

/**
 * 다중 Provider 공존 — 서로 다른 색 스킴의 Provider가 한 화면에서 상호 오염 없이
 * 렌더되고, 각 Canvas의 SVG <defs> 마커 id가 DOM 전역에서 고유해야 한다.
 */
export const MultiProviderCoexistence: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <VisualizationStyleGuideProvider className="coexist-a" styleGuide={sg}>
        <Canvas viewBox="0 0 300 140" width={300} height={140} title="A">
          <Node id="a1" x={10} y={40} width={100} height={50} />
          <Node id="a2" x={180} y={40} width={100} height={50} />
          <Edge from="a1" to="a2" markerEnd="arrow" />
        </Canvas>
      </VisualizationStyleGuideProvider>
      <VisualizationStyleGuideProvider className="coexist-b" styleGuide={sg} foundationKey="whiteprint">
        <Canvas viewBox="0 0 300 140" width={300} height={140} title="B">
          <Node id="b1" x={10} y={40} width={100} height={50} />
          <Node id="b2" x={180} y={40} width={100} height={50} />
          <Edge from="b1" to="b2" markerEnd="arrow" />
        </Canvas>
      </VisualizationStyleGuideProvider>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const a = canvasElement.querySelector('.coexist-a')!;
    const b = canvasElement.querySelector('.coexist-b')!;

    // 색 스킴 오염 없음 — 같은 계약 시트, 다른 var 스코프
    const strokeOf = (root: Element) =>
      getComputedStyle(root.querySelector('[data-bbangto-viz-node-shape]')!).stroke;
    await expect(strokeOf(a)).toBe('rgb(17, 17, 17)');
    await expect(strokeOf(b)).toBe('rgb(234, 241, 255)');

    // defs 마커 id는 문서 전역 고유 (Canvas별 useId 네임스페이스)
    const ids = Array.from(canvasElement.querySelectorAll('marker[id]')).map((m) => m.id);
    await expect(ids.length).toBeGreaterThan(0);
    await expect(new Set(ids).size).toBe(ids.length);

    // 각 Edge의 marker-end는 자기 Canvas의 uid를 참조
    for (const root of [a, b]) {
      const svg = root.querySelector('[data-bbangto-viz-canvas]')!;
      const uid = svg.getAttribute('data-bbangto-viz-canvas-uid')!;
      const edge = root.querySelector('[data-bbangto-viz-edge]')!;
      const markerEnd = getComputedStyle(edge).markerEnd;
      await expect(markerEnd).toContain(uid);
    }
  },
};

/** 시맨틱 몰리큘 — 인라인 var 참조는 허용되나 리터럴 hex는 금지. */
export const MoleculeNoLiteralPaint: Story = {
  render: () => (
    <Canvas viewBox="0 0 200 140" width={200} height={140} title="Molecule headless">
      <PersonNode id="p1" x={30} y={10} width={140} height={110} title="User" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const mol = canvasElement.querySelector('[data-bbangto-viz-molecule="person"]')!;
    // 몰리큘 내부의 모든 인라인 paint는 var() 참조거나 구조값(none)이어야 한다
    const els = mol.querySelectorAll<SVGElement>('*');
    for (const el of Array.from(els)) {
      for (const propName of ['fill', 'stroke'] as const) {
        const v = el.style[propName];
        if (v && v !== 'none') {
          await expect(v.startsWith('var(--bbangto-viz-')).toBe(true);
        }
      }
    }
    // blueprint 하 person fill 해석 확인
    const shape = mol.querySelector('[data-bbangto-viz-node-shape]')!;
    await expect(getComputedStyle(shape).fill).toBe('rgb(197, 182, 238)');
  },
};
