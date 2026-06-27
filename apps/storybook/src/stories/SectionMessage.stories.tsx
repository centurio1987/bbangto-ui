import type { Meta, StoryObj } from '@storybook/react';
import { SectionMessage } from '@centurio1987/core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/SectionMessage',
  component: SectionMessage,
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
      options: ['default', 'compact'],
    },
  },
} satisfies Meta<typeof SectionMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Existing stories (preserved) ──────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: 'Important update',
    message: 'We have updated our terms of service.',
    variant: 'info',
  },
};

export const Warning: Story = {
  args: {
    title: 'Almost out of space',
    message: 'You have used 90% of your storage quota.',
    variant: 'warning',
  },
};

// ── New: size=compact ──────────────────────────────────────────────────────────

export const Compact: Story = {
  args: {
    title: 'Compact alert',
    message: 'Less padding, smaller icon — ideal for dense UIs.',
    variant: 'info',
    size: 'compact',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Renders message text
    const msg = await canvas.findByText('Less padding, smaller icon — ideal for dense UIs.');
    await waitFor(() => expect(msg).toBeVisible());

    // 2. role="alert" is present
    const alert = canvasElement.querySelector('[role="alert"]');
    await expect(alert).not.toBeNull();

    // 3. Token-based background color applied (CSS var resolves to a real value)
    const style = getComputedStyle(alert as Element);
    await expect(style.backgroundColor).not.toBe('');
  },
};

// ── New: dismissible ──────────────────────────────────────────────────────────

export const Dismissible: Story = {
  args: {
    title: 'Dismissible alert',
    message: 'Click the × button to dismiss this alert.',
    variant: 'success',
    dismissible: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Dismiss button is rendered
    const dismissBtn = await canvas.findByRole('button', { name: 'Dismiss' });
    await waitFor(() => expect(dismissBtn).toBeVisible());

    // 2. Button is clickable (no throw = success; onDismiss is undefined but click still fires)
    await userEvent.click(dismissBtn);

    // 3. Title still visible (component itself doesn't unmount — caller controls that)
    const title = await canvas.findByText('Dismissible alert');
    await waitFor(() => expect(title).toBeVisible());
  },
};

// ── New: actions slot ─────────────────────────────────────────────────────────

export const WithActions: Story = {
  args: {
    title: 'Action required',
    message: 'Please review the changes before continuing.',
    variant: 'warning',
    actions: (
      <span>
        <a
          href="#learn-more"
          onClick={(e) => e.preventDefault()}
          style={{ marginRight: '12px', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Learn more
        </a>
        <a
          href="#dismiss"
          onClick={(e) => e.preventDefault()}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          Dismiss
        </a>
      </span>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Message renders
    const msg = await canvas.findByText('Please review the changes before continuing.');
    await waitFor(() => expect(msg).toBeVisible());

    // 2. Action link "Learn more" is visible
    const learnMore = await canvas.findByText('Learn more');
    await waitFor(() => expect(learnMore).toBeVisible());

    // 3. Clicking the action link does not throw
    await userEvent.click(learnMore);
  },
};

// ── New: error variant with all features ──────────────────────────────────────

export const ErrorDismissibleCompact: Story = {
  name: 'Error · Compact · Dismissible',
  args: {
    title: 'Upload failed',
    message: 'The file exceeds the 10 MB limit.',
    variant: 'error',
    size: 'compact',
    dismissible: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Renders title
    const title = await canvas.findByText('Upload failed');
    await waitFor(() => expect(title).toBeVisible());

    // 2. Dismiss button present
    const dismissBtn = await canvas.findByRole('button', { name: 'Dismiss' });
    await waitFor(() => expect(dismissBtn).toBeVisible());

    // 3. Compact: icon should be smaller (16px set via inline style)
    const icon = canvasElement.querySelector('[aria-hidden="true"]') as HTMLElement | null;
    await expect(icon).not.toBeNull();
    await expect(icon!.style.width).toBe('16px');

    // 4. Border-left is applied (token-driven)
    const alert = canvasElement.querySelector('[role="alert"]') as HTMLElement | null;
    const style = getComputedStyle(alert!);
    await expect(style.borderLeftWidth).toBe('4px');
  },
};
