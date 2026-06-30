import type { Meta } from '@storybook/react';
import { iridescentChromeStyleGuide } from '@centurio1987/bbangto-ui-style-guide-catalog';
import { makeCatalogStories } from './_catalogStory';

/**
 * Iridescent_Chrome_01 — 근흑 무대 위 불투명 홀로그래픽 포일 + 액체 크롬 메탈(material 중심).
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Iridescent_Chrome_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(iridescentChromeStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
