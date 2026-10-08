---
'@centurio1987/bbangto-ui-tokens': minor
'@centurio1987/bbangto-ui-foundations': patch
'@centurio1987/bbangto-ui-style-guide-catalog': patch
---

키보드 포커스 테두리 색(`semantic.border.focus`)이 모든 색 스킴에서 화면 표면과 3:1 이상이 된다(KAN-060, WCAG 1.4.11).

**tokens** — 포커스 대비를 재는 `FOCUS_CONTRAST_MIN`(3) · `surfaceColors` · `focusContrast` 를 내보낸다.
`focusContrast(semantic)` 은 `border.focus` 와 `background.base`·`elevated` 사이의 최저 대비와 그 자리를 돌려준다.
반투명 `elevated` 는 흰색이 아니라 `base` 위에 합성해 잰다.

**foundations** — 포커스 색이 밝은 표면에 묻히던 21개를 색조는 두고 명도만 낮춘 값으로 바꾼다:
`aurora-yellow` · `celluloid` · `charcoal-warm` · `commerce-noir` · `coral` · `cosmonaut` · `dark-chrome` ·
`gold-rush` · `jade-leaf` · `jungle-night` · `lime` · `magazine-light` · `midnight-ink` · `mint-code` ·
`neon-yellow` · `obsidian-gold` · `oxide-green` · `sunflower` · `sunset` · `volt-emerald` · `warm-parchment`.
`border.focus` 를 쓰는 Input·Link·Slider·RichTextEditor 의 포커스 테두리 색도 함께 바뀐다.

**style-guide-catalog** — 같은 규칙으로 색 스킴 10개의 포커스 색을 바꾼다:
`neobrutalism-editorial-01`(default) · `skeuomorphism-tactile-01`(default · green) · `kawaii-pastel-01`(lavender) ·
`tactile-texture-01`(default) · `halftone-dot-print-01`(default) · `punk-grunge-graffiti-01`(default) ·
`ai-surreal-gradient3d-01`(light) · `pixel-art-retro-01`(arcade-paper) · `iridescent-chrome-01`(light).
`auditFocusContrast(catalog)` 를 내보낸다 — 모든 색 스킴에서 포커스 대비 미달을 목록으로 돌려준다.
