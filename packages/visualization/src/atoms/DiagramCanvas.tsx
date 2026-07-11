import React, { useId, useMemo, type ReactNode } from 'react';
import { CanvasContext } from '../context/CanvasContext';
import type { BBox, NodeSpec, EdgeSpec } from '../types/data';
import { dvar } from '../tokens/contract';
import { DiagramMarkers } from './Marker';

export interface DiagramCanvasProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'role'> {
  children?: ReactNode;
  data?: { nodes: NodeSpec[]; edges?: EdgeSpec[] };
  viewBox?: string;
  width?: number | string;
  height?: number | string;
  title?: string;
  desc?: string;
  accessible?: 'img' | 'structured';
  markerStroke?: string;
  markerFill?: string;
  markerSize?: number;
}

function buildRegistryFromData(nodes: NodeSpec[]): Record<string, BBox> {
  const reg: Record<string, BBox> = {};
  for (const n of nodes) {
    reg[n.id] = { x: n.x, y: n.y, width: n.width, height: n.height };
  }
  return reg;
}

function scanChildRegistry(children: ReactNode): Record<string, BBox> {
  const reg: Record<string, BBox> = {};
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const p = child.props as Record<string, unknown>;
    const id = p['id'];
    if (
      typeof id === 'string' &&
      typeof p['x'] === 'number' &&
      typeof p['y'] === 'number' &&
      typeof p['width'] === 'number' &&
      typeof p['height'] === 'number'
    ) {
      reg[id] = {
        x: p['x'] as number,
        y: p['y'] as number,
        width: p['width'] as number,
        height: p['height'] as number,
      };
    }
  });
  return reg;
}

export const DiagramCanvas = React.forwardRef<SVGSVGElement, DiagramCanvasProps>(
  (
    {
      children,
      data,
      viewBox,
      width = '100%',
      height = '100%',
      title,
      desc,
      accessible = 'img',
      markerStroke = '#111111',
      markerFill = '#111111',
      markerSize = 8,
      style,
      ...props
    },
    ref,
  ) => {
    const uid = useId().replace(/:/g, 'c');

    const registry = useMemo<Record<string, BBox>>(() => {
      if (data) return buildRegistryFromData(data.nodes);
      return scanChildRegistry(children);
    }, [data, children]);

    const ctxValue = useMemo(() => ({ registry, uid }), [registry, uid]);

    const titleId = `${uid}-title`;
    const descId = `${uid}-desc`;
    const hasTitle = Boolean(title);
    const hasDesc = Boolean(desc);

    const effectiveBg = dvar('canvas', 'bg');

    return (
      <CanvasContext.Provider value={ctxValue}>
        <svg
          ref={ref}
          role={accessible === 'structured' ? 'group' : 'img'}
          aria-labelledby={
            hasTitle
              ? [titleId, hasDesc ? descId : ''].filter(Boolean).join(' ')
              : undefined
          }
          viewBox={viewBox}
          width={width}
          height={height}
          style={{ overflow: 'visible', background: effectiveBg, ...style }}
          data-bbangto-diagram-canvas
          data-bbangto-diagram-canvas-uid={uid}
          {...props}
        >
          {hasTitle && <title id={titleId}>{title}</title>}
          {hasDesc && <desc id={descId}>{desc}</desc>}
          <defs>
            <DiagramMarkers
              uid={uid}
              stroke={markerStroke}
              fill={markerFill}
              size={markerSize}
            />
          </defs>
          {children}
        </svg>
      </CanvasContext.Provider>
    );
  },
);

DiagramCanvas.displayName = 'DiagramCanvas';
