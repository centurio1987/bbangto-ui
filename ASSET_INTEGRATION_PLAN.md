# Asset Integration Plan — 21st.dev 카탈로그의 디자인 시스템 구현 전략

> **입력**: `packages/core/COMPONENT_CATALOG.md` (분류 SSOT)
> **목표**: 카탈로그의 A/B/C 산출물 전부를 bbangto-ui에 구현한다.
> **방법론**: Wave 단위 실행 + 멀티 에이전트 위임 (단순 독립 작업 → subagent, 오케스트레이션 → Opus agent).
> **불변 규칙**: 모든 산출물은 `CLAUDE.md`의 **테스트 우선 워크플로**를 따른다 —
> `테스트(play/vitest) 작성 → 체크리스트 인스턴스화 → 구현 → 품질 게이트 → 완료 확인`.

- **작성일**: 2026-06-24

---

## 0. 위임 모델 (Delegation Model)

세 가지 역할로 작업을 나눈다. 판단·합성이 필요한 일은 Opus, 사양이 확정된 독립 leaf 작업은 Sonnet에 맡긴다.

| 역할 | 모델 | 책임 | 비고 |
|---|---|---|---|
| **Catalog Orchestrator** | Opus | 마스터. Wave 순서·의존성 게이팅, 각 Wave 그린 판정, 카탈로그 레지스트리 갱신, 최종 품질 게이트 | 세션당 1명 |
| **Wave Lead** | Opus | 작업이 많은 Wave(특히 1·4·5)에서 leaf 팬아웃, 결과 수집, `pnpm typecheck/build/test` 실행, red 재시도, 마스터에 보고 | Wave별 1명 |
| **Component Builder** | Sonnet | leaf 1개(컴포넌트/variant/hook) — 테스트 먼저 → 구현 → self `typecheck` → 구조화 상태 반환 | 다수 병렬 |
| **Block/Pattern Composer** | Opus | block/pattern 1개 — 합성 판단 필요(레이아웃·슬롯 설계) | Wave 4·5 |

**leaf 작업 계약 (Component Builder 입력/출력)**

- 입력: `{ name, layer, targetPath, storyPath, spec(variant 목록·a11y 요구·토큰 참조), checklistSection }`
- 절차: ① story `play`(또는 vitest) 테스트를 red로 작성 → ② `QUALITY_CHECKLIST.md` 해당 섹션 복사 → ③ 구현 → ④ `pnpm --filter @centurio1987/core typecheck` self-check
- 출력(구조화): `{ name, status: RED|GREEN|DONE, files[], testFile, typecheckPass, notes, blockers[] }`

**실행 수단**: 이 계획은 `Workflow` 도구(멀티 에이전트 파이프라인) 또는 `Agent` 팬아웃으로 구동한다.
단, Workflow는 **명시적 opt-in("use a workflow"/"ultracode")** 시에만 기동한다.

---

## Wave 0 — 편제·인프라·토큰 기반 (Orchestrator 주도)

**선행 조건: 없음. 모든 Wave가 여기에 의존.**

| # | 작업 | 담당 | 산출 |
|---|---|---|---|
| 0.1 | 패키지/디렉터리 신설: `packages/hooks`, `packages/core/src/blocks`, `packages/core/src/patterns`, `motion/shaders` | Sonnet×1 | scaffolding + index 배선 |
| 0.2 | 오서링 템플릿 확정: 컴포넌트 템플릿, story+play 템플릿, 체크리스트 인스턴스 양식 | Opus | `_templates/` |
| 0.3 | **토큰 갭 감사**: 신규 컴포넌트가 요구하는 토큰 부재 식별(예: sidebar width, chat bubble surface, calendar grid) → `packages/tokens` 보강 + 4개 테마 동기화 | Opus + Sonnet×4(테마별) | 토큰 추가 |
| 0.4 | 21st Hooks(31)·Shaders(15) 개별 목록 크롤로 확정 → 카탈로그 레지스트리에 행 인스턴스화 | Sonnet×1 (WebFetch) | 확정 목록 |
| 0.5 | Storybook 사이드바 계층(Components/Blocks/Patterns/Motion/Hooks) 정의 | Sonnet×1 | story 메타 규약 |

