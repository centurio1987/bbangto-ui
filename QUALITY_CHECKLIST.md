# bbangto-ui 품질 체크리스트

모든 작업 항목은 이 체크리스트를 통과해야 한다.
작업 유형에 맞는 섹션을 복사해 PR/커밋에 첨부한다.

---

## A. 컴포넌트 신규 추가

### 구현
- [ ] `packages/core/src/components/<Name>.tsx` 생성
- [ ] `packages/core/src/index.ts`에 export 추가
- [ ] `React.forwardRef` + `displayName` + `...props` + `ref` 지원
- [ ] 토큰은 `cssVar()` 헬퍼로만 참조 (하드코딩 금지)
- [ ] 5개 테마 전체에서 렌더링 확인 (light / dark / high-contrast / amber-light / amber-dark)

### 접근성
- [ ] 적절한 ARIA role/label/live region 적용
- [ ] 키보드 인터랙션 동작 확인 (Tab, Enter, Space, Esc)
- [ ] `@storybook/addon-a11y` 위반 없음

### 테스트
- [ ] `apps/storybook/src/stories/<Name>.stories.tsx` 생성
- [ ] 기본 렌더링 story에 `play` 함수 포함 (최소: 요소 존재 + 인터랙션 1건)
- [ ] 모든 주요 variant/state에 대한 story 존재

### 게이트
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과
- [ ] `pnpm test` 통과 (Playwright/chromium)
- [ ] `pnpm --filter storybook build` 통과

---

## B. 컴포넌트 수정

### 구현
- [ ] 변경 전/후 DOM 구조 및 props API 일치 확인 (breaking change 없음)
- [ ] 영향받는 테마 파일 함께 수정
- [ ] 기존 story가 여전히 통과

### 회귀 방지
- [ ] 변경된 컴포넌트의 기존 `play` 함수 전부 통과
- [ ] 의존 컴포넌트(있다면) story도 확인

### 게이트
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과
- [ ] `pnpm test` 통과
- [ ] `pnpm --filter storybook build` 통과

---

## C. 토큰/테마 변경

### 구현
- [ ] `packages/tokens/src/types.ts` 타입 정의 선행
- [ ] 변경된 토큰을 사용하는 **모든** 테마 파일 업데이트
  - `packages/theme-light/src/theme.ts`
  - `packages/theme-amber/src/theme.ts`
  - `packages/theme-dark/src/theme.ts`
  - `packages/theme-high-contrast/src/theme.ts`
- [ ] 기존 컴포넌트와의 호환성 유지

### 테스트
- [ ] 토큰 변경 영향을 받는 컴포넌트 story의 `play` 함수에 CSS 변수 검증 추가

### 게이트
- [ ] `pnpm typecheck` 통과
- [ ] `pnpm build` 통과
- [ ] `pnpm test` 통과
- [ ] `pnpm --filter storybook build` 통과

---

## D. 모션 atom/variant (모션 전용)

`packages/core/MOTION_QUALITY_CHECKLIST.md` 의 전체 체크리스트를 사용한다.
`packages/core/motion-catalog.md`에 구현 기록을 추가한다.

---

## E. Story 추가/수정

### 요구사항
- [ ] 스토리 파일: `apps/storybook/src/stories/<Name>.stories.tsx`
- [ ] 각 story에 의미있는 `name`과 `args` 설정
- [ ] 인터랙션이 있는 story는 반드시 `play` 함수 포함
- [ ] `@storybook/addon-a11y` 위반 없음

### 게이트
- [ ] `pnpm test` 통과 (play 함수 포함 story)
- [ ] `pnpm --filter storybook build` 통과

---

## 공통 금지 사항

- 하드코딩된 색상/간격/폰트 값 (반드시 토큰 사용)
- `document.*` / `window.*` 직접 접근 (SSR 위험)
- `Math.random()` / `Date.now()` 렌더 출력에 사용 (hydration mismatch)
- 새 런타임 의존성 추가 (디자인 시스템은 zero-dep 지향)
- `any` 타입 사용
