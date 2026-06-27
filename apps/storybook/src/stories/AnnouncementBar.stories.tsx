import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AnnouncementBar } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Blocks/AnnouncementBar',
  component: AnnouncementBar,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    dismissible: { control: 'boolean' },
    message: { control: 'text' },
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'We just launched v2.0 — check out all the new features.',
    cta: {
      label: 'See what\'s new',
      href: '#changelog',
    },
    dismissible: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Region landmark is present
    const region = canvasElement.querySelector('[role="region"]');
    await expect(region).not.toBeNull();
    await expect(region).toHaveAttribute('aria-label', 'Announcement');

    // 2. Message text renders
    const message = await canvas.findByText(
      /we just launched v2\.0/i
    );
    await expect(message).toBeVisible();

    // 3. CTA link renders and is a real anchor
    const ctaLink = await canvas.findByRole('link', { name: /see what's new/i });
    await expect(ctaLink).toBeVisible();
    await expect(ctaLink).toHaveAttribute('href', '#changelog');
  },
};

export const Dismissible: Story = {
  args: {
    message: 'Free shipping on all orders over $50 — limited time offer.',
    cta: {
      label: 'Shop now',
      href: '#shop',
    },
    dismissible: true,
  },
  render: (args) => {
    // Wrapper with local state so the dismiss interaction can be demonstrated.
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <div
          style={{ padding: '24px', fontFamily: 'sans-serif', fontSize: '14px' }}
        >
          Announcement dismissed. Refresh the story to restore it.
        </div>
      );
    }
    return <AnnouncementBar {...args} onDismiss={() => setVisible(false)} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Message renders
    const message = await canvas.findByText(/free shipping/i);
    await expect(message).toBeVisible();

    // 2. CTA link renders
    const ctaLink = await canvas.findByRole('link', { name: /shop now/i });
    await expect(ctaLink).toBeVisible();

    // 3. Dismiss button is present and accessible
    const dismissBtn = await canvas.findByRole('button', {
      name: /dismiss announcement/i,
    });
    await expect(dismissBtn).toBeVisible();

    // 4. Clicking dismiss removes the bar
    await userEvent.click(dismissBtn);
    await expect(message).not.toBeVisible();
  },
};

export const VariantFloating: Story = {
  args: {
    message: 'Our holiday sale ends Sunday — save up to 40% storewide.',
    cta: {
      label: 'Browse deals',
      href: '#deals',
    },
    variant: 'floating',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data-attr present + correct
    const region = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-announcementbar-variant]'
    );
    await expect(region).not.toBeNull();
    await expect(region).toHaveAttribute(
      'data-bbangto-announcementbar-variant',
      'floating'
    );

    // 2. Load-bearing: detached pill => rounded corners, shadow, not full width
    const styles = getComputedStyle(region!);
    await expect(styles.borderRadius).not.toBe('');
    await expect(styles.borderRadius).not.toBe('0px');
    await expect(styles.boxShadow).not.toBe('');
    await expect(styles.boxShadow).not.toBe('none');
    // Margin pulls it in from the edges, so it is narrower than its container.
    const parentWidth = region!.parentElement!.getBoundingClientRect().width;
    await expect(region!.getBoundingClientRect().width).toBeLessThan(parentWidth);

    // 3. Content slots render
    const message = await canvas.findByText(/our holiday sale ends sunday/i);
    await expect(message).toBeVisible();
    const ctaLink = await canvas.findByRole('link', { name: /browse deals/i });
    await expect(ctaLink).toBeVisible();
  },
};

export const VariantInline: Story = {
  args: {
    message: 'Note: prices shown exclude applicable taxes.',
    variant: 'inline',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data-attr present + correct
    const region = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-announcementbar-variant]'
    );
    await expect(region).not.toBeNull();
    await expect(region).toHaveAttribute(
      'data-bbangto-announcementbar-variant',
      'inline'
    );

    // 2. Load-bearing: flows inline => inline-flex display, no full-bleed bg
    const styles = getComputedStyle(region!);
    await expect(styles.display).toBe('inline-flex');
    // Transparent background resolves to rgba(0, 0, 0, 0) (or "transparent").
    await expect(
      ['rgba(0, 0, 0, 0)', 'transparent'].includes(styles.backgroundColor)
    ).toBe(true);

    // 3. Content slot renders
    const message = await canvas.findByText(/prices shown exclude/i);
    await expect(message).toBeVisible();
  },
};

