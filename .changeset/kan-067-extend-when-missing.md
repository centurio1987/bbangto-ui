---
'@centurio1987/bbangto-ui-core': patch
'@centurio1987/bbangto-ui-visualization': patch
---

배포 README 에 「원하는 것이 없을 때」 절을 더하고, visualization 배포물에서 저장소 관리 문서 두 개를 뺐다(KAN-067).

원하는 컴포넌트나 유형이 없을 때, 앱을 만드는 에이전트가 앱 안에서 확장하지 않고 라이브러리를 떠나거나
개선 요청으로 결론을 내던 자리다. README 는 목록에서 고르는 법만 적었고, 함께 실린 `visualization-type-inventory.md`
의 「갭이 보이면 백로그에 행 추가」 지시는 라이브러리에 요청하라는 말로 읽힐 수 있었다.

- core README: 앱 안에 확장 컴포넌트를 만드는 순서 넷, `--bbangto-*` 변수 갈래, `ref`·`className` 이 넘어가지 않는
  예외(`DataGrid`, React 18 의 `Skeleton`·`Text`), 감쌀 때 걸리는 자리 둘(아이콘 색 고정 · `Button` 의 hover 인라인 색),
  별점 입력 예제.
- visualization README: atom·molecule 로 조립하는 순서와 부품 표, 결정 그림 예제, 범위 밖 3종(VT-520·VT-610·VT-611)의 사유.
  「Provider 밖에서는 무채색으로 그려진다」는 서술은 틀렸다 — 색 prop 이 없는 도형은 검게 채워지고 엣지는 보이지 않는다
  (chromium 실측). 그 사실로 고쳤다.
- visualization 배포물: `visualization-type-inventory.md`·`TYPE_METADATA_STRATEGY.md` 를 `files` 에서 뺐다. 두 문서는
  저장소에 그대로 있고, README 와 `.d.ts` 주석이 GitHub 링크로 가리킨다.

### 바뀐 동작

`node_modules/@centurio1987/bbangto-ui-visualization/` 에서 위 두 문서를 파일로 읽던 도구는 그 파일을 찾지 못한다.
README 의 「저장소에만 있는 문서」 링크로 옮긴다. 코드·export·타입은 바뀌지 않았다.
