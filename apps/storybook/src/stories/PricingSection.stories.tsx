import type { Meta, StoryObj } from '@storybook/react';
import { PricingSection } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Blocks/PricingSection',
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

/**
 * `table` layout: a feature-comparison table where rows are features and
 * columns are plans. The play function asserts the layout data-attribute, that
 * a real <table> (role=table) is rendered with feature rows, and that every
 * plan name still appears as a column header.
 */
export const LayoutTable: Story = {
  args: {
    title: 'Compare Plans',
    layout: 'table',
    plans: samplePlans,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvasElement.querySelector(
      '[data-bbangto-pricingsection-layout]'
    ) as HTMLElement;

    // 1. data-attr present with the right value
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-pricingsection-layout')).toBe(
      'table'
    );

    // 2. Load-bearing: a real comparison table is rendered with feature rows
    const table = await canvas.findByRole('table');
    await expect(table).toBeVisible();
    expect(table.tagName).toBe('TABLE');
    // Column headers carry the plan names.
    const colHeaders = canvas.getAllByRole('columnheader');
    expect(colHeaders.length).toBeGreaterThanOrEqual(plansHeaderCount(samplePlans));
    // Feature rows exist (row headers in <tbody>).
    const rowHeaders = canvas.getAllByRole('rowheader');
    expect(rowHeaders.length).toBeGreaterThan(0);

    // 3. Content slots: plan names + a feature still render
    await expect(canvas.getByRole('columnheader', { name: /Starter/i })).toBeVisible();
    await expect(canvas.getByRole('columnheader', { name: /Pro/i })).toBeVisible();
    await expect(canvas.getByRole('columnheader', { name: /Enterprise/i })).toBeVisible();
    await expect(canvas.getByText('Up to 3 projects')).toBeVisible();
  },
};

/**
 * `featured` layout: the highlighted plan is enlarged/centered with the others
 * flanking it. The play function asserts the layout data-attribute, that the
 * scoped responsive <style> defining the featured (scale 1.06) and flanking
 * (scale 0.92) treatments is present, and that all plan names render.
 */
export const LayoutFeatured: Story = {
  parameters: {
    viewport: { defaultViewport: 'responsive' },
  },
  args: {
    title: 'Pick the Right Plan',
    layout: 'featured',
    plans: samplePlans,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvasElement.querySelector(
      '[data-bbangto-pricingsection-layout]'
    ) as HTMLElement;

    // 1. data-attr present with the right value
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-pricingsection-layout')).toBe(
      'featured'
    );

    // 2. Load-bearing: the featured plan is marked distinct, and the scoped
    //    style enlarges it (scale 1.06) while flanks shrink (scale 0.92).
    //    Assert via the scoped <style> rule rather than a resolved pixel value.
    const featuredWrap = canvasElement.querySelector(
      '[data-featured]'
    ) as HTMLElement;
    await waitFor(() => expect(featuredWrap).not.toBeNull());
    expect(featuredWrap.className).toContain('bbangto-pricingsection-featured-main');

    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    expect(styleText).toContain('bbangto-pricingsection-featured-main');
    expect(styleText).toContain('scale(1.06)');
    expect(styleText).toContain('bbangto-pricingsection-featured-flank');
    expect(styleText).toContain('scale(0.92)');

    // 3. Content slots: all plan names still render
    await expect(canvas.getByRole('heading', { name: /Starter/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Pro/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Enterprise/i })).toBeVisible();
  },
};

/**
 * `compact` layout: a condensed card row with reduced padding and smaller
 * price/feature typography. The play function asserts the layout data-attribute,
 * that the card padding is visibly smaller than the default `lg` cards, and
 * that all plan names render.
 */
export const LayoutCompact: Story = {
  args: {
    title: 'Compact Pricing',
    layout: 'compact',
    plans: samplePlans,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvasElement.querySelector(
      '[data-bbangto-pricingsection-layout]'
    ) as HTMLElement;

    // 1. data-attr present with the right value
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-pricingsection-layout')).toBe(
      'compact'
    );

    // 2. Load-bearing: compact cards use reduced padding. Default `lg` cards
    //    use spacing-40; compact uses spacing-12, so the resolved padding must
    //    be meaningfully smaller. We assert the numeric padding is below the
    //    default's threshold rather than an exact pixel value.
    const listItem = canvas.getAllByRole('listitem')[0];
    const card = listItem.firstElementChild as HTMLElement;
    await expect(card).not.toBeNull();
    const padding = parseFloat(getComputedStyle(card).paddingTop);
    // lg default resolves to 40px-ish; compact to 12px-ish. Assert clearly small.
    expect(padding).toBeGreaterThan(0);
    expect(padding).toBeLessThan(24);

    // 3. Content slots: all plan names still render
    await expect(canvas.getByRole('heading', { name: /Starter/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Pro/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Enterprise/i })).toBeVisible();
  },
};