export const VariantCentered: Story = {
  args: {
    message: 'Welcome to the new dashboard experience.',
    cta: {
      label: 'Take the tour',
      href: '#tour',
    },
    variant: 'centered',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data-attr present + correct
    const region = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-announcementbar-variant]'
    );
    await expect(region).not.toBeNull();
    await expect(region).toHaveAttribute(
      'data-bbangto-announcementbar-variant',
      'centered'
    );

    // 2. Load-bearing: full-width strip, message + action centered
    const styles = getComputedStyle(region!);
    await expect(styles.justifyContent).toBe('center');
    await expect(styles.textAlign).toBe('center');

    // 3. Content slots render
    const message = await canvas.findByText(/welcome to the new dashboard/i);
    await expect(message).toBeVisible();
    const ctaLink = await canvas.findByRole('link', { name: /take the tour/i });
    await expect(ctaLink).toBeVisible();
  },
};

export const Gradient: Story = {
  args: {
    message: 'Early access is now open — join the private beta today.',
    cta: {
      label: 'Request access',
      href: '#beta',
    },
    variant: 'gradient',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data-attr present + correct
    const region = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-announcementbar-variant]'
    );
    await expect(region).not.toBeNull();
    await expect(region).toHaveAttribute(
      'data-bbangto-announcementbar-variant',
      'gradient'
    );

    // 2a. Load-bearing: gradient fill => backgroundImage carries a gradient,
    // and the solid border is dropped (pure chrome).
    const styles = getComputedStyle(region!);
    await expect(styles.backgroundImage).toContain('gradient');
    await expect(styles.borderStyle).toBe('none');

    // 2b. Optional lattice overlay is composited as an absolutely-positioned,
    // decorative (aria-hidden) layer behind the content track.
    const overlay = region!.querySelector<HTMLElement>(
      '.bbangto-announcement-grid'
    );
    await expect(overlay).not.toBeNull();
    await expect(overlay).toHaveAttribute('aria-hidden', 'true');
    await expect(getComputedStyle(overlay!).position).toBe('absolute');

    // 3. Content slots render
    const message = await canvas.findByText(/early access is now open/i);
    await expect(message).toBeVisible();
    const ctaLink = await canvas.findByRole('link', { name: /request access/i });
    await expect(ctaLink).toBeVisible();
  },
};

export const Glass: Story = {
  args: {
    message: 'Maintenance scheduled for Saturday at 2am UTC.',
    cta: {
      label: 'View status',
      href: '#status',
    },
    variant: 'glass',
    dismissible: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data-attr present + correct
    const region = canvasElement.querySelector<HTMLElement>(
      '[data-bbangto-announcementbar-variant]'
    );
    await expect(region).not.toBeNull();
    await expect(region).toHaveAttribute(
      'data-bbangto-announcementbar-variant',
      'glass'
    );

    // 2. Load-bearing: frosted surface => hairline ring border (solid, not the
    // borderless gradient/bar), a light elevation shadow and a backdrop blur.
    const styles = getComputedStyle(region!);
    await expect(styles.borderStyle).toBe('solid');
    await expect(styles.boxShadow).not.toBe('');
    await expect(styles.boxShadow).not.toBe('none');
    await expect(styles.backdropFilter).toContain('blur');

    // 3. Content slots render + a11y contract (region landmark + accessible,
    // focusable dismiss control) survives the new surface treatment.
    const message = await canvas.findByText(/maintenance scheduled/i);
    await expect(message).toBeVisible();
    const ctaLink = await canvas.findByRole('link', { name: /view status/i });
    await expect(ctaLink).toBeVisible();
    await expect(region).toHaveAttribute('role', 'region');
    const dismissBtn = await canvas.findByRole('button', {
      name: /dismiss announcement/i,
    });
    dismissBtn.focus();
    await expect(dismissBtn).toHaveFocus();
  },
};
