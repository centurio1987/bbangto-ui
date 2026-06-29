import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

const mockOptionsWithDisabled = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2 (unavailable)', value: '2', disabled: true },
  { label: 'Option 3', value: '3' },
];

// ── Existing stories (preserved) ────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} options={mockOptions} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. Trigger is rendered
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // 2. Opens on click
    await userEvent.click(trigger);
    const listbox = canvasElement.querySelector('[role="listbox"]') as HTMLElement;
    await expect(listbox).toBeVisible();
    // 3. Selecting an option closes the dropdown and updates the label
    const option1 = within(listbox).getByText('Option 1');
    await userEvent.click(option1);
    await expect(trigger).toHaveTextContent('Option 1');
  },
};

export const Disabled: Story = {
  args: {
    options: mockOptions,
    disabled: true,
  },
};

// ── New stories ──────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} size="sm" options={mockOptions} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // size token propagates via data-size attribute on the container
    const container = trigger.closest('[data-size]') as HTMLElement;
    await expect(container).toBeDefined();
    await expect(container.getAttribute('data-size')).toBe('sm');
    // Height should be 32px
    const height = trigger.style.height || getComputedStyle(trigger).height;
    await expect(height).toBe('32px');
  },
};

export const SizeLarge: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} size="lg" options={mockOptions} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    const container = trigger.closest('[data-size]') as HTMLElement;
    await expect(container.getAttribute('data-size')).toBe('lg');
    const height = trigger.style.height || getComputedStyle(trigger).height;
    await expect(height).toBe('48px');
  },
};

export const ErrorState: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} error options={mockOptions} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // Container should have aria-invalid
    const container = canvasElement.querySelector('[aria-invalid]') as HTMLElement;
    await expect(container).toBeDefined();
    await expect(container.getAttribute('aria-invalid')).toBe('true');
    // Border should reference the error token (inline style check).
    // The component uses the `border` shorthand with a CSS var(), so the
    // `borderColor` longhand reads empty — assert on the shorthand instead.
    const border = trigger.style.border;
    await expect(border).toContain('var(--bbangto-semantic-error-base)');
  },
};

export const LoadingState: Story = {
  args: {
    options: mockOptions,
    loading: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // Spinner should be present
    const spinner = canvasElement.querySelector('[role="status"]') as HTMLElement;
    await expect(spinner).toBeDefined();
    await expect(spinner).toBeVisible();
    // Container has data-loading attribute
    const container = canvasElement.querySelector('[data-loading]') as HTMLElement;
    await expect(container).toBeDefined();
    // Clicking trigger should NOT open dropdown when loading
    await userEvent.click(trigger);
    const listbox = canvasElement.querySelector('[role="listbox"]') as HTMLElement;
    const display = listbox.style.display;
    await expect(display).toBe('none');
  },
};

export const WithDisabledOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Select
        {...args}
        options={mockOptionsWithDisabled}
        value={value}
        onChange={setValue}
        placeholder="Choose an option..."
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // Open dropdown
    await userEvent.click(trigger);
    const listbox = canvasElement.querySelector('[role="listbox"]') as HTMLElement;
    await expect(listbox).toBeVisible();
    // Disabled option should have aria-disabled
    const disabledOption = within(listbox).getByText('Option 2 (unavailable)').closest('[role="option"]') as HTMLElement;
    await expect(disabledOption.getAttribute('aria-disabled')).toBe('true');
    // Clicking disabled option should NOT change selection
    await userEvent.click(disabledOption);
    await expect(trigger).toHaveTextContent('Choose an option...');
    // Enabled option works normally
    const option3 = within(listbox).getByText('Option 3');
    await userEvent.click(option3);
    await expect(trigger).toHaveTextContent('Option 3');
  },
};

export const VariantFilled: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} variant="filled" options={mockOptions} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // 1. data-attr present with the right value on the trigger
    await expect(trigger.getAttribute('data-bbangto-select-variant')).toBe('filled');
    // 2. Load-bearing style: filled trigger has a non-transparent background
    //    and (in the closed/non-error state) a transparent border.
    const bg = getComputedStyle(trigger).backgroundColor;
    await expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    await expect(bg).not.toBe('transparent');
    await expect(trigger.style.border).toContain('transparent');
    // 3. Trigger still renders and opens.
    await userEvent.click(trigger);
    const listbox = canvasElement.querySelector('[role="listbox"]') as HTMLElement;
    await expect(listbox).toBeVisible();
    const option1 = within(listbox).getByText('Option 1');
    await userEvent.click(option1);
    await expect(trigger).toHaveTextContent('Option 1');
  },
};

export const VariantUnderline: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} variant="underline" options={mockOptions} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // 1. data-attr present with the right value on the trigger
    await expect(trigger.getAttribute('data-bbangto-select-variant')).toBe('underline');
    // 2. Load-bearing style: underline trigger has bottom border only,
    //    zero radius, and a transparent background.
    const cs = getComputedStyle(trigger);
    await expect(cs.borderBottomStyle).toBe('solid');
    await expect(cs.borderTopStyle).toBe('none');
    await expect(cs.borderRadius).toBe('0px');
    await expect(cs.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    // 3. Trigger still renders and opens.
    await userEvent.click(trigger);
    const listbox = canvasElement.querySelector('[role="listbox"]') as HTMLElement;
    await expect(listbox).toBeVisible();
    const option2 = within(listbox).getByText('Option 2');
    await userEvent.click(option2);
    await expect(trigger).toHaveTextContent('Option 2');
  },
};

export const VariantGlass: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <Select {...args} variant="glass" options={mockOptions} value={value} onChange={setValue} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('combobox');
    await expect(trigger).toBeVisible();
    // 1. data-attr present with the right value on the trigger
    await expect(trigger.getAttribute('data-bbangto-select-variant')).toBe('glass');
    // 2. Load-bearing style: frosted glass = backdrop blur + a translucent
    //    (non-opaque, non-transparent) surface fill + a solid 1px border.
    const cs = getComputedStyle(trigger);
    const backdrop = cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || '';
    await expect(backdrop).toContain('blur');
    // Surface fill is present but not a fully opaque/transparent flat fill.
    await expect(cs.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(cs.backgroundColor).not.toBe('transparent');
    await expect(cs.borderTopStyle).toBe('solid');
    // 3. Trigger still renders and opens, content slot works.
    await userEvent.click(trigger);
    const listbox = canvasElement.querySelector('[role="listbox"]') as HTMLElement;
    await expect(listbox).toBeVisible();
    const option3 = within(listbox).getByText('Option 3');
    await userEvent.click(option3);
    await expect(trigger).toHaveTextContent('Option 3');
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Select size="sm" options={mockOptions} value="" onChange={() => {}} placeholder="Small (32px)" />
      <Select size="md" options={mockOptions} value="" onChange={() => {}} placeholder="Medium (40px)" />
      <Select size="lg" options={mockOptions} value="" onChange={() => {}} placeholder="Large (48px)" />
    </div>
  ),
};
