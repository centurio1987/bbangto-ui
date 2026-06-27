import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MarketingFooter } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

// ---------------------------------------------------------------------------
// Sample data
// ---------------------------------------------------------------------------

const sampleColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Changelog', href: '#changelog' },
      { label: 'Roadmap', href: '#roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press', href: '#press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#docs' },
      { label: 'Community', href: '#community' },
      { label: 'Support', href: '#support' },
      { label: 'Status', href: '#status' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Licenses', href: '#licenses' },
    ],
  },
];

const GitHubIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.295 2.748-1.026 2.748-1.026.545 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const sampleSocial = [
  { label: 'GitHub', href: 'https://github.com', icon: <GitHubIcon /> },
  { label: 'X / Twitter', href: 'https://twitter.com', icon: <TwitterIcon /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <LinkedInIcon /> },
];

const SampleLogo = () => (
  <div
    style={{
      fontWeight: 800,
      fontSize: '1.25rem',
      letterSpacing: '-0.03em',
      color: 'var(--bbangto-semantic-primary-base, #0052cc)',
    }}
  >
    BBANGTO
  </div>
);

// ---------------------------------------------------------------------------
// Meta
// ---------------------------------------------------------------------------

const meta = {
  title: 'Blocks/MarketingFooter',
  component: MarketingFooter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof MarketingFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

/**
 * Full-featured marketing footer with logo, link columns, social links, and
 * copyright. The column grid is intrinsically responsive via `auto-fit`.
 */
export const Default: Story = {
  args: {
    logo: <SampleLogo />,
    columns: sampleColumns,
    social: sampleSocial,
    copyright: '© 2026 BBANGTO Inc. All rights reserved.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Logo slot is rendered
    const logo = canvasElement.querySelector('[aria-label="Site logo"]');
    await expect(logo).not.toBeNull();
    await expect(logo).toBeVisible();

    // 2. Column titles are rendered
    const productHeading = await canvas.findByText('Product');
    await expect(productHeading).toBeVisible();

    const companyHeading = await canvas.findByText('Company');
    await expect(companyHeading).toBeVisible();

    // 3. A representative column link is rendered and navigable
    const featuresLink = await canvas.findByRole('link', { name: 'Features' });
    await expect(featuresLink).toBeVisible();
    await expect(featuresLink).toHaveAttribute('href', '#features');

    // 4. Footer nav landmark is present
    const nav = canvasElement.querySelector('nav[aria-label="Footer navigation"]');
    await expect(nav).not.toBeNull();

    // 5. Social links are rendered with accessible labels
    const githubLink = await canvas.findByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();
    await expect(githubLink).toHaveAttribute('target', '_blank');
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    // 6. Copyright text is rendered
    const copyright = await canvas.findByText('© 2026 BBANGTO Inc. All rights reserved.');
    await expect(copyright).toBeVisible();
  },
};

/**
 * Minimal variant: no logo, no social links — just the columns and copyright.
 * Demonstrates that all slots are optional except `columns`.
 */
export const Minimal: Story = {
  args: {
    columns: sampleColumns.slice(0, 3),
    copyright: '© 2026 BBANGTO Inc.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Columns are rendered
    const productHeading = await canvas.findByText('Product');
    await expect(productHeading).toBeVisible();

    // No logo slot
    const logoSlot = canvasElement.querySelector('[aria-label="Site logo"]');
    await expect(logoSlot).toBeNull();

    // No social list
    const socialList = canvasElement.querySelector('[aria-label="Social links"]');
    await expect(socialList).toBeNull();

    // Copyright is still present
    const copyright = await canvas.findByText('© 2026 BBANGTO Inc.');
    await expect(copyright).toBeVisible();
  },
};

/**
 * `layout="minimal"` — a single compact row of brand, inline links, and
 * copyright. All link groups are flattened into one inline list.
 */
export const LayoutMinimal: Story = {
  args: {
    logo: <SampleLogo />,
    columns: sampleColumns.slice(0, 2),
    copyright: '© 2026 BBANGTO Inc.',
    layout: 'minimal',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const footer = canvasElement.querySelector('footer');
    await expect(footer).not.toBeNull();
    await expect(footer).toHaveAttribute('data-bbangto-marketingfooter-layout', 'minimal');

    // 2. Load-bearing: links container is a single ROW flex
    const linksRow = canvasElement.querySelector('.bbangto-marketing-footer-minimal-links');
    await expect(linksRow).not.toBeNull();
    const rowStyle = getComputedStyle(linksRow as HTMLElement);
    await expect(rowStyle.display).toBe('flex');
    await expect(rowStyle.flexDirection).toBe('row');

    // 3. Footer links from multiple groups render in the flattened row
    const featuresLink = await canvas.findByRole('link', { name: 'Features' });
    await expect(featuresLink).toBeVisible();
    await expect(featuresLink).toHaveAttribute('href', '#features');
    const aboutLink = await canvas.findByRole('link', { name: 'About' });
    await expect(aboutLink).toBeVisible();

    // Copyright renders in the row
    const copyright = await canvas.findByText('© 2026 BBANGTO Inc.');
    await expect(copyright).toBeVisible();
  },
};

/**
 * `layout="centered"` — brand centered on top, link groups centered below.
 */
export const LayoutCentered: Story = {
  args: {
    logo: <SampleLogo />,
    columns: sampleColumns.slice(0, 3),
    copyright: '© 2026 BBANGTO Inc.',
    layout: 'centered',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const footer = canvasElement.querySelector('footer');
    await expect(footer).not.toBeNull();
    await expect(footer).toHaveAttribute('data-bbangto-marketingfooter-layout', 'centered');

    // 2. Load-bearing: top row centers its children
    const logoSlot = canvasElement.querySelector('[aria-label="Site logo"]');
    await expect(logoSlot).not.toBeNull();
    const topRow = (logoSlot as HTMLElement).parentElement as HTMLElement;
    const topRowStyle = getComputedStyle(topRow);
    await expect(topRowStyle.textAlign).toBe('center');
    await expect(topRowStyle.alignItems).toBe('center');

    // Load-bearing: groups container is the centered flex variant + its
    // scoped rule justifies content to center.
    const groups = canvasElement.querySelector('.bbangto-marketing-footer-centered');
    await expect(groups).not.toBeNull();
    const groupsStyle = getComputedStyle(groups as HTMLElement);
    await expect(groupsStyle.justifyContent).toBe('center');

    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('.bbangto-marketing-footer-centered');
    await expect(styleText).toContain('justify-content: center');

    // 3. Footer links render
    const productHeading = await canvas.findByText('Product');
    await expect(productHeading).toBeVisible();
    const featuresLink = await canvas.findByRole('link', { name: 'Features' });
    await expect(featuresLink).toBeVisible();
  },
};

/**
 * `layout="stacked"` — groups stacked vertically as a single column always.
 */
export const LayoutStacked: Story = {
  args: {
    logo: <SampleLogo />,
    columns: sampleColumns,
    copyright: '© 2026 BBANGTO Inc.',
    layout: 'stacked',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const footer = canvasElement.querySelector('footer');
    await expect(footer).not.toBeNull();
    await expect(footer).toHaveAttribute('data-bbangto-marketingfooter-layout', 'stacked');

    // 2. Load-bearing: groups container is a single COLUMN flex
    const groups = canvasElement.querySelector('.bbangto-marketing-footer-stacked');
    await expect(groups).not.toBeNull();
    const groupsStyle = getComputedStyle(groups as HTMLElement);
    await expect(groupsStyle.display).toBe('flex');
    await expect(groupsStyle.flexDirection).toBe('column');

    // 3. Footer links render across stacked groups
    const productHeading = await canvas.findByText('Product');
    await expect(productHeading).toBeVisible();
    const legalHeading = await canvas.findByText('Legal');
    await expect(legalHeading).toBeVisible();
    const featuresLink = await canvas.findByRole('link', { name: 'Features' });
    await expect(featuresLink).toBeVisible();
    await expect(featuresLink).toHaveAttribute('href', '#features');
  },
};

/**
 * `layout="wordmark"` — link groups stacked above an OVERSIZED full-width brand
 * wordmark band (its own root track), with the social + copyright bottom bar
 * below. The brand IS the band — distinct from the small inline logo slot.
 */
export const Wordmark: Story = {
  args: {
    wordmark: 'bbangto',
    columns: sampleColumns.slice(0, 3),
    social: sampleSocial,
    copyright: '© 2026 BBANGTO Inc.',
    layout: 'wordmark',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const footer = canvasElement.querySelector('footer');
    await expect(footer).not.toBeNull();
    await expect(footer).toHaveAttribute('data-bbangto-marketingfooter-layout', 'wordmark');

    // a11y contract: contentinfo landmark preserved
    const contentinfo = canvas.getByRole('contentinfo');
    await expect(contentinfo).not.toBeNull();

    // 2. Load-bearing: the oversized brand band is its own full-width track.
    //    It is clipped (overflow hidden), uppercased, and floored at 6rem
    //    (96px) by the clamp() — far larger than the inline logo slot.
    const band = canvasElement.querySelector('.bbangto-marketing-footer-wordmark');
    await expect(band).not.toBeNull();
    await expect(band).toHaveTextContent('bbangto');
    const bandStyle = getComputedStyle(band as HTMLElement);
    await expect(bandStyle.overflow).toBe('hidden');
    await expect(bandStyle.textTransform).toBe('uppercase');
    await expect(parseFloat(bandStyle.fontSize)).toBeGreaterThanOrEqual(90);

    // Scoped style asserts the band is a full-width nowrap track.
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('.bbangto-marketing-footer-wordmark');
    await expect(styleText).toContain('white-space: nowrap');

    // 3. Content slots: link groups above the band, social/copyright below.
    const productHeading = await canvas.findByText('Product');
    await expect(productHeading).toBeVisible();
    const featuresLink = await canvas.findByRole('link', { name: 'Features' });
    await expect(featuresLink).toBeVisible();
    await expect(featuresLink).toHaveAttribute('href', '#features');
    // a11y contract: link stays keyboard-focusable
    (featuresLink as HTMLElement).focus();
    await expect(featuresLink).toHaveFocus();

    const githubLink = await canvas.findByRole('link', { name: 'GitHub' });
    await expect(githubLink).toBeVisible();
    const copyright = await canvas.findByText('© 2026 BBANGTO Inc.');
    await expect(copyright).toBeVisible();
  },
};

/**
 * `layout="gradient"` — the columns skeleton over a multi-stop token gradient
 * surface (no flat fill) with an overlaid dot/grid pattern layer behind the
 * content and a top divider border on the bottom bar.
 */
export const Gradient: Story = {
  args: {
    logo: <SampleLogo />,
    columns: sampleColumns,
    social: sampleSocial,
    copyright: '© 2026 BBANGTO Inc. All rights reserved.',
    layout: 'gradient',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const footer = canvasElement.querySelector('footer');
    await expect(footer).not.toBeNull();
    await expect(footer).toHaveAttribute('data-bbangto-marketingfooter-layout', 'gradient');

    // a11y contract: contentinfo landmark preserved
    const contentinfo = canvas.getByRole('contentinfo');
    await expect(contentinfo).not.toBeNull();

    // 2. Load-bearing: root surface is a gradient (no flat fill).
    const footerStyle = getComputedStyle(footer as HTMLElement);
    await expect(footerStyle.backgroundImage).toContain('gradient');
    await expect(footerStyle.position).toBe('relative');

    // The dot/grid pattern is an absolute, overflow-clipped radial-gradient
    // layer behind the content.
    const pattern = canvasElement.querySelector('.bbangto-marketing-footer-gradient-pattern');
    await expect(pattern).not.toBeNull();
    const patternStyle = getComputedStyle(pattern as HTMLElement);
    await expect(patternStyle.position).toBe('absolute');
    await expect(patternStyle.overflow).toBe('hidden');
    await expect(patternStyle.backgroundImage).toContain('radial-gradient');

    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('.bbangto-marketing-footer-gradient-pattern');

    // Top divider border on the bottom bar (the social list lives there).
    const socialList = canvasElement.querySelector('[aria-label="Social links"]');
    await expect(socialList).not.toBeNull();
    const bottomBar = (socialList as HTMLElement).parentElement as HTMLElement;
    const bottomBarStyle = getComputedStyle(bottomBar);
    await expect(bottomBarStyle.borderTopStyle).toBe('solid');

    // 3. Content slots render unchanged from the columns skeleton.
    const productHeading = await canvas.findByText('Product');
    await expect(productHeading).toBeVisible();
    const featuresLink = await canvas.findByRole('link', { name: 'Features' });
    await expect(featuresLink).toBeVisible();
    await expect(featuresLink).toHaveAttribute('href', '#features');
    // a11y contract: link stays keyboard-focusable
    (featuresLink as HTMLElement).focus();
    await expect(featuresLink).toHaveFocus();
    const copyright = await canvas.findByText('© 2026 BBANGTO Inc. All rights reserved.');
    await expect(copyright).toBeVisible();
  },
};
