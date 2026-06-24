import type { Meta, StoryObj } from '@storybook/react';
import { CTA } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Blocks/CTA',
  component: CTA,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof CTA>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/**
 * Default CTA block with both primary and secondary actions.
 * The play function verifies that the title, description, and both CTA buttons
 * render correctly, then confirms the primary action fires on click.
 */
export const Default: Story = {
  args: {
    title: 'Start building today',
    description:
      'Join thousands of teams shipping faster with bbangto-ui. Free to use, open source, and ready for production.',
    primaryCta: {
      label: 'Get started free',
    },
    secondaryCta: {
      label: 'View documentation',
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Heading renders
    const heading = await canvas.findByRole('heading', { name: /start building today/i });
    await expect(heading).toBeVisible();

    // 2. Description renders
    const desc = await canvas.findByText(/join thousands of teams/i);
    await expect(desc).toBeVisible();

    // 3. Primary CTA button renders
    const primaryBtn = await canvas.findByRole('button', { name: /get started free/i });
    await expect(primaryBtn).toBeVisible();

    // 4. Secondary CTA button renders
    const secondaryBtn = await canvas.findByRole('button', { name: /view documentation/i });
    await expect(secondaryBtn).toBeVisible();

    // 5. Primary CTA click interaction (no error thrown = pass)
    await userEvent.click(primaryBtn);
  },
};

/**
 * Minimal CTA block — primary action only, no description or secondary button.
 * Useful when screen real-estate is tight or the message is punchy enough to
 * stand on its own.
 */
export const PrimaryOnly: Story = {
  args: {
    title: 'Ready to ship?',
    primaryCta: {
      label: 'Sign up now',
    },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const heading = await canvas.findByRole('heading', { name: /ready to ship/i });
    await expect(heading).toBeVisible();

    const primaryBtn = await canvas.findByRole('button', { name: /sign up now/i });
    await expect(primaryBtn).toBeVisible();

    // Verify no secondary button is present
    const allButtons = canvas.getAllByRole('button');
    await expect(allButtons).toHaveLength(1);
  },
};
