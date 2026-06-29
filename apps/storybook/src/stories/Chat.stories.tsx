import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble, MessageList } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/Chat',
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
    variant: {
      control: 'select',
      options: ['bubble', 'flat', 'compact', 'card'],
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

// ── Variant stories ────────────────────────────────────────────────────────────

export const VariantFlat: Story = {
  args: {
    role: 'user',
    variant: 'flat',
    children: 'Flat list-style message, left-aligned for everyone.',
    timestamp: '11:00 AM',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data attribute present with the right value on the root.
    const wrapper = canvasElement.querySelector('[data-role="user"]');
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveAttribute('data-bbangto-chat-variant', 'flat');

    // 2a. Load-bearing: even a USER message is NOT right-aligned in flat mode.
    const wrapperStyle = getComputedStyle(wrapper as Element);
    await expect(wrapperStyle.flexDirection).toBe('row');
    await expect(wrapperStyle.flexDirection).not.toBe('row-reverse');

    // 2b. Load-bearing: no bubble surface fill (transparent background).
    const bubble = await canvas.findByRole('article', { name: /You:/ });
    const bubbleStyle = getComputedStyle(bubble);
    await expect(bubbleStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');

    // 3. Content + role semantics still render.
    await expect(bubble).toBeVisible();
    await expect(bubble).toHaveTextContent('Flat list-style message');
  },
};

export const VariantCompact: Story = {
  args: {
    role: 'assistant',
    variant: 'compact',
    children: 'Compact spacing message.',
    timestamp: '11:01 AM',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data attribute present with the right value on the root.
    const wrapper = canvasElement.querySelector('[data-role="assistant"]');
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveAttribute('data-bbangto-chat-variant', 'compact');

    // 2. Load-bearing: compact uses the tightened padding (spacing-4 vertical),
    //    which is strictly smaller than the default bubble's spacing-10 top padding.
    const bubble = await canvas.findByRole('article', { name: /Assistant:/ });
    const compactStyle = getComputedStyle(bubble);
    const compactTop = parseFloat(compactStyle.paddingTop);
    await expect(Number.isNaN(compactTop)).toBe(false);
    await expect(compactTop).toBeGreaterThan(0);
    await expect(compactTop).toBeLessThan(10);

    // 3. Content + role semantics still render (left-aligned assistant).
    await expect(bubble).toBeVisible();
    await expect(bubble).toHaveTextContent('Compact spacing message');
    await expect(canvasElement.querySelector('[data-role="assistant"]')).not.toBeNull();
  },
};

export const VariantCard: Story = {
  args: {
    role: 'assistant',
    variant: 'card',
    children: 'Each message sits in a bordered box card.',
    timestamp: '11:02 AM',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Data attribute present with the right value on the root.
    const wrapper = canvasElement.querySelector('[data-role="assistant"]');
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveAttribute('data-bbangto-chat-variant', 'card');

    // 2. Load-bearing: card always shows a solid box border on the message.
    const bubble = await canvas.findByRole('article', { name: /Assistant:/ });
    const bubbleStyle = getComputedStyle(bubble);
    await expect(bubbleStyle.borderTopStyle).toBe('solid');
    await expect(bubbleStyle.borderTopWidth).not.toBe('0px');

    // 3. Content + role semantics still render.
    await expect(bubble).toBeVisible();
    await expect(bubble).toHaveTextContent('bordered box card');
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
