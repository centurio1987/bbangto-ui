import type { Meta } from '@storybook/react';
import { photoTypeEditorialStyleGuide } from '@centurio1987/bbangto-ui-style-guide-catalog';
import { makeCatalogStories } from './_catalogStory';

/**
 * Photo_Type_Editorial_01 — 포토·타입 에디토리얼(사진 채운 초대형 타이포 + 각진 프레임).
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Photo_Type_Editorial_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(photoTypeEditorialStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
