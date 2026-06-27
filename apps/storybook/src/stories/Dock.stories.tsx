import type { Meta, StoryObj } from '@storybook/react';
import { Dock } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

// ---------------------------------------------------------------------------
// Sample SVG icons
// ---------------------------------------------------------------------------

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const BellIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Blocks/Dock',
  component: Dock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dock>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Default — five-item dock, first item active
// ---------------------------------------------------------------------------

export const Default: Story = {
  args: {
    items: [
      { icon: <HomeIcon />, label: 'Home', active: true },
      { icon: <SearchIcon />, label: 'Search' },
      { icon: <BellIcon />, label: 'Notifications' },
      { icon: <SettingsIcon />, label: 'Settings' },
      { icon: <UserIcon />, label: 'Profile' },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Nav landmark is rendered
    const nav = canvasElement.querySelector('nav[aria-label="Dock"]');
    await expect(nav).toBeTruthy();

    // 2. All five items are present and visible
    const home = await canvas.findByRole('button', { name: 'Home' });
    await expect(home).toBeVisible();

    const search = canvas.getByRole('button', { name: 'Search' });
    await expect(search).toBeVisible();

    const notifications = canvas.getByRole('button', { name: 'Notifications' });
    await expect(notifications).toBeVisible();

    const settings = canvas.getByRole('button', { name: 'Settings' });
    await expect(settings).toBeVisible();

    const profile = canvas.getByRole('button', { name: 'Profile' });
    await expect(profile).toBeVisible();

    // 3. Active item has aria-pressed="true"
    await expect(home).toHaveAttribute('aria-pressed', 'true');

    // 4. Inactive items have aria-pressed="false"
    await expect(search).toHaveAttribute('aria-pressed', 'false');

    // 5. Interaction: click Search
    await userEvent.click(search);
  },
};

// ---------------------------------------------------------------------------
// Minimal — three-item dock with no active item
// ---------------------------------------------------------------------------

export const Minimal: Story = {
  args: {
    items: [
      { icon: <HomeIcon />, label: 'Home' },
      { icon: <SearchIcon />, label: 'Search' },
      { icon: <UserIcon />, label: 'Profile' },
    ],
  },
};

// ---------------------------------------------------------------------------
// VariantAttached — edge-attached, full-width bar (flat radius, no shadow)
// ---------------------------------------------------------------------------

export const VariantAttached: Story = {
  args: {
    variant: 'attached',
    items: [
      { icon: <HomeIcon />, label: 'Home', active: true },
      { icon: <SearchIcon />, label: 'Search' },
      { icon: <BellIcon />, label: 'Notifications' },
      { icon: <UserIcon />, label: 'Profile' },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const nav = canvasElement.querySelector<HTMLElement>(
      'nav[data-bbangto-dock-variant="attached"]'
    );
    await expect(nav).toBeTruthy();

    // 2. Load-bearing computed style: flat radius (no detached radius) and
    //    full-width edge-attached bar.
    const dockStyle = getComputedStyle(nav!);
    await expect(dockStyle.borderTopLeftRadius).toBe('0px');
    await expect(dockStyle.borderBottomLeftRadius).toBe('0px');
    await expect(dockStyle.width).not.toBe('');
    const navWidth = nav!.getBoundingClientRect().width;
    const parentWidth = nav!.parentElement!.getBoundingClientRect().width;
    // Full-width edge-attached bar: fills (at least) its parent. Avoid exact-px
    // equality — box model / decorator padding makes it fragile.
    await expect(navWidth).toBeGreaterThanOrEqual(parentWidth * 0.9);

    // 3. Content slots render
    const home = await canvas.findByRole('button', { name: 'Home' });
    await expect(home).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Notifications' })
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Profile' })).toBeVisible();
  },
};

// ---------------------------------------------------------------------------
// VariantLabeled — icons sit beside their text labels (horizontal items)
// ---------------------------------------------------------------------------

export const VariantLabeled: Story = {
  args: {
    variant: 'labeled',
    items: [
      { icon: <HomeIcon />, label: 'Home', active: true },
      { icon: <SearchIcon />, label: 'Search' },
      { icon: <SettingsIcon />, label: 'Settings' },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const nav = canvasElement.querySelector<HTMLElement>(
      'nav[data-bbangto-dock-variant="labeled"]'
    );
    await expect(nav).toBeTruthy();

    // 2. Load-bearing computed style: items lay out horizontally (icon beside
    //    label) rather than the default stacked column.
    const home = await canvas.findByRole('button', { name: 'Home' });
    const homeStyle = getComputedStyle(home);
    await expect(homeStyle.flexDirection).toBe('row');

    // 3. Content slots render — label text nodes are present
    await expect(home).toHaveTextContent('Home');
    await expect(canvas.getByText('Home')).toBeVisible();
    await expect(canvas.getByText('Search')).toBeVisible();
    await expect(canvas.getByText('Settings')).toBeVisible();
  },
};

// ---------------------------------------------------------------------------
// Glass — translucent frosted pane (no solid fill, inset highlight rim)
// ---------------------------------------------------------------------------

export const Glass: Story = {
  args: {
    variant: 'glass',
    items: [
      { icon: <HomeIcon />, label: 'Home', active: true },
      { icon: <SearchIcon />, label: 'Search' },
      { icon: <BellIcon />, label: 'Notifications' },
      { icon: <SettingsIcon />, label: 'Settings' },
      { icon: <UserIcon />, label: 'Profile' },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const nav = canvasElement.querySelector<HTMLElement>(
      'nav[data-bbangto-dock-variant="glass"]'
    );
    await expect(nav).toBeTruthy();

    // 2. Load-bearing computed style: frosted glass treatment — translucent
    //    fill (rgba, not an opaque rgb solid), a thin INSET highlight rim (no
    //    border box), and a backdrop blur. Distinct from floating's opaque
    //    elevated fill + drop shadow.
    const dockStyle = getComputedStyle(nav!);
    // color-mix() serializes to `color(srgb … / α)` in modern chromium; accept both.
    await expect(dockStyle.backgroundColor).toMatch(/rgba\(|color\(/);
    await expect(dockStyle.boxShadow).toContain('inset');
    await expect(dockStyle.borderStyle).toBe('none');
    await expect(dockStyle.backdropFilter || dockStyle.webkitBackdropFilter).toContain(
      'blur'
    );

    // 3. Content slots render
    const home = await canvas.findByRole('button', { name: 'Home' });
    await expect(home).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Search' })).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Notifications' })
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Settings' })).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Profile' })).toBeVisible();

    // a11y contract: nav landmark + active button state preserved
    await expect(home).toHaveAttribute('aria-pressed', 'true');
  },
};

// ---------------------------------------------------------------------------
// Spotlight — glow limelight beam on the active item; near-invisible bar
// ---------------------------------------------------------------------------

export const Spotlight: Story = {
  args: {
    variant: 'spotlight',
    items: [
      { icon: <HomeIcon />, label: 'Home', active: true },
      { icon: <SearchIcon />, label: 'Search' },
      { icon: <BellIcon />, label: 'Notifications' },
      { icon: <UserIcon />, label: 'Profile' },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const nav = canvasElement.querySelector<HTMLElement>(
      'nav[data-bbangto-dock-variant="spotlight"]'
    );
    await expect(nav).toBeTruthy();

    // 2a. Container chrome is near-invisible: transparent fill + no border.
    const dockStyle = getComputedStyle(nav!);
    await expect(dockStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(dockStyle.borderStyle).toBe('none');

    // 2b. Load-bearing indicator: the active item carries a blurred gradient
    //     limelight beam (background-image is an actual gradient, not a flat
    //     pill/underline/border).
    const home = await canvas.findByRole('button', { name: 'Home' });
    const beam = await waitFor(() => {
      const el = home.querySelector<HTMLElement>('.bbangto-dock-spotlight-beam');
      if (!el) throw new Error('spotlight beam not yet rendered');
      return el;
    });
    const beamStyle = getComputedStyle(beam);
    await expect(beamStyle.backgroundImage).toContain('gradient');
    await expect(beamStyle.position).toBe('absolute');
    await expect(beamStyle.filter).toContain('blur');

    // Inactive items get no beam (glow is the active-only indicator).
    const search = canvas.getByRole('button', { name: 'Search' });
    await expect(
      search.querySelector('.bbangto-dock-spotlight-beam')
    ).toBeNull();

    // 3. Content slots render + a11y contract preserved
    await expect(home).toBeVisible();
    await expect(search).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: 'Notifications' })
    ).toBeVisible();
    await expect(canvas.getByRole('button', { name: 'Profile' })).toBeVisible();
    await expect(home).toHaveAttribute('aria-pressed', 'true');
    await expect(search).toHaveAttribute('aria-pressed', 'false');
  },
};
