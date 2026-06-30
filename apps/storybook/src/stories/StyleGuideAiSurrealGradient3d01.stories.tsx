import type { Meta } from '@storybook/react';
import { aiSurrealGradient3dStyleGuide } from '@centurio1987/bbangto-ui-style-guide-catalog';
import { makeCatalogStories } from './_catalogStory';

/**
 * Ai_Surreal_Gradient3d_01 — 딥 다크 위 AI 초현실 3D 렌더 + 이리데센트 표면(머티리얼 중심).
 * 6-leaf 카탈로그 구성요소는 공통 팩토리(makeCatalogStories)로 생성한다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Ai_Surreal_Gradient3d_01',
  parameters: { layout: 'fullscreen', a11y: { test: 'todo' } },
} satisfies Meta;
export default meta;

const s = makeCatalogStories(aiSurrealGradient3dStyleGuide);
export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
