import type { Meta } from '@storybook/react';
import { vaporwaveSynthStyleGuide } from '@centurio1987/bbangto-ui-core';
import { makeCatalogStories } from './_catalogStory';

/**
 * Vaporwave_Synth_01 — 딥퍼플 + 네온 글로우 + 석양 그라디언트 + 퍼스펙티브 그리드.
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Vaporwave_Synth_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(vaporwaveSynthStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
