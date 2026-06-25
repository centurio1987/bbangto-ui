# Component Catalog — 21st.dev → bbangto-ui 에셋화 카탈로그

> **목적**: [21st.dev/community/components](https://21st.dev/community/components)의 전체 컴포넌트 카테고리를
> bbangto-ui 디자인 시스템으로 흡수하기 위한 단일 분류 기준(SSOT).
> `motion-catalog.md`의 컴포넌트 버전이며, 사전 맥락이 없는 에이전트가 단독으로 읽고 작업할 수 있도록 자족적으로 작성한다.

- **작성일**: 2026-06-24
- **출처 스냅샷**: 21st.dev community — UI Components 40개 카테고리 + Marketing Blocks 20개 카테고리 (총 ~1,900개 개별 컴포넌트)
- **에셋화 단위**: 개별 컴포넌트(1,900개)가 아니라 **카테고리/패턴**. 개별 흡수는 각 카테고리 작업 내부에서 variant로 처리한다.

---

## 분류 코드

| 코드 | 의미 | 작업 성격 |
|---|---|---|
| **A** | 기존 컴포넌트에 즉시 편입 | variant/prop 확장 (신규 파일 없음) |
| **A▲** | 기존 컴포넌트로 일부만 커버 | 기존 확장 + 일부 신규 검토 |
| **B** | 같은 평면 계층에 신규 primitive 필요 | `packages/core/src/components`에 신규 파일 |
| **C** | 새로운 편제 필요 | `blocks` / `patterns` / `hooks` 신설 |

---

## 계층 정의 (편제)

```
tokens (packages/tokens)
  └─ themes (theme-light/dark/amber/high-contrast)
       └─ atoms / molecules  →  packages/core/src/components   [현존]
            └─ blocks (sections)  →  packages/core/src/blocks   [신설]
                 └─ patterns (templates/flows)  →  packages/core/src/patterns  [신설]
motion (packages/core/src/motion)            [현존, shaders 하위 신설]
hooks  (packages/hooks)                        [신설]
```

**blocks 판별 기준**: ① 페이지의 한 "섹션" 입도 ② 콘텐츠 슬롯 보유(`title`/`items[]`/`cta`) ③ 레이아웃 강제 ④ 동작/상태 플로우 없음(있으면 pattern).

**pattern 정의 (실용 정의 채택)**: pattern = **template(정적 페이지 골격) + 그 화면 유형의 상호작용 플로우**.
순수 atomic design은 template(정적)과 page(콘텐츠/동작)를 나누지만, 본 시스템은 이를 하나로 묶어 "pattern"으로 다룬다.
즉 pattern은 block들을 페이지 레벨로 배치하고 + 검증/제출/포커스 같은 화면 단위 상호작용까지 책임진다(`SignIn`/`SignUp` 등).

> 개념 정의 전체는 사용자용 가이드 [`DESIGN_SYSTEM_GUIDE.md`](../../DESIGN_SYSTEM_GUIDE.md) 참조.

---

## 1. UI Components (40 카테고리)

| 21st 카테고리 | 개수 | 분류 | bbangto-ui 대응 / 작업 |
|---|---:|:---:|---|
| Accordions | 40 | A | `Accordion` variant 확장 |
| Avatars | 17 | A | `Avatar` (group/status/fallback) |
| Badges | 25 | A | `Badge` |
| Buttons | 130 | A | `Button` (variant 대량 흡수) |
| Cards | 79 | A | `Card` |
| Carousels | 16 | A | `Carousel` |
| Checkboxes | 19 | A | `Checkbox` |
| Date Pickers | 12 | A | `DatePicker` |
| Dialogs/Modals | 37 | A | `Modal` / `AlertDialog` |
| Empty States | 1 | A | `EmptyState` |
| File Uploads | 7 | A | `FileUploader` |
| Icons | 10 | A | `atoms/Icon` (107개) |
| Inputs | 102 | A | `Input` / `Searchfield` |
| Notifications | 5 | A | `Snackbar` / `Toast` |
| Paginations | 20 | A | `Pagination` |
| Popovers | 23 | A | `Popover` |
| Radio Groups | 22 | A | `Radio` |
| Selects | 62 | A | `Select` |
| Sliders | 45 | A | `Slider` |
| Spinner Loaders | 21 | A | `Spinner` + motion(Wave/Bars/Ring/Pulse) |
| Tables | 30 | A | `Table` / `DataGrid` |
| Tabs | 38 | A | `Tabs` |
| Tags | 6 | A | `Chip` (Tag≈Chip) |
| Text Areas | 22 | A | `Textarea` / `RichTextEditor` |
| Toasts | 2 | A | `Toast` |
| Toggles | 12 | A | `Switch` / `SegmentedControl` |
| Tooltips | 28 | A | `Tooltip` |
| Alerts | 23 | A▲ | `SectionMessage`(인라인) variant 확장 |
| Forms | 23 | A▲ | 필드는 기존 입력 컴포넌트 / **레이아웃은 pattern(C)** |
| Calendars | 34 | **B** | 신규 `Calendar` (독립 월/범위 뷰; `DatePicker`가 내부 사용) |
| Dropdowns | 25 | **B** | 신규 `DropdownMenu` (+`MenuItem`) |
| Menus | 18 | **B** | 신규 `Menu` (context/dropdown primitive) |
| Links | 13 | **B** | 신규 `Link` atom (현재 `Text`로 대체 중) |
| Numbers | 18 | **B** | 신규 `NumberField` (숫자 입력+스텝; `CountUp`은 표시용 모션) |
| Sidebars | 10 | **B** | 신규 `Sidebar` (영속 collapsible 레이아웃; `Drawer`와 별개) |
| File Trees | 2 | **B** | 신규 `TreeView` |
| AI Chats | 30 | **B+C** | primitive `ChatBubble`/`MessageList`(B) + 조립은 pattern(C) |
| Sign Ins | 4 | **C** | pattern `SignIn` |
| Sign Ups | 4 | **C** | pattern `SignUp` |

**소계**: A/A▲ 29 · B 8 · C 3 (AI Chat은 B/C 양쪽 집계)

---

## 2. Marketing Blocks (20 카테고리)

| 21st 카테고리 | 개수 | 분류 | bbangto-ui 대응 / 작업 |
|---|---:|:---:|---|
| Backgrounds | 33 | A | motion `AnimatedGradientBg`/`GridDriftBg` 확장 |
| Borders | 12 | A | motion `BorderBeam`/`Glow` |
| Texts | 58 | A▲ | motion `GradientText`/`TypingText`/`SplitReveal`/`Marquee` 확장 |
| Footers | 14 | A▲ | `Footer` 확장 + 대형 마케팅 푸터는 block |
| Navigation Menus | 11 | A▲ | `GNB`/`TopNavigation`/`BottomNavigation` 확장 |
| Announcements | 10 | A▲ | `GlobalBanner` 확장 (block형은 `AnnouncementBar`) |
| Scroll Areas | 24 | A▲/B | motion `ScrollReveal`/`ScrollProgress`/`Parallax` + primitive `ScrollArea`(B) |
| **Hooks** | 31 | **C** | ⚠️ 컴포넌트 아님 → `packages/hooks` 신설 |
| **Shaders** | 15 | **C** | WebGL/canvas → `motion/shaders` 하위 신설 |
| **Heroes** | 73 | **C** | block `Hero` |
| **Features** | 36 | **C** | block `FeatureGrid` |
| **Calls to Action** | 34 | **C** | block `CTA` |
| **Pricing Sections** | 17 | **C** | block `PricingSection` |
| **Testimonials** | 15 | **C** | block `Testimonials` |
| **Clients** | 16 | **C** | block `LogoCloud` |
| **Comparisons** | 6 | **C** | block `Comparison` |
| **Docks** | 6 | **C** | block `Dock` |
| **Images** | 26 | **C** | block `Gallery` (+ `Thumbnail` 확장) |
| **Videos** | 9 | **C** | block `VideoBlock` |
| **Maps** | 2 | **C** | block `MapBlock` |

---

## 3. 신규 산출물 마스터 리스트 ("전부 다" 대상)

### B — 신규 primitive (8개) → `packages/core/src/components`
1. `Calendar` — 독립 월/주/범위 캘린더 뷰
2. `Menu` — context/dropdown 메뉴 primitive (+ `MenuItem`, `MenuGroup`, `MenuSeparator`)
3. `DropdownMenu` — 트리거 결합형 (Menu 위 합성)
4. `Link` — 앵커 atom (variant: default/muted/inline/standalone, external 표시)
5. `NumberField` — 숫자 입력 + 증감 스텝퍼 + min/max/step
6. `Sidebar` — 영속/접이식 네비 레이아웃 (collapsible, rail)
7. `TreeView` — 계층 트리 (file tree 포함)
8. `ScrollArea` — 커스텀 스크롤바 컨테이너
9. `ChatBubble` + `MessageList` — AI 챗 primitive

### C-blocks — 섹션 (12개) → `packages/core/src/blocks`
`Hero`, `FeatureGrid`, `CTA`, `PricingSection`, `Testimonials`, `LogoCloud`, `Comparison`, `Dock`, `Gallery`, `VideoBlock`, `MapBlock`, `MarketingFooter`, `AnnouncementBar`

### C-patterns — 템플릿/플로우 (4개) → `packages/core/src/patterns`
`SignIn`, `SignUp`, `FormLayout`, `AIChat`(조립)

### C-hooks — `packages/hooks` (신설 패키지)
21st.dev Hooks(31) 대응. **개별 목록은 Wave 0에서 페이지 크롤로 확정**(예상: `useMediaQuery`, `useInView`, `useScrollProgress`, `useCopyToClipboard`, `useDebounce`, `useLocalStorage`, `useClickOutside`, `useHover`, `useWindowSize`, …).

### C-motion 확장 — `packages/core/src/motion/shaders`
Shaders(15) 대응. WebGL/canvas 기반 배경/이펙트.

---

## 4. 작업 의존성 그래프

```
Wave 0 (편제·인프라·토큰)
   ├──> Wave 1 (A 그룹 variant 확장)      ┐
   ├──> Wave 2 (B 그룹 primitive)         ├─ 병렬
   └──> Wave 3 (hooks + shaders)          ┘
                  │
                  ▼
            Wave 4 (blocks)   ← Wave 1·2 결과를 합성
                  │
                  ▼
          Wave 5 (patterns)   ← blocks·components 조립
                  │
                  ▼
   Wave 6 (통합·Storybook·릴리스)
```

---

## 5. 상태 추적 (Status Legend)

| 상태 | 표기 |
|---|---|
| 미착수 | `TODO` |
| 테스트 작성됨(red) | `RED` |
| 구현 완료(green) | `GREEN` |
| 품질 게이트 통과 | `DONE` |

> 각 산출물의 진행 상태는 구현 시작 시 이 문서 하단 레지스트리에 행을 추가해 추적한다.

### 레지스트리 (구현 진행 시 갱신)

> Wave 0(편제·인프라) 완료 — 상세 `../../WAVE0_REPORT.md`.

| 산출물 | 계층 | Wave | 상태 | 담당 에이전트 | 비고 |
|---|---|---|---|---|---|
| `@centurio1987/hooks` 패키지 | hooks | 0 | **DONE** | orchestrator | 4 게이트 GREEN |
| `useIsMounted` | hook | 0 | **DONE** | orchestrator | 레퍼런스 훅 |
| `blocks`/`patterns`/`motion.shaders` 배럴 | 편제 | 0 | **DONE** | orchestrator | core re-export 배선 |
| 오서링 템플릿 (`/_templates`) | 인프라 | 0 | **DONE** | orchestrator | component/story/hook/checklist |
| 토큰 갭 감사 | 인프라 | 0 | **DONE** | orchestrator | breakpoint 등 해당 Wave로 이월 |
| `Button` (loading/soft/pill) | atom | 1 | **DONE** | leaf | 시범 검증 |
| `Badge` (soft/size/dot) | atom | 1 | **DONE** | leaf | batch 1 |
| `Avatar` (status dot) | atom | 1 | **DONE** | leaf | batch 1 |
| `Link` | atom | 2 | **DONE** | leaf | batch 1, 신규 primitive |
| `NumberField` | molecule | 2 | **DONE** | leaf | batch 1, 신규 primitive |
| `useToggle` / `usePrevious` / `useDebounce` | hook | 3 | **DONE** | leaf | batch 1, vitest 통과 |
| **Wave 1 전체** (26개 컴포넌트 variant 확장) | atom/molecule | 1 | **DONE** | workflow | Accordion·AlertDialog·Card·Carousel·Checkbox·Chip·DatePicker·EmptyState·FileUploader·Input·Modal·Pagination·Popover·Radio·Searchfield·SectionMessage·SegmentedControl·Select·Slider·Snackbar·Switch·Table·Tabs·Textarea·Toast·Tooltip / test 333 |
| **Wave 2 전체** (7 primitive) | atom/molecule | 2 | **DONE** | workflow | Calendar·Menu/DropdownMenu·Sidebar·TreeView·ScrollArea·ChatBubble/MessageList / test 368 |
| **Wave 3a** (hooks 16종) | hook | 3 | **DONE** | workflow | viewport/scroll/interaction/utility / test:unit 65 |
| hooks 잔여 (useDarkMode/useIdle/useGeolocation 등 ~11) | hook | 3 | TODO | | INFERRED 목록, 후속 batch |
| **Wave 3b** (shaders 4종) | motion/shader | 3 | **DONE** | workflow | MeshGradient·Aurora·Waves·ParticleField, reduced-motion 폴백 / test 383 |
| shaders 잔여 (WebGL Plasma/Metaballs/Noise 등 ~11) | motion/shader | 3 | TODO | | INFERRED, WebGL 후속 |
| breakpoint 상수 (tokens) | 인프라 | 4선행 | **DONE** | orchestrator | breakpoints/up/down |
| **Wave 4 전체** (blocks 13종) | block/section | 4 | **DONE** | workflow | Hero·FeatureGrid·CTA·PricingSection·Testimonials·LogoCloud·Comparison·Dock·Gallery·VideoBlock·MapBlock·MarketingFooter·AnnouncementBar / test 410 |
| **Wave 5 전체** (patterns 4종) | pattern | 5 | **DONE** | workflow | SignIn·SignUp·FormLayout(+Section/Row/Field)·AIChat / test 433 |
| **═══ A/B/C 전 계층 1차 구현 완료 ═══** | | | **DONE** | | components·primitives·hooks·shaders·blocks·patterns |
| **Wave 3c** (hooks 잔여 10종) | hook | 3 | **DONE** | workflow | useSessionStorage·useInterval·useTimeout·useDarkMode·usePageVisibility·useOrientation·useNetworkState·useGeolocation·useIdle·useFullscreen / test:unit 115 |
| **Wave 3d** (shaders 잔여 6종) | motion/shader | 3 | **DONE** | workflow | Plasma·Noise·Metaballs·RippleBg·DotMatrix·Halftone (canvas) / test 445 |
| Wave 6: Storybook Overview MDX + 사이드바 계층 정렬 | 문서 | 6 | **DONE** | orchestrator | storySort + Overview/Introduction |
| Wave 6: changeset/버전범프/퍼블리시 | 릴리스 | 6 | TODO | | ⚠️ outward-facing, 사용자 승인 필요 |
