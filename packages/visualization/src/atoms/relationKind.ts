import type { MarkerVariant } from './Marker';

/**
 * 관계선의 뜻 — 「도식은 노드가 무엇인가와 화살표가 무엇을 뜻하는가로 구분한다」는 원칙에서, 여섯 도식(배포 · 런타임 ·
 * 데이터 흐름 · 코드 구조 · 동작 · 플로우)의 화살표 뜻을 모은 고정 목록이다(KAN-082 정할 것 2).
 *
 * 템플릿은 이 가운데 그 도식이 쓰는 것만 받는다. 선 모양(`RELATION_LINE_STYLES`)과 범례 견본(`LegendBlock`)이 같은
 * 목록을 읽으므로, 한 도식에 뜻이 다른 화살표를 섞으면 범례 한 줄로 그 뜻을 읽을 수 있다.
 */
export type RelationKind =
  | 'call'
  | 'asyncMessage'
  | 'dataFlow'
  | 'controlFlow'
  | 'deployment'
  | 'network'
  | 'dependency'
  | 'inheritance'
  | 'composition'
  | 'aggregation';

/** 관계 종류 전부 — 범례는 이 순서로 줄을 세운다. */
export const RELATION_KINDS: readonly RelationKind[] = [
  'call',
  'asyncMessage',
  'dataFlow',
  'controlFlow',
  'deployment',
  'network',
  'dependency',
  'inheritance',
  'composition',
  'aggregation',
];

/**
 * 관계 종류 하나의 선 모양. `strokeDasharray` 는 늘 적는다 — 실선은 `'none'` 이다. 비워 두면 스타일 가이드의 연결선
 * 대시(`edge.dashPattern`)가 걸려 실선과 대시로 가른 뜻이 바뀌기 때문이다(README 공통 계약 「뜻을 갖는 실선」).
 */
export interface RelationLineStyle {
  strokeDasharray: string;
  markerStart?: MarkerVariant;
  markerEnd: MarkerVariant;
}

const SOLID = 'none';
const DASH = '6 4';
const DOT = '2 4';

/**
 * 종류마다 선 모양. 대시(실선 · 긴 점선 · 짧은 점선)와 양 끝 화살촉의 짝이 열 가지 모두 다르다.
 *
 * - 호출은 실선 + 채운 화살촉, 비동기 메시지는 긴 점선 + 채운 화살촉, 데이터 이동은 짧은 점선 + 채운 화살촉.
 * - 제어 흐름은 실선 + 열린 화살촉, 배치는 짧은 점선 + 열린 화살촉, 의존은 긴 점선 + 열린 화살촉(UML 의존 표기).
 * - 네트워크 연결은 방향이 없어 화살촉 없는 실선이다.
 * - 상속 · 포함 · 집합은 UML 표기 그대로다 — 상속은 빈 삼각형, 포함 · 집합은 전체 쪽(from)에 마름모만 붙는다.
 */
export const RELATION_LINE_STYLES: Readonly<Record<RelationKind, RelationLineStyle>> = {
  call: { strokeDasharray: SOLID, markerEnd: 'arrow' },
  asyncMessage: { strokeDasharray: DASH, markerEnd: 'arrow' },
  dataFlow: { strokeDasharray: DOT, markerEnd: 'arrow' },
  controlFlow: { strokeDasharray: SOLID, markerEnd: 'arrowOpen' },
  deployment: { strokeDasharray: DOT, markerEnd: 'arrowOpen' },
  network: { strokeDasharray: SOLID, markerEnd: 'none' },
  dependency: { strokeDasharray: DASH, markerEnd: 'arrowOpen' },
  inheritance: { strokeDasharray: SOLID, markerEnd: 'triangleOpen' },
  composition: { strokeDasharray: SOLID, markerStart: 'diamond', markerEnd: 'none' },
  aggregation: { strokeDasharray: SOLID, markerStart: 'diamondOpen', markerEnd: 'none' },
};

