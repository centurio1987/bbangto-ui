import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 기존 스토리 (보존) ───────────────────────────────────────────────────────

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.findByRole('radio');
    await expect(radio).toBeVisible();
    await userEvent.click(radio);
    await expect(radio).toBeChecked();
  },
};

// ─── 신규 스토리 ───────────────────────────────────────────────────────────────

export const WithLabel: Story = {
  args: { label: 'Option A' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const label = await canvas.findByText('Option A');
    await expect(label).toBeVisible();
    const radio = canvas.getByRole('radio');
    await userEvent.click(label);
    await expect(radio).toBeChecked();
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Standard shipping',
    description: 'Arrives in 5–7 business days.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.findByRole('radio');
    await expect(radio).toBeVisible();
    const desc = await canvas.findByText('Arrives in 5–7 business days.');
    await expect(desc).toBeVisible();
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.findByRole('radio');
    await expect(radio).toBeDisabled();
    await expect(radio).toBeVisible();
  },
};

// ─── size ─────────────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  args: { label: 'Small radio', size: 'sm' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.findByRole('radio');
    await expect(radio).toBeVisible();
    const style = getComputedStyle(radio);
    await expect(style.width).toBe('14px');
    await expect(style.height).toBe('14px');
  },
};

export const SizeMedium: Story = {
  args: { label: 'Medium radio', size: 'md' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.findByRole('radio');
    await expect(radio).toBeVisible();
    const style = getComputedStyle(radio);
    await expect(style.width).toBe('18px');
    await expect(style.height).toBe('18px');
  },
};

export const SizeLarge: Story = {
  args: { label: 'Large radio', size: 'lg' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.findByRole('radio');
    await expect(radio).toBeVisible();
    const style = getComputedStyle(radio);
    await expect(style.width).toBe('22px');
    await expect(style.height).toBe('22px');
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Radio size="sm" label="Small (sm)" name="sizes" />
      <Radio size="md" label="Medium (md)" name="sizes" />
      <Radio size="lg" label="Large (lg)" name="sizes" />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radios = await canvas.findAllByRole('radio');
    await expect(radios).toHaveLength(3);
    for (const r of radios) {
      await expect(r).toBeVisible();
    }
  },
};

// ─── error ────────────────────────────────────────────────────────────────────

export const ErrorState: Story = {
  args: { label: 'Required selection', error: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radio = await canvas.findByRole('radio');
    await expect(radio).toBeVisible();
    await expect(radio).toHaveAttribute('aria-invalid', 'true');
    // accentColor uses error token — verify inline style contains the variable
    const styleAttr = radio.getAttribute('style') ?? '';
    await expect(styleAttr).toContain('bbangto-semantic-error-base');
  },
};

export const ErrorWithDescription: Story = {
  args: {
    label: 'Select a payment method',
    description: 'Please select an option to continue.',
    error: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio')).toBeVisible();
    const desc = await canvas.findByText('Please select an option to continue.');
    await expect(desc).toBeVisible();
    await expect(canvas.getByRole('radio')).toHaveAttribute('aria-invalid', 'true');
  },
};

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export const GroupVertical: Story = {
  render: () => (
    <RadioGroup name="shipping" legend="Shipping method" orientation="vertical">
      <Radio label="Standard (5–7 days)" value="standard" />
      <Radio label="Express (2–3 days)" value="express" />
      <Radio label="Overnight (1 day)" value="overnight" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const group = canvasElement.querySelector('[role="radiogroup"]');
    await expect(group).toBeTruthy();
    const radios = await canvas.findAllByRole('radio');
    await expect(radios).toHaveLength(3);
    // All radios share the same name
    for (const r of radios) {
      await expect(r).toHaveAttribute('name', 'shipping');
    }
    // Legend is visible
    const legend = await canvas.findByText('Shipping method');
    await expect(legend).toBeVisible();
    // Click second radio
    await userEvent.click(radios[1]);
    await expect(radios[1]).toBeChecked();
    await expect(radios[0]).not.toBeChecked();
  },
};

export const GroupHorizontal: Story = {
  render: () => (
    <RadioGroup name="plan" legend="Plan" orientation="horizontal">
      <Radio label="Free" value="free" />
      <Radio label="Pro" value="pro" />
      <Radio label="Enterprise" value="enterprise" />
    </RadioGroup>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radios = await canvas.findAllByRole('radio');
    await expect(radios).toHaveLength(3);
    // All share name
    for (const r of radios) {
      await expect(r).toHaveAttribute('name', 'plan');
    }
    // The inner flex container uses row direction
    const group = canvasElement.querySelector('[role="radiogroup"]');
    const flexDiv = group?.querySelector('div');
    await expect(flexDiv).toBeTruthy();
    const flexStyle = getComputedStyle(flexDiv!);
    await expect(flexStyle.flexDirection).toBe('row');
  },
};

