import type { Meta } from '@storybook/react';
import { colorfulFlat01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Colorful_Flat_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(colorfulFlat01VizStyleGuide);

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