/** 범례에 쓰는 기본 이름. 템플릿 데이터 `legend.names` 나 `LegendBlock` 의 `names` 로 바꾼다. */
export const RELATION_KIND_NAMES: Readonly<Record<RelationKind, string>> = {
  call: '호출',
  asyncMessage: '비동기 메시지',
  dataFlow: '데이터 이동',
  controlFlow: '제어 흐름',
  deployment: '배치',
  network: '네트워크 연결',
  dependency: '의존',
  inheritance: '상속',
  composition: '포함',
  aggregation: '집합',
};

/**
 * 관계 종류 하나를 `Edge` 에 넘길 속성으로 바꾼다 — 선 모양에 더해, 그 선이 어느 종류인지 공개 훅
 * `data-bbangto-viz-relation-kind` 로 단다. 종류가 없으면 빈 객체라 템플릿의 원래 선 모양이 그대로 남는다.
 */
export function relationEdgeProps(kind: RelationKind | undefined): {
  strokeDasharray?: string;
  markerStart?: MarkerVariant;
  markerEnd?: MarkerVariant;
  'data-bbangto-viz-relation-kind'?: RelationKind;
} {
  if (!kind) return {};
  const s = RELATION_LINE_STYLES[kind];
  return { ...s, 'data-bbangto-viz-relation-kind': kind };
}

/** 관계 목록에서 쓰인 종류만 `RELATION_KINDS` 순서로 모은다(범례 줄). */
export function usedRelationKinds(items: readonly { kind?: RelationKind }[]): RelationKind[] {
  const used = new Set(items.map((i) => i.kind).filter((k): k is RelationKind => !!k));
  return RELATION_KINDS.filter((k) => used.has(k));
}

// ──────────────────────────────────────────────
// 표기법 템플릿의 관계 매핑 — 바깥 보고서 P11 ①: 소비자가 Edge 로 같은 그림을 그리려면 이 매핑이 필요하다.
// ──────────────────────────────────────────────

/** UML 클래스 도식의 관계 종류(ClassDiagram). */
export type ClassRelationshipKind =
  | 'inheritance'
  | 'composition'
  | 'aggregation'
  | 'association'
  | 'dependency'
  | 'realization';

/**
 * ClassDiagram 이 관계 종류마다 쓰는 선 모양. 포함 · 집합은 전체 쪽(from)에 마름모만 붙고 부분 쪽 화살촉이 없다(P11 ②).
 * 의존 · 실현의 대시는 UML 표기의 짧은 점선이다 — `RELATION_LINE_STYLES` 의 의존과 대시 길이가 다른 것은
 * ClassDiagram 이 UML 표기 템플릿이라 지금 그림을 그대로 두려는 것이다.
 */
export function classRelationshipLineStyle(kind: ClassRelationshipKind): {
  markerStart?: MarkerVariant;
  markerEnd: MarkerVariant;
  strokeDasharray?: string;
} {
  switch (kind) {
    case 'inheritance':   return { markerEnd: 'triangleOpen' };
    case 'realization':   return { markerEnd: 'triangleOpen', strokeDasharray: '6 3' };
    case 'composition':   return { markerStart: 'diamond', markerEnd: 'none' };
    case 'aggregation':   return { markerStart: 'diamondOpen', markerEnd: 'none' };
    case 'dependency':    return { markerEnd: 'arrowOpen', strokeDasharray: '5 3' };
    case 'association':
    default:              return { markerEnd: 'arrow' };
  }
}

/** ER 도식의 관계 끝 카디널리티(ERDiagram). */
export type ERCardinality = 'one' | 'many' | 'zeroOrOne' | 'oneOrMany' | 'zeroOrMany';

/** ERDiagram 이 카디널리티마다 쓰는 까마귀발 마커. */
export function erCardinalityMarker(c: ERCardinality): MarkerVariant {
  switch (c) {
    case 'one':        return 'erOne';
    case 'many':       return 'erMany';
    case 'zeroOrOne':  return 'erZeroOrOne';
    case 'oneOrMany':  return 'erOneOrMany';
    case 'zeroOrMany': return 'erZeroOrMany';
  }
}
