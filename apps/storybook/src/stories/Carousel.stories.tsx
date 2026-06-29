import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    showDots: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    fade: { control: 'boolean' },
    loop: { control: 'boolean' },
    indicatorVariant: { control: 'select', options: ['dots', 'numbers'] },
    variant: { control: 'select', options: ['flat', 'edge-fade', 'media-overlay', 'elevated'] },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Slide = ({ tone, children }: { tone: string; children: React.ReactNode }) => (
  <div
    style={{
      minHeight: 'inherit',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: tone,
      color: 'var(--bbangto-semantic-foreground-base)',
      fontFamily: 'var(--bbangto-typography-font-family-sans)',
      border: '1px solid var(--bbangto-semantic-border-base)',
    }}
  >
    {children}
  </div>
);

// ──────────────────────────────────────────────
// Existing stories (preserved exactly)
// ──────────────────────────────────────────────

export const Default: Story = {
  args: {
    autoPlay: false,
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">First slide</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Second slide</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-warning-subtle)">Third slide</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const track = canvasElement.querySelector('[data-bbangto-carousel-track]') as HTMLElement | null;
    const next = await canvas.findByRole('button', { name: 'Next slide' });

    await expect(track).not.toBeNull();
    await expect(getComputedStyle(track!).transitionProperty).toContain('transform');

    await userEvent.click(next);
    await expect(track!.style.transform).toContain('translateX');
    await expect(canvas.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'data-bbangto-carousel-dot',
      'active',
    );
  },
};

// ──────────────────────────────────────────────
// New stories: size
// ──────────────────────────────────────────────

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: {
    size: 'sm',
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">Slide 1</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Slide 2</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const container = canvasElement.querySelector('[data-bbangto-carousel-size]') as HTMLElement | null;
    await expect(container).not.toBeNull();
    await expect(container!.getAttribute('data-bbangto-carousel-size')).toBe('sm');
    // Verify nav buttons are present
    await expect(canvas.getByRole('button', { name: 'Previous slide' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Next slide' })).toBeVisible();
  },
};

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: {
    size: 'lg',
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">Large slide 1</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-success-subtle)">Large slide 2</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-error-subtle)">Large slide 3</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const container = canvasElement.querySelector('[data-bbangto-carousel-size]') as HTMLElement | null;
    await expect(container!.getAttribute('data-bbangto-carousel-size')).toBe('lg');
    // Navigate and verify dot updates
    const next = canvas.getByRole('button', { name: 'Next slide' });
    await userEvent.click(next);
    await expect(canvas.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'data-bbangto-carousel-dot',
      'active',
    );
  },
};

// ──────────────────────────────────────────────
// New story: fade transition
// ──────────────────────────────────────────────

export const FadeTransition: Story = {
  name: 'Transition / Fade',
  args: {
    fade: true,
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">Fade slide 1</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Fade slide 2</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-warning-subtle)">Fade slide 3</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const fadeAttr = canvasElement.querySelector('[data-bbangto-carousel-fade]') as HTMLElement | null;
    await expect(fadeAttr).not.toBeNull();
    await expect(fadeAttr!.getAttribute('data-bbangto-carousel-fade')).toBe('true');

    // Navigate via next arrow and confirm dot indicator updates
    const next = canvas.getByRole('button', { name: 'Next slide' });
    await userEvent.click(next);
    await expect(canvas.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'data-bbangto-carousel-dot',
      'active',
    );
  },
};

// ──────────────────────────────────────────────
// New story: loop=false (clamp navigation)
// ──────────────────────────────────────────────

export const NoLoop: Story = {
  name: 'Loop / Disabled',
  args: {
    loop: false,
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">First (no wrap)</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Second</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-warning-subtle)">Third (no wrap)</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const prevBtn = canvas.getByRole('button', { name: 'Previous slide' }) as HTMLButtonElement;
    // At first slide with loop=false the Prev button should be disabled
    await expect(prevBtn).toBeDisabled();

    // Navigate to last slide
    const next = canvas.getByRole('button', { name: 'Next slide' });
    await userEvent.click(next);
    await userEvent.click(next);
    const nextBtn = canvas.getByRole('button', { name: 'Next slide' }) as HTMLButtonElement;
    await expect(nextBtn).toBeDisabled();
  },
};

// ──────────────────────────────────────────────
// New story: indicatorVariant=numbers
// ──────────────────────────────────────────────

