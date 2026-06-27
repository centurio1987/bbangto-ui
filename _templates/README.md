# `_templates/` — 오서링 템플릿 (Wave 0.2 산출물)

leaf subagent(Component/Hook Builder)가 복사해서 쓰는 스캐폴드 모음.
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
4) 게이트: pnpm typecheck && pnpm build && pnpm test && pnpm --filter storybook build
5) 배럴 export 추가 + 카탈로그 레지스트리 상태 갱신(DONE)
```

## Storybook `title` 계층 규약 (Wave 0.5)

스토리 `meta.title` 의 첫 세그먼트는 아래 중 하나로 지정한다.

| 세그먼트 | 대상 |
|---|---|
| `Atoms/*` | 단일 조각 (Button, Input, Link, Badge …) |
| `Molecules/*` | 작은 묶음 (SearchField, Stepper, Tabs …) |
| `Blocks/*` | 섹션 (Hero, PricingSection, FeatureGrid …) |
| `Patterns/*` | 화면/플로우 (SignIn, SignUp, FormLayout …) |
| `Motion/*` | 모션 atom (FadeIn, Spinner …) |
| `Motion/Shaders/*` | 셰이더 배경/이펙트 |
| `Hooks/*` | 훅 데모 (인터랙티브 데모 스토리) |

> 개념 정의: [`/DESIGN_SYSTEM_GUIDE.md`](../DESIGN_SYSTEM_GUIDE.md) · 분류: [`packages/core/COMPONENT_CATALOG.md`](../packages/core/COMPONENT_CATALOG.md)
