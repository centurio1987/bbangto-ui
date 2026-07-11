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
}

export interface C4BoundarySpec {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}
