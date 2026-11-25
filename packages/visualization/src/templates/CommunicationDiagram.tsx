import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { ClassBox } from '../molecules/ClassBox';
import { vvar } from '../tokens/contract';
import { resolveLabelFont } from '../tokens/labelFont';

/** 메시지를 주고받는 객체 — 「이름 : 클래스」 상자 */
export interface CommunicationObjectSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** 객체 이름. 비우면 「: 클래스」 */
  name?: string;
  classifier: string;
  fill?: string;
  stroke?: string;
}

/** 링크 위 메시지 하나 — 번호(순서 · 중첩)와 글, 방향 */
export interface CommunicationMessageSpec {
  /** 순서 번호 — 「1」 · 「1.1」 · 「2」 */
  order: string;
  label: string;
  /** forward(기본) 는 링크의 from → to, backward 는 to → from */
  direction?: 'forward' | 'backward';
}

/** 객체 사이 링크 — 방향 없는 선이고, 그 위에 메시지를 번호순으로 단다 */
export interface CommunicationLinkSpec {
  id: string;
  from: string;
  to: string;
  messages?: CommunicationMessageSpec[];
}

export interface CommunicationDiagramData {
  objects: CommunicationObjectSpec[];
  links?: CommunicationLinkSpec[];
}

export interface CommunicationDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: CommunicationDiagramData;
}

/** 메시지 화살표 반 길이 · 링크에서 첫 메시지까지 · 메시지 사이 간격 */
const ARROW_HALF = 16;
const FIRST_GAP = 14;
const STEP = 28;
const FONT = 10;

/**
 * @vizType VT-108 UML Sequence Diagram · A. 엔지니어링/소프트웨어 · dataShape: process, temporal · 구조: sequential, relational
 * @useWhen API·시나리오의 시간순 상호작용을 설계할 때
 * @useWhen 참여자 간 메시지 순서를 명세할 때
 * @avoidWhen 정적 클래스 구조는 Class(VT-101) 사용
 * @avoidWhen 상태 전이는 State(VT-107) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function CommunicationDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'Communication Diagram',
  ...props
}: CommunicationDiagramProps) {
  if (children) {
    return (
      <Canvas data-viz-notation viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const objects = data?.objects ?? [];
  const links = data?.links ?? [];
  const allNodes = objects.map((o) => ({ id: o.id, x: o.x, y: o.y, width: o.width, height: o.height }));
  const byId = new Map(objects.map((o) => [o.id, o]));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 600 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  const ink = vvar('on', 'canvas', 'bg');

  return (
    <Canvas data-viz-notation data={{ nodes: allNodes }} viewBox={autoViewBox} width={width} height={height} title={title} {...props}>
      {objects.map((o) => (
        // 이름 칸 하나인 상자 — 속성 · 연산이 없어 ClassBox 가 빈 칸을 그리지 않는다
        <ClassBox
          key={o.id}
          id={o.id}
          x={o.x}
          y={o.y}
          width={o.width}
          height={o.height}
          name={o.name ? `${o.name} : ${o.classifier}` : `: ${o.classifier}`}
          fill={o.fill}
          stroke={o.stroke}
        />
      ))}
      {links.map((l) => {
        const a = byId.get(l.from);
        const b = byId.get(l.to);
        const msgs = l.messages ?? [];
        // 메시지 자리 — 두 객체 가운데를 잇는 방향 d 와, 그 옆(가로 링크는 위, 세로 링크는 왼쪽) 방향 p
        let place: ((i: number) => { x: number; y: number }) | null = null;
        let d = { x: 1, y: 0 };
        let p = { x: 0, y: -1 };
        if (a && b) {
          const ac = { x: a.x + a.width / 2, y: a.y + a.height / 2 };
          const bc = { x: b.x + b.width / 2, y: b.y + b.height / 2 };
          const len = Math.hypot(bc.x - ac.x, bc.y - ac.y) || 1;
          d = { x: (bc.x - ac.x) / len, y: (bc.y - ac.y) / len };
          p = { x: d.y, y: -d.x };
          if (p.y > 1e-6 || (Math.abs(p.y) <= 1e-6 && p.x > 0)) p = { x: -p.x, y: -p.y };
          const mid = { x: (ac.x + bc.x) / 2, y: (ac.y + bc.y) / 2 };
          place = (i) => ({ x: mid.x + p.x * (FIRST_GAP + i * STEP), y: mid.y + p.y * (FIRST_GAP + i * STEP) });
        }
        const horizontal = Math.abs(d.x) >= Math.abs(d.y);
        return (
          <g key={l.id}>
            <Edge from={l.from} to={l.to} markerEnd="none" strokeWidth={1.5} data-bbangto-viz-communication-link={l.id} />
            {place &&
              msgs.map((m, i) => {
                const base = place!(i);
                const s = m.direction === 'backward' ? -1 : 1;
                const from = { x: base.x - d.x * ARROW_HALF * s, y: base.y - d.y * ARROW_HALF * s };
                const to = { x: base.x + d.x * ARROW_HALF * s, y: base.y + d.y * ARROW_HALF * s };
                const text = `${m.order}: ${m.label}`;
                // 가로 링크는 화살표 위에 가운데 맞춤, 세로 링크는 화살표 왼쪽에 끝 맞춤
                const tx = horizontal ? base.x : base.x + p.x * 8;
                const ty = horizontal ? base.y + p.y * 10 : base.y;
                return (
                  <g key={`${l.id}-${m.order}`} data-bbangto-viz-message={m.order}>
                    <Edge from={from} to={to} routing="straight" markerEnd="arrow" strokeWidth={1.2} strokeDasharray="none" />
                    <text
                      x={tx}
                      y={ty}
                      textAnchor={horizontal ? 'middle' : 'end'}
                      dominantBaseline="central"
                      fontSize={FONT}
                      fontFamily={resolveLabelFont(text)}
                      style={{ fill: ink }}
                    >
                      {text}
                    </text>
                  </g>
                );
              })}
          </g>
        );
      })}
    </Canvas>
  );
}

CommunicationDiagram.displayName = 'CommunicationDiagram';
