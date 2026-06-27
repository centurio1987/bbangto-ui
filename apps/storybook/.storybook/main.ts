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
  // DEV 성능: @centurio1987/bbangto-ui-core 의 빌드된 dist 배럴(590KB 단일 파일)을 vite dev가
  // on-demand 변환하면 스토리 첫 로드마다 ~55초가 걸린다(거대 단일 파일의 병리적
  // 변환 비용). DEV 에서는 대신 src 로 alias 해 작은 소스 모듈들을 빠르게 변환·캐시
  // 한다(HMR 도 됨). 프로덕션 build 는 그대로 dist 를 사용한다.
  async viteFinal(viteConfig) {
    const { mergeConfig } = await import('vite');
    return mergeConfig(viteConfig, {
      optimizeDeps: {
        include: [
          '@centurio1987/bbangto-ui-core',
          '@centurio1987/bbangto-ui-tokens',
          '@centurio1987/bbangto-ui-hooks',
          '@centurio1987/bbangto-ui-diagram',
          '@centurio1987/bbangto-ui-themes',
          '@centurio1987/bbangto-ui-themes',
          '@centurio1987/bbangto-ui-themes',
          '@centurio1987/bbangto-ui-themes',
        ],
      },
    });
  },
};
export default config;