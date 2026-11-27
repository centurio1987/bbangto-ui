import type { EdgeLabelOffset } from '../atoms/Edge';
import type { RelationKind } from '../atoms/relationKind';

/** C4 관계가 받는 뜻 — 런타임 통신과 코드 수준 관계(KAN-082 .2). */
export type C4RelationKind = Extract<
  RelationKind,
  'call' | 'asyncMessage' | 'dataFlow' | 'dependency' | 'inheritance' | 'composition' | 'aggregation'
>;
export interface C4PersonSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  description?: string;
  external?: boolean;
}

export interface C4SystemSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  description?: string;
  level?: 'l1' | 'l2' | 'l3';
  external?: boolean;
  fill?: string;
}

/** C4 컨테이너 모양 — 상자(기본) · 데이터베이스 · 메시지 큐. */
export type C4ContainerShape = 'box' | 'database' | 'queue';

export interface C4ContainerSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  technology?: string;
  description?: string;
  fill?: string;
  /** 컨테이너 모양. 데이터베이스 · 큐는 그 모양 부품(DatabaseNode · QueueNode)으로 그린다. 비우면 C4 상자(KAN-082). */
  shape?: C4ContainerShape;
}

export interface C4ComponentSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  technology?: string;
  description?: string;
  fill?: string;
}

export interface C4RelationshipSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
  technology?: string;
  /** 선 가운데 라벨을 이만큼 옮긴다(겹칠 때 비키기, KAN-082). */
  labelOffset?: EdgeLabelOffset;
  /** 관계의 뜻(KAN-082). 적으면 선 모양이 종류마다 갈리고, 둘 이상 쓰이면 범례가 붙는다. */
  kind?: C4RelationKind;
}

/**
 * C4 관계선에 붙는 글 — 「설명」 아래 「[기술]」 두 줄(KAN-082.1 검토에서 고름). 설명만 있으면 설명, 기술만 있으면
 * `[기술]` 한 줄, 둘 다 없으면 그리지 않는다(undefined). C4 템플릿 여섯이 같은 글을 쓰도록 한곳에 둔다.
 */
export function c4RelationshipLabel(r: Pick<C4RelationshipSpec, 'label' | 'technology'>): string | undefined {
  const text = [r.label, r.technology ? `[${r.technology}]` : ''].filter(Boolean).join('\n');
  return text || undefined;
}

export interface C4BoundarySpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}
