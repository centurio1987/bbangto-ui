import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['bordered', 'flush', 'separated', 'split-media', 'neobrutalist', 'horizontal-panels'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'What is Bbangto UI?',
    children: 'Bbangto UI is a modern, themeable component library built with React and CSS Custom Properties, fully aligned with the BBANGTO Design System.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'What is Bbangto UI?' });
    const content = canvasElement.querySelector('[data-bbangto-accordion-content]') as HTMLElement | null;

    await expect(content).not.toBeNull();
    await expect(getComputedStyle(content!).transitionProperty).toContain('height');
    await expect(content!.style.height).toBe('0px');

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(Number.parseFloat(content!.style.height)).toBeGreaterThan(0);
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Accordion title="Section 1" defaultExpanded>
        Content for section 1. This one is expanded by default.
      </Accordion>
      <Accordion title="Section 2">
        Content for section 2.
      </Accordion>
      <Accordion title="Section 3">
        Content for section 3.
      </Accordion>
    </div>
  ),
};

// ── New variant/state stories (Wave 1 additions) ──────────────────────────────

export const FlushVariant: Story = {
  args: {
    title: 'Flush variant — no border or radius',
    children: 'The flush variant removes the outer border and border-radius, making it suitable for embedding inside cards or list containers.',
    variant: 'flush',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Flush variant — no border or radius' });
    const container = trigger.closest('[data-bbangto-accordion-variant="flush"]') as HTMLElement | null;

    // The flush container must exist and carry the variant attribute.
    await expect(container).not.toBeNull();
    const style = getComputedStyle(container!);
    // border should be none / transparent for flush variant
    await expect(style.borderStyle).toBe('none');

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

export const VariantSeparated: Story = {
  args: {
    title: 'Separated variant — detached card',
    children: 'The separated variant renders each item as its own bordered, rounded card with a trailing gap, so stacked accordions read as visually detached boxes.',
    variant: 'separated',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Separated variant — detached card' });
    const container = trigger.closest('[data-bbangto-accordion-variant="separated"]') as HTMLElement | null;

    // (1) New data-attr is present with the right value on the root.
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute('data-bbangto-accordion-variant', 'separated');

    // (2) Load-bearing styles: each item is a detached card → individual border,
    //     its own radius, and a trailing gap separating stacked items.
    const style = getComputedStyle(container!);
    await expect(style.borderStyle).toBe('solid');
    await expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(0);
    await expect(Number.parseFloat(style.borderTopLeftRadius)).toBeGreaterThan(0);
    await expect(Number.parseFloat(style.marginBottom)).toBeGreaterThan(0);

    // (3) Expand/collapse still works and content renders.
    const content = canvasElement.querySelector('[data-bbangto-accordion-content]') as HTMLElement | null;
    await expect(content).not.toBeNull();
    await expect(content!.style.height).toBe('0px');

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(Number.parseFloat(content!.style.height)).toBeGreaterThan(0);

    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};

export const SmallSize: Story = {
  args: {
    title: 'Small density accordion',
    children: 'Compact padding for dense UIs like sidebars or settings panels.',
    size: 'sm',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Small density accordion' });
    const container = trigger.closest('[data-bbangto-accordion-size="sm"]') as HTMLElement | null;

    await expect(container).not.toBeNull();

    // Verify a data-attribute token (CSS custom property) is applied via the
    // inline style on the header element.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

export const LargeSize: Story = {
  args: {
    title: 'Large density accordion',
    children: 'Spacious padding for marketing pages or FAQ sections.',
    size: 'lg',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Large density accordion' });
    const container = trigger.closest('[data-bbangto-accordion-size="lg"]') as HTMLElement | null;

    await expect(container).not.toBeNull();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  },
};

export const Disabled: Story = {
  args: {
    title: 'This accordion is disabled',
    children: 'This content should never be visible because the accordion is disabled.',
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'This accordion is disabled' });
    const content = canvasElement.querySelector('[data-bbangto-accordion-content]') as HTMLElement | null;

    // Must not be expandable when disabled.
    await expect(trigger).toHaveAttribute('aria-disabled', 'true');
    await expect(content!.style.height).toBe('0px');

    // Clicking a disabled accordion must not open it.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(content!.style.height).toBe('0px');
  },
};

export const FlushSizeSm: Story = {
  name: 'Flush + Small',
  render: () => (
    <div style={{ maxWidth: '480px', border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
      <Accordion title="FAQ: How do I reset my password?" variant="flush" size="sm">
        Go to Settings → Account → Reset Password, then follow the email instructions.
      </Accordion>
      <Accordion title="FAQ: How do I cancel my subscription?" variant="flush" size="sm">
        You can cancel anytime from Settings → Billing → Cancel Plan.
      </Accordion>
      <Accordion title="FAQ: Is my data exported when I cancel?" variant="flush" size="sm">
        Yes, we provide a full data export before account deletion.
      </Accordion>
    </div>
  ),
};

// ── New variant members (host: Accordion) ─────────────────────────────────────

export const SplitMedia: Story = {
  args: {
    title: 'Split-media — synced 2-track grid',
    children:
      'The split-media variant reflows the root into a 2-track grid when active: the accordion list on the left, a synced media panel on the right that swaps in when expanded.',
    variant: 'split-media',
    media: (
      <div
        role="img"
        aria-label="Feature preview"
        style={{ width: '100%', height: '96px', borderRadius: '8px', background: 'currentColor', opacity: 0.18 }}
      />
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Split-media — synced 2-track grid' });
    const container = trigger.closest('[data-bbangto-accordion-variant="split-media"]') as HTMLElement | null;

    // (1) data-attr present with the right value on the root.
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute('data-bbangto-accordion-variant', 'split-media');

    // Scoped responsive style is emitted with the namespace + lg breakpoint.
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('bbangto-accordion-split');
    await expect(styleText).toContain('1024px');

    // Collapsed root is a single column.
    await expect(getComputedStyle(container!).display).toBe('grid');

    // (2) Load-bearing: expanding reflows to a 2-track grid (accordion | media).
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await waitFor(async () => {
      const tracks = getComputedStyle(container!).gridTemplateColumns.trim().split(/\s+/);
      await expect(tracks.length).toBe(2);
    });

    // (3) Content + synced media panel both render once active.
    const content = canvasElement.querySelector('[data-bbangto-accordion-content]') as HTMLElement | null;
    await expect(Number.parseFloat(content!.style.height)).toBeGreaterThan(0);
    await expect(await canvas.findByRole('img', { name: 'Feature preview' })).toBeVisible();
  },
};

export const Neobrutalist: Story = {
  args: {
    title: 'Neobrutalist — hard offset shadow',
    children:
      'The neobrutalist variant draws a thick solid border with a hard zero-blur offset shadow, a flat fill, and sharp (0) corners. Elevation comes from the offset, not a blur.',
    variant: 'neobrutalist',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Neobrutalist — hard offset shadow' });
    const container = trigger.closest('[data-bbangto-accordion-variant="neobrutalist"]') as HTMLElement | null;

    // (1) data-attr present with the right value on the root.
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute('data-bbangto-accordion-variant', 'neobrutalist');

    // (2) Load-bearing: thick solid border, sharp 0 corners, hard zero-blur
    //     offset box-shadow (elevation from the offset, not a blur radius).
    const style = getComputedStyle(container!);
    await expect(style.borderStyle).toBe('solid');
    await expect(Number.parseFloat(style.borderTopWidth)).toBeGreaterThan(1);
    await expect(Number.parseFloat(style.borderTopLeftRadius)).toBe(0);
    await expect(style.boxShadow).not.toBe('none');
    await expect(style.boxShadow).toContain('4px 4px'); // offset
    await expect(style.boxShadow).toContain('0px 0px'); // zero blur + spread

    // (3) Expand/collapse still works and content renders.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const content = canvasElement.querySelector('[data-bbangto-accordion-content]') as HTMLElement | null;
    await expect(Number.parseFloat(content!.style.height)).toBeGreaterThan(0);
    await expect(await canvas.findByText(/Elevation comes from the offset/)).toBeInTheDocument();
  },
};

export const HorizontalPanels: Story = {
  args: {
    title: 'Horizontal panels',
    children:
      'The horizontal-panels variant lays the root out as a horizontal flex track. The panel is a collapsed background-image strip with a vertical title rail that expands open via flex-grow.',
    variant: 'horizontal-panels',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Horizontal panels' });
    const container = trigger.closest('[data-bbangto-accordion-variant="horizontal-panels"]') as HTMLElement | null;

    // (1) data-attr present with the right value on the root.
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute('data-bbangto-accordion-variant', 'horizontal-panels');

    // (2) Load-bearing: horizontal flex track; the panel carries a cover
    //     background-image with an overlay; the collapsed title rail is vertical.
    await expect(getComputedStyle(container!).flexDirection).toBe('row');

    const panel = canvasElement.querySelector('[data-bbangto-accordion-panel]') as HTMLElement | null;
    await expect(panel).not.toBeNull();
    const panelStyle = getComputedStyle(panel!);
    await expect(panelStyle.backgroundImage).toContain('gradient');
    await expect(panelStyle.backgroundSize).toBe('cover');

    const overlay = canvasElement.querySelector('[data-bbangto-accordion-overlay]') as HTMLElement | null;
    await expect(overlay).not.toBeNull();
    await expect(getComputedStyle(overlay!).backgroundColor).not.toBe('rgba(0, 0, 0, 0)');

    // Collapsed: the title rail is rendered vertically.
    await expect(getComputedStyle(trigger).writingMode).toContain('vertical');

    // (3) Expanding grows the panel via flex-grow and reveals the content.
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await waitFor(async () => {
      await expect(getComputedStyle(panel!).flexGrow).toBe('1');
    });
    const content = canvasElement.querySelector('[data-bbangto-accordion-content]') as HTMLElement | null;
    await expect(Number.parseFloat(content!.style.height)).toBeGreaterThan(0);
    await expect(await canvas.findByText(/expands open via flex-grow/)).toBeInTheDocument();
  },
};
