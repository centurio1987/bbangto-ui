import type { Meta } from '@storybook/react';
import { memphisPostmodernStyleGuide } from '@centurio1987/bbangto-ui-core';
import { makeCatalogStories } from './_catalogStory';

/**
 * Memphis_Postmodern_01 — 멤피스 포스트모던. 고채도 충돌 + 파스텔, 지그재그·물방울·테리조 패턴.
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Memphis_Postmodern_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(memphisPostmodernStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
