import { type ReactNode } from 'react';
import { SequenceDiagram } from './SequenceDiagram';
import type { SequenceDiagramProps, SequenceDiagramData } from './SequenceDiagram';

export type { SequenceDiagramData as ZenUMLDiagramData };

export interface ZenUMLDiagramProps extends Omit<SequenceDiagramProps, 'monoFont'> {
  children?: ReactNode;
}

/**
 * @vizType VT-108 UML Sequence Diagram · A. 엔지니어링/소프트웨어 · dataShape: process, temporal · 구조: sequential, relational
 * @useWhen API·시나리오의 시간순 상호작용을 설계할 때
 * @useWhen 참여자 간 메시지 순서를 명세할 때
 * @avoidWhen 정적 클래스 구조는 Class(VT-101) 사용
 * @avoidWhen 상태 전이는 State(VT-107) 사용
 * @seeTypeMeta 유형 87종 채택 메타 정본 — `@centurio1987/bbangto-ui-visualization/type-meta`의 selectVizTypes()/vizTypeRegistry, 파일로는 type.manifest.json
 */
export function ZenUMLDiagram({ title = 'ZenUML Diagram', ...props }: ZenUMLDiagramProps) {
  return <SequenceDiagram monoFont title={title} {...props} />;
}

ZenUMLDiagram.displayName = 'ZenUMLDiagram';
