import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'soft', 'gradient', 'link', 'neon'],
    },
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'neutral'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
    color: 'primary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    color: 'primary',
  },
};

export const Neutral: Story = {
  args: {
    children: 'Cancel',
    variant: 'outline',
    color: 'neutral',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Not Allowed',
    variant: 'solid',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving',
    variant: 'solid',
    color: 'primary',
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /saving/i });
    // aria-busy must be set while loading
    await expect(button).toHaveAttribute('aria-busy', 'true');
    // Spinner (role="status") must be rendered inside the button
    const spinner = await canvas.findByRole('status');
    await expect(spinner).toBeVisible();
    // Clicking must not fire onClick while loading (acts disabled)
    await userEvent.click(button);
    await expect(button).toBeDisabled();
  },
};

export const Soft: Story = {
  args: {
    children: 'Soft',
    variant: 'soft',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /soft/i });
    await expect(button).toBeVisible();
    const style = getComputedStyle(button);
    // soft variant applies a subtle background (not transparent) and a color foreground
    await expect(style.backgroundColor).not.toBe('');
    await expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(style.backgroundColor).not.toBe('transparent');
    await expect(style.color).not.toBe('');
  },
};

export const Gradient: Story = {
  args: {
    children: 'Gradient',
    variant: 'gradient',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook reflects the variant
    const root = canvasElement.querySelector('[data-bbangto-button-variant]');
    await expect(root?.getAttribute('data-bbangto-button-variant')).toBe('gradient');
    // 2. load-bearing chrome: the fill is a multi-stop linear gradient
    const button = await canvas.findByRole('button', { name: /gradient/i });
    const style = getComputedStyle(button);
    await expect(style.backgroundImage).toContain('gradient');
    await expect(style.boxShadow).not.toBe('');
    await expect(style.boxShadow).not.toBe('none');
    // 3. content slot renders
    await expect(button).toHaveTextContent('Gradient');
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook reflects the variant
    const root = canvasElement.querySelector('[data-bbangto-button-variant]');
    await expect(root?.getAttribute('data-bbangto-button-variant')).toBe('link');
    // 2. load-bearing chrome: underlined, no fill, no border
    const button = await canvas.findByRole('button', { name: /link/i });
    const style = getComputedStyle(button);
    await expect(style.textDecorationLine).toContain('underline');
    await expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(style.borderColor).toBe('rgba(0, 0, 0, 0)');
    // 3. content slot renders
    await expect(button).toHaveTextContent('Link');
  },
};

export const Neon: Story = {
  args: {
    children: 'Neon',
    variant: 'neon',
    color: 'primary',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook reflects the variant
    const root = canvasElement.querySelector('[data-bbangto-button-variant]');
    await expect(root?.getAttribute('data-bbangto-button-variant')).toBe('neon');
    // 2. load-bearing chrome: solid saturated border + multi-spread glow
    const button = await canvas.findByRole('button', { name: /neon/i });
    const style = getComputedStyle(button);
    await expect(style.borderStyle).toContain('solid');
    await expect(style.boxShadow).not.toBe('');
    await expect(style.boxShadow).not.toBe('none');
    // multi-spread glow => more than one shadow layer. A single layer has at
    // most 4 length tokens (x/y/blur/spread); three stacked layers have many
    // more "px" tokens regardless of how the color serializes.
    await expect((style.boxShadow.match(/px/g) ?? []).length).toBeGreaterThan(4);
    // 3. content slot renders
    await expect(button).toHaveTextContent('Neon');
  },
};

export const Pill: Story = {
  args: {
    children: 'Pill',
    variant: 'solid',
    color: 'primary',
    shape: 'pill',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: /pill/i });
    await expect(button).toBeVisible();
    const style = getComputedStyle(button);
    // pill shape resolves to a fully-rounded radius (large px value)
    const radius = parseFloat(style.borderRadius);
    await expect(Number.isNaN(radius)).toBe(false);
    await expect(radius).toBeGreaterThan(100);
  },
};
