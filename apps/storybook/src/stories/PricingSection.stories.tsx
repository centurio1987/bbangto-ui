import type { Meta, StoryObj } from '@storybook/react';
import { PricingSection } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Blocks/PricingSection',
  component: PricingSection,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof PricingSection>;

export default meta;
type Story = StoryObj<typeof meta>;

const samplePlans = [
  {
    name: 'Starter',
    price: 'Free',
    period: 'forever',
    features: [
      'Up to 3 projects',
      '1 GB storage',
      'Community support',
      'Basic analytics',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/ month',
    features: [
      'Unlimited projects',
      '50 GB storage',
      'Priority email support',
      'Advanced analytics',
      'Custom domains',
      'Team collaboration (5 seats)',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/ month',
    features: [
      'Everything in Pro',
      '500 GB storage',
      'Dedicated account manager',
      'SSO & SAML',
      'SLA 99.9% uptime',
      'Unlimited seats',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

/**
 * Default story: three-plan pricing grid with a highlighted "Pro" tier.
 * The play function verifies that the section title, plan names, feature items,
 * and CTA buttons are all rendered, then simulates a click on the first CTA.
 */
export const Default: Story = {
  args: {
    title: 'Simple, Transparent Pricing',
    plans: samplePlans,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 1. Section title is visible
    const heading = await canvas.findByRole('heading', {
      name: /Simple, Transparent Pricing/i,
    });
    await expect(heading).toBeVisible();

    // 2. All three plan names are rendered
    await expect(canvas.getByRole('heading', { name: /Starter/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Pro/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Enterprise/i })).toBeVisible();

    // 3. Feature items are present (spot-check one per plan)
    await expect(canvas.getByText('Up to 3 projects')).toBeVisible();
    await expect(canvas.getByText('Unlimited projects')).toBeVisible();
    await expect(canvas.getByText('Everything in Pro')).toBeVisible();

    // 4. "Most Popular" badge is on the highlighted (Pro) card
    await expect(canvas.getByText('Most Popular')).toBeVisible();

    // 5. CTA buttons are present
    const ctaButtons = canvas.getAllByRole('button');
    await expect(ctaButtons.length).toBeGreaterThanOrEqual(3);

    // 6. Interact: click the first CTA ("Get Started — Starter plan")
    const getStartedBtn = canvas.getByRole('button', {
      name: /Get Started — Starter plan/i,
    });
    await userEvent.click(getStartedBtn);
    // Button remains visible after click (no navigation occurs in Storybook)
    await expect(getStartedBtn).toBeVisible();
  },
};

/**
 * Two-plan variant: shows the grid collapsing to two columns at smaller
 * viewports via intrinsic `auto-fit` responsiveness.
 */
export const TwoPlans: Story = {
  args: {
    title: 'Choose Your Plan',
    plans: [
      {
        name: 'Basic',
        price: '$9',
        period: '/ month',
        features: [
          '5 projects',
          '10 GB storage',
          'Email support',
        ],
        cta: 'Get Basic',
        highlighted: false,
      },
      {
        name: 'Growth',
        price: '$49',
        period: '/ month',
        features: [
          'Unlimited projects',
          '200 GB storage',
          'Priority support',
          'Advanced analytics',
          'API access',
        ],
        cta: 'Get Growth',
        highlighted: true,
      },
    ],
  },
};
