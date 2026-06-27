import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AIChat } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';
import type { AIChatMessage } from '@centurio1987/bbangto-ui-core';

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
    layout: {
      control: 'inline-radio',
      options: ['default', 'centered', 'sidebar', 'fullscreen', 'frosted'],
    },
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

// ── Layout: centered ───────────────────────────────────────────────────────────

export const LayoutCentered: Story = {
  args: {
    messages: [],
    onSend: fn(),
    loading: false,
    layout: 'centered',
    emptyState: <span>Ask me anything to get started.</span>,
    placeholder: 'Type a message…',
    style: { height: 480 },
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { onSend: ReturnType<typeof fn> } }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const root = canvasElement.querySelector('[data-bbangto-aichat-layout]') as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root.getAttribute('data-bbangto-aichat-layout')).toBe('centered');

    // 2. Load-bearing: constrained max-width + centered horizontal margins
    const cs = getComputedStyle(root);
    await expect(cs.maxWidth).toBe('560px');
    await expect(cs.marginLeft).toBe(cs.marginRight);
    await expect(cs.flexDirection).toBe('column');

    // 3. Composer input present + Enter-to-send still works
    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await expect(textarea).toBeVisible();
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Centered hello');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(args.onSend).toHaveBeenCalledWith('Centered hello');
    });
    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  },
};

// ── Layout: sidebar ────────────────────────────────────────────────────────────

export const LayoutSidebar: Story = {
  args: {
    messages: sampleMessages,
    onSend: fn(),
    loading: false,
    layout: 'sidebar',
    placeholder: 'Type a message…',
    style: { height: 480 },
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { onSend: ReturnType<typeof fn> } }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const root = canvasElement.querySelector('[data-bbangto-aichat-layout]') as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root.getAttribute('data-bbangto-aichat-layout')).toBe('sidebar');

    // 2. Load-bearing: narrower fixed width + vertical column
    const cs = getComputedStyle(root);
    await expect(cs.width).toBe('360px');
    await expect(cs.flexDirection).toBe('column');

    // 3. Composer input present + Enter-to-send still works
    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await expect(textarea).toBeVisible();
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Sidebar hello');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(args.onSend).toHaveBeenCalledWith('Sidebar hello');
    });
    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  },
};

// ── Layout: fullscreen ─────────────────────────────────────────────────────────

export const LayoutFullscreen: Story = {
  args: {
    messages: sampleMessages,
    onSend: fn(),
    loading: false,
    layout: 'fullscreen',
    placeholder: 'Type a message…',
  },
  parameters: {
    layout: 'fullscreen',
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { onSend: ReturnType<typeof fn> } }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const root = canvasElement.querySelector('[data-bbangto-aichat-layout]') as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root.getAttribute('data-bbangto-aichat-layout')).toBe('fullscreen');

    // 2. Load-bearing: height fills the viewport (100vh resolves to a tall pixel height)
    const cs = getComputedStyle(root);
    await expect(cs.flexDirection).toBe('column');
    await expect(root.offsetHeight).toBe(window.innerHeight);

    // 3. Composer input present + Enter-to-send still works
    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await expect(textarea).toBeVisible();
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Fullscreen hello');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(args.onSend).toHaveBeenCalledWith('Fullscreen hello');
    });
    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  },
};

// ── Layout: frosted ────────────────────────────────────────────────────────────

export const Frosted: Story = {
  args: {
    messages: sampleMessages,
    onSend: fn(),
    loading: false,
    layout: 'frosted',
    placeholder: 'Type a message…',
    style: { height: 480 },
  },
  play: async ({ canvasElement, args }: { canvasElement: HTMLElement; args: { onSend: ReturnType<typeof fn> } }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present + correct
    const root = canvasElement.querySelector('[data-bbangto-aichat-layout]') as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root.getAttribute('data-bbangto-aichat-layout')).toBe('frosted');

    // 2. Load-bearing chrome: composer panel becomes a glass plate —
    //    backdrop-filter blur present (default composer has 'none') and the
    //    surface fill is translucent (color-mix → alpha < 1), distinct from the
    //    opaque elevated fill of every other layout.
    const composer = canvasElement.querySelector('form') as HTMLElement;
    await expect(composer).not.toBeNull();
    const cs = getComputedStyle(composer);
    const blur = cs.backdropFilter || cs.webkitBackdropFilter || '';
    await expect(blur).toContain('blur');
    // Translucent surface: serialized backgroundColor carries an alpha channel
    // (rgba(... / a) or color(srgb ... / a)) rather than a fully opaque colour.
    await expect(cs.backgroundColor).toMatch(/rgba|\/\s*0?\.|srgb/);

    // 3. a11y contract intact — message log + composer focus/Enter-to-send.
    const log = await canvas.findByRole('log', { name: /Message list/ });
    await expect(log).toBeVisible();
    const textarea = canvas.getByRole('textbox', { name: /Message input/ });
    await expect(textarea).toBeVisible();
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'Frosted hello');
    await userEvent.keyboard('{Enter}');
    await waitFor(() => {
      expect(args.onSend).toHaveBeenCalledWith('Frosted hello');
    });
    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  },
};
