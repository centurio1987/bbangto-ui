---
'@centurio1987/bbangto-ui-visualization': patch
---

README 의 Provider 밖 렌더 서술을 실측대로 고쳤다(KAN-072).

「Provider 밖에 두면 엣지는 보이지 않는다」고 적었는데, 2026-10-10 chromium 으로 다시 재 보니 선은 그려지지 않지만
화살촉 마커는 따로 칠해져 검은 삼각형으로 남는다. 「원하는 것이 없을 때」 절과 「구현 규약」의 토큰 계층 항목 두 곳을
그렇게 고쳤다. 코드는 바뀌지 않았다.
