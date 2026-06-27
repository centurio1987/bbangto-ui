# NumberField — variant 축 감사 (number.audit.md)

- **카테고리:** form / numeric input
- **호스트:** `NumberField` (`packages/core/src/components/NumberField.tsx`)
- **축(axis):** `variant` (chrome treatment)
- **포화 라운드:** 1 (파일럿)

## default-first

union 첫 값 `outline` 이 기본값. 기존 호출부·스토리(`Default`/`WithBounds`/`Disabled`) 렌더는 변경 없음. 신규 멤버는 union 끝에 추가.

```ts
export type NumberFieldVariant = 'outline' | 'seven-segment';
```

## 채택 멤버

| 멤버 | load-bearing 명세 |
|------|-------------------|
| `seven-segment` | 어두운 LED 스타일 readout screen(`semantic.foreground.base` 합성) 위에 등폭(`typography.fontFamily.mono`) 고정폭 digit 셀. 활성 글리프는 accent(`semantic.primary.base`) 색 강조 + `text-shadow` 글로우, 비활성 세그먼트는 항상 켜진 dim "8" 고스트(`semantic.foreground.subtle`, opacity 0.22). 접근성용 spinbutton 입력은 시각적으로만 숨김. 기본 outline input(border + rounded-md + 가운데 텍스트 입력)과 완전히 다른 treatment 종류. |

## 집계

- **reviewed:** 10
- **adopted:** 1 (`seven-segment`)
- **absorbed:** 2
  - `inline-outline` → 기본 `outline` 과 동일 treatment, 별도 멤버 불필요.
  - `bordered` → `outline` 의 border chrome과 중복.
- **noise:** 3
  - `default` / `basic` / `standard` — 의미 없는 별칭, 신규 chrome 없음.
- **dropped:** 4
  - `gradient-readout` — 토큰에 gradient 없음, 인라인 합성 과도 + Button `gradient` 축과 중복.
  - `glass-panel` — glass/blur 토큰 부재, 토큰만으로 재현 불가.
  - `pill-stepper` — `shape` 축(rounded/pill) 혼입, variant 축이 아님.
  - `neon-spin` — Button `neon` 글로우와 중복, 숫자 입력 호스트에 부적합.
- **미열람(unreviewed):** 0 (= 10 − reviewed 10)

## load-bearing 검증 (스토리 play)

`SevenSegment` story 의 play 3단:
1. `data-bbangto-number-variant === 'seven-segment'`.
2. `.bbangto-number-readout` backgroundColor 비투명(어두운 screen) + fontFamily 에 `mono` 포함(등폭) + `.bbangto-number-segment-lit` `text-shadow !== none`(accent glow) + digit 셀 수 = 자릿수.
3. 접근 가능한 `spinbutton` 값 검증 + −/+ 스텝 동작.
