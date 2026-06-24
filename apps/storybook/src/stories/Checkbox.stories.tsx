import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    error: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 기존 스토리 (보존) ───────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeVisible();
    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

export const WithLabel: Story = {
  args: { label: 'Accept terms' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const label = await canvas.findByText('Accept terms');
    await expect(label).toBeVisible();
    const checkbox = canvas.getByRole('checkbox');
    await expect(checkbox).toBeVisible();
    await userEvent.click(label);
    await expect(checkbox).toBeChecked();
  },
};

export const Checked: Story = {
  args: { label: 'Checked', defaultChecked: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeChecked();
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled', disabled: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeDisabled();
    // opacity comes from container — check element is still visible
    await expect(checkbox).toBeVisible();
  },
};

// ─── 신규 스토리 ───────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  args: { label: 'Small checkbox', size: 'sm' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeVisible();
    // size=sm → width/height should be 14px
    const style = getComputedStyle(checkbox);
    await expect(style.width).toBe('14px');
    await expect(style.height).toBe('14px');
  },
};

export const SizeLarge: Story = {
  args: { label: 'Large checkbox', size: 'lg' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeVisible();
    // size=lg → width/height should be 22px
    const style = getComputedStyle(checkbox);
    await expect(style.width).toBe('22px');
    await expect(style.height).toBe('22px');
  },
};

export const ErrorState: Story = {
  args: { label: 'Required field', error: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeVisible();
    // aria-invalid should be true when error=true
    await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    // accent-color uses error token — verify via inline style attribute
    const styleAttr = checkbox.getAttribute('style') ?? '';
    await expect(styleAttr).toContain('bbangto-semantic-error-base');
  },
};

export const ErrorWithDescription: Story = {
  args: {
    label: 'I agree to the terms',
    description: 'You must accept the terms to continue.',
    error: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('checkbox')).toBeVisible();
    const desc = await canvas.findByText('You must accept the terms to continue.');
    await expect(desc).toBeVisible();
  },
};

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeVisible();
    // indeterminate property must be set on the DOM node
    await expect((checkbox as HTMLInputElement).indeterminate).toBe(true);
    // aria-checked=mixed for indeterminate
    await expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive updates about your account via email.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkbox = await canvas.findByRole('checkbox');
    await expect(checkbox).toBeVisible();
    const desc = await canvas.findByText('Receive updates about your account via email.');
    await expect(desc).toBeVisible();
    // description text uses muted foreground token
    const style = getComputedStyle(desc);
    await expect(style.color).not.toBe('');
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="sm" label="Small (sm)" />
      <Checkbox size="md" label="Medium (md)" />
      <Checkbox size="lg" label="Large (lg)" />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const checkboxes = await canvas.findAllByRole('checkbox');
    await expect(checkboxes).toHaveLength(3);
    for (const cb of checkboxes) {
      await expect(cb).toBeVisible();
    }
  },
};
