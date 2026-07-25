import { defineConfig } from 'vitest/config';

// 매니페스트 생성기(buildManifest)의 단위 테스트 러너.
// 카탈로그 객체는 구조만 읽으므로 node 환경에서 실행한다(컴포넌트 렌더 없음).
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
