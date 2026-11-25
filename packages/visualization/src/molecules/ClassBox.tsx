import React, { type ReactNode } from 'react';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

export interface ClassBoxProps {
  id?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  stereotype?: string;
  attributes?: string[];
  methods?: string[];
  /**
   * 빈 칸(속성 · 연산이 없는 칸)도 그린다. 기본은 그리지 않는다 — UML 은 칸 억제를 허용하고, 멤버를 적지 않은
   * 클래스는 이름 칸만 그리는 것이 정상 표기다(KAN-082, 바깥 보고서 P9). 예전 모양(늘 세 칸)이 필요하면 켠다.
   */
  showEmptyCompartments?: boolean;
  /** 이름에 밑줄을 긋는다 — 객체 도식의 「이름 : 클래스」 표기(KAN-082). */
  nameUnderline?: boolean;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  children?: ReactNode;
}

const ROW_H = 16;
const PAD = 6;
const HEADER_H = 28;

export const ClassBox = React.forwardRef<SVGGElement, ClassBoxProps>(
  (
    {
      id,
      x,
      y,
      width,
      height,
      name,
      stereotype,
      attributes = [],
      methods = [],
      showEmptyCompartments = false,
      nameUnderline = false,
      fill: fillProp,
      stroke,
      strokeWidth = 2,
      children,
    },
    ref,
  ) => {
    const fill = fillProp ?? vvar('shape', 'fill');
    const effectiveStroke = stroke ?? vvar('edge', 'stroke');
    const titleFont = vvar('typography', 'titleFont');
    // 기본 면(shape.fill) 위 글자색. fill 을 직접 주면 그 면의 대비는 준 쪽 몫이라 종전 글자색을 둔다(KAN-061).
    const textColor = fillProp === undefined ? vvar('on', 'shape', 'fill') : vvar('edge', 'stroke');

    // 칸 나누기 — 빈 칸은 기본으로 그리지 않고 그 높이를 이름 칸이 가진다
    const showAttrs = showEmptyCompartments || attributes.length > 0;
    const showMethods = showEmptyCompartments || methods.length > 0;
    const attrH = showAttrs ? Math.max(HEADER_H, attributes.length * ROW_H + PAD * 2) : 0;
    const methodH = showMethods ? Math.max(HEADER_H, methods.length * ROW_H + PAD * 2) : 0;
    const nameH = height - attrH - methodH;
    const nameH2 = Math.max(HEADER_H, nameH);

    const attrY = y + nameH2;
    const methodY = attrY + attrH;

    const lineStyle: React.CSSProperties = {
      stroke: effectiveStroke,
      strokeWidth,
      fill: 'none',
    };

    return (
      <g ref={ref} data-bbangto-viz-class-box data-bbangto-viz-class-box-id={id}>
        {/* outer rect */}
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{ fill, stroke: effectiveStroke, strokeWidth }}
        />

        {/* section 1: name */}
        <g data-bbangto-viz-class-section="name">
          {stereotype && (
            <text
              data-bbangto-viz-sysml-stereotype
              x={x + width / 2}
              y={y + nameH2 / 2 - 9}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily={resolveLabelFont(stereotype)}
              fontSize={9}
              style={{ fill: textColor }}
            >
              {`«${stereotype}»`}
            </text>
          )}
          <text
            x={x + width / 2}
            y={stereotype ? y + nameH2 / 2 + 6 : y + nameH2 / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily={titleFont}
            fontSize={13}
            fontWeight={700}
            textDecoration={nameUnderline ? 'underline' : undefined}
            style={{ fill: textColor }}
          >
            {name}
          </text>
        </g>

        {/* divider after name */}
        {showAttrs && <line x1={x} y1={attrY} x2={x + width} y2={attrY} style={lineStyle} />}

        {/* section 2: attributes — 비면 그리지 않는다 */}
        {showAttrs && <g data-bbangto-viz-class-section="attributes">
          {attributes.map((attr, i) => (
            <text
              key={i}
              x={x + PAD}
              y={attrY + PAD + i * ROW_H + ROW_H / 2}
              textAnchor="start"
              dominantBaseline="central"
              fontFamily={resolveLabelFont(attr)}
              fontSize={10}
              style={{ fill: textColor }}
            >
              {attr}
            </text>
          ))}
        </g>}

        {/* divider before methods */}
        {showMethods && <line x1={x} y1={methodY} x2={x + width} y2={methodY} style={lineStyle} />}

        {/* section 3: methods — 비면 그리지 않는다 */}
        {showMethods && <g data-bbangto-viz-class-section="methods">
          {methods.map((method, i) => (
            <text
              key={i}
              x={x + PAD}
              y={methodY + PAD + i * ROW_H + ROW_H / 2}
              textAnchor="start"
              dominantBaseline="central"
              fontFamily={resolveLabelFont(method)}
              fontSize={10}
              style={{ fill: textColor }}
            >
              {method}
            </text>
          ))}
        </g>}

        {children}
      </g>
    );
  },
);

ClassBox.displayName = 'ClassBox';
