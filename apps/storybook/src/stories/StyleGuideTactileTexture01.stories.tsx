import type { Meta } from '@storybook/react';
import { tactileTextureStyleGuide } from '@centurio1987/bbangto-ui-style-guide-catalog';
import { makeCatalogStories } from './_catalogStory';

/**
 * Tactile_Texture_01 — 퍼피·스퀴시·하이퍼리얼 질감, 촉각 모사.
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Tactile_Texture_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(tactileTextureStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
