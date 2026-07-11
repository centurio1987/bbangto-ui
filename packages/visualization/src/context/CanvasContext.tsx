import { createContext, useContext } from 'react';
import type { BBox } from '../types/data';

export interface CanvasContextValue {
  registry: Readonly<Record<string, BBox>>;
  uid: string;
}

export const CanvasContext = createContext<CanvasContextValue | null>(null);

export function useCanvasContext(): CanvasContextValue {
  const ctx = useContext(CanvasContext);
  if (!ctx) {
    throw new Error('[bbangto/diagram] useCanvasContext must be called inside DiagramCanvas');
  }
  return ctx;
}
