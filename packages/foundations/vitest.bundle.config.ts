import { defineConfig } from 'vitest/config';

// 번들 크기 게이트 전용 러너(KAN-066). 루트 `pnpm build` 가 모든 패키지를 빌드한 직후
// `test:bundle` 로 이 설정을 돌린다. 게이트는 dist 를 파일 경로로 읽어 재므로 소스 조건
// (vitest.source.ts)을 켜지 않는다. 상한의 정본은 루트 bundle-budget.json 이다.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/bundleBudget.test.ts'],
  },
});
