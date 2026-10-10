import { configDefaults, defineConfig } from 'vitest/config';
import { sourceResolve } from '../../vitest.source';

// foundations 단위 테스트 러너. foundation 데이터 검사와 함께 저장소 전역 게이트(매니페스트 커버리지 ·
// 게이트 문서 · 배포 문서 · 소스 조건 등)가 여기서 돈다. 렌더가 없으므로 node 환경이다.
// 크기 게이트(bundleBudget.test.ts)는 빌드된 dist 를 재므로 여기서 빼고, 루트 build 끝에서
// vitest.bundle.config.ts 로 돈다(KAN-066). 그래야 test:unit 이 build 없이 돈다.
export default defineConfig({
  ...sourceResolve,
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    exclude: [...configDefaults.exclude, 'src/bundleBudget.test.ts'],
  },
});
