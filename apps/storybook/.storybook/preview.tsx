import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { FoundationProvider, lightFoundation, darkFoundation, highContrastFoundation } from '@centurio1987/bbangto-ui-core';
import { DiagramProvider, blueprintTheme } from '@centurio1987/bbangto-ui-diagram';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      // 사이드바 3대 최상위: ARCHETYPE(원형 디자인 시스템) / DIAGRAM / STYLE GUIDE CATALOG.
      // Overview(.mdx)는 단일 진입 안내 문서로 최상단 고정.
      storySort: {
        order: [
          'Overview',
          'ARCHETYPE', [
            'Foundations', ['Base', 'Motion', ['Shaders']],
            'Components', ['Atoms', 'Molecules', 'Organisms'],
            'Blocks',
            'Patterns',
          ],
          'DIAGRAM',
          // 기본 foundation(light/dark/high-contrast)은 전역 툴바로 전환. 그 외
          // 확장 foundation(amber + external 74)은 FOUNDATION CATALOG로 분리.
          'FOUNDATION CATALOG',
          // 카탈로그: preset 표시명 순서 + 각 preset마다 동일한 6-leaf 순서(CATALOG_LEAVES)를 짝지음.
          // storySort는 Storybook이 정적 파싱하므로 leaf 순서를 inline으로 둔다(const 참조 불가).
          'STYLE GUIDE CATALOG', [
            'Neobrutalism_Editorial_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Glassmorphism_Aurora_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Neumorphism_Soft_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Flat_Material_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Minimal_Saas_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Swiss_International_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Terminal_Mono_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Claymorphism_Playful_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Editorial_Magazine_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Bauhaus_Geometric_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Y2K_Futurism_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Vaporwave_Synth_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Maximalism_Dopamine_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Cyberpunk_Hud_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Aurora_Gradient_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Scandi_Warm_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'DarkLuxe_Editorial_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Skeuomorphism_Tactile_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Memphis_Postmodern_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'FrutigerAero_Glossy_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Retro70s_Warm_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Collage_Scrapbook_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'Kawaii_Pastel_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
            'ArtDeco_Luxe_01', ['Referenced Foundations', 'Extended Foundations', 'Wrapper Components', 'Patterns', 'Guideline', 'Visual Motif'],
          ],
          '*',
        ],
      },
    },
  },
  globalTypes: {
    // 전역 base foundation 전환기. 확장 foundation(amber/catalog)은 FOUNDATION CATALOG에서 본다.
    foundation: {
      description: 'Global base foundation for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Foundation',
        icon: 'circlehollow',
        items: ['light', 'dark', 'high-contrast'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const foundationName = context.globals.foundation;
      let foundation = lightFoundation;
      if (foundationName === 'dark') {
        foundation = darkFoundation;
      } else if (foundationName === 'high-contrast') {
        foundation = highContrastFoundation;
      }

      const bgColor = foundation.semantic.background.base;

      return (
        <FoundationProvider foundation={foundation} style={{ padding: '2rem', minHeight: '100vh', backgroundColor: bgColor, transition: 'background-color 0.3s ease' }}>
          <DiagramProvider theme={blueprintTheme}>
            <Story />
          </DiagramProvider>
        </FoundationProvider>
      );
    },
  ],
};

export default preview;