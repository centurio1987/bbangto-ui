import { defineConfig } from 'tsup';

export default defineConfig({
  // 파일 단위 출력(KAN-051). package.json 의 `sideEffects: false` 는 파일 단위로만 작동해서, dist 가
  // index.js 한 파일이면 Button 하나만 가져와도 전부 딸려 온다. 소스 파일마다 출력을 하나씩 내고
  // 함께 쓰는 코드는 청크로 뺀다. 크기 상한은 루트 bundle-budget.json 이 지킨다.
  entry: ['src/**/*.{ts,tsx}', '!src/**/*.{test,stories}.{ts,tsx}', '!src/**/*.d.ts'],
  format: ['esm'],
  splitting: true,
  // 선언은 공개 입구 하나만 낸다. 비우면 위 글롭 전체가 dts 엔트리가 된다.
  dts: { entry: 'src/index.ts' },
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ['react', 'react-dom']
});
