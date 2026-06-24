import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LogoCloud } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Blocks/LogoCloud',
  component: LogoCloud,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoCloud>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Placeholder logo rendered as a styled text badge — no external image needed. */
const TextLogo = ({ name }: { name: string }) => (
  <span
    style={{
      fontWeight: 700,
      fontSize: '1.1rem',
      letterSpacing: '-0.02em',
      color: 'var(--bbangto-semantic-foreground-muted)',
      userSelect: 'none',
    }}
  >
    {name}
  </span>
);

const sampleLogos = [
  { node: <TextLogo name="Acme Corp" />, alt: 'Acme Corp' },
  { node: <TextLogo name="Globex" />, alt: 'Globex' },
  { node: <TextLogo name="Initech" />, alt: 'Initech' },
  { node: <TextLogo name="Umbrella" />, alt: 'Umbrella' },
  { node: <TextLogo name="Veridian" />, alt: 'Veridian' },
  { node: <TextLogo name="Soylent" />, alt: 'Soylent' },
];

export const Default: Story = {
  args: {
    title: 'Trusted by industry leaders',
    logos: sampleLogos,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Section heading is rendered
    const heading = await canvas.findByText('Trusted by industry leaders');
    await expect(heading).toBeVisible();

    // 2. All logo items are rendered
    const list = canvasElement.querySelector('[role="list"]');
    await expect(list).not.toBeNull();
    const items = canvasElement.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);

    // 3. First logo text is visible
    const firstLogo = await canvas.findByText('Acme Corp');
    await expect(firstLogo).toBeVisible();
  },
};

export const WithoutTitle: Story = {
  args: {
    logos: sampleLogos,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // No heading should be present
    const headingEl = canvas.queryByText('Trusted by industry leaders');
    await expect(headingEl).toBeNull();

    // Logos are still rendered
    const items = canvasElement.querySelectorAll('[role="listitem"]');
    await expect(items.length).toBe(sampleLogos.length);
  },
};
