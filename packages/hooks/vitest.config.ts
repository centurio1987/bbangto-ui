import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 훅 단위 테스트는 jsdom 위에서 renderHook으로 실행한다
    // (스토리북 컴포넌트 테스트는 playwright/chromium 브라우저 모드로 별도).
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
  },
});
