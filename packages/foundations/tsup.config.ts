import { defineConfig } from 'tsup';

export default defineConfig({
  // 루트 배럴 + foundation 채택 메타 서브패스(./meta). 후자는 순수 데이터라 별도 엔트리로 분리해
  // 토큰 소비자 번들 오염을 막는다(viz ./type-meta 선례, KAN-035).
  entry: ['src/index.ts', 'src/meta/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
});
