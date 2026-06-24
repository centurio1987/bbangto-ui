import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['bordered', 'flush'] },
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
