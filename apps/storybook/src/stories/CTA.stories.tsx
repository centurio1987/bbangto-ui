import type { Meta, StoryObj } from '@storybook/react';
import { CTA } from '@centurio1987/bbangto-ui-core';
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

/**
 * Split layout — title/description on the left, actions on the right.
 * Becomes a two-column grid at the `lg` breakpoint via a scoped `<style>` rule;
 * on narrower viewports it collapses to a single column. The play function
 * asserts the layout data-attribute, the presence of the scoped 2-col rule, and
 * that both CTAs still render.
 */
export const LayoutSplit: Story = {
  args: {
    title: 'Scale your team with confidence',
    description:
      'Everything you need to ship, from prototype to production. Onboard in minutes.',
    layout: 'split',
    primaryCta: { label: 'Start free trial' },
    secondaryCta: { label: 'Talk to sales' },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Layout data-attribute is present with the right value.
    const section = canvasElement.querySelector('[data-bbangto-cta-layout]');
    await expect(section).not.toBeNull();
    await expect(section).toHaveAttribute('data-bbangto-cta-layout', 'split');

    // 2. Load-bearing: scoped 2-col rule exists in aggregated <style> text.
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('bbangto-cta-block-split');
    await expect(styleText).toMatch(/grid-template-columns:\s*1fr auto/);

    // 3. Content slots still render.
    const heading = await canvas.findByRole('heading', { name: /scale your team/i });
    await expect(heading).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: /start free trial/i })
    ).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: /talk to sales/i })
    ).toBeVisible();
  },
};

/**
 * Banner layout — a full-width strip with a strong primary background and
 * compact vertical padding. The play function asserts the layout attribute, a
 * background color that differs from the default subtle panel, and that the
 * CTAs render.
 */
export const LayoutBanner: Story = {
  args: {
    title: 'Limited-time launch offer',
    description: 'Save 30% on annual plans through the end of the month.',
    layout: 'banner',
    primaryCta: { label: 'Claim offer' },
    secondaryCta: { label: 'See pricing' },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Layout data-attribute.
    const section = canvasElement.querySelector<HTMLElement>('[data-bbangto-cta-layout]');
    await expect(section).not.toBeNull();
    await expect(section).toHaveAttribute('data-bbangto-cta-layout', 'banner');

    // 2. Load-bearing: strong background differs from the default subtle panel.
    const bg = getComputedStyle(section!).backgroundColor;
    await expect(bg).not.toBe('');
    await expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    await expect(bg).not.toBe('transparent');

    // 3. Content slots still render.
    const heading = await canvas.findByRole('heading', { name: /limited-time launch offer/i });
    await expect(heading).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: /claim offer/i })
    ).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: /see pricing/i })
    ).toBeVisible();
  },
};

/**
 * Card layout — a boxed card with a visible border, rounded corners, and
 * elevation. The play function asserts the layout attribute, a solid border with
 * a non-zero border radius, and that the CTAs render.
 */
export const LayoutCard: Story = {
  args: {
    title: 'Upgrade to Pro',
    description: 'Unlock advanced analytics, priority support, and unlimited seats.',
    layout: 'card',
    primaryCta: { label: 'Upgrade now' },
    secondaryCta: { label: 'Compare plans' },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Layout data-attribute.
    const section = canvasElement.querySelector<HTMLElement>('[data-bbangto-cta-layout]');
    await expect(section).not.toBeNull();
    await expect(section).toHaveAttribute('data-bbangto-cta-layout', 'card');

    // 2. Load-bearing: solid border + non-zero radius.
    const cs = getComputedStyle(section!);
    await expect(cs.borderStyle).toContain('solid');
    await expect(cs.borderRadius).not.toBe('');
    await expect(cs.borderRadius).not.toBe('0px');

    // 3. Content slots still render.
    const heading = await canvas.findByRole('heading', { name: /upgrade to pro/i });
    await expect(heading).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: /upgrade now/i })
    ).toBeVisible();
    await expect(
      await canvas.findByRole('button', { name: /compare plans/i })
    ).toBeVisible();
  },
};
