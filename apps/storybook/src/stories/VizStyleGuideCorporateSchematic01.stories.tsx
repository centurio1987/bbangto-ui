import type { Meta } from '@storybook/react';
import { corporateSchematic01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { makeVizCatalogStories } from './_vizCatalogStory';

const meta = {
  title: 'VISUALIZATION STYLE GUIDE CATALOG/Corporate_Schematic_01',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const s = makeVizCatalogStories(corporateSchematic01VizStyleGuide);

export const Foundations = s.Foundations;
export const WrapperComponents = s.WrapperComponents;
export const Guideline = s.Guideline;
export const VisualMotif = s.VisualMotif;
export const FoundationPresets = s.FoundationPresets;
