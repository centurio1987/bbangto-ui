import type { Meta } from '@storybook/react';
import { maximalismDopamineStyleGuide } from '@centurio1987/bbangto-ui-core';
import { makeCatalogStories } from './_catalogStory';

/**
 * Maximalism_Dopamine_01 — 맥시멀리즘 / 도파민.
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Maximalism_Dopamine_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(maximalismDopamineStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
