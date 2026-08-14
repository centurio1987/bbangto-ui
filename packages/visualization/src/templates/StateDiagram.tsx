import { type ReactNode } from 'react';
import { Canvas } from '../atoms/Canvas';
import type { CanvasProps } from '../atoms/Canvas';
import { Edge } from '../atoms/Edge';
import { StateNode } from '../molecules/StateNode';
import type { StateVariant } from '../molecules/StateNode';

export type { StateVariant };

const PSEUDO_SIZE = 28; // 2 × PSEUDO_RADIUS=14

export interface StateSpec {
  id: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  title?: string;
  variant?: StateVariant;
  fill?: string;
  stroke?: string;
}

export interface TransitionSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface StateDiagramData {
  states: StateSpec[];
  transitions?: TransitionSpec[];
}

export interface StateDiagramProps extends Omit<CanvasProps, 'data' | 'children'> {
  children?: ReactNode;
  data?: StateDiagramData;
}

function stateHeight(s: StateSpec): number {
  if (s.variant === 'start' || s.variant === 'end') return PSEUDO_SIZE;
  return s.height ?? 50;
}

function stateWidth(s: StateSpec): number {
  if (s.variant === 'start' || s.variant === 'end') return PSEUDO_SIZE;
  return s.width ?? 120;
}

/**
 * @vizType VT-107 UML State Machine · A. 엔지니어링/소프트웨어 · dataShape: process · 구조: sequential, branching, cyclic
 * @useWhen 객체/프로토콜의 상태와 이벤트 전이를 모델링할 때
 * @useWhen 수명주기 상태를 명세할 때
 * @avoidWhen 시간순 메시지 교환은 Sequence(VT-108) 사용
 * @avoidWhen 제어 흐름 절차는 Activity(VT-106) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function StateDiagram({
  children,
  data,
  viewBox,
  width = '100%',
  height = '100%',
  title = 'State Diagram',
  ...props
}: StateDiagramProps) {
  if (children) {
    return (
      <Canvas viewBox={viewBox} width={width} height={height} title={title} {...props}>
        {children}
      </Canvas>
    );
  }

  const states = data?.states ?? [];
  const transitions = data?.transitions ?? [];

  const allNodes = states.map((s) => ({
    id: s.id,
    x: s.x,
    y: s.y,
    width: stateWidth(s),
    height: stateHeight(s),
  }));

  const autoViewBox = viewBox ?? (() => {
    if (!allNodes.length) return '0 0 400 400';
    const maxX = Math.max(...allNodes.map((n) => n.x + n.width)) + 20;
    const maxY = Math.max(...allNodes.map((n) => n.y + n.height)) + 20;
    return `0 0 ${maxX} ${maxY}`;
  })();

  return (
    <Canvas
      data={{ nodes: allNodes }}
      viewBox={autoViewBox}
      width={width}
      height={height}
      title={title}
      {...props}
    >
      {states.map((s) => (
        <StateNode
          key={s.id}
          id={s.id}
          x={s.x}
          y={s.y}
          width={stateWidth(s)}
          height={stateHeight(s)}
          title={s.title}
          variant={s.variant ?? 'normal'}
          fill={s.fill}
          stroke={s.stroke}
        />
      ))}
      {transitions.map((t) => (
        <Edge key={t.id} from={t.from} to={t.to} markerEnd="arrow" strokeWidth={1.5} />
      ))}
    </Canvas>
  );
}

StateDiagram.displayName = 'StateDiagram';
