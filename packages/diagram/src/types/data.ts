export interface BBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface NodeSpec {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  kind?: string;
}

export interface EdgeSpec {
  id: string;
  from: string;
  to: string;
  label?: string;
}
