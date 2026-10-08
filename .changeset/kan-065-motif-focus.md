---
'@centurio1987/bbangto-ui-style-guide-catalog': patch
---

style guide 가 자기 CSS 로 그리는 모티프 버튼 포커스 테두리가 모든 색 스킴에서 화면 표면과 3:1 이상이 된다(KAN-065, WCAG 1.4.11).

포커스 테두리가 강조색이나 고정 색을 써서 밝은 바탕에 묻히던 style guide 5개(색 스킴 7개)가 이제 포커스 색 토큰
(`--bbangto-semantic-border-focus`)을 읽는다:
`neobrutalism-editorial-01`(default) · `minimal-saas-01`(default · dark · warm, 3px 고리 모양은 그대로) ·
`gothic-medieval-digital-01`(light) · `shattered-glass-cinematic-01`(light) · `iridescent-chrome-01`(light).
`tactile-texture-01` 의 포커스 규칙도 같은 토큰을 읽게 바꿨지만, 이 규칙은 `!important` 가 없어 core 가 그리는 포커스
테두리(같은 토큰)에 가려 왔으므로 화면은 그대로다.
같은 토큰을 따르게 되면서 `shattered-glass-cinematic-01`(rose)은 금색에서 시안으로, `iridescent-chrome-01`(default)은
라일락에서 시안으로 포커스 테두리 색이 바뀐다 — 둘 다 그 색 스킴의 포커스 색이다.

어느 색 스킴에서도 만들어지지 않는 semantic 변수를 읽어 늘 고정 색이던 다섯 자리가 색 스킴을 따른다:
`ai-surreal-gradient3d-01` accent 태그 글자·테두리(`--bbangto-semantic-border-focus`) ·
`blueprint-technical-01` 카드 배경(`--bbangto-semantic-background-elevated`, whiteprint 에서 짙은 남색 카드가 밝아진다) ·
`scandi-warm-01`·`spatial-3d-01` muted 태그 테두리(`--bbangto-semantic-border-base`).
