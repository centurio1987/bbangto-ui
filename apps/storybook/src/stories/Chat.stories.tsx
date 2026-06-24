import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble, MessageList } from '@centurio1987/core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

const meta = {
  title: 'Molecules/Chat',
  component: ChatBubble,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'assistant', 'system'],
    },
  },
} satisfies Meta<typeof ChatBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Single bubble stories ──────────────────────────────────────────────────────

export const UserBubble: Story = {
  args: {
    role: 'user',
    children: 'Hello! Can you help me with something?',
    timestamp: '10:24 AM',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Render check — aria-label text is prefixed with "You: "
    const bubble = await canvas.findByRole('article', { name: /You:/ });
    await expect(bubble).toBeVisible();

    // 2. Alignment: user bubble wrapper should be flex row-reverse (right-aligned)
    const wrapper = canvasElement.querySelector('[data-role="user"]');
    await expect(wrapper).not.toBeNull();
    const wrapperStyle = getComputedStyle(wrapper as Element);
    await expect(wrapperStyle.flexDirection).toBe('row-reverse');

    // 3. Surface color token applied
    const style = getComputedStyle(bubble);
    await expect(style.backgroundColor).not.toBe('');
  },
};

export const AssistantBubble: Story = {
  args: {
    role: 'assistant',
    children: "Of course! I'm here to help. What do you need?",
    timestamp: '10:25 AM',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Render check — aria-label text is prefixed with "Assistant: "
    const bubble = await canvas.findByRole('article', { name: /Assistant:/ });
    await expect(bubble).toBeVisible();

    // 2. Alignment: assistant bubble wrapper should be flex row (left-aligned)
    const wrapper = canvasElement.querySelector('[data-role="assistant"]');
    await expect(wrapper).not.toBeNull();
    const wrapperStyle = getComputedStyle(wrapper as Element);
    await expect(wrapperStyle.flexDirection).toBe('row');

    // 3. Confirm user and assistant alignment differ
    await expect(wrapperStyle.flexDirection).not.toBe('row-reverse');
  },
};

export const SystemMessage: Story = {
  args: {
    role: 'system',
    children: 'Conversation started',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. System messages use role="note"
    const note = await canvas.findByRole('note');
    await expect(note).toBeVisible();
    await expect(note).toHaveAttribute('data-role', 'system');
  },
};

export const BubbleWithAvatar: Story = {
  args: {
    role: 'assistant',
    children: 'Here is the information you requested.',
    avatar: (
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: '#e0e0e0',
          fontSize: 14,
        }}
      >
        AI
      </span>
    ),
  },
};

// ── MessageList stories ────────────────────────────────────────────────────────

export const ConversationThread: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <MessageList>
        <ChatBubble role="system">Conversation started</ChatBubble>
        <ChatBubble role="assistant" timestamp="10:00 AM">
          Hi there! How can I assist you today?
        </ChatBubble>
        <ChatBubble role="user" timestamp="10:01 AM">
          I need help understanding design tokens.
        </ChatBubble>
        <ChatBubble role="assistant" timestamp="10:02 AM">
          Design tokens are named entities that store visual design attributes such as colors, typography, and spacing. They act as the single source of truth for your design system.
        </ChatBubble>
        <ChatBubble role="user" timestamp="10:03 AM">
          That makes sense. Thank you!
        </ChatBubble>
      </MessageList>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. MessageList is rendered with role="log"
    const log = await canvas.findByRole('log', { name: /Message list/ });
    await expect(log).toBeVisible();

    // 2. User bubble exists and is right-aligned (row-reverse)
    const userWrapper = canvasElement.querySelector('[data-role="user"]');
    await expect(userWrapper).not.toBeNull();
    const userStyle = getComputedStyle(userWrapper as Element);
    await expect(userStyle.flexDirection).toBe('row-reverse');

    // 3. Assistant bubble exists and is left-aligned (row)
    const assistantWrapper = canvasElement.querySelector('[data-role="assistant"]');
    await expect(assistantWrapper).not.toBeNull();
    const assistantStyle = getComputedStyle(assistantWrapper as Element);
    await expect(assistantStyle.flexDirection).toBe('row');

    // 4. User and assistant have different flex directions (different alignment)
    await expect(userStyle.flexDirection).not.toBe(assistantStyle.flexDirection);

    // 5. System note exists
    const systemWrapper = canvasElement.querySelector('[data-role="system"]');
    await expect(systemWrapper).not.toBeNull();

    // 6. Multiple bubbles rendered
    const articles = canvasElement.querySelectorAll('[role="article"]');
    await expect(articles.length).toBeGreaterThanOrEqual(2);
  },
};

export const LiveMessageList: StoryObj = {
  render: () => (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <MessageList live>
        <ChatBubble role="assistant">
          I'm ready. Feel free to ask anything.
        </ChatBubble>
        <ChatBubble role="user">
          What is the capital of France?
        </ChatBubble>
        <ChatBubble role="assistant">
          The capital of France is Paris.
        </ChatBubble>
      </MessageList>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Live region should have aria-live="polite"
    const log = await canvas.findByRole('log');
    await expect(log).toHaveAttribute('aria-live', 'polite');
  },
};
