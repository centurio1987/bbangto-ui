import { defineConfig } from 'vitest/config';
import { sourceResolve } from '../../vitest.source';

// 순수 geometry 로직(scale/treemap/venn/sankey/tree)의 단위 테스트 러너.
// 화면 동작 검증은 storybook play()가 담당한다. 여기서 렌더하는 것은 서버 렌더(react-dom/server)로 글자가
// 결과에 나오는지만 보는 시험이다(`*.test.tsx`, KAN-082 — 템플릿이 데이터로 받은 라벨을 그리는가).
export default defineConfig({
  ...sourceResolve,
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
