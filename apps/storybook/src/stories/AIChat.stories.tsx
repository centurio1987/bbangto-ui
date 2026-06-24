import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AIChat } from '@centurio1987/core';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';
import type { AIChatMessage } from '@centurio1987/core';

const sampleMessages: AIChatMessage[] = [
  { id: '1', role: 'system', content: 'Conversation started' },
  { id: '2', role: 'assistant', content: 'Hello! How can I help you today?', timestamp: '10:00 AM' },
  { id: '3', role: 'user', content: 'Tell me about design tokens.', timestamp: '10:01 AM' },
  {
    id: '4',
    role: 'assistant',
    content:
      'Design tokens are named entities that store visual design attributes — colors, spacing, typography — acting as the single source of truth for your design system.',
    timestamp: '10:02 AM',
  },
];

const meta = {
  title: 'Patterns/AIChat',
  component: AIChat,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    loading: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
} satisfies Meta<typeof AIChat>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default (interactive) ──────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    messages: sampleMessages,
    onSend: fn(),
    loading: false,
    placeholder: 'Type a message…',
    style: { height: 480 },
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { onSend: ReturnType<typeof fn> } }) => {
    const canvas = within(canvasElement);

    // 1. Render check — message list is present
    const log = await canvas.findByRole('log', { name: /Message list/ });
    await expect(log).toBeVisible();

    // 2. Composer textarea is present
    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await expect(textarea).toBeVisible();

    // 3. Type a message and click Send — onSend called with input text, input cleared
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Hello AI!');
    await expect(textarea).toHaveValue('Hello AI!');

    const sendButton = canvas.getByRole('button', { name: /Send message/ });
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(args.onSend).toHaveBeenCalledWith('Hello AI!');
    });
    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  },
};

// ── Send via Enter key ─────────────────────────────────────────────────────────

export const SendViaEnter: Story = {
  args: {
    messages: sampleMessages,
    onSend: fn(),
    loading: false,
    placeholder: 'Press Enter to send, Shift+Enter for new line',
    style: { height: 480 },
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { onSend: ReturnType<typeof fn> } }) => {
    const canvas = within(canvasElement);

    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Sent via Enter');

    // Shift+Enter should insert newline, NOT submit
    await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
    // Still has content (not cleared)
    await expect(textarea).toHaveValue('Sent via Enter\n');

    // Plain Enter should submit
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(args.onSend).toHaveBeenCalledWith('Sent via Enter');
    });
    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  },
};

// ── Loading state ──────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    messages: sampleMessages,
    onSend: fn(),
    loading: true,
    style: { height: 480 },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Typing indicator is announced
    const status = await canvas.findByRole('status', { name: /typing/ });
    await expect(status).toBeVisible();

    // Textarea is disabled when loading
    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await expect(textarea).toBeDisabled();

    // Send button is disabled when loading
    const sendButton = canvas.getByRole('button', { name: /Send message/ });
    await expect(sendButton).toBeDisabled();
  },
};

// ── Empty state ────────────────────────────────────────────────────────────────

export const Empty: Story = {
  args: {
    messages: [],
    onSend: fn(),
    loading: false,
    emptyState: <span>Start the conversation by typing below!</span>,
    style: { height: 480 },
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Custom empty state is rendered
    const emptyText = await canvas.findByText('Start the conversation by typing below!');
    await expect(emptyText).toBeVisible();

    // Message list (role="log") is not shown when empty
    const log = canvasElement.querySelector('[role="log"]');
    await expect(log).toBeNull();

    // Composer is still usable
    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await expect(textarea).toBeVisible();
    await expect(textarea).not.toBeDisabled();
  },
};