export const GroupWithDisabledItem: Story = {
  render: () => (
    <RadioGroup name="notify" legend="Notification frequency">
      <Radio label="Immediately" value="immediate" />
      <Radio label="Daily digest" value="daily" />
      <Radio label="Weekly summary" value="weekly" disabled />
    </RadioGroup>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const radios = await canvas.findAllByRole('radio');
    await expect(radios[2]).toBeDisabled();
    await expect(radios[0]).not.toBeDisabled();
  },
};

// ─── RadioGroup variant 축 ──────────────────────────────────────────────────

export const Card: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <RadioGroup name="card-plan" legend="Choose a plan" variant="card">
        <Radio label="Starter" description="For solo makers shipping their first idea." value="starter" />
        <Radio label="Team" description="Shared workspaces with role-based access." value="team" />
        <Radio label="Scale" description="SSO, audit logs and priority support." value="scale" />
        <Radio label="Enterprise" description="Custom contracts and dedicated infra." value="enterprise" />
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-radio-group-variant]');
    await expect(root?.getAttribute('data-bbangto-radio-group-variant')).toBe('card');
    // ② load-bearing: grid container + responsive 2-col reflow rule + panel border
    const inner = canvasElement.querySelector('.bbangto-radio-group-card');
    await expect(getComputedStyle(inner!).display).toBe('grid');
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('grid-template-columns: 1fr 1fr');
    const panel = canvasElement.querySelector('.bbangto-radio-group-card-item');
    await expect(getComputedStyle(panel!).borderStyle).toBe('solid');
    // ③ content slot (title + description stacked)
    await expect(await canvas.findByText('Starter')).toBeVisible();
    await expect(
      await canvas.findByText('SSO, audit logs and priority support.')
    ).toBeVisible();
  },
};

export const List: Story = {
  render: () => (
    <div style={{ width: 480 }}>
      <RadioGroup name="list-address" legend="Deliver to" variant="list">
        <Radio label="Home" description="123 Baker Street" value="home" />
        <Radio label="Office" description="500 Market Ave, Floor 9" value="office" />
        <Radio label="Pickup point" description="Locker #42, Central Station" value="pickup" />
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-radio-group-variant]');
    await expect(root?.getAttribute('data-bbangto-radio-group-variant')).toBe('list');
    // ② load-bearing: row split-aligns the indicator to the trailing edge
    const item = canvasElement.querySelector('.bbangto-radio-group-list-item');
    const row = item!.querySelector('span');
    const rowStyle = getComputedStyle(row!);
    await expect(rowStyle.flexDirection).toBe('row-reverse');
    await expect(rowStyle.justifyContent).toBe('space-between');
    // divider rule between rows
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('border-top');
    // ③ content slot + selection
    const radios = await canvas.findAllByRole('radio');
    await expect(radios).toHaveLength(3);
    await userEvent.click(radios[2]);
    await expect(radios[2]).toBeChecked();
  },
};

export const Segmented: Story = {
  render: () => (
    <div style={{ width: 420 }}>
      <RadioGroup name="segmented-view" legend="View" variant="segmented">
        <Radio label="Day" value="day" />
        <Radio label="Week" value="week" />
        <Radio label="Month" value="month" />
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-radio-group-variant]');
    await expect(root?.getAttribute('data-bbangto-radio-group-variant')).toBe('segmented');
    // ② load-bearing: single horizontal track of equal-width segments, dot hidden
    const track = canvasElement.querySelector('.bbangto-radio-group-segmented');
    await expect(getComputedStyle(track!).flexDirection).toBe('row');
    const segment = canvasElement.querySelector('.bbangto-radio-group-segmented-item');
    await expect(getComputedStyle(segment!).flexGrow).toBe('1');
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('clip: rect(0 0 0 0)');
    // ③ content slot + selection (label still toggles the hidden input)
    const radios = await canvas.findAllByRole('radio');
    await expect(radios).toHaveLength(3);
    await userEvent.click(radios[1]);
    await expect(radios[1]).toBeChecked();
  },
};

export const Glass: Story = {
  render: () => (
    <div style={{ width: 420, padding: 24, background: '#334155' }}>
      <RadioGroup name="glass-theme" legend="Accent" variant="glass">
        <Radio label="Aurora" description="Cool teal gradient." value="aurora" />
        <Radio label="Sunset" description="Warm amber gradient." value="sunset" />
        <Radio label="Mono" description="Neutral greyscale." value="mono" />
      </RadioGroup>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-radio-group-variant]');
    await expect(root?.getAttribute('data-bbangto-radio-group-variant')).toBe('glass');
    // ② load-bearing: frosted surface — backdrop blur + translucent fill + border
    const panel = canvasElement.querySelector('.bbangto-radio-group-glass');
    const ps = getComputedStyle(panel!);
    const blur =
      ps.getPropertyValue('backdrop-filter') ||
      ps.getPropertyValue('-webkit-backdrop-filter');
    await expect(blur).toContain('blur');
    await expect(ps.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(ps.borderTopStyle).toBe('solid');
    // ③ content slot + selection
    const radios = await canvas.findAllByRole('radio');
    await expect(radios).toHaveLength(3);
    await userEvent.click(radios[0]);
    await expect(radios[0]).toBeChecked();
  },
};
