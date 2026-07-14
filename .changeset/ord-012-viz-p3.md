---
'@centurio1987/bbangto-ui-visualization': minor
---

ORD-012: visualization 유형 인벤토리 P3 11종 구현(additive — 기존 타입 무변경). 잔여 인벤토리 0(P1·P2·P3 전량 ✅).

- E 데이터 차트 템플릿: Boxplot(VT-510)·ChordDiagram(VT-516)
- A 엔지니어링 다이어그램 템플릿: UMLPackageDiagram(VT-102)·DMNDiagram(VT-124)·BPMNCollaborationDiagram(VT-123, 🔶 근사→전용 승격)·ArchiMateViewpointDiagram(VT-121)
- C 계층 템플릿: WorkBreakdownStructure(VT-307, 🔶 근사→전용 승격)
- F/G 패턴: InformationalInfographic(VT-604)·Iceberg(VT-704)·BusinessModelCanvas(VT-707, 표준 비대칭 9블록)·Honeycomb(VT-709)
- 신규 geometry(순수 함수 + vitest 단위 테스트): boxplot(Tukey 5수 요약·outlier)·chord(비정방/음수/합0/self-chord/pad 초과 반환 규약)·iceberg(빙산 폴리곤 사다리꼴 밴드)·hexgrid(벌집 오프셋 패킹) + tree.ts `wbsNumbering`(다중 루트·순환 방어)
- 신규 shape: Node `folder`(UML 패키지 탭) + DMN inline path 헬퍼(knowledgeSource 물결·bkm 모서리 컷)
- 전부 공통 계약(PLAN §C-2) 준수 — 신규 paint 채널 0, 면 구분은 팔레트색+fill-opacity. 6개 스타일 가이드 계약 CSS만으로 자동 커버(가이드 파일 무변경).
