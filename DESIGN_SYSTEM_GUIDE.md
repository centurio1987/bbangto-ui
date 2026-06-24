# 🧩 bbangto-ui 디자인 시스템 개념 가이드

> "이거 어디에 둬야 하지?" 싶을 때 펼치는 지도.
> 새 컴포넌트를 만들거나 기존 걸 어디 둘지 고민될 때, 이 문서 하나면 됩니다.

bbangto-ui는 작은 조각부터 쌓아 올리는 **레이어 시스템**입니다.
아래로 갈수록 더 크고, 더 "완성된 화면"에 가까워집니다.

```
🎨 tokens     ── 색·간격·글자 같은 "재료"
   └─ ⚛️  atom      ── 더 못 쪼개는 한 조각        (Button, Input, Link)
        └─ 🧬 molecule  ── atom 몇 개를 묶은 작은 단위 (SearchField, FormField)
             └─ 🦠 organism / block ── 페이지의 "한 섹션"   (Hero, PricingSection)
                  └─ 📄 pattern        ── "한 화면" 전체        (SignIn, SignUp)

곁가지:
   🎞️  motion atom ── 움직임 그 자체            (FadeIn, Spinner, BorderBeam)
   🪝 hook         ── UI 없는 로직만             (useInView, useCopyToClipboard)
```

> 💡 우리는 `organism`과 `block`을 **같은 뜻**으로 씁니다. 마케팅/섹션 맥락에선 "block", 일반 atomic 맥락에선 "organism"이라 부를 뿐입니다.

---

## 한눈에 보는 기준표

| 레이어 | 한 줄 정의 | "이게 무슨 글자인지 아나?" | 크기 감각 | 예시 |
|---|---|:---:|---|---|
| 🎨 **token** | 디자인 재료 (값) | — | 값 하나 | `primary`, `spacing.4`, `radius.md` |
| ⚛️ **atom** | 더 못 쪼개는 한 조각 | ❌ 모름 | 버튼 한 개 | `Button` `Input` `Badge` `Link` |
| 🧬 **molecule** | atom 몇 개의 작은 묶음 | ❌ 모름 | 입력 필드 한 줄 | `SearchField` `FormField` `Stepper` |
| 🦠 **organism / block** | 페이지의 한 **섹션** | ✅ **앎** (슬롯 보유) | 화면의 한 덩어리 | `Hero` `PricingSection` `Footer` |
| 📄 **pattern** | 한 **화면/플로우** 전체 | ✅ 앎 + 동작까지 | 화면 통째 | `SignIn` `SignUp` `FormLayout` |
| 🎞️ **motion atom** | 움직임 그 자체 | — | 효과 하나 | `FadeIn` `Spinner` `Marquee` |
| 🪝 **hook** | UI 없는 로직 | — | 함수 하나 | `useInView` `useDebounce` |

**가장 중요한 한 가지 질문**: "이 조각은 **자기가 무슨 콘텐츠를 담는지 아는가?**"
- 모른다 (아무 글자나 넣으면 됨) → **atom / molecule**
- 안다 ("제목 + 부제 + CTA가 들어가는 자리야") → **organism/block 이상**

---

## ⚛️ atom — 더 못 쪼개는 한 조각

가장 작은 UI 단위. 더 나누면 의미가 사라집니다.

**기준**
- 단 하나의 책임만 진다 (버튼은 누르는 것, 입력은 받는 것).
- **무슨 내용이 들어올지 모른다.** `<Button>저장</Button>`이든 `<Button>삭제</Button>`이든 버튼은 신경 안 씀.
- 토큰만 소비하고, 다른 컴포넌트를 합성하지 않는다 (아이콘 정도는 예외).

**bbangto-ui 예시** → `Button`, `Input`, `Badge`, `Checkbox`, `Radio`, `Switch`, `Text`, `Link`, `Avatar`, `Divider`, `Icon`

> 🚦 헷갈릴 때: "이걸 반으로 쪼개면 둘 다 쓸모없어지나?" → 그렇다면 atom.

