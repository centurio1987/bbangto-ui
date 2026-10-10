---
'@centurio1987/bbangto-ui-visualization': patch
'@centurio1987/bbangto-ui-tokens': patch
---

스타일 가이드의 연결선 대시(`edge.dashPattern`)를 어느 선이 따르는지 정한다(KAN-070).

관계선은 템플릿과 상관없이 가이드 대시를 따르고, 표준 표기법 템플릿의 연결선과 축은 따르지 않는다.
카탈로그 가이드 30개와 base foundation 은 모두 `edge.dashPattern: ''`(실선)이라 지금 있는 그림은 바뀌지 않는다.
props 와 export 는 그대로다.

### 바뀐 동작

- UML·BPMN·ArchiMate·SysML·DMN·ER·Packet 템플릿(유형 메타 `standard` 태그 28개 export 중 C4 여섯을 뺀 22개)은 바깥
  `<svg>` 에 `data-viz-notation` 이 붙고, 그 안의 연결선은 가이드 대시를 따르지 않는다. 표기법에서 실선과 대시가 서로 다른
  관계를 뜻하기 때문이다(BPMN 시퀀스 흐름이 점선이면 메시지 흐름으로 읽힌다). 템플릿이 직접 넘기는 대시(UML 의존 `5 3` 등)는 그대로다.
- C4 템플릿 여섯은 표준 태그가 있어도 가이드 대시를 따른다. C4 표기는 선 모양을 정하지 않는다(c4model.com/diagrams/notation).
- SitemapTree·WorkBreakdownStructure 의 트리 가지와 IsometricScene 의 연결선이 가이드 대시를 따른다.
  `Edge` 를 쓰지 않아 지금까지는 대시 가이드에서도 실선이었다.
- Flowchart 는 `dashed` 선이 하나라도 섞이면 나머지 선을 실선으로 고정한다. 섞이지 않으면 지금처럼 가이드 대시를 따른다.
- TimelineRoadmap 의 시간 축은 가이드 대시를 따르지 않는다.
- `edge.dashPattern` JSDoc 에 위 범위를 적었다(tokens 는 문서만 바뀐다).
