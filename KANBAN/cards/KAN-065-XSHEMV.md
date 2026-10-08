---
card: KAN-065-XSHEMV
title: style guide 모티프 버튼 포커스 테두리 정리 — 자체 CSS 18곳 대비와 없는 semantic 변수 참조
created: 2026-10-08
scope: packages/style-guide-catalog/src/_motif.tsx, packages/style-guide-catalog/src/accessibilityAudit.ts, packages/style-guide-catalog/src/accessibility.test.ts, packages/style-guide-catalog/src/neobrutalismEditorial.tsx, packages/style-guide-catalog/src/minimalSaas.tsx, packages/style-guide-catalog/src/tactileTexture.tsx, packages/style-guide-catalog/src/gothicMedievalDigital.tsx, packages/style-guide-catalog/src/shatteredGlassCinematic.tsx, packages/style-guide-catalog/src/iridescentChrome.tsx, packages/style-guide-catalog/src/aiSurrealGradient3d.tsx, packages/style-guide-catalog/src/blueprintTechnical.tsx, packages/style-guide-catalog/src/scandiWarm.tsx, packages/style-guide-catalog/src/spatial3d.tsx, README.md, apps/storybook/src/real-input/mount.tsx, apps/storybook/src/real-input/FocusVisible.realinput.test.tsx, .changeset/kan-065-motif-focus.md
---

# KAN-065-XSHEMV — style guide 모티프 버튼 포커스 테두리 정리 — 자체 CSS 18곳 대비와 없는 semantic 변수 참조

## 전략
카드 메모: KAN-060 검토 항목 3(2026-10-08 유저 선택)에서 나왔다. KAN-060 이 포커스 테두리의 없는 변수 12곳을 고친 뒤 착수.

지시 원문은 `KANBAN.md` 카드의 `원문:` 블록에 있다(중복 보관하지 않음).

### 문제

style guide 51개는 저마다 모티프 버튼(그 style guide 모양을 덧칠한 Button)의 포커스 테두리를 자기 CSS 로 그린다. 그 CSS 의 포커스 선언은 53곳이다. 2026-10-08 main(`2d4657c`)에서 각 style guide 가 화면에 넣을 CSS 를 실행으로 꺼내, 테두리 색을 어디서 읽는지로 나눴다.

- 35곳은 포커스 색 토큰(`--bbangto-semantic-border-focus`)을 읽는다. 이 토큰은 KAN-060 게이트가 모든 색 스킴에서 표면과 3:1 이상으로 묶어 둔다.
- 18곳은 그 style guide 의 강조색 변수(`--bbangto-ext-*`)나 다른 semantic 색, 고정 색을 쓴다. 이 18곳은 어떤 검사도 재지 않는다.

18곳을 색 스킴마다 쟀다. 계산은 KAN-060 게이트와 같다. `var()` 는 그 색 스킴이 실제로 까는 변수(semantic + 확장 변수)로 풀고, 없으면 대체값을 쓴다. 표면은 `surfaceColors`(base·elevated, 반투명 elevated 는 base 위에 합성)이고 대비는 `contrastRatio` 다. 3:1 미달은 style guide 6개, 색 스킴 10개다. 나머지 12곳은 모든 색 스킴에서 3:1 이상이다.

| style guide | 색 스킴 | 지금 테두리 색 | 대비 |
|---|---|---|---|
| `neobrutalism-editorial-01` | default | `#E9C766` (확장 변수 accent) | 1.47 |
| `minimal-saas-01` | default · dark · warm | 반투명 고리 `rgba(79,70,229,0.40)` 등 (`box-shadow`) | 1.91 · 2.10 · 1.64 |
| `tactile-texture-01` | default · dark · sky | 반투명 흰색 `rgba(255,255,255,0.6)` 등 | 1.00 · 1.35 · 1.00 |
| `gothic-medieval-digital-01` | light | `#E8C25A` (확장 변수 neon-block) | 1.38 |
| `shattered-glass-cinematic-01` | light | `#FFC53D` (고정 색) | 1.40 |
| `iridescent-chrome-01` | light | `#B7A6FF` (고정 색) | 1.91 |

