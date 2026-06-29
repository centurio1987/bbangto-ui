import type { Meta } from '@storybook/react';
import { retro70sWarmStyleGuide } from '@centurio1987/bbangto-ui-core';
import { makeCatalogStories } from './_catalogStory';

/**
 * Retro70s_Warm_01 — 70년대 따뜻한 레트로(크림 베이스 + 어스톤 + 필름 그레인).
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Retro70s_Warm_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(retro70sWarmStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
