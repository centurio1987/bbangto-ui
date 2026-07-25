import { type ReactNode } from 'react';
import { SequenceDiagram } from './SequenceDiagram';
import type { SequenceDiagramProps, SequenceDiagramData } from './SequenceDiagram';

export type { SequenceDiagramData as ZenUMLDiagramData };

export interface ZenUMLDiagramProps extends Omit<SequenceDiagramProps, 'monoFont'> {
  children?: ReactNode;
}

export function ZenUMLDiagram({ title = 'ZenUML Diagram', ...props }: ZenUMLDiagramProps) {
  return <SequenceDiagram monoFont title={title} {...props} />;
}

ZenUMLDiagram.displayName = 'ZenUMLDiagram';
