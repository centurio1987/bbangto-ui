import { defineConfig } from 'tsup';

export default defineConfig({
  // 루트 배럴 + 유형 축 메타 서브패스(./type-meta). 후자는 컴포넌트를 import하지 않는 순수 데이터라
  // 별도 엔트리로 분리해 컴포넌트 소비자 번들 오염을 막는다(KAN-020).
  entry: ['src/index.ts', 'src/typeMeta/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ['react', 'react-dom'],
});
