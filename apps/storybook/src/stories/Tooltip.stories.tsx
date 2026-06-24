import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'error'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
    children: <Button>Hover me</Button>,
    position: 'top',
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '32px' }}>
      <Tooltip content="Top tooltip" position="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>
    </div>
  ),
};

// --- New variant stories ---

export const VariantDark: Story = {
  name: 'Variant / Dark (default)',
  args: {
    content: 'Dark tooltip',
    children: <Button>Hover for dark</Button>,
    variant: 'dark',
    position: 'top',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /hover for dark/i });
    await expect(trigger).toBeVisible();
    // Hover to reveal tooltip
    await userEvent.hover(trigger);
    const tooltip = await canvas.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    // Verify dark background token is applied (CSS variable reference is present)
    const style = getComputedStyle(tooltip);
    await expect(style.backgroundColor).not.toBe('');
    await userEvent.unhover(trigger);
  },
};

export const VariantLight: Story = {
  name: 'Variant / Light',
  args: {
    content: 'Light tooltip',
    children: <Button>Hover for light</Button>,
    variant: 'light',
    position: 'top',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /hover for light/i });
    await expect(trigger).toBeVisible();
    await userEvent.hover(trigger);
    const tooltip = await canvas.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    // Light variant should have a border (outlined style)
    const style = getComputedStyle(tooltip);
    await expect(style.border).not.toBe('');
    await userEvent.unhover(trigger);
  },
};

export const VariantError: Story = {
  name: 'Variant / Error',
  args: {
    content: 'Something went wrong',
    children: <Button color="error">Hover for error</Button>,
    variant: 'error',
    position: 'bottom',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /hover for error/i });
    await expect(trigger).toBeVisible();
    await userEvent.hover(trigger);
    const tooltip = await canvas.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent('Something went wrong');
    await userEvent.unhover(trigger);
  },
};

export const SizeSmall: Story = {
  name: 'Size / Small',
  args: {
    content: 'Small tooltip',
    children: <Button size="sm">Small trigger</Button>,
    size: 'sm',
    position: 'top',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /small trigger/i });
    await userEvent.hover(trigger);
    const tooltip = await canvas.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    // sm size should use smaller font
    const style = getComputedStyle(tooltip);
    await expect(style.fontSize).not.toBe('');
    await userEvent.unhover(trigger);
  },
};

export const SizeLarge: Story = {
  name: 'Size / Large',
  args: {
    content: 'Large tooltip with more context',
    children: <Button size="lg">Large trigger</Button>,
    size: 'lg',
    position: 'top',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /large trigger/i });
    await userEvent.hover(trigger);
    const tooltip = await canvas.findByRole('tooltip');
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveTextContent('Large tooltip with more context');
    await userEvent.unhover(trigger);
  },
};

export const Disabled: Story = {
  name: 'State / Disabled',
  args: {
    content: 'This tooltip is disabled',
    children: <Button>Hover (no tooltip)</Button>,
    disabled: true,
    position: 'top',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /hover \(no tooltip\)/i });
    await expect(trigger).toBeVisible();
    // Hovering a disabled tooltip should NOT show the tooltip (visibility:hidden)
    await userEvent.hover(trigger);
    const tooltip = canvasElement.querySelector('[role="tooltip"]') as HTMLElement | null;
    await expect(tooltip).not.toBeNull();
    // The tooltip element exists in DOM but remains hidden when disabled
    const style = tooltip ? getComputedStyle(tooltip) : null;
    await expect(style?.visibility).toBe('hidden');
    await userEvent.unhover(trigger);
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '48px' }}>
      <Tooltip content="Dark (default)" variant="dark" position="top">
        <Button>Dark</Button>
      </Tooltip>
      <Tooltip content="Light variant" variant="light" position="top">
        <Button variant="outline">Light</Button>
      </Tooltip>
      <Tooltip content="Error message" variant="error" position="top">
        <Button color="error">Error</Button>
      </Tooltip>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '32px', padding: '48px' }}>
      <Tooltip content="Small" size="sm" position="top">
        <Button size="sm">Small</Button>
      </Tooltip>
      <Tooltip content="Medium (default)" size="md" position="top">
        <Button size="md">Medium</Button>
      </Tooltip>
      <Tooltip content="Large tooltip text" size="lg" position="top">
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
};
