/**
 * vitest.source.ts — 패키지 vitest 설정이 함께 쓰는 **소스 조건** (KAN-066).
 *
 * 워크스페이스 패키지의 exports 는 진입점마다 개발용 조건 `bbangto-source`(→ `./src/…ts`)를 맨 앞에 둔다.
 * 이 조건을 켜면 test:unit 이 다른 패키지를 dist 가 아니라 소스에서 찾으므로 build 없이 돈다. 이름의 정본과
 * 누락 게이트는 `packages/foundations/src/workspaceSource.ts` 다.
 *
 * Vite 의 `conditions` 는 기본값에 더해지지 않고 **바꿔 끼워진다**. 그래서 Vite 8 기본값(`module` ·
 * `browser`|`node` · `development|production`)을 그대로 뒤에 적는다 — 빼면 react 같은 의존이 다른 빌드를
 * 집을 수 있다. 쪽마다 따로 적는 것은 vitest 가 환경에 따라 보는 자리가 달라서다. node 환경 테스트는
 * `ssr.resolve.conditions` 만 보고(`resolve.conditions` 만 켜면 소스를 못 찾았다, KAN-066 S2 실측), jsdom
 * 환경은 `resolve.conditions` 를 본다.
 *
 * Storybook 은 이 파일을 안 쓴다. 배포물(dist)을 그대로 시험한다는 설계라 일부러 조건을 켜지 않는다.
 */
export const sourceResolve = {
  resolve: { conditions: ['bbangto-source', 'module', 'browser', 'development|production'] },
  ssr: { resolve: { conditions: ['bbangto-source', 'module', 'node', 'development|production'] } },
};
