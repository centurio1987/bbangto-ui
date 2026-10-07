import { defineConfig } from 'tsup';

/**
 * 배포되는 `.d.ts` 머리에 박히는 안내. **소스의 파일 머리 주석은 dts 롤업이 버린다**(선언에 붙지 않은 주석이라)
 * — 소비자가 설치 후 처음 여는 표면이 `dist/index.d.ts` 하나이므로(상류 리포트 I1·I2) 여기서 정본 위치를 알린다.
 * `src/index.ts` 머리 주석과 같은 내용을 담고, 그 정합은 `src/typeMeta/jsdoc.test.ts`가 본다.
 */
const DTS_BANNER = `/**
 * @centurio1987/bbangto-ui-visualization — headless 시각화 디자인 시스템(다이어그램 / 인포그래픽).
 *
 * 이 파일이 내보내는 컴포넌트는 **87종 시각화 유형** 중 하나씩이다. 이름만 보고 고르지 말 것 —
 * 각 컴포넌트 선언 위 JSDoc의 @vizType / @useWhen / @avoidWhen 이 채택 근거다.
 *
 *   import { selectVizTypes, vizTypeRegistry } from '@centurio1987/bbangto-ui-visualization/type-meta';
 *   selectVizTypes(vizTypeRegistry, {
 *     dataShape: ['process'],           // 가진 데이터가 무엇인가
 *     structuralTraits: ['branching'],  // 그 데이터의 구조가 무엇인가(분기·순환·계층 …)
 *     match: 'all',                     // 지정한 축을 전부 만족하는 것만
 *   });
 *
 * 파일로 읽으려면 패키지에 동봉된 type.manifest.json(87 엔트리). 전체 문서는 README.md.
 * 한 이름이 여러 유형을 겸하면(Statistics·Cycle·Hierarchy) defaultVizTypeForExport 로 기본 렌더 유형을 확인한다.
 */`;

export default defineConfig({
  // 선언은 공개 입구 둘만 낸다 — 루트 배럴 + 유형 축 메타 서브패스(./type-meta). 후자는 컴포넌트를
  // import하지 않는 순수 데이터라 별도 입구로 분리해 컴포넌트 소비자 번들 오염을 막는다(KAN-020).
  // entry 를 비우면 아래 글롭 전체가 dts 엔트리가 된다.
  dts: { entry: ['src/index.ts', 'src/typeMeta/index.ts'], banner: DTS_BANNER },
  // 파일 단위 출력(KAN-051). `sideEffects: false` 는 파일 단위로만 작동해서, dist 가 한 파일이면
  // 하나만 가져와도 전부 딸려 온다. jsdocSource·jsdocTags 는 Node 전용(시험이 쓴다)이라 배포물에서 뺀다.
  entry: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.{test,stories}.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/typeMeta/jsdocSource.ts',
    '!src/typeMeta/jsdocTags.ts',
  ],
  format: ['esm'],
  splitting: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ['react', 'react-dom'],
});
