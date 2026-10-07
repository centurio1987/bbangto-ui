# `_templates/` — 오서링 템플릿

새 컴포넌트·스토리·훅을 만들 때 복사해서 쓰는 스캐폴드 모음. Wave 0 에서 leaf 서브에이전트용으로 처음 만들었다
(경위: [`packages/core/COMPONENT_CATALOG.md` 「Wave 실행 기록」](../packages/core/COMPONENT_CATALOG.md#wave-실행-기록)).
이 디렉터리는 어떤 패키지에도 속하지 않으며(빌드/타입체크/스토리 글롭 대상 아님), 순수 참조용이다.

| 템플릿 | 용도 | 복사 대상 경로 |
|---|---|---|
| `Component.template.tsx` | atom/molecule/block 컴포넌트 | `packages/core/src/components/<Name>.tsx` 또는 `.../blocks/<Name>.tsx` |
| `Component.stories.template.tsx` | 스토리 + `play` 테스트 | `apps/storybook/src/stories/<Name>.stories.tsx` |
| `hook.template.ts` | 헤드리스 훅 | `packages/hooks/src/use<Name>.ts` |
| `CHECKLIST_INSTANCE.template.md` | 작업 단위 체크리스트 | PR/작업 메모 첨부 |

## 작업 순서 (CLAUDE.md 불변 규칙)

```
1) 스토리 play(또는 hook vitest) 테스트 작성 → RED 확인   ← 구현보다 먼저!
2) CHECKLIST_INSTANCE 복사해 인스턴스화
3) 컴포넌트/훅 구현 → GREEN
4) 게이트: pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build && pnpm test:unit
5) 배럴 export 추가 + 카탈로그 레지스트리 상태 갱신(DONE)
```

## Storybook `title` 계층 규약

스토리 `meta.title` 은 아래 접두 중 하나로 시작한다. 정본은 사이드바 순서를 정하는
[`apps/storybook/.storybook/preview.tsx`](../apps/storybook/.storybook/preview.tsx) 의 `storySort` 이고,
이 표는 그중 원형 디자인 시스템(`ARCHETYPE`) 부분이다.

| 접두 | 대상 |
|---|---|
| `ARCHETYPE/Components/Atoms/*` | 단일 조각 (Button, Input, Link, Badge …) |
| `ARCHETYPE/Components/Molecules/*` | 작은 묶음 (SearchField, Stepper, Tabs …) |
| `ARCHETYPE/Components/Organisms/*` | 여러 조각을 조립한 큰 컴포넌트 (Modal, Drawer, Table, GNB …) |
| `ARCHETYPE/Blocks/*` | 섹션 (Hero, PricingSection, FeatureGrid …) |
| `ARCHETYPE/Patterns/*` | 화면/플로우 (SignIn, SignUp, FormLayout …) |
| `ARCHETYPE/Foundations/Base` | base foundation 3종의 색·타이포·간격 견본 |
| `ARCHETYPE/Foundations/Motion/*` | 모션 atom (FadeIn, Spinner …) |
| `ARCHETYPE/Foundations/Motion/Shaders/*` | 셰이더 배경/이펙트 |

훅 데모 스토리는 아직 자리가 없다. 만들 때는 `storySort` 의 `ARCHETYPE` 아래에 자리를 먼저 넣는다.
`VISUALIZATION/*` 와 카탈로그 셋(`FOUNDATION CATALOG`·`STYLE GUIDE CATALOG`·`VISUALIZATION STYLE GUIDE CATALOG`)은
각 패키지의 생성 규약을 따른다.

> 개념 정의: [`/DESIGN_SYSTEM_GUIDE.md`](../DESIGN_SYSTEM_GUIDE.md) · 분류: [`packages/core/COMPONENT_CATALOG.md`](../packages/core/COMPONENT_CATALOG.md)
