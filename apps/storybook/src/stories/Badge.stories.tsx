import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'error', 'success', 'warning', 'neutral'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'soft', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    dot: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {
  args: {
    color: 'success',
    variant: 'solid',
    children: 'Active',
  },
};

export const Value: Story = {
  args: {
    color: 'error',
    variant: 'solid',
    children: '99+',
  },
};

export const Subtle: Story = {
  args: {
    color: 'warning',
    variant: 'subtle',
    children: 'Pending',
  },
};

export const Soft: Story = {
  args: {
    color: 'primary',
    variant: 'soft',
    children: 'Soft',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const el = await canvas.findByText('Soft');
    await expect(el).toBeVisible();
    // 2. 토큰 적용 검증 (배경/전경이 토큰으로 채워졌는지)
    const root = el.closest('[style]') as HTMLElement;
    const style = getComputedStyle(root);
    await expect(style.backgroundColor).not.toBe('');
    await expect(style.color).not.toBe('');
    await expect(style.borderRadius).not.toBe('');
  },
};

export const Outline: Story = {
  args: {
    color: 'primary',
    variant: 'outline',
    children: 'Outline',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr 훅 확인
    const root = canvasElement.querySelector(
      '[data-bbangto-badge-variant="outline"]'
    ) as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root.getAttribute('data-bbangto-badge-variant')).toBe('outline');
    // 2. load-bearing chrome: 채움 없는(transparent) 배경 + 1px solid border.
    //    solid/subtle/soft 와 달리 border-only treatment 인지 검증.
    const style = getComputedStyle(root);
    await expect(style.backgroundColor).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
    await expect(style.borderTopStyle).toBe('solid');
    await expect(parseFloat(style.borderTopWidth)).toBeGreaterThan(0);
    // 3. 콘텐츠 슬롯 렌더
    const el = await canvas.findByText('Outline');
    await expect(el).toBeVisible();
  },
};

export const Small: Story = {
  args: {
    color: 'success',
    variant: 'solid',
    size: 'sm',
    children: 'New',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const el = await canvas.findByText('New');
    await expect(el).toBeVisible();
    // 2. sm 사이즈는 md 보다 높이가 낮아야 한다
    const root = el.closest('[style]') as HTMLElement;
    const height = parseFloat(getComputedStyle(root).height);
    await expect(height).toBeLessThan(20);
  },
};

export const Dot: Story = {
  args: {
    color: 'success',
    dot: true,
    'aria-label': 'online',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. dot 모드는 aria-label 로 접근 가능한 상태 점이어야 한다
    const el = await canvas.findByLabelText('online');
    await expect(el).toBeVisible();
    // 2. 텍스트 없는 원형 점 — 너비와 높이가 같고 radius 가 채워져 있어야 한다
    const style = getComputedStyle(el);
    await expect(el.textContent).toBe('');
    await expect(style.width).toBe(style.height);
    await expect(style.borderRadius).not.toBe('');
  },
};

export const DotSmall: Story = {
  args: {
    color: 'error',
    dot: true,
    size: 'sm',
    'aria-label': 'error',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const el = await canvas.findByLabelText('error');
    await expect(el).toBeVisible();
    const style = getComputedStyle(el);
    await expect(style.width).toBe(style.height);
  },
};
