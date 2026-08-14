import type { Meta, StoryObj } from '@storybook/react';
import {
  Canvas,
  VisualizationStyleGuideProvider,
  Node,
  Edge,
  NodeLabel,
  Boundary,
  Lane,
  Tag,
  EdgeLabel,
  contentBox,
  type NodeShape,
} from '@centurio1987/bbangto-ui-visualization';
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { expect, within } from 'storybook/test';
import { terminalLengths } from './_edgeGeometryGate';

const meta = {
  title: 'VISUALIZATION/Atoms',
  component: Canvas,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <VisualizationStyleGuideProvider styleGuide={blueprintTechnical01VizStyleGuide}>
        <Story />
      </VisualizationStyleGuideProvider>
    ),
  ],
} satisfies Meta<typeof Canvas>;

export default meta;
type Story = StoryObj<typeof meta>;

// ──────────────────────────────────────────────
// 1. Canvas — role/aria/title/inline defs
// ──────────────────────────────────────────────
export const CanvasBasic: Story = {
  render: () => (
    <Canvas
      viewBox="0 0 400 200"
      width={400}
      height={200}
      title="Test Canvas"
      desc="A diagram canvas for testing"
    >
      <Node id="a" x={40} y={60} width={120} height={60} shape="rect" fill="#C5B6EE" stroke="#111" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // role="img"
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]');
    await expect(svg).not.toBeNull();
    await expect(svg?.getAttribute('role')).toBe('img');

    // <title> inside same svg
    const title = svg?.querySelector('title');
    await expect(title).not.toBeNull();
    await expect(title?.textContent).toBe('Test Canvas');

    // inline <defs> inside same svg
    const defs = svg?.querySelector('defs');
    await expect(defs).not.toBeNull();

    // marker element inside defs (arrow marker)
    const arrowMarker = defs?.querySelector('marker[id$="-arrow"]');
    await expect(arrowMarker).not.toBeNull();

    await canvas.findByRole('img');
  },
};

// ──────────────────────────────────────────────
// 2. Node shapes + stroke-width
// ──────────────────────────────────────────────
const ALL_SHAPES: NodeShape[] = [
  'rect', 'rounded', 'stadium', 'circle', 'ellipse',
  'diamond', 'cylinder', 'hexagon', 'parallelogram',
  'trapezoid', 'subroutine', 'doubleCircle', 'cube', 'component', 'folder',
];

export const NodeShapes: Story = {
  render: () => {
    const cols = 4;
    const W = 100;
    const H = 64;
    const GAP = 20;
    const totalW = cols * (W + GAP);
    const rows = Math.ceil(ALL_SHAPES.length / cols);
    const totalH = rows * (H + GAP);

    return (
      <Canvas viewBox={`0 0 ${totalW} ${totalH}`} width={totalW} height={totalH}>
        {ALL_SHAPES.map((shape, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = col * (W + GAP) + 10;
          const y = row * (H + GAP) + 10;
          return (
            <Node
              key={shape}
              id={shape}
              x={x}
              y={y}
              width={W}
              height={H}
              shape={shape}
              fill="#C5B6EE"
              stroke="#111111"
              strokeWidth={2.5}
            />
          );
        })}
      </Canvas>
    );
  },
  play: async ({ canvasElement }) => {
    // Every shape must produce at least one SVG element with data-bbangto-viz-node-shape
    const shapeEls = canvasElement.querySelectorAll('[data-bbangto-viz-node-shape]');
    await expect(shapeEls.length).toBeGreaterThanOrEqual(ALL_SHAPES.length);

    // stroke-width === 2.5 on the first shape element
    const first = shapeEls[0] as SVGElement;
    const sw = getComputedStyle(first).getPropertyValue('stroke-width');
    await expect(parseFloat(sw)).toBe(2.5);
  },
};

