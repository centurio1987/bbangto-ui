---
"@centurio1987/bbangto-ui-core": major
"@centurio1987/bbangto-ui-tokens": major
"@centurio1987/bbangto-ui-foundations": major
---

ORD-006 — theme→foundation 재편 · 카탈로그 분리 · pattern/block wrapping 인터페이스 (breaking).

**core**
- `ThemeProvider`/`useTheme` → `FoundationProvider`/`useFoundation` (prop `theme`→`foundation`, DOM attr `data-bbangto-theme`→`data-bbangto-foundation`).
- base foundation 3종(`lightFoundation`/`darkFoundation`/`highContrastFoundation`) 내장 export.
- `themeToStyleGuide` → `foundationToStyleGuide`.
- StyleGuide에 `wrapperBlocks`/`wrapperPatterns` + `useWrapperComponent`/`useWrapperBlock`/`useWrapperPattern` 추가.
- style guide 카탈로그(`styleGuides` 배럴) export 제거 → `@centurio1987/bbangto-ui-style-guide-catalog`로 이전.

**tokens**
- `BbangtoTheme` → `BbangtoFoundation`, `ThemeOverride` → `FoundationOverride`.
- `themeToStyleObject`/`themeToCSSString` → `foundationToStyleObject`/`foundationToCSSString`, `mergeTheme` → `mergeFoundation`.
- CSS 변수 prefix `--bbangto-`는 유지.

**foundations** (구 `@centurio1987/bbangto-ui-themes`에서 rename)
- 패키지명 `@centurio1987/bbangto-ui-themes` → `@centurio1987/bbangto-ui-foundations`.
- base 3종은 core로 이전(이 패키지에서 제거). 확장 foundation(amber + external 74)만 제공.
- 객체명 `*Theme` → `*Foundation`, `themeMap` → `foundationCatalog`(amber 2 + external 74).
