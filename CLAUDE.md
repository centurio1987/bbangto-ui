# bbangto-ui — Claude 작업 규칙

## 필수 워크플로 (모든 태스크 공통)

**순서를 어기면 안 된다. 구현보다 테스트가 먼저다.**

```
테스트 작성 → 체크리스트 인스턴스화 → 구현 → 품질 게이트 실행 → 체크리스트 완료 확인
```

### 1. 테스트 먼저 작성

작업 유형별 테스트 위치:

| 작업 유형 | 테스트 위치 |
|-----------|------------|
| 컴포넌트 신규/수정 | `apps/storybook/src/stories/<Component>.stories.tsx` → `play` 함수 |
| 모션 atom/variant | 위와 동일 + `Motion.stories.tsx` 참고 |
| 토큰/테마 변경 | 영향받는 컴포넌트 story의 `play` 함수에 토큰 검증 추가 |
| 유틸/로직 | `packages/*/src/**/*.test.ts` (vitest 단위 테스트) |

모든 `play` 함수는 실제 chromium 위에서 실행된다 (`@storybook/addon-vitest` + Playwright).

### 2. 체크리스트 인스턴스화

`QUALITY_CHECKLIST.md`에서 해당 섹션을 복사해 태스크 메모/커밋 메시지에 첨부한다.

### 3. 구현

테스트가 먼저 빨간 상태여야 한다. 구현 후 초록이 되는 흐름.

### 4. 품질 게이트 실행 (모두 초록이어야 완료)

```bash
pnpm typecheck                      # 워크스페이스 전체 타입 검사
pnpm build                          # 모든 패키지 빌드 (storybook 제외)
pnpm test                           # Playwright/chromium 브라우저 테스트
pnpm --filter storybook build       # Storybook 번들 스모크 테스트
```

게이트가 하나라도 빨간 상태면 태스크를 완료로 표시하지 않는다.

### 5. 모션 관련 작업

추가로 `packages/core/MOTION_QUALITY_CHECKLIST.md`의 체크리스트를 사용한다.
`packages/core/motion-catalog.md`에 구현 내용을 기록한다.

---

## 프로젝트 구조 요약

```
bbangto-ui/
├── apps/storybook/          # Storybook + Vitest + Playwright 테스트
│   └── src/stories/         # 컴포넌트별 .stories.tsx (play 함수 = 테스트)
├── packages/
│   ├── core/                # React 컴포넌트 (@centurio1987/core)
│   │   └── src/motion/      # 모션 atom들
│   ├── tokens/              # 디자인 토큰 타입 정의
│   ├── theme-light/         # 라이트 테마
│   ├── theme-amber/         # 앰버 테마
│   ├── theme-dark/          # 다크 테마
│   └── theme-high-contrast/ # 고대비 테마
└── QUALITY_CHECKLIST.md     # 범용 품질 체크리스트 (이 파일의 동반 문서)
```

## 테스트 작성 패턴

### 컴포넌트 play 함수 최소 요구사항

```tsx
export const MyStory: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const el = await canvas.findByRole('button', { name: /../ });
    // 2. 인터랙션
    await userEvent.click(el);
    // 3. 결과 검증
    await expect(canvas.getByRole('...')).toBeVisible();
  },
};
```

### 토큰 검증 패턴

```tsx
play: async ({ canvasElement }) => {
  const el = canvasElement.querySelector('.target');
  const style = getComputedStyle(el!);
  expect(style.getPropertyValue('--bbangto-...')).not.toBe('');
},
```

## 패키지 스크립트

```bash
pnpm dev              # Storybook 개발 서버 (포트 6006)
pnpm build            # 전체 패키지 빌드
pnpm typecheck        # 타입 검사
pnpm test             # Playwright 브라우저 테스트 (CI 기준)
pnpm test:watch       # 테스트 워치 모드
```