포커스 밖에도 없는 semantic 변수를 읽는 줄이 5줄 있다. 어느 색 스킴에서도 만들어지지 않는 변수라 늘 대체값이 그려진다. 그래서 색 스킴을 바꿔도 색이 안 따라가고, 실제로 이렇게 보인다.

| 자리 | 지금 변수 | 화면에서 보이는 것 |
|---|---|---|
| `aiSurrealGradient3d.tsx:200·201` accent 태그 글자·테두리 | `--bbangto-semantic-focus` | light 색 스킴에서 밝은 하늘색 글자가 바탕과 1.23 |
| `blueprintTechnical.tsx:128` 카드 배경 | `--bbangto-semantic-bg-elevated` | whiteprint(밝은 크림 바탕)에서도 카드가 짙은 남색 `#103A86` |
| `scandiWarm.tsx:161` muted 태그 테두리 | `--bbangto-semantic-border` | dark 에서 밝은 `#DDD3C2` 테두리 |
| `spatial3d.tsx:185` muted 태그 테두리 | `--bbangto-semantic-border` | 모든 색 스킴에서 같은 반투명 회색이라 light 에서는 흐리다 |

### 접근

1. **게이트를 먼저 세운다 — 모티프 CSS 를 테스트에서 읽을 수 있게 한다.** 지금 CSS 는 파일마다 `makeMotifWrappers({ css })` 안에만 있어 바깥에서 볼 길이 없다. `_motif.tsx` 에 래퍼 → CSS 대응표(`WeakMap`)를 두고 `motifCssOf(wrappers)` 를 낸다. 배럴(`index.ts`)에는 내지 않으므로 공개 API 는 늘지 않는다. 소스 글자를 읽는 방식(KAN-060 S6)은 `${LILAC}` 같은 상수 치환을 못 풀고, 18곳 중 7곳이 그렇게 쓴다(대체값 자리 포함).
2. **`accessibilityAudit.ts` 에 `auditMotifFocusContrast` 를 둔다.** 선택자에 `:focus` 가 든 규칙의 `outline`·`outline-color`·`box-shadow` 선언에서 색을 꺼내 색 스킴마다 잰다. `outline: none` 은 건너뛰고, 색을 못 풀면 조용히 통과시키지 않고 `unparseable` 위반으로 올린다. 대상은 53곳 전부다. 토큰을 읽는 35곳은 지금 통과하지만, 함께 재야 나중에 누가 토큰 대신 고정 색을 써도 잡힌다. 모든 style guide 에서 CSS 를 찾았는지도 본다 — 하나라도 못 찾으면 그 style guide 는 검사에서 조용히 빠지기 때문이다.
3. **없는 semantic 변수 검사를 넓힌다.** KAN-060 S6 검사는 `outline` 줄만 본다. 이것을 소스의 모든 `var(--bbangto-semantic-*)` 참조로 넓혀, 카드 목표 「없는 semantic 변수 참조 0」을 그대로 검사로 만든다.
4. **브라우저 확인을 하나 둔다.** 2의 계산이 브라우저와 같은지, Neobrutalism default 모티프 버튼에 실제 Tab 으로 와서 칠해진 테두리 색을 읽어 잰다(지금 1.47). 확장 변수(`--bbangto-ext-*`)는 `StyleGuideProvider` 가 깔므로 `mount.tsx` 에 style guide 와 색 스킴을 받는 마운트를 더한다.
5. **고칠 값 — 미달 6곳은 포커스 색 토큰을 읽게 한다.** `var(--bbangto-semantic-border-focus, <그 style guide default 의 포커스 색>)` 이다. 이 토큰은 style guide 마다 자기 색 스킴에 맞춰 이미 3:1 을 넘게 정해 둔 값이라, 새 색을 짓지 않아도 된다. 같은 확장 변수를 hover 나 광택에도 쓰는 파일이 있어(gothic 의 neon-block, tactile 의 hyperreal-gloss), 변수 값은 그대로 두고 포커스 선언만 바꾼다. minimal-saas 는 `outline: none` + `box-shadow` 고리 모양은 그대로 두고 색만 토큰으로 바꾼다.

   바뀌는 색은 아래와 같다. 미달 10개가 넘어서고, 통과하던 색 스킴 2개(shattered rose, iridescent default)도 그 색 스킴의 포커스 색으로 바뀐다. 나머지 6개는 지금 색과 토큰 값이 같아 그대로다.

   | style guide · 색 스킴 | 지금 | 바뀐 뒤 | 대비 |
   |---|---|---|---|
   | neobrutalism · default | `#E9C766` 1.47 | `#A9881C` | 3.02 |
   | minimal-saas · default | 반투명 인디고 1.91 | `#4F46E5` | 6.29 |
   | minimal-saas · dark | 반투명 인디고 2.10 | `#818CF8` | 4.90 |
   | minimal-saas · warm | 반투명 갈색 1.64 | `#B45309` | 4.86 |
   | tactile-texture · default | 반투명 흰색 1.00 | `#EB5D94` | 3.01 |
   | tactile-texture · dark | 반투명 흰색 1.35 | `#FF8FBB` | 7.10 |
   | tactile-texture · sky | 반투명 흰색 1.00 | `#3B92E8` | 3.04 |
   | gothic · light | `#E8C25A` 1.38 | `#3E5A00` | 6.34 |
   | shattered-glass · light | `#FFC53D` 1.40 | `#B26A00` | 3.77 |
   | shattered-glass · rose (통과하던 것) | `#FFC53D` 11.56 | `#34E5FF` | 11.98 |
   | iridescent · light | `#B7A6FF` 1.91 | `#0599B9` | 3.02 |
   | iridescent · default (통과하던 것) | `#B7A6FF` 8.21 | `#7FE0FF` | 11.60 |

   소개 문구(`specs`·`rules`)에 적힌 포커스 색이 바뀐 색과 어긋나면 함께 고친다.
