import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from '@centurio1987/core';
import { expect, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Feedback',
  component: Snackbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    severity: { control: 'select', options: ['neutral', 'info', 'success', 'error', 'warning'] },
    placement: { control: 'select', options: ['bottom-center', 'bottom-left', 'bottom-right', 'top-center'] },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Existing story (preserved, non-breaking) ───────────────────────────────

export const DefaultSnackbar: Story = {
  args: {
    message: 'Item has been deleted',
    actionText: 'Undo',
    duration: 0, // disable auto-hide for story
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
};

// ─── New: severity variants ──────────────────────────────────────────────────

export const SeveritySuccess: Story = {
  name: 'Severity / Success',
  args: {
    message: 'File saved successfully',
    severity: 'success',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. render check
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    // 2. message visible
    await expect(canvas.getByText('File saved successfully')).toBeVisible();
    // 3. severity token applied — left border or background should be set via CSS var
    const style = getComputedStyle(el);
    await expect(style.borderLeftColor).not.toBe('');
    await expect(style.borderLeftWidth).not.toBe('0px');
  },
};

export const SeverityError: Story = {
  name: 'Severity / Error',
  args: {
    message: 'Something went wrong. Please try again.',
    severity: 'error',
    actionText: 'Retry',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(canvas.getByText('Something went wrong. Please try again.')).toBeVisible();
    await expect(canvas.getByText('Retry')).toBeVisible();
  },
};

export const SeverityWarning: Story = {
  name: 'Severity / Warning',
  args: {
    message: 'Your session will expire in 5 minutes.',
    severity: 'warning',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(canvas.getByText('Your session will expire in 5 minutes.')).toBeVisible();
  },
};

export const SeverityInfo: Story = {
  name: 'Severity / Info',
  args: {
    message: 'New version available. Refresh to update.',
    severity: 'info',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(canvas.getByText('New version available. Refresh to update.')).toBeVisible();
  },
};

// ─── New: dismissible ────────────────────────────────────────────────────────

export const Dismissible: Story = {
  name: 'Dismissible (close button)',
  args: {
    message: 'This notification can be dismissed',
    dismissible: true,
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. render
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    // 2. close button present
    const closeBtn = canvas.getByRole('button', { name: /close|dismiss/i });
    await expect(closeBtn).toBeVisible();
  },
};

export const DismissibleWithSeverity: Story = {
  name: 'Dismissible + Severity',
  args: {
    message: 'Changes saved to the cloud.',
    severity: 'success',
    dismissible: true,
    actionText: 'View',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(canvas.getByText('Changes saved to the cloud.')).toBeVisible();
    await expect(canvas.getByText('View')).toBeVisible();
    const closeBtn = canvas.getByRole('button', { name: /close|dismiss/i });
    await expect(closeBtn).toBeVisible();
  },
};

// ─── New: icon slot ──────────────────────────────────────────────────────────

export const WithCustomIcon: Story = {
  name: 'With Custom Icon',
  args: {
    message: 'Link copied to clipboard',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M10.5 1.5a3 3 0 0 1 0 4.243l-1.5 1.5-.707-.707 1.5-1.5A2 2 0 1 0 7 2.293L5.5 3.793l-.707-.707 1.5-1.5A3 3 0 0 1 10.5 1.5ZM6.207 4.793l5 5-.707.707-5-5 .707-.707ZM3.793 6.207l1.5-1.5.707.707-1.5 1.5a2 2 0 1 0 2.828 2.829l1.5-1.5.707.707-1.5 1.5a3 3 0 0 1-4.242-4.243Z" />
      </svg>
    ),
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(canvas.getByText('Link copied to clipboard')).toBeVisible();
    // icon rendered as svg
    const svg = canvasElement.querySelector('svg');
    await expect(svg).not.toBeNull();
  },
};

// ─── New: placement ──────────────────────────────────────────────────────────

export const PlacementTopCenter: Story = {
  name: 'Placement / Top Center',
  args: {
    message: 'Showing from top-center',
    placement: 'top-center',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '120px' }}>
      <Snackbar {...args} style={{ position: 'absolute' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(canvas.getByText('Showing from top-center')).toBeVisible();
  },
};

export const PlacementBottomLeft: Story = {
  name: 'Placement / Bottom Left',
  args: {
    message: 'Aligned to bottom-left',
    placement: 'bottom-left',
    duration: 0,
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '120px' }}>
      <Snackbar {...args} style={{ position: 'absolute' }} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByRole('alert');
    await waitFor(() => expect(el).toBeVisible());
    await expect(canvas.getByText('Aligned to bottom-left')).toBeVisible();
  },
};
