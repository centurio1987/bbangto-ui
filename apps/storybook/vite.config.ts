/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        // ExpandedMatrix(TemplateStyleMatrix) 등 교차검증 play는 카탈로그 크기에 선형
        // (템플릿 × 가이드 셀마다 getComputedStyle 다수). 카탈로그가 커지며 기본 15s를
        // 넘어서므로 상향(60s면 ~120 가이드까지 여유). 병렬 브라우저 부하 변동도 흡수.
        testTimeout: 60_000,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }, {
      // 실제 키 입력 테스트(KAN-054). play 테스트의 userEvent 는 이벤트를 흉내 내서 렌더 순서에 걸린
      // 포커스 결함을 못 잡는다. 여기서는 vitest/browser 의 userEvent 가 Playwright 로 실제 키를 보낸다.
      // 어느 컴포넌트가 이 테스트를 가져야 하는지는 루트 keyboard-coverage.json 의 realInput 이 정한다.
      extends: true,
      test: {
        name: 'real-input',
        include: ['src/real-input/**/*.realinput.test.tsx'],
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});