6. **없는 변수 5줄은 이름이 가리키던 토큰으로 바꾼다.** 대체값은 그대로 둔다. default 색 스킴에서는 토큰 값이 지금 대체값과 같거나(넷) 거의 같아(spatial3d, 반투명 회색을 바탕에 겹친 `#32383F` → `#2A323D`) 화면이 사실상 안 바뀌고, 다른 색 스킴에서 그 색 스킴의 색을 따라간다.

   | 자리 | 바꿀 변수 | 다른 색 스킴에서 바뀌는 것 |
   |---|---|---|
   | aiSurreal accent 태그 글자·테두리 | `--bbangto-semantic-border-focus` | light `#5BE1FF`→`#0B99B6`(글자 대비 1.23→2.68), magenta →`#B6FF5B` |
   | blueprint 카드 배경 | `--bbangto-semantic-background-elevated` | whiteprint →`#FBF8F0`, cyan →`#1A2029` |
   | scandi muted 태그 테두리 | `--bbangto-semantic-border-base` | dark →`#453D31`, sage →`#D5D6C6` |
   | spatial3d muted 태그 테두리 | `--bbangto-semantic-border-base` | light →`#CBD5E1`, 나머지는 각 색 스킴의 어두운 테두리 |

### 버린 대안

- **18곳 전부를 포커스 색 토큰으로 바꾸기** — 통과하는 12곳(bauhaus 빨강, memphis 검정 등)의 모티프 색까지 바뀐다. 카드 목표는 3:1 이고, 게이트가 그 12곳도 계속 잰다.
- **미달 색 스킴만 고치도록 색 스킴마다 모티프 포커스 변수를 새로 두기** — 통과하던 두 색 스킴의 색은 안 바뀌지만, style guide 6개에 색 값을 새로 지어야 하고 토큰과 다른 포커스 색이 하나 더 생긴다. 포커스 색의 출처를 토큰 하나로 모으는 쪽을 골랐다.
- **소스 글자를 읽어 재기(KAN-060 S6 방식 확장)** — 상수 치환(`${GOLD}` 등)과 색 스킴마다 바뀌는 확장 변수를 못 푼다.
- **Storybook 스토리에서 모든 style guide 를 브라우저로 재기** — 51개 × 3 을 실제 Tab 으로 도는 비용에 비해, 계산 게이트 + 브라우저 대조 1건으로 같은 결과를 얻는다.
- **aiSurreal 태그 글자를 `primary-base` 로** — light 는 4.54 가 되지만 default 가 10.84→3.94 로 떨어진다. 이름이 가리키던 포커스 색을 따른다.

