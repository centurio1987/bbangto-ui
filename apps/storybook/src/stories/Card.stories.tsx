import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Text, Button } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    bordered: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
    },
    interactive: {
      control: 'boolean',
    },
    status: {
      control: 'select',
      options: ['none', 'error', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    elevation: 'sm',
    padding: 'md',
    bordered: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
        <Text variant="title3">Card Title</Text>
        <Text variant="body2" color="muted">
          This is a card component that wraps its children with consistent spacing, borders, and
          shadows according to the theme.
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
          <Button variant="ghost" color="neutral">
            Cancel
          </Button>
          <Button variant="solid" color="primary">
            Confirm
          </Button>
        </div>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    elevation: 'lg',
    bordered: false,
  },
};

// ── 신규 스토리 ──────────────────────────────────────────────────────────────

export const VariantOutlined: Story = {
  name: 'Variant / Outlined',
  args: {
    variant: 'outlined',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Outlined Card</Text>
        <Text variant="body2" color="muted">
          Border only, no shadow. Ideal for low-emphasis containers.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const heading = await canvas.findByText('Outlined Card');
    await expect(heading).toBeVisible();
    // 2. outlined variant — 카드 래퍼에 boxShadow 없음, border 있음
    const card = canvasElement.querySelector('[data-card-variant="outlined"]') as HTMLElement;
    await expect(card).not.toBeNull();
    const style = getComputedStyle(card);
    // outlined: shadow이 none이거나 empty
    const shadow = style.boxShadow;
    await expect(shadow === 'none' || shadow === '').toBe(true);
    // border가 설정돼 있음 (not 'none')
    await expect(style.borderStyle).not.toBe('none');
  },
};

export const VariantFilled: Story = {
  name: 'Variant / Filled',
  args: {
    variant: 'filled',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Filled Card</Text>
        <Text variant="body2" color="muted">
          Subtle background, no border or shadow. Used for inset / sunken areas.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByText('Filled Card');
    await expect(heading).toBeVisible();
    const card = canvasElement.querySelector('[data-card-variant="filled"]') as HTMLElement;
    await expect(card).not.toBeNull();
    const style = getComputedStyle(card);
    // filled: no border, no shadow
    const shadow = style.boxShadow;
    await expect(shadow === 'none' || shadow === '').toBe(true);
    await expect(style.borderStyle === 'none' || style.border === 'none').toBe(true);
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Interactive Card</Text>
        <Text variant="body2" color="muted">
          Clickable card — cursor changes to pointer and hover feedback is applied.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByText('Interactive Card');
    await expect(heading).toBeVisible();
    // interactive 카드는 role="button" 또는 tabIndex="0"을 가짐
    const card = canvasElement.querySelector('[data-card-interactive="true"]') as HTMLElement;
    await expect(card).not.toBeNull();
    await expect(card.getAttribute('role')).toBe('button');
    await expect(card.getAttribute('tabindex')).toBe('0');
    // cursor: pointer 검증
    const style = getComputedStyle(card);
    await expect(style.cursor).toBe('pointer');
    // 클릭 이벤트 — 에러 없이 완료
    await userEvent.click(card);
  },
};

export const StatusError: Story = {
  name: 'Status / Error',
  args: {
    status: 'error',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Error State</Text>
        <Text variant="body2" color="muted">
          Something went wrong. This card uses the error status token for the border accent.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByText('Error State');
    await expect(heading).toBeVisible();
    const card = canvasElement.querySelector('[data-card-status="error"]') as HTMLElement;
    await expect(card).not.toBeNull();
    // 상단 accent border가 적용돼 있음 (borderTop 색이 설정됨)
    const style = getComputedStyle(card);
    await expect(style.borderTopColor).not.toBe('');
    await expect(style.borderTopColor).not.toBe('transparent');
  },
};

export const StatusSuccess: Story = {
  name: 'Status / Success',
  args: {
    status: 'success',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Success State</Text>
        <Text variant="body2" color="muted">
          Operation completed. Top accent uses success color token.
        </Text>
      </div>
    ),
  },
};

export const StatusWarning: Story = {
  name: 'Status / Warning',
  args: {
    status: 'warning',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Warning State</Text>
        <Text variant="body2" color="muted">
          Proceed with caution. Top accent uses warning color token.
        </Text>
      </div>
    ),
  },
};
