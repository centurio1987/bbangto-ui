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
import { MATRIX_FIXTURES } from './_matrixFixtures';

/**
 * 템플릿 × 스타일 가이드 매트릭스 — headless 구조가 스타일 가이드 주입만으로
 * 서로 다른 시각 언어(계약 paint가 가이드별로 다르게 해석됨)를 얻는지 교차검증.
 *
 * - `PilotMatrix`   : 파일럿 3템플릿(Flowchart/Sequence/C4Container) × 전 가이드.
 *                     가이드-major 포커스 뷰.
 * - `ExpandedMatrix`: 그룹 전 축(G1~G5·P2·P3) 대표 24템플릿 × 전 가이드.
 *                     템플릿-major — 교차검증의 '템플릿 축'을 파일럿 밖으로 재스코핑(KAN-016).
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

// ────────────────────────────────────────────────────────────────────────
// ExpandedMatrix — 템플릿 축을 파일럿 밖 24종으로 재스코핑 (KAN-016)
// ────────────────────────────────────────────────────────────────────────

/** 가이드축 무결성용 — provider 엘리먼트의 foundation 토큰 var 결합(결정적). */
const GUIDE_VAR_KEYS = [
  '--bbangto-viz-canvas-bg',
  '--bbangto-viz-shape-fill',
  '--bbangto-viz-shape-stroke',
  '--bbangto-viz-edge-width',
  '--bbangto-viz-palette-p1',
];
const guideVarSig = (cell: HTMLElement): string => {
  const cs = getComputedStyle(cell);
  return GUIDE_VAR_KEYS.map((k) => cs.getPropertyValue(k).trim()).join('|');
};

/**
 * paintSig — 셀 SVG 내 모든 geometry mark의 렌더 paint 지문(bg 미포함).
 * data-attr 명명과 무관하게 bar/slice/line/node/edge를 일반 포착. 상한 60으로 비용 제한.
 */
const PAINT_MARK_SELECTOR = 'svg path, svg rect, svg circle, svg ellipse, svg polygon, svg line, svg polyline';
const paintSig = (cell: HTMLElement): string => {
  const marks = Array.from(cell.querySelectorAll<SVGElement>(PAINT_MARK_SELECTOR));
  const parts = marks.map((el) => {
    const cs = getComputedStyle(el);
    return `${cs.fill}~${cs.stroke}~${cs.strokeWidth}`;
  });
  parts.sort();
  return parts.slice(0, 60).join('|');
};

export const ExpandedMatrix: Story = {
  render: () => (
    <div className="expanded-matrix" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {MATRIX_FIXTURES.map((fx) => (
        <section key={fx.key} data-matrix-row={fx.key}>
          <h4 style={{ margin: '0 0 6px', fontSize: 13 }}>
            <span style={{ opacity: 0.55, marginRight: 8 }}>{fx.group}</span>
            {fx.label}
          </h4>
          <div className="matrix-guides" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {vizStyleGuideCatalog.map((sg) => (
              <VisualizationStyleGuideProvider
                key={sg.name}
                styleGuide={sg}
                className="matrix-cell"
                style={{ padding: 8 }}
              >
                {fx.render()}
              </VisualizationStyleGuideProvider>
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const guideCount = vizStyleGuideCatalog.length;

    // 1. fixture 가드 — key slug-safe·유일
    const keys = MATRIX_FIXTURES.map((f) => f.key);
    for (const k of keys) {
      await expect(k).toMatch(/^[a-z0-9-]+$/);
    }
    await expect(new Set(keys).size).toBe(keys.length);

    // 2. 행 수 == fixture 수 (SSOT)
    const rows = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-matrix-row]'));
    await expect(rows.length).toBe(MATRIX_FIXTURES.length);

    // 3. 행(=템플릿)마다 검증
    for (const row of rows) {
      const cells = Array.from(row.querySelectorAll<HTMLElement>('.matrix-cell'));
      await expect(cells.length).toBe(guideCount);

      const varSigs: string[] = [];
      const paintSigs: string[] = [];
      for (const cell of cells) {
        // 템플릿 1개가 렌더 + a11y title 보유
        const svgs = cell.querySelectorAll('svg[role="img"]');
        await expect(svgs.length).toBeGreaterThanOrEqual(1);
        const title = svgs[0]!.querySelector('title');
        await expect(title?.textContent?.trim() ?? '').not.toBe('');

        // 모든 shape/edge가 유효 paint 해석(검정 fallback 없음)
        await expectVizPaintResolved(cell);

        // paint 지문은 최소 1개 mark를 담아야 함(mark 방출 코드화)
        const sig = paintSig(cell);
        await expect(sig.length).toBeGreaterThan(0);

        varSigs.push(guideVarSig(cell));
        paintSigs.push(sig);
      }

      // 가이드축 무결성(행마다) — 전 가이드가 서로 다른 토큰 해석
      await expect(new Set(varSigs).size).toBe(guideCount);

      // 템플릿별 교차검증 — 같은 데이터가 최소 2가이드에서 다르게 paint(bg 제외)
      await expect(new Set(paintSigs).size).toBeGreaterThan(1);
    }
  },
};