**그린 판정**: `pnpm typecheck` + `pnpm build` 통과(빈 패키지 포함), 템플릿 합의.

---

## Wave 1 — A 그룹: 기존 컴포넌트 variant 확장 (Wave Lead 주도)

**선행: Wave 0. 성격: 고병렬·독립. 컴포넌트 1개 = Component Builder 1명.**

- 대상: 카탈로그 A/A▲ 29개 카테고리 (Accordion, Button, Card, Input, Select, Table, Tabs, Tooltip, … + SectionMessage(Alert), Footer/GNB/GlobalBanner(마케팅 variant), motion 텍스트/배경 확장)
- 각 leaf: 21st 해당 카테고리의 대표 패턴을 조사해 **누락 variant를 prop으로 흡수** + 각 variant당 story `play` 테스트.
- Wave Lead가 ~29개를 배치(batch)로 팬아웃 → 결과 수집 → `pnpm test`(chromium) 일괄 실행 → red 재할당.

**그린 판정**: 전체 4개 품질 게이트(`typecheck`/`build`/`test`/`storybook build`) 통과. 카탈로그 상태 `DONE`.

---

## Wave 2 — B 그룹: 신규 primitive (Wave Lead 주도, Wave 1과 병렬)

**선행: Wave 0(토큰). 성격: 독립 leaf. primitive 1개 = Component Builder 1명.**

| primitive | 의존 | 비고 |
|---|---|---|
| `Calendar` | 토큰(grid) | `DatePicker` 리팩터로 내부 사용 가능(선택) |
| `Menu` (+ MenuItem/Group/Separator) | Popover 패턴 | |
| `DropdownMenu` | `Menu` | Menu 완료 후 |
| `Link` | typography 토큰 | |
| `NumberField` | Input 패턴 | 기존 `Stepper`(위저드)와 네이밍 충돌 주의 |
| `Sidebar` | 토큰(width/rail) | `Drawer`와 별개 |
| `TreeView` | — | |
| `ScrollArea` | — | motion ScrollProgress와 연동 가능 |
| `ChatBubble` + `MessageList` | 토큰(surface) | AI Chat pattern의 기반 |

- 대부분 상호 독립 → 동시 진행. `DropdownMenu`만 `Menu` 선행.
- 각 leaf: primitive별 story + `play`(키보드 내비, ARIA role, reduced-motion) 테스트 우선.

**그린 판정**: 4개 게이트 통과 + 신규 export가 `packages/core/src/index.ts`에 배선. 상태 `DONE`.

---

## Wave 3 — 새 편제: hooks + motion/shaders (Wave Lead 주도, Wave 1·2와 병렬)

**선행: Wave 0.**

- `packages/hooks`: 확정된 31개 훅 — 각 훅 = `vitest` 단위 테스트 우선 → 구현. Component Builder 다수 병렬.
- `motion/shaders`: Shaders(15) — WebGL/canvas. `prefers-reduced-motion` 정적 폴백 **필수**(`MOTION_QUALITY_CHECKLIST.md` 적용). 정적 대체 렌더 테스트 포함.

**그린 판정**: `packages/hooks` 단위 테스트 그린 + shaders reduced-motion 폴백 검증. 상태 `DONE`.

---

## Wave 4 — blocks (섹션) (Block Composer = Opus 주도)

**선행: Wave 1·2(컴포넌트가 있어야 합성 가능). 성격: 합성 판단 필요 → Opus subagent.**

