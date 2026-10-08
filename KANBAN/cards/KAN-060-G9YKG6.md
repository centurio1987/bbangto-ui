---
card: KAN-060-G9YKG6
title: 포커스 테두리 색 대비 3:1 — border.focus 토큰 정리와 대비 게이트
created: 2026-10-08
scope: packages/tokens/src/contrast.ts, packages/tokens/src/index.ts, packages/foundations/src/themes/**, packages/foundations/src/focusContrast.test.ts, packages/style-guide-catalog/src/accessibilityAudit.ts, packages/style-guide-catalog/src/accessibility.test.ts, packages/style-guide-catalog/src/index.ts, packages/style-guide-catalog/src/neobrutalismEditorial.tsx, packages/style-guide-catalog/src/skeuomorphismTactile.tsx, packages/style-guide-catalog/src/kawaiiPastel.tsx, packages/style-guide-catalog/src/tactileTexture.tsx, packages/style-guide-catalog/src/halftoneDotPrint.tsx, packages/style-guide-catalog/src/punkGrungeGraffiti.tsx, packages/style-guide-catalog/src/aiSurrealGradient3d.tsx, packages/style-guide-catalog/src/pixelArtRetro.tsx, packages/style-guide-catalog/src/iridescentChrome.tsx, packages/style-guide-catalog/src/blueprintTechnical.tsx, packages/style-guide-catalog/src/glitchDistortion.tsx, packages/style-guide-catalog/src/grainyBlurDreamy.tsx, packages/style-guide-catalog/src/halftoneGlitchColorsep.tsx, packages/style-guide-catalog/src/heritageFolkOrnament.tsx, packages/style-guide-catalog/src/naiveDoodle.tsx, packages/style-guide-catalog/src/opArtKinetic.tsx, packages/style-guide-catalog/src/romanticBotanical.tsx, packages/style-guide-catalog/src/warpedCheckerboard.tsx, apps/storybook/src/real-input/FocusVisible.realinput.test.tsx, apps/storybook/src/real-input/mount.tsx, apps/storybook/src/stories/_catalogStory.tsx, README.md, .changeset/kan-060-*.md
---

# KAN-060-G9YKG6 — 포커스 테두리 색 대비 3:1 — border.focus 토큰 정리와 대비 게이트

## 전략
카드 메모: KAN-059 착수 전 계획에서 발견(2026-10-07). 테두리는 `border.focus` 를 실행 때 읽으므로 토큰만 고치면 KAN-059 결과에 그대로 반영된다.

### 문제

KAN-059 가 키보드 포커스 테두리를 모든 상호작용 컴포넌트에서 `semantic.border.focus` 로 그리게 했다. 그런데 이 색이 배경과 거의 같은 색 스킴이 있어서, 그 스킴을 고른 사용자는 Tab 을 눌러도 어디에 포커스가 있는지 보지 못한다. WCAG 1.4.11(비텍스트 대비)은 포커스 표시처럼 상태를 알려 주는 그림이 이웃 색과 3:1 이상이기를 요구한다. `border.focus` 는 Input·Link·Slider·RichTextEditor 의 포커스 테두리도 칠하므로 그쪽도 같은 문제를 안고 있다.

2026-10-08 main(`826d26c`) 소스를 `tsx` 로 직접 읽어 다시 쟀다(빌드 산출물은 KAN-059 병합 전 것이라 쓰지 않았다). 잰 것은 `border.focus` 와 배경 둘(`background.base` · `background.elevated`) 중 낮은 쪽의 대비이고, 계산은 `packages/tokens/src/contrast.ts` 의 `contrastRatio` 다.

| 묶음 | 색 스킴 수 | 3:1 미달 |
|---|---|---|
| core base foundation (light · dark · high-contrast) | 3 | 0 |
| 확장 foundation (`packages/foundations`) | 76 | 21 |
| style guide 색 스킴 (51개 × 3) | 153 | 10 (style guide 9개) |

카드 메모의 「style guide 13개 이상」과 숫자가 다른 이유는 측정 방법에 있다. 유리 효과를 쓰는 어두운 style guide 는 `elevated` 가 `rgba(255,255,255,0.08)` 같은 반투명 색인데, `contrastRatio` 는 반투명 배경을 **흰색 위에** 합성한다. 실제로는 어두운 `base` 위에 깔리므로 흰색 위로 재면 거짓 미달이 나온다(cyberpunk-hud 1.17, vaporwave-synth 1.24 등 8건). 반투명 `elevated` 를 `base` 의 각 색 위에 합성해 다시 재면 10건만 남는다. 그라디언트 배경도 이번에는 잰다 — 색 스톱마다 재서 가장 낮은 값을 쓴다(`effectiveBgColors`, 본문 대비 감사와 같은 방식).

미달 31건은 모두 밝은 배경 위의 밝은 포커스 색이다(노랑·연두·민트·밝은 빨강 계열). 어두운 배경에서 미달인 것은 없다.

### 접근

1. **값을 고치는 규칙은 하나다 — 색조는 두고 명도만 낮춘다.** 지금 색을 OKLCH(사람 눈에 고르게 느껴지는 색 공간)로 옮겨 색조(hue)를 고정하고, 명도(L)를 0.005씩 낮추며 `base`·`elevated` 모두와 3:1 이 되는 첫 값을 쓴다. 화면에 그릴 수 없는 색이 되면 채도만 그만큼 줄인다. 브랜드 색의 느낌은 남기고 바꾸는 폭은 가장 작게 하려는 것이다. 이 규칙으로 31건 모두 값이 나왔다(아래 표). 대비는 3.00~3.07 이라 여유가 거의 없다 — 대신 게이트가 앞으로 배경이 바뀌는 것도 잡는다.
2. **바꾸는 것은 `focus:` 한 칸뿐이다.** 같은 색이 `primary` 나 장식에 함께 쓰이는 파일이 있다(`neonYellow` 는 `primary` 도 `#FAFF69`, style guide 넷은 `NEO.gold`·`CANDY`·`CYAN`·`MAGENTA` 상수를 `focus` 에 쓴다). 상수를 고치면 버튼·장식 색까지 바뀌므로, `focus:` 칸만 새 값으로 바꾸고 상수는 그대로 둔다.
3. **잴 기준을 함수 하나로 모은다 — `packages/tokens/src/contrast.ts`.** 세 자리(foundation 검사 · style guide 검사 · Storybook 확인)가 같은 규칙으로 재야 하므로, 기존 대비 유틸 옆에 셋을 더한다.
   - `FOCUS_CONTRAST_MIN = 3` — WCAG 1.4.11 하한.
   - `surfaceColors(background)` — `base` 의 색들(그라디언트면 스톱마다)과, `elevated` 를 그 위에 합성한 색들. 반투명 `elevated` 를 흰색이 아니라 `base` 위에 얹는 것이 이 함수의 요점이다.
   - `focusContrast(semantic)` — `border.focus` 와 `surfaceColors` 의 최저 대비와, 그 값이 나온 자리(`base`/`elevated`). 색을 못 읽으면 `null`.
4. **게이트는 둘이다 — 어기면 `pnpm test:unit` 이 빨강이 된다.**
   - `packages/foundations/src/focusContrast.test.ts` — `foundationCatalog` 76개 전부. fixture 로 「노랑 포커스 + 흰 배경」을 넣어 빨강이 나는 것도 함께 본다.
   - `packages/style-guide-catalog/src/accessibility.test.ts` — style guide 153개 색 스킴 전부와 core base 3개. base 3개를 여기서 재는 이유는 `foundations` 패키지가 core 를 가져올 수 없어서다(`rootDir` 이 `src`, core 의존 없음). style-guide-catalog 는 이미 core 에 의존한다. 감사 함수 `auditFocusContrast` 는 기존 `auditContrast` 옆(`accessibilityAudit.ts`)에 두고 같은 모양의 위반 목록을 낸다.
5. **브라우저 확인도 하나 둔다.** 토큰 값만 맞고 테두리가 실제로 그 색으로 그려지지 않으면 의미가 없다. `FocusVisible.realinput.test.tsx` 에 「neon-yellow foundation 에서 Button 에 Tab 으로 오면 테두리 색이 배경과 3:1 이상」 항목을 더한다(지금 값이면 1.03 이라 빨강). 실제 입력 마운트(`mount.tsx`)는 light foundation 으로 고정돼 있어 foundation 을 받는 인자를 더한다. style guide 쪽은 카탈로그 스토리의 `FoundationPresets` 접근성 확인(`_catalogStory.tsx` 7번)에 `focusContrast` 를 더한다.

### 새 값

**foundation 21개** (`packages/foundations/src/themes/<이름>.ts`)

| foundation | 지금 값 | 지금 대비 | 새 값 | 새 대비 |
|---|---|---|---|---|
| `aurora-yellow` | `#EFDF00` | 1.32 | `#9E9301` | 3.04 |
| `celluloid` | `#00D1B2` | 1.87 | `#0DA38A` | 3.04 |
| `charcoal-warm` | `#01A4FF` | 2.59 | `#0197EC` | 3.03 |
| `commerce-noir` | `#96BF48` | 2.04 | `#779E1E` | 3.01 |
| `coral` | `#FF5A5F` | 2.92 | `#FB575C` | 3.04 |
| `cosmonaut` | `#FFFFFF` | 1.00 | `#909090` | 3.06 |
| `dark-chrome` | `#FF6363` | 2.79 | `#F85C5D` | 3.01 |
| `gold-rush` | `#F3BA2F` | 1.69 | `#B88A06` | 3.01 |
| `jade-leaf` | `#00ED64` | 1.51 | `#07A745` | 3.04 |
| `jungle-night` | `#1DB954` | 2.48 | `#07A848` | 3.00 |
| `lime` | `#9FE870` | 1.41 | `#5DA224` | 3.02 |
| `magazine-light` | `#F6F600` | 1.11 | `#969604` | 3.02 |
| `midnight-ink` | `#F5A623` | 1.94 | `#C78303` | 3.01 |
| `mint-code` | `#3ECF8E` | 1.91 | `#07A56B` | 3.05 |
| `neon-yellow` | `#FAFF69` | 1.03 | `#939603` | 3.05 |
| `obsidian-gold` | `#DAA520` | 2.14 | `#B98A04` | 3.00 |
| `oxide-green` | `#76B900` | 2.31 | `#66A103` | 3.02 |
| `sunflower` | `#FFD02F` | 1.41 | `#AF8C08` | 3.06 |
| `sunset` | `#FF7000` | 2.66 | `#EE6801` | 3.04 |
| `volt-emerald` | `#F59E0B` | 2.06 | `#CA8105` | 3.02 |
| `warm-parchment` | `#FF6B6B` | 2.66 | `#F26061` | 3.04 |

**style guide 색 스킴 10개** (`packages/style-guide-catalog/src/`)

| style guide · 색 스킴 | 파일 | 지금 값 | 지금 대비 | 새 값 | 새 대비 |
|---|---|---|---|---|---|
| `neobrutalism-editorial-01` · `default` | `neobrutalismEditorial.tsx` | `#E9C766` | 1.47 | `#A9881C` | 3.02 |
| `skeuomorphism-tactile-01` · `default` | `skeuomorphismTactile.tsx` | `#2F6FB0` | 2.69 | `#2566A6` | 3.06 |
| `skeuomorphism-tactile-01` · `green` | `skeuomorphismTactile.tsx` | `#B4762B` | 2.06 | `#955A00` | 3.07 |
| `kawaii-pastel-01` · `lavender` | `kawaiiPastel.tsx` | `#FF7FB6` | 2.14 | `#DF639A` | 3.01 |
| `tactile-texture-01` · `default` | `tactileTexture.tsx` | `#FF6FA5` | 2.44 | `#EB5D94` | 3.01 |
| `halftone-dot-print-01` · `default` | `halftoneDotPrint.tsx` | `#0098D4` | 2.97 | `#0596D1` | 3.04 |
| `punk-grunge-graffiti-01` · `default` | `punkGrungeGraffiti.tsx` | `#FF2D78` | 2.83 | `#F92574` | 3.01 |
| `ai-surreal-gradient3d-01` · `light` | `aiSurrealGradient3d.tsx` | `#0EA5C4` | 2.63 | `#0B99B6` | 3.03 |
| `pixel-art-retro-01` · `arcade-paper` | `pixelArtRetro.tsx` | `#FF4D4D` | 2.90 | `#FB494A` | 3.02 |
| `iridescent-chrome-01` · `light` | `iridescentChrome.tsx` | `#2AA9C9` | 2.48 | `#0599B9` | 3.02 |

### 버린 대안

- **포커스 색을 글자색(`foreground.base`)으로 통일** — 대비는 넉넉하지만 31개 스킴의 브랜드 색 느낌이 모두 사라진다. 같은 색 스킴 안에서 Input 포커스 테두리와 링크 포커스 색도 검정이 된다.
- **두 겹 테두리(포커스 색 + 배경색 고리)로 규칙을 바꾸기** — 어떤 배경에서도 보이게 하는 WCAG 기법(C40)이지만, KAN-059 가 정한 공용 규칙(`a11y/focusRing.ts`)과 19자리의 화면 확인을 다시 열어야 한다. 이 카드는 토큰 값과 게이트만 다룬다.
- **명도 조정을 실행 때 계산** — 테마 파일의 값과 화면 색이 달라져 디자이너가 파일을 보고 색을 알 수 없다. 값은 파일에 리터럴로 둔다.
- **여유를 두고 3.5:1 같은 더 높은 목표** — 31개 색이 지금보다 더 어두워진다. 기준은 WCAG 하한(3:1)이고 게이트가 회귀를 막는다.

### 범위 밖

- 안쪽 테두리(`FOCUS_RING_INSET`)가 그려지는 Menu·TreeView 항목, NumberField 증감 버튼, Radio 조각은 항목 자신의 배경(선택·마우스 올림 색) 위에 그려진다. 그 색과의 대비는 재지 않는다 — 카드 목표가 `base`·`elevated` 다.
- style guide 가 자기 CSS 로 그리는 포커스 테두리(예: Neobrutalism 버튼의 `--bbangto-ext-accent` 금색 테두리, minimalSaas 의 3px 고리)는 `border.focus` 를 안 읽으므로 이 게이트에 안 걸린다.
- `cosmonaut` 는 `primary` 도 흰 배경에 흰색(`#FFFFFF`)이라 기본 버튼이 안 보인다. 포커스 색만 회색(`#909090`)으로 고치고 나머지는 건드리지 않는다.
- 시각화 패키지 — 시각화 foundation 에는 `border.focus` 가 없다.

### 재작업 — 검토 항목 3 (2026-10-08 유저 선택)

검토자가 style guide 자체 CSS 의 포커스 테두리 53곳을 읽어 보니, 23곳은 포커스 색 토큰을 읽고 12곳은 **없는 변수**(`--bbangto-semantic-focus` 11곳 · `--bbangto-semantic-focus-ring` 1곳)를 읽고 18곳은 그 style guide 의 강조색·고정 색을 쓴다. 없는 변수는 어느 색 스킴에서도 만들어지지 않아 늘 대체값(고정 색)이 그려지고, 색 스킴을 바꿔도 테두리 색이 따라가지 않는다. 유저는 **12곳은 이 카드에서 고치고 18곳은 새 카드(KAN-065-XSHEMV)로 빼기**를 골랐다.

고칠 12곳 — 변수 이름만 `--bbangto-semantic-border-focus` 로 바꾸고 대체값은 그대로 둔다. 이 변수는 위 게이트를 이미 통과한 `border.focus` 라서, 바꾸는 순간 그 style guide 의 버튼 테두리가 색 스킴마다 3:1 이상이 된다(검토자 계산: 미달 색 스킴 22개 중 12개가 이것으로 넘어선다).

| 파일 | 줄 | 지금 변수 |
|---|---|---|
| `aiSurrealGradient3d.tsx` | 170 | `--bbangto-semantic-focus` |
| `blueprintTechnical.tsx` | 158 | `--bbangto-semantic-focus` |
| `glitchDistortion.tsx` | 162 | `--bbangto-semantic-focus` |
| `grainyBlurDreamy.tsx` | 225 | `--bbangto-semantic-focus` |
| `halftoneDotPrint.tsx` | 200 | `--bbangto-semantic-focus` |
| `halftoneGlitchColorsep.tsx` | 163 | `--bbangto-semantic-focus` |
| `heritageFolkOrnament.tsx` | 211 | `--bbangto-semantic-focus-ring` |
| `naiveDoodle.tsx` | 159 | `--bbangto-semantic-focus` |
| `opArtKinetic.tsx` | 169 | `--bbangto-semantic-focus` |
| `romanticBotanical.tsx` | 144 | `--bbangto-semantic-focus` |
| `warpedCheckerboard.tsx` | 149 · 166 | `--bbangto-semantic-focus` |

게이트는 「포커스 테두리(`outline`) 선언이 읽는 `--bbangto-semantic-*` 변수가 실제로 만들어지는가」다. 대비를 다시 재지 않는 이유는, 토큰을 읽게 되면 대비는 이미 있는 `border.focus` 게이트가 지기 때문이다. 같은 없는 변수가 포커스 테두리 **밖**에도 넷 있다 — `aiSurrealGradient3d.tsx:200·201`(태그 색), `blueprintTechnical.tsx:128`(배경, `--bbangto-semantic-bg-elevated`), `scandiWarm.tsx:161`·`spatial3d.tsx:185`(태그 테두리, `--bbangto-semantic-border`). 포커스가 아니고 무엇으로 바꿀지 디자인 판단이 필요해 KAN-065 메모로 넘겼다. 그래서 이 게이트는 `outline` 선언만 본다.

## 실행 계획
- [x] `S1` 게이트 먼저 — `packages/tokens/src/contrast.ts` 에 `FOCUS_CONTRAST_MIN` · `surfaceColors` · `focusContrast` 를 더하고 배럴(`index.ts`)로 낸다. `packages/foundations/src/focusContrast.test.ts`(76개 실제 검사 + fixture), `packages/style-guide-catalog/src/accessibilityAudit.ts` 의 `auditFocusContrast` 와 `accessibility.test.ts`(153개 색 스킴 + core base 3개 실제 검사 + fixture). 완료 기준: fixture 초록 — 노랑 포커스+흰 배경은 위반, 반투명 `elevated` 는 `base` 위 합성으로 재서 통과. 실제 검사 빨강이고 위반 목록이 전략 「새 값」 표 31건과 같다(base 3개는 없음)
- [x] `S2` 브라우저 확인 먼저 — `apps/storybook/src/real-input/mount.tsx` 에 foundation 인자(기본 light), `FocusVisible.realinput.test.tsx` 에 「Button: neon-yellow foundation 에서 Tab 테두리 색이 배경과 3:1 이상」, `_catalogStory.tsx` 의 `FoundationPresets` 7번에 `focusContrast` 확인. 완료 기준: 새 실제 입력 항목 빨강(약 1.03), 기존 실제 입력 항목 초록, 미달 style guide 9개의 `FoundationPresets` 스토리 빨강·나머지 초록
- [x] `S3` foundation 21개 값 — 전략 「새 값」 표대로 각 테마 파일의 `border.focus` 한 칸만 바꾼다. 완료 기준: `focusContrast.test.ts` 초록, foundations 패키지 vitest 전체 초록, S2 실제 입력 항목 초록
- [x] `S4` style guide 9개 파일 10개 색 스킴 값 — 같은 표대로 미달 색 스킴의 `focus:` 칸만 바꾼다. 상수(`NEO.gold`·`CANDY`·`CYAN`·`MAGENTA`)는 그대로 두고 그 칸에 새 값을 쓴다. 완료 기준: style-guide-catalog vitest 전체 초록, 9개 `FoundationPresets` 스토리 초록
- [x] `S5` 문서와 마무리 — README 의 style guide 저작 「대비 게이트」 단계에 포커스 대비(3:1, `focusContrast`)를 더한다. changeset(`.changeset/kan-060-focus-contrast.md` — tokens minor · foundations patch · style-guide-catalog patch). 게이트 5종, 검토서. 완료 기준: 게이트 5종 초록, 검토로 이동
- [x] `S6` 재작업 게이트 먼저(검토 항목 3) — `accessibility.test.ts` 에 「style guide CSS 의 포커스 테두리(`outline`) 선언이 읽는 `--bbangto-semantic-*` 변수는 실제로 만들어지는 변수다」 검사를 더한다. 만들어지는 변수 목록은 tokens 의 `flattenToCSSVars` 로 얻고, 소스는 style-guide-catalog `src/*.tsx` 를 읽는다. fixture: 없는 변수(`--bbangto-semantic-focus`)는 위반, `--bbangto-semantic-border-focus` 는 통과, `outline` 이 아닌 줄의 없는 변수는 이 검사 대상이 아님, 한 줄짜리 규칙도 잡힘. 완료 기준: fixture 초록, 실제 검사 빨강이고 위반이 전략 「재작업」 절의 12곳과 같다
- [ ] `S7` 없는 변수 12곳 바로잡기와 마무리 — 12곳의 변수 이름만 `--bbangto-semantic-border-focus` 로 바꾼다(대체값은 그대로). changeset 에 한 줄 더한다. 게이트 5종, 검토서 1·2항 새로 고침, 검토로 이동. 완료 기준: S6 검사 초록, 게이트 5종 초록, 검토로 이동

## 검증
### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← real-input 의 neon-yellow 항목 · 카탈로그 FoundationPresets 스토리가 여기서 돈다
pnpm --filter storybook build
pnpm test:unit                  # ← foundations focusContrast.test.ts · style-guide-catalog accessibility.test.ts 가 여기서 돈다
```

새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 한다(dist 가 없으면 typecheck 가 TS2307 로 실패한다). 실제 입력 테스트와 스토리는 각 패키지 `dist` 를 읽으므로, tokens·foundations·style-guide-catalog 를 고칠 때마다 그 패키지를 빌드한 뒤 Storybook 캐시 세 곳(`node_modules/.cache/storybook` · `apps/storybook/node_modules/.cache` · `apps/storybook/node_modules/.vite`)을 지운다.

### 빨강 → 초록

1. `S1` 직후: `test:unit` 의 포커스 대비 검사 둘이 빨강이고, 위반이 foundation 21 + style guide 색 스킴 10 = 31건으로 전략 표와 같다. fixture 는 초록이다.
2. `S2` 직후: `pnpm test` 의 새 실제 입력 항목이 빨강(약 1.03)이고, 미달 style guide 9개의 `FoundationPresets` 스토리가 빨강이다. 나머지는 초록이다.
3. `S3` 직후: foundations 검사와 새 실제 입력 항목이 초록이다.
4. `S4` 직후: style guide 검사와 9개 스토리가 초록이다.

### 게이트 자체 시험 (fixture 실패 주입)

- `border.focus` 노랑(`#FAFF69`) + `base` 흰색이면 위반이 난다(1.03).
- `elevated` 만 미달이어도 위반이 나고, 위반에 `elevated` 가 적힌다.
- 반투명 `elevated`(`rgba(255,255,255,0.08)`)를 어두운 `base` 위에 두면 `base` 위 합성으로 재서 통과한다(흰색 위로 재면 거짓 미달이 난다).
- 그라디언트 `base` 는 가장 낮은 스톱으로 잰다 — 한 스톱만 미달이어도 위반이 난다.
- 색을 못 읽으면(`var(...)` 등) 조용히 통과하지 않고 위반(`unparseable`)으로 올린다.

### 추가 확인 (수행 내역에 결과를 남긴다)

- 값 — 바꾼 31칸이 전략 「새 값」 표와 같은지 `git diff` 로 대조한다. `focus:` 칸 밖의 색(특히 같은 상수를 쓰는 `primary`·장식)이 바뀌지 않았는지 함께 본다.
- 화면 — 빌드한 Storybook 에서 neon-yellow·cosmonaut·Neobrutalism default 셋을 골라 실제 Tab 으로 Button 테두리를 찍어 본다(색이 보이는지).

### 재작업 확인 (검토 항목 3)

- `S6` 직후: `test:unit` 의 「포커스 테두리 변수」 검사가 빨강이고 위반이 전략 「재작업」 표의 12곳(11개 파일)과 같다. fixture 는 초록이다.
- `S7` 직후: 그 검사가 초록이고 게이트 5종이 초록이다. `git diff` 에서 12줄의 변수 이름만 바뀌었는지(대체값·다른 줄 그대로) 본다.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T01:36 · s:d775e6fd — `전략` 섹션 교체
- 2026-10-08T01:36 · s:d775e6fd — `실행 계획` 섹션 교체
- 2026-10-08T01:36 · s:d775e6fd — `검증` 섹션 교체
- 2026-10-08T17:14 · s:d775e6fd · S1 doing — 착수
- 2026-10-08T17:17 · s:d775e6fd · S1 done — tokens contrast.ts 에 FOCUS_CONTRAST_MIN·surfaceColors(반투명 elevated 는 base 위 합성)·focusContrast + 배럴. foundations focusContrast.test.ts(76개 + fixture 4), sgc auditFocusContrast(index 로 내보냄) + accessibility.test.ts(fixture 12 · 153개 · core base 3). 실제 검사 빨강 — foundation 21 · style guide 10, 전략 표와 이름·값 일치(foundation 미달은 모두 elevated 쪽이 더 낮다). core base 3 통과. 3패키지 typecheck 통과
- 2026-10-08T17:17 · s:d775e6fd · S2 doing — 착수
- 2026-10-08T17:19 · s:d775e6fd · S2 done — mount.tsx 에 foundation 인자(기본 light), FocusVisible 에 neon-yellow Button 테두리 색 대비 항목 — Button 이 transition: all 이라 첫 실행에서 전환 중간값(1.00~1.01)을 읽어 getAnimations().finished 를 기다린 뒤 읽게 고침. 빨강 1.03(두 번 같은 값), 기존 실제 입력 20건 초록. _catalogStory 8번에 focusContrast — FoundationPresets 빨강 9개(전략 표의 style guide 9개와 같음), 43개 초록. pnpm typecheck 통과
- 2026-10-08T17:20 · s:d775e6fd · S3 doing — 착수
- 2026-10-08T17:20 · s:d775e6fd · S3 done — foundation 21개 테마 파일의 border.focus 한 칸씩을 전략 표 값으로. diff 에 focus: 밖의 줄 0. foundations vitest 117건 초록(focusContrast 포함 — 첫 실행의 bundleBudget 4건 빨강은 빌드 전에 돌려 dist 가 낡았던 것, 빌드 뒤 초록). 실제 입력 21건 초록(neon-yellow 항목 포함)
- 2026-10-08T17:21 · s:d775e6fd · S4 doing — 착수
- 2026-10-08T17:21 · s:d775e6fd · S4 done — style guide 9개 파일 10칸을 전략 표 값으로. 상수를 쓰던 넷 중 Neobrutalism 은 NEO.goldFocus 를 더해 default 만 쓰고(midnight 은 NEO.gold 그대로), CANDY·CYAN·MAGENTA 셋은 focus: 칸에만 리터럴 + 한 줄 주석. sgc vitest 90건 초록, 카탈로그 스토리 52파일 359건 초록(FoundationPresets 9개 포함)
- 2026-10-08T17:21 · s:d775e6fd · S5 doing — 착수
- 2026-10-08T17:25 · s:d775e6fd · S5 done — README 대비 게이트 단계에 포커스 대비 단락(auditFocusContrast·focusContrast·반투명 elevated), changeset kan-060-focus-contrast.md(tokens minor · foundations patch · sgc patch). 게이트 5종 초록 — typecheck · build · test 193파일 1292건 · storybook build · test:unit(foundations 117 · sgc 90 등). 화면: chromium 실제 Tab 으로 core Button 을 neon-yellow · cosmonaut · Neobrutalism default 에서 찍음 — 테두리 셋 다 바탕과 구분됨. 같은 화면에서 neon-yellow 버튼 글자(흰색 on 노랑)와 cosmonaut 버튼(흰색 on 흰색)이 바탕에 묻힘 — primary 색 문제라 범위 밖. Storybook 카탈로그의 Neobrutalism 모티프 버튼 테두리는 자기 CSS 의 금색(#E9C766)이라 1.47 그대로 — 판단 항목으로
- 2026-10-08T17:53 · s:d775e6fd — 검토 항목 3 반려(유저) — style guide 자체 포커스 CSS 중 없는 변수(--bbangto-semantic-focus·-focus-ring) 12곳을 이 카드에서 고친다. 나머지 18곳은 새 카드. 같은 카드 재작업 경로
- 2026-10-08T17:55 · s:d775e6fd — `전략` 섹션 교체
- 2026-10-08T17:55 · s:d775e6fd — `실행 계획` 섹션 교체
- 2026-10-08T17:55 · s:d775e6fd — `검증` 섹션 교체
- 2026-10-08T17:55 · s:d775e6fd · S6 doing — 착수
- 2026-10-08T17:56 · s:d775e6fd · S6 done — accessibility.test.ts 에 undefinedOutlineVars(outline 선언이 읽는 --bbangto-semantic-* 를 flattenToCSSVars 목록과 대조) + fixture 4(없는 변수·토큰 통과·outline 밖 제외·한 줄 규칙과 -focus-ring). 실제 소스 검사 빨강 — 12곳(11파일), 전략 「재작업」 표와 같음. sgc typecheck 통과
