import type { EdgeLabelOffset } from '../atoms/Edge';
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
}

/**
 * C4 관계선에 붙는 글 — 「설명 [기술]」(C4 표기). 설명만 있으면 설명, 기술만 있으면 `[기술]`, 둘 다 없으면
 * 그리지 않는다(undefined). C4 템플릿 여섯이 같은 글을 쓰도록 한곳에 둔다(KAN-082).
 */
export function c4RelationshipLabel(r: Pick<C4RelationshipSpec, 'label' | 'technology'>): string | undefined {
  const text = [r.label, r.technology ? `[${r.technology}]` : ''].filter(Boolean).join(' ');
  return text || undefined;
}

export interface C4BoundarySpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}
