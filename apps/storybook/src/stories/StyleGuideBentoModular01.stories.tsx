import type { Meta } from '@storybook/react';
import { bentoModularStyleGuide } from '@centurio1987/bbangto-ui-style-guide-catalog';
import { makeCatalogStories } from './_catalogStory';

/**
 * Bento_Modular_01 — 도시락형 모듈·비대칭·균형 그리드(레이아웃 중심).
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Bento_Modular_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(bentoModularStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
