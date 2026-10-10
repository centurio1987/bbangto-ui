import { defineConfig } from 'vitest/config';
import { sourceResolve } from '../../vitest.source';

// foundations 단위 테스트 러너. foundation 데이터 검사와 함께 저장소 전역 게이트(매니페스트 커버리지 ·
// 게이트 문서 · 배포 문서 · 소스 조건 등)가 여기서 돈다. 렌더가 없으므로 node 환경이다.
export default defineConfig({
  ...sourceResolve,
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