---

## 🧬 molecule — atom들의 작은 묶음

atom 두세 개가 **하나의 목적**으로 뭉친 단위. 아직 "섹션"은 아닙니다.

**기준**
- atom 여러 개를 묶지만, 여전히 **재사용되는 작은 부품**.
- 여전히 콘텐츠를 모른다 (검색창은 무엇을 검색하는지 모름).
- 한 가지 상호작용 묶음을 캡슐화한다 (라벨+입력+에러 = 폼 필드).

**bbangto-ui 예시** → `SearchField`(아이콘+입력+클리어), `Stepper`(증감 버튼+숫자), `SegmentedControl`, `Breadcrumbs`, `Pagination`

> 🚦 헷갈릴 때: atom과 molecule의 경계는 느슨합니다. **우리 시스템은 둘을 굳이 폴더로 나누지 않고** `packages/core/src/components`에 함께 둡니다. 중요한 건 "콘텐츠를 모르는 재사용 부품"이라는 점.

---

## 🦠 organism / block — 페이지의 "한 섹션"

여기서부터 결이 바뀝니다. **콘텐츠를 아는 순간 block입니다.**

**기준 4가지 (모두 충족)**
1. **입도** — 컴포넌트보다 크고, 페이지보다 작은 "섹션 한 덩어리".
2. **콘텐츠 슬롯을 안다** — `title`, `items[]`, `cta` 같은 **의미 있는 자리**를 가진다.
3. **레이아웃을 강제한다** — 여러 컴포넌트를 특정 배치로 묶는다 (그래서 `Card` 여러 개 ≠ `FeatureGrid`).
4. **화면 단위 동작/플로우는 없다** — 검증·제출·라우팅이 붙으면 그건 pattern.

**bbangto-ui 예시** → `Hero`, `FeatureGrid`, `PricingSection`, `Testimonials`, `LogoCloud`, `MarketingFooter`, `AnnouncementBar`

**왜 `Card`는 atom/molecule인데 `FeatureGrid`는 block일까?**
`Card`는 "아무거나 담는 상자"라 콘텐츠를 모릅니다(molecule). 반면 `FeatureGrid`는 "기능 항목들을 격자로 보여주는 섹션"이라 **무엇이 들어갈지 알고**, 배치까지 정합니다(block).

> 🚦 헷갈릴 때: "다른 페이지에 그대로 끼워 넣을 수 있나?" → 끼워 넣는 **부품**이면 block. 끼워지는 게 아니라 **배치하는 쪽**이면 pattern(아래).

---

## 📄 pattern — "한 화면/플로우" 전체

block들을 **페이지 레벨로 배치**하고, 그 화면의 **상호작용까지** 책임지는 최상위 단위.

> **실용 정의 (우리 시스템 채택)**: pattern = `template`(정적 페이지 골격) + 그 화면의 **상호작용 플로우**.
> 순수 atomic design은 template(정적)과 page(동작)를 나누지만, 우리는 실무 편의를 위해 하나로 묶어 "pattern"이라 부릅니다.

**기준**
- **페이지 골격**을 정의한다 — 어디에 어떤 섹션이 오는지.
- **화면 단위 상태/동작**을 가진다 — 폼 검증, 제출, 포커스 관리, 에러 처리.
- block들을 **담는 쪽**이다 (block은 담기는 쪽).

**bbangto-ui 예시** → `SignIn`, `SignUp`, `FormLayout`, `AIChat`(조립)

**block vs pattern, 단 한 줄 테스트**
- 다른 화면에 **끼워 넣는** 섹션이다 → **block** (`AuthForm`)
- 그 자체가 **화면**이고 섹션들을 **배치 + 동작**시킨다 → **pattern** (`SignIn`)

```
🦠 block:    AuthForm  ── 이메일+비번+제출+링크가 묶인 "인증 폼 섹션" (모달에도, 사이드패널에도 재사용)
📄 pattern:  SignIn    ── 마케팅 패널 + AuthForm + 로고 + 푸터를 배치하고, 로그인 검증/리다이렉트까지 책임지는 "화면"
```

