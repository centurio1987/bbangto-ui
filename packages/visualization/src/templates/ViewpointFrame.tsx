import { type ReactNode } from 'react';
import { Canvas, type CanvasProps } from '../atoms/Canvas';
import { Boundary } from '../atoms/Boundary';
import { vvar } from '../tokens/contract';
import { parseViewBox } from '../geometry/layout';

export interface ViewpointFrameProps extends Omit<CanvasProps, 'data' | 'children'> {
  /** ISO 42010 architecture viewpoint 이름(뷰를 지배하는 규약). */
  viewpoint: string;
  /** viewpoint가 프레이밍하는 관심사(concerns). */
  concerns?: string[];
  /** 관심사를 보유한 이해관계자(stakeholders). */
  stakeholders?: string[];
  /** viewpoint에 의해 지배되는 model kinds(선택). */
  modelKinds?: string[];
  /** body 슬롯 — viewpoint를 따르는 실제 아키텍처 view(다른 프리셋을 조합). */
  view?: ReactNode;
  /** 헤더 상단 kicker 라벨. */
  frameLabel?: string;
}

const P = 18; // 외곽 패딩
const PAD = 14; // 내부 패딩
const G = 14; // 헤더-body 간격
const ROW = 15; // 리스트 행 높이

/**
 * ISO/IEC/IEEE 42010 ViewpointFrame (PLAN §D G6 메타 프레임).
 * ArchiMate 고유 viewpoint(→ `ArchiMateViewpointDiagram`)와 **별개 개념** — 42010 표준의
 * "viewpoint가 concerns/stakeholders를 프레이밍하고 view를 지배한다"를 구조화한 메타 프레임이다.
 * 헤더 밴드(viewpoint·concerns[]·stakeholders[]) + body 슬롯(중첩 view). headless.
 */
export function ViewpointFrame({
  viewpoint,
  concerns = [],
  stakeholders = [],
  modelKinds = [],
  view,
  frameLabel = 'ISO/IEC/IEEE 42010 · Architecture Viewpoint',
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Architecture viewpoint frame',
  ...props
}: ViewpointFrameProps) {
  const vb = parseViewBox(viewBox, [0, 0, 660, 480]);
  const [vbX, vbY, vbW, vbH] = vb;
  const innerX = vbX + P;
  const innerW = vbW - 2 * P;

  const stroke = vvar('shape', 'stroke');
  const titleFont = vvar('typography', 'titleFont');
  const monoFont = vvar('typography', 'monoFont');
  const labelColor = vvar('boundary', 'labelColor');

  // 헤더 레이아웃(hy 기준 상대 오프셋).
  const hx = innerX;
  const hy = vbY + P;
  const listTop = 84;
  const listRows = Math.max(concerns.length, stakeholders.length);
  const listBottom = listTop + listRows * ROW;
  const modelBottom = modelKinds.length ? listBottom + 20 : listBottom;
  const headerH = Math.max(126, modelBottom + 10);
  const colConcernsX = hx + PAD;
  const colStakeX = hx + innerW * 0.5;

  // body 레이아웃.
  const byTop = hy + headerH + G;
  const byBottom = vbY + vbH - P;
  const bodyH = Math.max(0, byBottom - byTop);
  const slotTop = byTop + 22;
  const slotH = Math.max(0, bodyH - 22 - PAD);

  return (
    <Canvas
      viewBox={viewBox ?? `${vbX} ${vbY} ${vbW} ${vbH}`}
      width={width}
      height={height}
      title={title}
      data-bbangto-viz-chart="viewpoint-frame"
      data-bbangto-viz-viewpoint-name={viewpoint}
      {...props}
    >
      {/* ── 헤더 밴드 ─────────────────────────────────────────── */}
      <g data-bbangto-viz-viewpoint-header>
        <rect
          data-viz-part="shape"
          x={hx}
          y={hy}
          width={innerW}
          height={headerH}
          rx={8}
          ry={8}
          style={{ fill: vvar('palette', 'p2'), fillOpacity: 0.1, stroke, strokeWidth: 1.25 }}
        />
        <text x={hx + PAD} y={hy + 18} fontSize={9.5} fontFamily={monoFont} style={{ fill: labelColor }}>
          {frameLabel}
        </text>
        <text
          x={hx + PAD}
          y={hy + 42}
          fontSize={18}
          fontWeight={800}
          fontFamily={titleFont}
          style={{ fill: stroke }}
        >
          {viewpoint}
        </text>
        <line
          x1={hx + PAD}
          y1={hy + 54}
          x2={hx + innerW - PAD}
          y2={hy + 54}
          style={{ stroke, strokeWidth: 1, strokeOpacity: 0.4 }}
        />
        <text
          x={colConcernsX}
          y={hy + 72}
          fontSize={10}
          fontWeight={700}
          fontFamily={titleFont}
          style={{ fill: labelColor }}
        >
          Concerns framed
        </text>
        <text
          x={colStakeX}
          y={hy + 72}
          fontSize={10}
          fontWeight={700}
          fontFamily={titleFont}
          style={{ fill: labelColor }}
        >
          Stakeholders
        </text>
        {concerns.map((c, i) => (
          <text
            key={c + i}
            data-bbangto-viz-viewpoint-concern
            x={colConcernsX}
            y={hy + listTop + i * ROW}
            fontSize={10}
            fontFamily={monoFont}
            style={{ fill: stroke }}
          >
            {`• ${c}`}
          </text>
        ))}
        {stakeholders.map((s, i) => (
          <text
            key={s + i}
            data-bbangto-viz-viewpoint-stakeholder
            x={colStakeX}
            y={hy + listTop + i * ROW}
            fontSize={10}
            fontFamily={monoFont}
            style={{ fill: stroke }}
          >
            {`• ${s}`}
          </text>
        ))}
        {modelKinds.length > 0 && (
          <text
            data-bbangto-viz-viewpoint-modelkinds
            x={colConcernsX}
            y={hy + listBottom + 14}
            fontSize={9.5}
            fontFamily={monoFont}
            style={{ fill: labelColor }}
          >
            {`Model kinds: ${modelKinds.join(' · ')}`}
          </text>
        )}
      </g>

      {/* ── body 슬롯(governed view) ──────────────────────────── */}
      <g data-bbangto-viz-viewpoint-body>
        <Boundary x={hx} y={byTop} width={innerW} height={bodyH} label="View" />
        {view != null ? (
          <svg
            data-bbangto-viz-viewpoint-slot
            x={hx + PAD}
            y={slotTop}
            width={Math.max(0, innerW - 2 * PAD)}
            height={slotH}
            style={{ overflow: 'hidden' }}
          >
            {view}
          </svg>
        ) : (
          <text
            x={hx + innerW / 2}
            y={byTop + bodyH / 2}
            textAnchor="middle"
            fontSize={11}
            fontFamily={monoFont}
            style={{ fill: labelColor }}
          >
            No view supplied
          </text>
        )}
      </g>
    </Canvas>
  );
}

ViewpointFrame.displayName = 'ViewpointFrame';