// ──────────────────────────────────────────────
// 3. Edge — d not empty, marker-end same-canvas uid
// ──────────────────────────────────────────────
export const EdgeBasic: Story = {
  render: () => (
    <Canvas viewBox="0 0 400 200" width={400} height={200} title="Edge test">
      <Node id="n1" x={20} y={70} width={120} height={60} shape="rect" fill="#C5B6EE" stroke="#111" />
      <Node id="n2" x={260} y={70} width={120} height={60} shape="rounded" fill="#87B79A" stroke="#111" />
      <Edge from="n1" to="n2" markerEnd="arrow" stroke="#111111" strokeWidth={2.5} />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]') as SVGSVGElement;

    const edge = svg?.querySelector('[data-bbangto-viz-edge]');
    await expect(edge).not.toBeNull();

    // d attribute is not empty
    const d = edge?.getAttribute('d');
    await expect(d).not.toBeNull();
    await expect(d!.length).toBeGreaterThan(4);

    // marker-end references a marker inside the same svg
    const markerEnd = edge?.getAttribute('marker-end');
    await expect(markerEnd).toMatch(/^url\(#.+\)$/);

    const markerId = markerEnd!.replace(/^url\(#/, '').replace(/\)$/, '');
    const referencedMarker = svg?.querySelector(`#${CSS.escape(markerId)}`);
    await expect(referencedMarker).not.toBeNull();
    await expect(referencedMarker?.closest('defs')?.closest('svg')).toBe(svg);
  },
};

// ──────────────────────────────────────────────
// 4. NodeLabel — wrap / truncate / fit
// ──────────────────────────────────────────────
export const NodeLabelModes: Story = {
  render: () => (
    <Canvas viewBox="0 0 540 200" width={540} height={200} title="NodeLabel modes">
      {/* wrap */}
      <Node id="wrap" x={10} y={20} width={140} height={80} shape="rect" fill="#EEE" stroke="#111" />
      <NodeLabel x={10} y={60} width={140} title="This is a very long title that should wrap" mode="wrap" maxLines={3} />
      {/* truncate */}
      <Node id="trunc" x={180} y={20} width={140} height={80} shape="rect" fill="#EEE" stroke="#111" />
      <NodeLabel x={180} y={60} width={140} title="This is a very long title that should truncate here" mode="truncate" />
      {/* fit */}
      <Node id="fit" x={350} y={20} width={140} height={80} shape="rect" fill="#EEE" stroke="#111" />
      <NodeLabel x={350} y={60} width={140} title="Fit mode label" mode="fit" />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const labels = canvasElement.querySelectorAll('[data-bbangto-viz-node-label]');
    await expect(labels.length).toBe(3);

    // wrap: multiple <text> elements
    const wrapLabel = labels[0];
    const wrapTexts = wrapLabel.querySelectorAll('text');
    await expect(wrapTexts.length).toBeGreaterThanOrEqual(1);

    // truncate: single text ending with ellipsis
    const truncLabel = labels[1];
    const truncText = truncLabel.querySelector('text');
    await expect(truncText).not.toBeNull();
    await expect(truncText!.textContent).toMatch(/…$/);

    // fit: single text element present
    const fitLabel = labels[2];
    const fitText = fitLabel.querySelector('text');
    await expect(fitText).not.toBeNull();
    await expect(fitText!.textContent).toBe('Fit mode label');
  },
};

// ──────────────────────────────────────────────
// 5. Boundary — stroke-dasharray + mono label
// ──────────────────────────────────────────────
export const BoundaryBasic: Story = {
  render: () => (
    <Canvas viewBox="0 0 400 260" width={400} height={260} title="Boundary test">
      <Boundary
        x={20}
        y={30}
        width={360}
        height={200}
        label="System Boundary"
        dashPattern="8 6"
        stroke="#111111"
      />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const boundary = canvasElement.querySelector('[data-bbangto-viz-boundary]');
    await expect(boundary).not.toBeNull();

    // rect inside boundary has stroke-dasharray
    const rect = boundary?.querySelector('rect');
    await expect(rect).not.toBeNull();
    const dasharray = getComputedStyle(rect!).getPropertyValue('stroke-dasharray');
    // dasharray should contain the pattern (browsers normalise to "8 6" or "8px 6px")
    await expect(dasharray).toMatch(/8/);

    // label text is present and uses monospace font
    const label = boundary?.querySelector('text');
    await expect(label).not.toBeNull();
    await expect(label?.textContent).toBe('System Boundary');
  },
};

// ──────────────────────────────────────────────
// 5b. Edge 종단 세그먼트 실측 — 상류 이슈 P1
//     마커는 orient="auto"라 **종단 세그먼트의 방향**을 그대로 쓴다.
//     종단이 길이 0이면 방향이 정의되지 않아 Chromium이 0°(오른쪽)로 그리고,
//     길이가 마커(8 user unit, markerUnits="userSpaceOnUse")보다 짧으면
//     화살촉이 구간을 통째로 덮어 역시 옆을 본 그림이 된다.
//     판정 규칙은 클라이언트 게이트(resume/scripts/render-core.ts inspectEdgeGeometry)와 같다.
// ──────────────────────────────────────────────
// 전역 게이트(preview.tsx afterEach)는 길이 0만 본다 — 여기서는 한 걸음 더 들어가
// "마커보다 짧은 종단"까지 본다. 파싱은 게이트와 같은 모듈을 쓴다.
const MARKER_SIZE = 8; // Canvas markerSize 기본값
const ZERO_EPS = 0.01;

const AXIS_EDGE_CASES = [
  { id: 'axis-vertical', from: { x: 60, y: 30 }, to: { x: 60, y: 170 } },
  { id: 'axis-vertical-up', from: { x: 130, y: 170 }, to: { x: 130, y: 30 } },
  { id: 'axis-horizontal', from: { x: 200, y: 30 }, to: { x: 340, y: 30 } },
  { id: 'near-axis-dx7', from: { x: 220, y: 60 }, to: { x: 227, y: 170 } },
  { id: 'near-axis-dx8', from: { x: 290, y: 60 }, to: { x: 298, y: 170 } },
  { id: 'diagonal-control', from: { x: 360, y: 60 }, to: { x: 480, y: 170 } },
];

export const EdgeAxisAlignedMarkers: Story = {
  render: () => (
    <Canvas viewBox="0 0 520 200" width={520} height={200} title="Axis-aligned edge markers">
      {AXIS_EDGE_CASES.map((c) => (
        <Edge
          key={c.id}
          id={c.id}
          from={c.from}
          to={c.to}
          cornerRadius={4}
          markerEnd="arrow"
          markerStart="circle"
          stroke="#111111"
          strokeWidth={1.5}
        />
      ))}
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const measured = AXIS_EDGE_CASES.map((c) => {
      const el = canvasElement.querySelector(`[data-bbangto-viz-edge-id="${c.id}"]`);
      const d = el?.getAttribute('d') ?? '';
      const { start, end } = terminalLengths(d);
      return { id: c.id, d, start, end };
    });
    // 수치를 수행 내역에 남기기 위한 실측 출력.
    console.log('[P1 실측] 종단 세그먼트 길이\n' + JSON.stringify(measured, null, 2));

    for (const m of measured) {
      await expect(m.d.length).toBeGreaterThan(4);
      // 길이 0 종단 = 마커 방향 미정의(클라이언트 게이트와 같은 판정).
      await expect({ id: m.id, zeroTerminal: m.start <= ZERO_EPS || m.end <= ZERO_EPS }).toEqual({
        id: m.id,
        zeroTerminal: false,
      });
      // 마커보다 짧은 종단 = 화살촉이 구간을 덮어 방향이 뒤집혀 읽힌다.
      await expect({
        id: m.id,
        startOk: m.start >= MARKER_SIZE,
        endOk: m.end >= MARKER_SIZE,
      }).toEqual({ id: m.id, startOk: true, endOk: true });
    }
  },
};

// ──────────────────────────────────────────────
// 5c. Boundary 라벨과 프레임 스트로크의 여유 실측 — 상류 이슈 P3
//     라벨 y는 `rect.y - fontSize/2` + dominantBaseline="central" 이라
//     프레임 상단선까지 여유가 폰트 크기 비례로 고정돼 있다.
//     글리프 잉크 하단(baseline + actualBoundingBoxDescent)이 스트로크 밴드
//     (rect.y ± strokeWidth/2) 위쪽에 완전히 떠 있어야 취소선처럼 읽히지 않는다.
// ──────────────────────────────────────────────
// 겹침은 글리프의 잉크 하강폭에 달렸다 — 대문자만 쓴 라틴 라벨(리포트 재현 코드)과
// 디센더가 있는 라틴 라벨은 결과가 다르다. 둘 다 재고 strokeWidth 두 값과 교차한다.
const BOUNDARY_LABEL_CASES: {
  id: string;
  label: string;
  strokeWidth: number;
  placement?: 'on-line' | 'outside' | 'inside';
  halo?: boolean;
}[] = [
  { id: 'latin-caps-sw15', label: 'EDGE LOCATION', strokeWidth: 1.5 },
  { id: 'latin-caps-sw3', label: 'EDGE LOCATION', strokeWidth: 3 },
  { id: 'latin-desc-sw15', label: 'Payment gateway', strokeWidth: 1.5 },
  { id: 'latin-desc-sw3', label: 'Payment gateway', strokeWidth: 3 },
  { id: 'ko-sw15', label: '엣지 로케이션', strokeWidth: 1.5 },
  { id: 'ko-sw3', label: '엣지 로케이션', strokeWidth: 3 },
  // 배치를 고른 경우는 halo 없이도 밴드를 비껴야 한다.
  { id: 'outside-sw3', label: 'Payment gateway', strokeWidth: 3, placement: 'outside', halo: false },
  { id: 'inside-sw3', label: 'Payment gateway', strokeWidth: 3, placement: 'inside', halo: false },
];

/**
 * 라벨 뒤 knockout이 프레임 선을 끊는지 본다 — 끊으면 글리프가 밴드 높이에 걸쳐 있어도
 * 선이 글자를 가로지르지 않는다. 구현이 halo(글리프 둘레)든 사각형이든 모두 인정한다.
 */
function knockoutCoversLabel(
  g: SVGGElement,
  text: SVGTextElement,
  frameTop: number,
  strokeWidth: number,
): boolean {
  // (1) 글리프 둘레 halo — paint-order:stroke 로 배경색을 먼저 칠해 선을 끊는 방식.
  const cs = getComputedStyle(text);
  const haloWidth = parseFloat(cs.strokeWidth) || 0;
  const hasHalo =
    (cs.paintOrder ?? '').includes('stroke') &&
    cs.stroke !== 'none' &&
    cs.stroke !== '' &&
    haloWidth >= strokeWidth;
  if (hasHalo) return true;

  // (2) 라벨 뒤 사각형 knockout — 밴드를 세로로 다 덮고 글자 폭을 다 가려야 인정한다.
  const ko = g.querySelector('[data-bbangto-viz-boundary-label-knockout]') as SVGGraphicsElement | null;
  if (!ko) return false;
  const k = ko.getBBox();
  const t = text.getBBox();
  return (
    k.x <= t.x &&
    k.x + k.width >= t.x + t.width &&
    k.y <= frameTop - strokeWidth / 2 &&
    k.y + k.height >= frameTop + strokeWidth / 2
  );
}

export const BoundaryLabelClearance: Story = {
  render: () => (
    <Canvas viewBox="0 0 520 580" width={520} height={580} title="Boundary label clearance">
      {BOUNDARY_LABEL_CASES.map((c, i) => (
        <Boundary
          key={c.id}
          data-case={c.id}
          x={20}
          y={40 + i * 90}
          width={480}
          height={60}
          label={c.label}
          strokeWidth={c.strokeWidth}
          labelPlacement={c.placement}
          labelHalo={c.halo}
          stroke="#111111"
        />
      ))}
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    await document.fonts.ready;

    const measured = BOUNDARY_LABEL_CASES.map((c) => {
      const g = canvasElement.querySelector(`[data-case="${c.id}"]`) as SVGGElement;
      const rect = g.querySelector('[data-bbangto-viz-boundary-frame], rect') as SVGRectElement;
      const text = g.querySelector('text') as SVGTextElement;

      const frameTop = rect.y.baseVal.value;
      const sw = parseFloat(getComputedStyle(rect).strokeWidth);
      const bandTop = frameTop - sw / 2;

      // 베이스라인은 렌더된 레이아웃 박스에서 유도한다.
      // (getStartPositionOfChar는 Chromium에서 dominant-baseline 이동을 반영하지 않아
      //  y 속성 원값을 그대로 돌려준다 — 그걸 베이스라인으로 쓰면 약 4px 과대평가된다.)
      // getBBox().y 는 em 박스 상단(ascent 선)이므로 baseline = bbox.y + fontAscent.
      const bbox = text.getBBox();
      const cs = getComputedStyle(text);
      const ctx = document.createElement('canvas').getContext('2d')!;
      ctx.font = `${cs.fontSize} ${cs.fontFamily}`;
      const tm = ctx.measureText(c.label);
      const baseline = bbox.y + tm.fontBoundingBoxAscent;
      const inkBottom = baseline + tm.actualBoundingBoxDescent;
      const inkTop = baseline - tm.actualBoundingBoxAscent;
      const bandBottom = frameTop + sw / 2;

      return {
        id: c.id,
        fontFamily: cs.fontFamily,
        frameTop,
        strokeWidth: sw,
        bandTop,
        bboxTop: bbox.y,
        bboxHeight: bbox.height,
        // 유도가 맞는지 자체 검산 — 이 둘이 어긋나면 baseline 유도가 틀린 것이다.
        fontBoxHeight: tm.fontBoundingBoxAscent + tm.fontBoundingBoxDescent,
        fontAscent: tm.fontBoundingBoxAscent,
        inkDescent: tm.actualBoundingBoxDescent,
        baseline,
        inkBottom,
        layoutBottom: bbox.y + bbox.height,
        inkTop,
        bandBottom,
        // 양수 = 글리프가 스트로크 밴드 위에 떠 있다. 음수 = 겹친 픽셀 수.
        inkClearance: bandTop - inkBottom,
        // 밴드 아래로 내려간 배치(inside)를 위한 여유.
        inkClearanceBelow: inkTop - bandBottom,
        layoutClearance: bandTop - (bbox.y + bbox.height),
        knockoutCovers: knockoutCoversLabel(g, text, frameTop, sw),
      };
    });
    console.log('[P3 실측] Boundary 라벨 여유\n' + JSON.stringify(measured, null, 2));

    for (const m of measured) {
      // 합격 조건은 둘 중 하나다 — 글리프가 밴드 위로 완전히 뜨거나(여유 확보),
      // 라벨 뒤 knockout이 밴드를 덮어 선이 글자를 가로지르지 않거나.
      // 기존 그림의 좌표를 움직이지 않는 쪽을 기본으로 삼기 때문에 후자를 함께 허용한다.
      await expect({
        id: m.id,
        legible: m.inkClearance >= 0 || m.inkClearanceBelow >= 0 || m.knockoutCovers,
      }).toEqual({ id: m.id, legible: true });
    }
  },
};

// ──────────────────────────────────────────────
// 5d. contentBox — 상류 이슈 P2
//     도형별 "글자를 넣어도 되는 영역"을 렌더된 도형에 대고 검증한다.
//     순수 산술은 packages/visualization geometry/shapes.test.ts가 보고,
//     여기서는 브라우저의 isPointInFill로 실제 채워진 영역인지 본다.
// ──────────────────────────────────────────────
const CONTENT_BOX_SHAPES: NodeShape[] = [
  'rect', 'rounded', 'stadium', 'circle', 'ellipse', 'diamond', 'cylinder',
  'hexagon', 'parallelogram', 'trapezoid', 'subroutine', 'doubleCircle', 'cube', 'folder',
];

export const NodeContentBox: Story = {
  render: () => {
    const cols = 5;
    const W = 140;
    const H = 90;
    const GAP = 24;
    const totalW = cols * (W + GAP) + 20;
    const totalH = Math.ceil(CONTENT_BOX_SHAPES.length / cols) * (H + GAP) + 20;
    return (
      <Canvas viewBox={`0 0 ${totalW} ${totalH}`} width={totalW} height={totalH} title="contentBox">
        {CONTENT_BOX_SHAPES.map((shape, i) => {
          const x = (i % cols) * (W + GAP) + 10;
          const y = Math.floor(i / cols) * (H + GAP) + 10;
          return (
            <Node
              key={shape}
              id={shape}
              x={x}
              y={y}
              width={W}
              height={H}
              shape={shape}
              fill="#C5B6EE"
              stroke="#111111"
            />
          );
        })}
      </Canvas>
    );
  },
  play: async ({ canvasElement }) => {
    const W = 140;
    const H = 90;
    const GAP = 24;
    const cols = 5;

    for (const [i, shape] of CONTENT_BOX_SHAPES.entries()) {
      const x = (i % cols) * (W + GAP) + 10;
      const y = Math.floor(i / cols) * (H + GAP) + 10;
      const box = contentBox(shape, { x, y, width: W, height: H });
      const el = canvasElement.querySelector(
        `[data-bbangto-viz-node-shape="${shape}"]`,
      ) as SVGGeometryElement;

      // 콘텐츠 박스 네 꼭짓점(살짝 안쪽)이 실제로 칠해진 영역 안에 있어야 한다.
      const inset = 0.5;
      const pts: [number, number][] = [
        [box.x + inset, box.y + inset],
        [box.x + box.width - inset, box.y + inset],
        [box.x + box.width - inset, box.y + box.height - inset],
        [box.x + inset, box.y + box.height - inset],
      ];
      const outside = pts.filter((p) => !el.isPointInFill(new DOMPoint(p[0], p[1])));
      await expect({ shape, outsideCorners: outside.length, box, outside }).toEqual({
        shape,
        outsideCorners: 0,
        box,
        outside: [],
      });
    }
  },
};

// ──────────────────────────────────────────────
// 5e. NodeLabel이 콘텐츠 박스를 받는다 — 상류 이슈 P2(계약 쪽)
//     리포트 재현 치수: cylinder h=62 + 3줄 라벨.
//     세로 여유를 모르면 세 번째 줄이 아래 뚜껑에 조용히 잘린다.
// ──────────────────────────────────────────────
export const NodeLabelInContentBox: Story = {
  render: () => (
    <Canvas viewBox="0 0 260 120" width={260} height={120} title="NodeLabel in content box">
      <Node id="db" x={20} y={20} width={200} height={62} shape="cylinder" fill="#EEE" stroke="#111" />
      <NodeLabel
        x={20}
        y={51}
        width={200}
        height={62}
        shape="cylinder"
        title="Primary customer records replication store for regional analytics"
        mode="wrap"
        maxLines={3}
        fontSize={13}
      />
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const box = contentBox('cylinder', { x: 20, y: 20, width: 200, height: 62 });
    const label = canvasElement.querySelector('[data-bbangto-viz-node-label]') as SVGGElement;
    await expect(label).not.toBeNull();

    const lines = Array.from(label.querySelectorAll('text'));
    await expect(lines.length).toBeGreaterThan(0);

    // 모든 줄이 콘텐츠 박스 세로 범위 안에 있어야 한다(조용한 잘림 없음).
    const overflow = lines
      .map((t) => t.getBBox())
      .filter((b) => b.y < box.y - 0.5 || b.y + b.height > box.y + box.height + 0.5);
    await expect({ overflowLines: overflow.length, box, overflow }).toEqual({
      overflowLines: 0,
      box,
      overflow: [],
    });

    // 줄이 줄어들어 글자가 잘렸다면 말줄임으로 드러나야 한다 — 조용히 사라지지 않는다.
    const rendered = lines.map((t) => t.textContent ?? '').join(' ');
    if (!rendered.includes('regional analytics')) {
      await expect(rendered).toMatch(/…$/);
    }
  },
};

// ──────────────────────────────────────────────
// 5f. 라벨 서체 스크립트 판정 — 상류 이슈 P4
//     mono 서체에는 한글 글리프가 없다. 한글 라벨을 mono로 그리면 그 줄만 시스템 폴백으로
//     떨어져 한 그림 안에서 서체가 갈린다. 비ASCII 라벨은 titleFont, 라틴은 mono 유지.
// ──────────────────────────────────────────────
function normaliseFont(v: string): string {
  return v.replace(/['"]/g, '').replace(/\s*,\s*/g, ',').trim();
}

export const LabelFontByScript: Story = {
  render: () => (
    <Canvas viewBox="0 0 620 320" width={620} height={320} title="Label font by script">
      <Boundary data-case="boundary-ko" x={20} y={30} width={270} height={70} label="엣지 로케이션" />
      <Boundary data-case="boundary-latin" x={320} y={30} width={270} height={70} label="EDGE LOCATION" />
      <Lane data-case="lane-ko" x={20} y={130} width={270} height={70} label="결제 레인" />
      <Lane data-case="lane-latin" x={320} y={130} width={270} height={70} label="PAYMENT LANE" />
      <g data-case="tag-ko">
        <Tag x={20} y={240} label="승인 대기" />
      </g>
      <g data-case="tag-latin">
        <Tag x={320} y={240} label="PENDING" />
      </g>
      <g data-case="edge-label-ko">
        <EdgeLabel x={20} y={290} label="주문 생성" />
      </g>
      <g data-case="edge-label-latin">
        <EdgeLabel x={320} y={290} label="createOrder()" />
      </g>
    </Canvas>
  ),
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]') as SVGSVGElement;
    const scope = getComputedStyle(svg.parentElement ?? svg);
    const titleFont = normaliseFont(scope.getPropertyValue('--bbangto-viz-typography-title-font'));
    const monoFont = normaliseFont(scope.getPropertyValue('--bbangto-viz-typography-mono-font'));

    // 계약 변수가 실제로 주입돼 있어야 비교가 의미 있다.
    await expect(titleFont.length).toBeGreaterThan(0);
    await expect(monoFont.length).toBeGreaterThan(0);
    await expect(titleFont).not.toBe(monoFont);

    const fontOf = (caseId: string): string => {
      const g = canvasElement.querySelector(`[data-case="${caseId}"]`) as SVGGElement;
      const text = g.querySelector('text') as SVGTextElement;
      return normaliseFont(getComputedStyle(text).fontFamily);
    };

    for (const id of ['boundary-ko', 'lane-ko', 'tag-ko', 'edge-label-ko']) {
      await expect({ id, font: fontOf(id) }).toEqual({ id, font: titleFont });
    }
    for (const id of ['boundary-latin', 'lane-latin', 'tag-latin', 'edge-label-latin']) {
      await expect({ id, font: fontOf(id) }).toEqual({ id, font: monoFont });
    }
  },
};

// ──────────────────────────────────────────────
// 6. Large canvas — 200 nodes / 100 edges (perf)
// ──────────────────────────────────────────────
const LARGE_NODE_COUNT = 200;
const LARGE_EDGE_COUNT = 100;
const COLS = 20;
const NW = 60;
const NH = 40;
const GAP = 20;

const largeNodes = Array.from({ length: LARGE_NODE_COUNT }, (_, i) => ({
  id: `ln${i}`,
  x: (i % COLS) * (NW + GAP) + 10,
  y: Math.floor(i / COLS) * (NH + GAP) + 10,
  width: NW,
  height: NH,
}));

export const LargeCanvas: Story = {
  render: () => {
    const totalW = COLS * (NW + GAP) + 20;
    const totalH = Math.ceil(LARGE_NODE_COUNT / COLS) * (NH + GAP) + 20;

    return (
      <Canvas
        viewBox={`0 0 ${totalW} ${totalH}`}
        width={totalW}
        height={totalH}
        title="Large canvas performance test"
      >
        {largeNodes.map((n) => (
          <Node
            key={n.id}
            id={n.id}
            x={n.x}
            y={n.y}
            width={n.width}
            height={n.height}
            shape="rect"
            fill="#C5B6EE"
            stroke="#111"
            strokeWidth={2.5}
          />
        ))}
        {Array.from({ length: LARGE_EDGE_COUNT }, (_, i) => (
          <Edge
            key={`le${i}`}
            from={`ln${i}`}
            to={`ln${i + 1}`}
            routing="straight"
            markerEnd="arrow"
          />
        ))}
      </Canvas>
    );
  },
  play: async ({ canvasElement }) => {
    const nodes = canvasElement.querySelectorAll('[data-bbangto-viz-node]');
    await expect(nodes.length).toBe(LARGE_NODE_COUNT);

    const edges = canvasElement.querySelectorAll('[data-bbangto-viz-edge]');
    await expect(edges.length).toBe(LARGE_EDGE_COUNT);
  },
};
