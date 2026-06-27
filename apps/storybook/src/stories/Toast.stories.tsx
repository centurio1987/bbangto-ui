import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@centurio1987/bbangto-ui-core';
import { expect, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'top-center',
        'bottom-right',
        'bottom-left',
        'bottom-center',
      ],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

// ------------------------------------------------------------------
// Shared render helper: wraps the toast in a relative container so
// position: absolute offset from the wrapper, not the viewport.
// ------------------------------------------------------------------
const render: Story['render'] = (args) => (
  <div style={{ position: 'relative', height: '150px' }}>
    <Toast {...args} style={{ position: 'absolute', top: 0, right: 0 }} />
  </div>
);

// ------------------------------------------------------------------
// Existing stories (preserved, no changes to args/defaults)
// ------------------------------------------------------------------

export const Default: Story = {
  args: {
    title: 'Update successful',
    message: 'Your profile has been updated.',
    variant: 'success',
    duration: 0,
  },
  render,
};

export const ErrorToast: Story = {
  args: {
    title: 'Connection failed',
    message: 'Please check your internet connection.',
    variant: 'error',
    duration: 0,
  },
  render: Default.render,
};

// ------------------------------------------------------------------
// New: size variants
// ------------------------------------------------------------------

export const SizeSmall: Story = {
  args: {
    message: 'Compact notification.',
    variant: 'info',
    size: 'sm',
    duration: 0,
  },
  render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    // sm size: dataset attribute should be present
    await expect(el).toHaveAttribute('data-size', 'sm');
  },
};

export const SizeMedium: Story = {
  args: {
    message: 'Standard notification.',
    variant: 'info',
    size: 'md',
    duration: 0,
  },
  render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(el).toHaveAttribute('data-size', 'md');
  },
};

export const SizeLarge: Story = {
  args: {
    message: 'Large notification with more breathing room.',
    variant: 'info',
    size: 'lg',
    duration: 0,
  },
  render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(el).toHaveAttribute('data-size', 'lg');
  },
};

// ------------------------------------------------------------------
// New: loading state
// ------------------------------------------------------------------

export const Loading: Story = {
  args: {
    title: 'Saving changes',
    message: 'Please wait while we save your data.',
    variant: 'info',
    loading: true,
    duration: 0,
  },
  render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    // Loading spinner should be present
    const spinner = canvas.getByRole('status');
    await waitFor(() => expect(spinner).toBeVisible());
    // aria-busy should be set
    await expect(el).toHaveAttribute('aria-busy', 'true');
  },
};

// ------------------------------------------------------------------
// New: closable
// ------------------------------------------------------------------

export const Closable: Story = {
  args: {
    title: 'Heads up',
    message: 'You can dismiss this notification.',
    variant: 'warning',
    closable: true,
    duration: 0,
  },
  render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    // Close button should be present
    const closeBtn = canvas.getByRole('button', { name: /close|dismiss/i });
    await waitFor(() => expect(closeBtn).toBeVisible());
  },
};

// ------------------------------------------------------------------
// New: position variants (renders inline, not fixed, via render helper)
// ------------------------------------------------------------------

export const PositionBottomLeft: Story = {
  args: {
    message: 'Positioned bottom-left.',
    variant: 'success',
    position: 'bottom-left',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px' }}>
      <Toast {...args} style={{ position: 'absolute', bottom: 0, left: 0 }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(el).toHaveAttribute('data-position', 'bottom-left');
  },
};

export const PositionTopCenter: Story = {
  args: {
    message: 'Positioned top-center.',
    variant: 'info',
    position: 'top-center',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px' }}>
      <Toast {...args} style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(el).toHaveAttribute('data-position', 'top-center');
  },
};