export const NumberIndicator: Story = {
  name: 'Indicator / Numbers',
  args: {
    indicatorVariant: 'numbers',
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">Slide A</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Slide B</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-error-subtle)">Slide C</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // The indicator container should declare 'numbers' variant
    const indicator = canvasElement.querySelector('[data-bbangto-carousel-indicator]') as HTMLElement | null;
    await expect(indicator).not.toBeNull();
    await expect(indicator!.getAttribute('data-bbangto-carousel-indicator')).toBe('numbers');

    // First number badge should be active
    const firstBadge = canvasElement.querySelector('[data-bbangto-carousel-number="active"]') as HTMLElement | null;
    await expect(firstBadge).not.toBeNull();
    await expect(firstBadge!.textContent).toBe('1');

    // Click next and verify badge 2 becomes active
    const next = canvas.getByRole('button', { name: 'Next slide' });
    await userEvent.click(next);
    const secondBadge = canvasElement.querySelector('[data-bbangto-carousel-number="active"]') as HTMLElement | null;
    await expect(secondBadge!.textContent).toBe('2');

    // Token: active badge should have a non-empty background-color via primary token
    const activeBadge = canvasElement.querySelector('[data-bbangto-carousel-number="active"]') as HTMLElement | null;
    const style = getComputedStyle(activeBadge!);
    await expect(style.backgroundColor).not.toBe('');
  },
};

// ──────────────────────────────────────────────
// New stories: variant axis (edge-fade / media-overlay / elevated)
// ──────────────────────────────────────────────

export const EdgeFade: Story = {
  name: 'Variant / Edge Fade',
  args: {
    variant: 'edge-fade',
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">Edge slide 1</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Edge slide 2</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-warning-subtle)">Edge slide 3</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-carousel-variant]') as HTMLElement | null;
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-carousel-variant')).toBe('edge-fade');

    // 2. load-bearing style: track carries a mask-image gradient (not tautological)
    const track = canvasElement.querySelector('[data-bbangto-carousel-track]') as HTMLElement | null;
    const cs = getComputedStyle(track!);
    const mask = cs.maskImage || (cs as unknown as { webkitMaskImage?: string }).webkitMaskImage || '';
    await expect(mask).toContain('gradient');

    // 3. a11y contract preserved + content slot + keyboard navigation
    const region = canvas.getByRole('region');
    await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(canvas.getByText('Edge slide 1')).toBeVisible();
    const next = canvas.getByRole('button', { name: 'Next slide' });
    next.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'data-bbangto-carousel-dot',
      'active',
    );
  },
};

const MediaSlide = ({ label }: { label: string }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 'inherit' }}>
    <img
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23888888'/%3E%3C/svg%3E"
      alt=""
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
    />
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        padding: 'var(--bbangto-spacing-16)',
        color: 'var(--bbangto-semantic-foreground-inverse)',
        fontFamily: 'var(--bbangto-typography-font-family-sans)',
      }}
    >
      {label}
    </div>
  </div>
);

export const MediaOverlay: Story = {
  name: 'Variant / Media Overlay',
  args: {
    variant: 'media-overlay',
    children: [
      <MediaSlide key="one" label="Overlay caption 1" />,
      <MediaSlide key="two" label="Overlay caption 2" />,
      <MediaSlide key="three" label="Overlay caption 3" />,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-carousel-variant]') as HTMLElement | null;
    await expect(root!.getAttribute('data-bbangto-carousel-variant')).toBe('media-overlay');

    // 2. load-bearing style: scrim is an absolutely-positioned gradient; slide is a
    //    positioned (relative) bleed container.
    const scrim = canvasElement.querySelector('[data-bbangto-carousel-scrim]') as HTMLElement | null;
    await expect(scrim).not.toBeNull();
    const scrimCs = getComputedStyle(scrim!);
    await expect(scrimCs.backgroundImage).toContain('gradient');
    await expect(scrimCs.position).toBe('absolute');
    const slide = canvasElement.querySelector('[data-bbangto-carousel-slide]') as HTMLElement | null;
    await expect(getComputedStyle(slide!).position).toBe('relative');

    // 3. a11y contract preserved + content slot
    const region = canvas.getByRole('region');
    await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(canvas.getByText('Overlay caption 1')).toBeVisible();
  },
};

export const Elevated: Story = {
  name: 'Variant / Elevated',
  args: {
    variant: 'elevated',
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">Lifted card 1</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Lifted card 2</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-success-subtle)">Lifted card 3</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-carousel-variant]') as HTMLElement | null;
    await expect(root!.getAttribute('data-bbangto-carousel-variant')).toBe('elevated');

    // 2. load-bearing style: slide cards carry a box-shadow elevation AND a filled
    //    (non-transparent) background.
    const slide = canvasElement.querySelector('[data-bbangto-carousel-slide]') as HTMLElement | null;
    const cs = getComputedStyle(slide!);
    await expect(cs.boxShadow).not.toBe('none');
    await expect(cs.boxShadow).not.toBe('');
    await expect(cs.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(cs.backgroundColor).not.toBe('transparent');

    // 3. a11y contract preserved + content slot + keyboard navigation
    const region = canvas.getByRole('region');
    await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
    await expect(canvas.getByText('Lifted card 1')).toBeVisible();
    const next = canvas.getByRole('button', { name: 'Next slide' });
    next.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'data-bbangto-carousel-dot',
      'active',
    );
  },
};