### 범위 밖

- **태그 글자 대비.** aiSurreal light accent 태그 글자는 고친 뒤에도 2.68 로 본문 기준 4.5:1 에 못 미친다. 태그 글자 대비를 재는 검사는 어디에도 없고, 다른 style guide 태그도 재 본 적이 없다. 이 카드는 「없는 변수」만 바로잡고, 태그 글자 대비는 따로 재 볼 카드 후보로 남긴다.
- 확장 변수(`--bbangto-ext-*`)가 색 스킴 일부에만 정의돼 대체값이 쓰이는 경우는 「없는 semantic 변수」가 아니다. 포커스 테두리라면 2의 게이트가 대체값으로 재므로 대비는 잡힌다.
- 모티프 버튼이 아닌 자리의 포커스(카드 규칙 2곳 포함)도 같은 게이트가 재지만, 지금 모두 토큰을 읽어 통과한다.

## 실행 계획
- [x] `S1` 게이트 먼저 — `_motif.tsx` 에 래퍼 → CSS 대응표와 `motifCssOf`(배럴에는 안 냄), `accessibilityAudit.ts` 에 포커스 선언을 꺼내는 함수와 `auditMotifFocusContrast`, `accessibility.test.ts` 에 fixture 와 실제 검사, 없는 semantic 변수 검사를 `outline` 줄에서 모든 줄로 넓힌다. 완료 기준: fixture 초록 — 확장 변수를 색 스킴 값으로 풂 · 색 스킴에 없는 변수는 대체값 · `box-shadow` 고리 · `outline: none` 건너뜀 · `@media` 안 규칙 · 못 푼 색은 `unparseable`. 실제 검사 빨강 — 모티프 포커스 위반이 전략 표의 10건과 같고, 없는 변수 위반이 5줄과 같다. 모든 style guide 에서 CSS 를 찾는다(51/51)
- [x] `S2` 브라우저 확인 먼저 — `apps/storybook/src/real-input/mount.tsx` 에 style guide 와 색 스킴을 받는 마운트(`StyleGuideProvider`), `FocusVisible.realinput.test.tsx` 에 「Neobrutalism default 모티프 Button 에 Tab 으로 오면 테두리 색이 배경과 3:1 이상」. 완료 기준: 새 항목 빨강(약 1.47), 기존 실제 입력 항목 초록
- [ ] `S3` 미달 6곳을 포커스 색 토큰으로 — neobrutalism · minimal-saas(고리 모양은 두고 색만) · tactile-texture · gothic-medieval-digital · shattered-glass-cinematic · iridescent-chrome 의 포커스 선언을 `var(--bbangto-semantic-border-focus, <default 포커스 색>)` 로 바꾼다. 확장 변수 값은 그대로 둔다. 소개 문구의 포커스 색이 어긋나면 함께 고친다. 완료 기준: 모티프 포커스 검사 초록(위반 0), S2 항목 초록, 바뀐 색이 전략 표 12행과 같다
- [ ] `S4` 없는 변수 5줄 바로잡기 — aiSurreal 200·201 → `--bbangto-semantic-border-focus`, blueprint 128 → `--bbangto-semantic-background-elevated`, scandi 161 · spatial3d 185 → `--bbangto-semantic-border-base`. 대체값은 그대로. 완료 기준: 없는 semantic 변수 검사 초록(0줄)
- [ ] `S5` 문서와 마무리 — 루트 `README.md` 포커스 대비 단락에 「모티프 CSS 의 포커스 테두리도 같은 규칙으로 잰다」를 더한다. changeset(`.changeset/kan-065-motif-focus.md` — style-guide-catalog patch). 게이트 5종, 검토서. 완료 기준: 게이트 5종 초록, 검토로 이동

