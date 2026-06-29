import type { Meta, StoryObj } from '@storybook/react';
import {
  DiagramProvider,
  blueprintTheme,
  diagramThemeToStyleObject,
  dvar,
} from '@centurio1987/bbangto-ui-diagram';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'DIAGRAM/Provider',
  component: DiagramProvider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DiagramProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blueprint: Story = {
  render: () => (
    <DiagramProvider theme={blueprintTheme}>
      <div
        data-testid="diagram-content"
        style={{ padding: 16, fontFamily: 'monospace', fontSize: 13 }}
      >
        Blueprint theme active — CSS vars injected on parent element.
      </div>
    </DiagramProvider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. [data-bbangto-diagram-theme="blueprint"] must exist
    const provider = canvasElement.querySelector('[data-bbangto-diagram-theme="blueprint"]');
    await expect(provider).not.toBeNull();

    // 2. --bbangto-diagram-node-person-fill must equal blueprint palette p2 (#C5B6EE)
    const style = getComputedStyle(provider!);
    await expect(style.getPropertyValue('--bbangto-diagram-node-person-fill').trim()).toBe(
      '#C5B6EE',
    );

    // 3. Token casing parity: flattenToCSSVars output must match dvar() key generation

    // gridUnit (camelCase) → --bbangto-diagram-canvas-grid-unit
    const vars = diagramThemeToStyleObject(blueprintTheme);
    await expect(vars['--bbangto-diagram-canvas-grid-unit']).toBe('8');
    await expect(dvar('canvas', 'gridUnit')).toBe('var(--bbangto-diagram-canvas-grid-unit)');

    // keylineWidth → --bbangto-diagram-node-person-keyline-width
    await expect(vars['--bbangto-diagram-node-person-keyline-width']).toBe('2.5');
    await expect(dvar('node', 'person', 'keylineWidth')).toBe(
      'var(--bbangto-diagram-node-person-keyline-width)',
    );

    // boundary.dashPattern → --bbangto-diagram-boundary-dash-pattern
    await expect(vars['--bbangto-diagram-boundary-dash-pattern']).toBe('8 6');
    await expect(dvar('boundary', 'dashPattern')).toBe(
      'var(--bbangto-diagram-boundary-dash-pattern)',
    );

    // c4.l1.borderWidth → --bbangto-diagram-c4-l1-border-width
    await expect(vars['--bbangto-diagram-c4-l1-border-width']).toBe('3');
    await expect(dvar('c4', 'l1', 'borderWidth')).toBe('var(--bbangto-diagram-c4-l1-border-width)');

    await canvas.findByTestId('diagram-content');
  },
};
