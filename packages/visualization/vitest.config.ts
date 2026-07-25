import { defineConfig } from 'vitest/config';

// 순수 geometry 로직(scale/treemap/venn/sankey/tree)의 단위 테스트 러너.
// 컴포넌트 렌더 검증은 storybook play()가 담당하고, 여기서는 렌더 무관 좌표 산술만 본다.
export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