- 대상: `Hero`, `FeatureGrid`, `CTA`, `PricingSection`, `Testimonials`, `LogoCloud`, `Comparison`, `Dock`, `Gallery`, `VideoBlock`, `MapBlock`, `MarketingFooter`, `AnnouncementBar` (13개)
- 각 block: **콘텐츠 슬롯 API 설계**(`title`/`items[]`/`cta` 등) + 기존 컴포넌트로 합성 + 반응형 레이아웃 + story `play`(슬롯 렌더·반응형·CTA 인터랙션) 테스트.
- Block Composer 1명이 block 1개 담당(레이아웃 결정은 위임 불가한 판단), 단순 하위 부품은 Component Builder에 재위임 가능.

**그린 판정**: 4개 게이트 + 슬롯 API 일관성 리뷰(Orchestrator). 상태 `DONE`.

---

## Wave 5 — patterns (템플릿/플로우) (Pattern Composer = Opus 주도)

**선행: Wave 4(blocks) + Wave 2(primitive). 성격: 상태·검증 플로우 포함 → Opus.**

- 대상: `SignIn`, `SignUp`, `FormLayout`, `AIChat`(조립) (4개)
- 각 pattern: 폼 검증/제출 상태, 키보드 플로우, 에러 처리 + story `play`(제출 성공/실패 경로, 검증 메시지, 포커스 관리) 테스트.
- `AIChat` = Wave 2 `ChatBubble`/`MessageList` + Wave 3 훅 조립.

**그린 판정**: 4개 게이트 + 접근성(포커스 트랩·라이브리전) 검증. 상태 `DONE`.

---

## Wave 6 — 통합·문서·릴리스 (Orchestrator 주도)

| # | 작업 | 담당 |
|---|---|---|
| 6.1 | Storybook 전 계층 정리(Components/Blocks/Patterns/Motion/Hooks 그룹), Autodocs | Sonnet×1 |
| 6.2 | 카탈로그 레지스트리 전 항목 `DONE` 확정, 잔여 `TODO` 보고 | Orchestrator |
| 6.3 | 전체 품질 게이트 최종 실행 (`typecheck`/`build`/`test`/`storybook build`) | Wave Lead |
| 6.4 | Changeset 작성 + 버전 범프 + 릴리스 (사용자 승인 후) | Orchestrator |

---

## 의존성 요약

```
0 ──► (1 ∥ 2 ∥ 3) ──► 4 ──► 5 ──► 6
```

- **병렬 최대화 구간**: Wave 1·2·3 (서로 독립, Wave 0만 공통 선행).
- **직렬 강제 구간**: blocks(4)는 components(1·2) 완료 후, patterns(5)는 blocks(4) 후.

---

## 리스크 & 가드레일

1. **네이밍 충돌**: `NumberField`↔`Stepper`, `Sidebar`↔`Drawer`, `Menu`↔`Select`/`GNB` — Wave 0에서 네이밍 규약 확정.
2. **토큰 부채**: 신규 컴포넌트가 임의 값(magic number)을 쓰지 않도록 Wave 0.3 토큰 감사를 게이트로 강제.
3. **테스트 우선 위반 방지**: leaf 계약상 `status: RED`(테스트 먼저)를 거치지 않은 산출물은 Wave Lead가 반려.
4. **reduced-motion**: 모든 motion/shaders 산출물은 `MOTION_QUALITY_CHECKLIST.md` 통과 필수.
5. **범위 폭주**: 카테고리당 흡수할 variant는 "대표 패턴"으로 제한, 무한 variant 복제 금지(`log`로 드롭 목록 명시).

---

## 실행 개시 방법

1. 이 계획 승인 → `Catalog Orchestrator`(Opus) 기동.
2. Wave 0 완료 후 Wave 1·2·3 동시 팬아웃.
3. 멀티 에이전트 파이프라인으로 돌리려면 `Workflow` 도구 사용 (사용자가 "use a workflow"/"ultracode"로 명시 opt-in 시).
4. 소규모로 시작하려면 단일 Wave부터 `Agent` 팬아웃으로 검증 후 확장.