---

## 🎞️ motion atom — 움직임 그 자체

UI 모양이 아니라 **움직임**을 담당하는 별도 계층. `packages/core/src/motion`에 삽니다.

**기준**
- 자식을 감싸 움직임만 부여하거나(`FadeIn`, `Pressable`), 움직임 자체가 시각물(`Spinner`, `BorderBeam`).
- **반드시 `prefers-reduced-motion` 폴백을 가진다** (`MOTION_QUALITY_CHECKLIST.md` 적용).
- 토큰의 `motion.duration`/`easing`/`preset`을 소비한다.

**bbangto-ui 예시** → `FadeIn`, `SlideIn`, `ScaleIn`, `Spinner`, `Marquee`, `TypingText`, `BorderBeam`, `ScrollReveal`

> 🚦 헷갈릴 때: "정지 상태에서도 의미가 있나, 아니면 움직임이 본질인가?" 움직임이 본질이면 motion atom.

---

## 🪝 hook — UI 없는 로직

화면에 아무것도 그리지 않고 **로직만** 제공하는 함수. `packages/hooks`에 삽니다.

**기준**
- `use`로 시작하고 JSX를 반환하지 않는다.
- 상태/구독/계산만 한다 (`useInView`, `useDebounce`, `useCopyToClipboard`).

> 🚦 헷갈릴 때: "JSX를 반환하나?" 안 하면 hook. 21st.dev의 "Hooks" 카테고리가 컴포넌트가 아니라 여기로 가는 이유.

---

## 🧭 어디에 둘지 모를 때 — 결정 흐름도

```
이게 JSX를 그리나?
├─ 아니오 → 🪝 hook
└─ 예
   움직임이 본질인가?
   ├─ 예 → 🎞️ motion atom
   └─ 아니오
      자기가 무슨 콘텐츠를 담는지 아는가? (제목/항목/CTA 같은 슬롯)
      ├─ 모른다
      │   atom 몇 개를 묶었나?
      │   ├─ 아니다 (단일 조각) → ⚛️ atom
      │   └─ 그렇다 (작은 부품)  → 🧬 molecule
      └─ 안다
         그 자체가 "화면"이고 다른 섹션을 배치 + 동작시키나?
         ├─ 아니다 (끼워지는 섹션) → 🦠 organism / block
         └─ 그렇다 (화면 전체+플로우) → 📄 pattern
```

---

## 📁 디렉터리 매핑

| 레이어 | 위치 |
|---|---|
| 🎨 token | `packages/tokens` + `packages/theme-*` |
| ⚛️ atom / 🧬 molecule | `packages/core/src/components` |
| 🦠 organism / block | `packages/core/src/blocks` |
| 📄 pattern | `packages/core/src/patterns` |
| 🎞️ motion atom | `packages/core/src/motion` |
| 🪝 hook | `packages/hooks` |

---

## 🔗 함께 보기

- **분류 카탈로그**: [`packages/core/COMPONENT_CATALOG.md`](packages/core/COMPONENT_CATALOG.md) — 21st.dev → bbangto-ui 전수 분류
- **구현 계획**: [`ASSET_INTEGRATION_PLAN.md`](ASSET_INTEGRATION_PLAN.md) — Wave 단위 실행 전략
- **품질 게이트**: [`QUALITY_CHECKLIST.md`](QUALITY_CHECKLIST.md)
- **모션 규약**: [`packages/core/motion-catalog.md`](packages/core/motion-catalog.md) · [`MOTION_QUALITY_CHECKLIST.md`](packages/core/MOTION_QUALITY_CHECKLIST.md)

> 새 조각을 만들 때는 항상 **테스트 먼저** (`CLAUDE.md`의 워크플로). 어디에 둘지는 위 흐름도가, 어떻게 검증할지는 품질 체크리스트가 알려줍니다.