## 검증
### 게이트 5종 (전부 초록이어야 완료)

```bash
pnpm typecheck
pnpm build
pnpm test                       # ← real-input 의 Neobrutalism 모티프 항목이 여기서 돈다
pnpm --filter storybook build
pnpm test:unit                  # ← style-guide-catalog accessibility.test.ts 의 모티프 포커스 검사 · 없는 변수 검사가 여기서 돈다
```

새 워크트리에서는 `pnpm install` → `pnpm build` 를 먼저 한다(dist 가 없으면 typecheck 가 TS2307 로 실패한다). 실제 입력 테스트는 패키지 `dist` 를 읽으므로, style-guide-catalog 를 고칠 때마다 빌드한 뒤 Storybook 캐시 세 곳(`node_modules/.cache/storybook` · `apps/storybook/node_modules/.cache` · `apps/storybook/node_modules/.vite`)을 지운다.

### 빨강 → 초록

1. `S1` 직후: `test:unit` 의 모티프 포커스 검사가 빨강이고 위반이 전략 「문제」 표의 10건(style guide 6개)과 같다. 없는 semantic 변수 검사가 빨강이고 위반이 5줄과 같다. fixture 는 초록이다.
2. `S2` 직후: `pnpm test` 의 새 실제 입력 항목이 빨강(약 1.47)이다. 나머지는 초록이다.
3. `S3` 직후: 모티프 포커스 검사와 새 실제 입력 항목이 초록이다.
4. `S4` 직후: 없는 semantic 변수 검사가 초록이다.

### 게이트 자체 시험 (fixture 실패 주입)

- 확장 변수를 읽는 포커스 선언은 색 스킴마다 그 색 스킴의 값으로 잰다 — 한 색 스킴만 미달이어도 위반이고, 위반에 색 스킴 키가 적힌다.
- 색 스킴에 없는 변수는 대체값으로 잰다(브라우저와 같다).
- `box-shadow: 0 0 0 3px <반투명 색>` 고리는 표면 위에 합성해 잰다.
- `outline: none` 은 위반도 통과도 아닌 건너뜀이다.
- `@media` 안에 든 포커스 규칙도 잡힌다.
- 색을 못 풀면(`var()` 가 남거나 색 이름을 모름) 조용히 통과하지 않고 `unparseable` 위반으로 올린다.
- 없는 변수 검사: `outline` 이 아닌 줄(태그 `color`, 카드 `background-color`)의 없는 변수도 잡힌다.

### 추가 확인 (수행 내역에 결과를 남긴다)

- 바뀐 색 12행(전략 「접근」 5의 표)을 다시 계산해 표와 같은지 본다.
- 빌드한 Storybook 에서 Neobrutalism default · tactile-texture default · minimal-saas default 모티프 버튼에 Tab 으로 와서 테두리가 보이는지 눈으로 본다.

## 수행 내역
<!-- KANBAN:LOG append-only — 아래로만 덧붙인다. 위를 고치지 않는다. -->
- 2026-10-08T18:28 · s:0882524c — `전략` 섹션 교체
- 2026-10-08T18:28 · s:0882524c — `실행 계획` 섹션 교체
- 2026-10-08T18:28 · s:0882524c — `검증` 섹션 교체
- 2026-10-08T18:40 · s:0882524c · S1 doing — 착수
- 2026-10-08T18:43 · s:0882524c · S1 done — 모티프 CSS 대응표(motifCssOf, 배럴 밖)·auditMotifFocusContrast·없는 semantic 변수 검사를 모든 줄로. fixture 초록, 51/51 CSS 찾음. 실제 검사 빨강 — 모티프 포커스 10건(계획 표와 같음)·없는 변수 5줄
- 2026-10-08T18:43 · s:0882524c · S2 doing — 착수
- 2026-10-08T18:44 · s:0882524c · S2 done — mount.tsx 에 mountStyleGuide(StyleGuideProvider, fonts none). 실제 Tab 으로 Neobrutalism default 모티프 Button 테두리 1.47 빨강 — 단위 검사 계산과 같다. 기존 실제 입력 21개 초록, typecheck 통과
