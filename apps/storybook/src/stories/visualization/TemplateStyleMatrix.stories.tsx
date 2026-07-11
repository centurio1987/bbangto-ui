import type { Meta, StoryObj } from '@storybook/react';
import {
  Flowchart,
  SequenceDiagram,
  C4ContainerDiagram,
  VisualizationStyleGuideProvider,
} from '@centurio1987/bbangto-ui-visualization';
import {
  vizStyleGuideCatalog,
} from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect } from 'storybook/test';
import { expectVizPaintResolved } from './_paintGate';

/**
 * 파일럿 템플릿 3종 × 카탈로그 스타일 가이드 3종 매트릭스.
 * headless 구조가 스타일 가이드 주입만으로 서로 다른 시각 언어를 얻는지 검증한다.
 */
const meta = {
  title: 'VISUALIZATION/Templates/Style Matrix',
  component: Flowchart,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Flowchart>;

export default meta;
type Story = StoryObj<typeof meta>;

const FLOW_NODES = [
  { id: 'a', x: 30, y: 30, width: 110, height: 50, label: 'Start', shape: 'stadium' as const },
  { id: 'b', x: 200, y: 30, width: 110, height: 50, label: 'Work', shape: 'rect' as const },
  { id: 'c', x: 370, y: 30, width: 110, height: 50, label: 'Done', shape: 'stadium' as const },
];
const FLOW_EDGES = [
  { id: 'e1', from: 'a', to: 'b' },
  { id: 'e2', from: 'b', to: 'c' },
];

const SEQ = {
  participants: [
    { id: 'ui', name: 'Client', x: 40 },
    { id: 'api', name: 'API', x: 220 },
  ],
  messages: [
    { id: 'm1', from: 'ui', to: 'api', label: 'request()', y: 90 },
    { id: 'm2', from: 'api', to: 'ui', label: 'response', y: 130, kind: 'return' as const },
  ],
};

const C4 = {
  containers: [
    { id: 'web', x: 30, y: 40, width: 150, height: 90, name: 'Web App', technology: 'React' },
    { id: 'db', x: 260, y: 40, width: 150, height: 90, name: 'Store', technology: 'SQL' },
  ],
  relationships: [{ id: 'r1', from: 'web', to: 'db', label: 'reads' }],
};

export const PilotMatrix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {vizStyleGuideCatalog.map((sg) => (
        <VisualizationStyleGuideProvider
          key={sg.name}
          styleGuide={sg}
          className="matrix-cell"
          style={{ padding: 16 }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: 14 }}>{sg.name}</h3>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Flowchart
              data={{ nodes: FLOW_NODES, edges: FLOW_EDGES }}
              viewBox="0 0 510 110"
              width={510}
              height={110}
              title={`Flowchart under ${sg.name}`}
            />
            <SequenceDiagram
              data={SEQ}
              viewBox="0 0 340 180"
              width={340}
              height={180}
              title={`Sequence under ${sg.name}`}
            />
            <C4ContainerDiagram
              data={C4}
              viewBox="0 0 440 170"
              width={440}
              height={170}
              title={`C4 container under ${sg.name}`}
            />
          </div>
        </VisualizationStyleGuideProvider>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const cells = canvasElement.querySelectorAll<HTMLElement>('.matrix-cell');
    await expect(cells.length).toBe(vizStyleGuideCatalog.length);

    // 가이드별 var 해석이 서로 달라야 함 — canvas bg + shape stroke 스냅샷 유니크
    const snapshots = Array.from(cells).map((cell) => {
      const cs = getComputedStyle(cell);
      return [
        cs.getPropertyValue('--bbangto-viz-canvas-bg').trim(),
        cs.getPropertyValue('--bbangto-viz-shape-stroke').trim(),
        cs.getPropertyValue('--bbangto-viz-edge-width').trim(),
      ].join('|');
    });
    await expect(new Set(snapshots).size).toBe(snapshots.length);

    // 각 셀에서 파일럿 3 템플릿이 전부 렌더 + paint 해석
    for (const cell of Array.from(cells)) {
      await expect(cell.querySelectorAll('svg[role="img"]').length).toBe(3);
      await expectVizPaintResolved(cell);
    }

    // 동일 구조(같은 데이터)임에도 계약 paint가 가이드별로 다르게 해석됨을 실측
    const strokeOf = (cell: HTMLElement) =>
      getComputedStyle(cell.querySelector('[data-bbangto-viz-edge]')!).stroke;
    const strokes = new Set(Array.from(cells).map(strokeOf));
    await expect(strokes.size).toBeGreaterThan(1);
  },
};