/**
 * `single-panel` layout: a single, centered, max-width-constrained panel (one
 * plan rendered as a vertical stack of slots) rather than a repeat-tier grid.
 * The play function asserts the layout data-attribute, that the panel is a
 * width-constrained centered block (constrained `max-width`, not a grid track),
 * that exactly one plan panel is rendered, and that the stacked slots
 * (heading → feature → CTA) all render.
 */
export const SinglePanel: Story = {
  args: {
    title: 'One Plan, Everything Included',
    layout: 'single-panel',
    plans: samplePlans,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvasElement.querySelector(
      '[data-bbangto-pricingsection-layout]'
    ) as HTMLElement;

    // 1. data-attr present with the right value
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-pricingsection-layout')).toBe(
      'single-panel'
    );

    // 2. Load-bearing: a single centered, width-constrained panel — NOT a
    //    repeat-tier grid. Assert the panel carries a real max-width and is not
    //    laid out as a grid, and that exactly one plan panel is rendered.
    const panel = canvasElement.querySelector(
      '.bbangto-pricingsection-single-panel'
    ) as HTMLElement;
    await expect(panel).not.toBeNull();
    const panelStyle = getComputedStyle(panel);
    expect(panelStyle.maxWidth).not.toBe('none');
    expect(panelStyle.display).not.toBe('grid');
    // single-panel renders exactly ONE plan (not a multi-tier grid). Count the
    // per-plan CTA buttons rather than listitems (feature <li>s are also listitems).
    const planCtas = canvas.getAllByRole('button', { name: / plan/i });
    expect(planCtas.length).toBe(1);

    // 3. Content slots: the stacked header → feature list → CTA all render
    await expect(canvas.getByRole('heading', { name: /Pro/i })).toBeVisible();
    await expect(canvas.getByText('Unlimited projects')).toBeVisible();
    await expect(
      canvas.getByRole('button', { name: /Start Free Trial — Pro plan/i })
    ).toBeVisible();
  },
};

/**
 * `frosted-gradient` layout: the card-row chrome becomes a backdrop-blurred,
 * translucent fill floated over a token-composited gradient root surface, with
 * no solid border. The play function asserts the layout data-attribute, that
 * the root carries a gradient background, that the cards use a backdrop blur and
 * carry no solid border, and that all plan names + features still render.
 */
export const FrostedGradient: Story = {
  args: {
    title: 'Frosted Pricing',
    layout: 'frosted-gradient',
    plans: samplePlans,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const section = canvasElement.querySelector(
      '[data-bbangto-pricingsection-layout]'
    ) as HTMLElement;

    // 1. data-attr present with the right value
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-pricingsection-layout')).toBe(
      'frosted-gradient'
    );

    // 2a. Load-bearing: the root surface is a gradient (not a flat fill).
    const sectionStyle = getComputedStyle(section);
    expect(sectionStyle.backgroundImage).toContain('gradient');

    // 2b. Load-bearing: the card chrome is glass — backdrop blur + NO solid
    //     border (elevation-via-blur, not via a border/flat fill).
    const listItem = canvas.getAllByRole('listitem')[0];
    const card = listItem.firstElementChild as HTMLElement;
    await expect(card).not.toBeNull();
    const cardStyle = getComputedStyle(card);
    const blur =
      cardStyle.getPropertyValue('backdrop-filter') ||
      cardStyle.getPropertyValue('-webkit-backdrop-filter');
    expect(blur).toContain('blur');
    expect(cardStyle.borderStyle).toBe('none');

    // 3. Content slots: plan names + a feature still render
    await expect(canvas.getByRole('heading', { name: /Starter/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Pro/i })).toBeVisible();
    await expect(canvas.getByRole('heading', { name: /Enterprise/i })).toBeVisible();
    await expect(canvas.getByText('Up to 3 projects')).toBeVisible();
  },
};

/** Number of plan columns expected in the comparison table header. */
function plansHeaderCount(plans: typeof samplePlans): number {
  // One leading "Features" column header + one per plan.
  return plans.length + 1;
}
