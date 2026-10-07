import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  // 워크스페이스 패키지는 src 가 아니라 빌드된 dist 를 읽는다(alias 없음). DEV 에서는 아래
  // optimizeDeps.include 로 vite 가 그 dist 를 미리 묶어 캐시한다(cd0d378: 콜드 로드 ~60s→<1s).
  // core·visualization·두 카탈로그의 dist 는 파일 단위 출력이라(KAN-051) 패키지마다 js 가 75~473개다.
  // 미리 묶은 캐시는 dist 를 다시 빌드해도 저절로 갱신되지 않으므로, 고친 것이 화면에 안 나오면
  // apps/storybook/node_modules/.cache/storybook 을 지우고 다시 띄운다(Storybook 10 의 dev 에는
  // --force 가 없다). 프로덕션 build 도 같은 dist 를 쓴다.
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(viteConfig, {
      optimizeDeps: {
        include: [
          '@centurio1987/bbangto-ui-core',
          '@centurio1987/bbangto-ui-tokens',
          '@centurio1987/bbangto-ui-hooks',
          '@centurio1987/bbangto-ui-visualization',
          '@centurio1987/bbangto-ui-foundations',
          '@centurio1987/bbangto-ui-style-guide-catalog',
          '@centurio1987/bbangto-ui-visualization-style-guide-catalog',
        ],
      },
    });
  },
};
export default config;