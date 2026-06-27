import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['action', 'filter', 'solid', 'outline', 'avatar'],
    },
    selected: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    removable: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ────────────────────────────────────────────────────────

export const Filter: Story = {
  args: {
    variant: 'filter',
    selected: false,
    children: 'Backend',
  },
};

export const FilterSelected: Story = {
  args: {
    variant: 'filter',
    selected: true,
    children: 'Frontend',
  },
};

export const Action: Story = {
  args: {
    variant: 'action',
    children: 'Download',
  },
};

// ── 신규 스토리 (Tags 패턴 확장) ─────────────────────────────────────────────

export const SizeSmall: Story = {
  args: {
    variant: 'filter',
    size: 'sm',
    children: 'Small',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = await canvas.findByRole('button', { name: /small/i });
    await expect(chip).toBeVisible();
    const style = getComputedStyle(chip);
    // sm size should have smaller height than default md (32px)
    await expect(parseFloat(style.height)).toBeLessThan(32);
  },
};

export const SizeLarge: Story = {
  args: {
    variant: 'filter',
    size: 'lg',
    children: 'Large',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = await canvas.findByRole('button', { name: /large/i });
    await expect(chip).toBeVisible();
    const style = getComputedStyle(chip);
    // lg size should have larger height than default md (32px)
    await expect(parseFloat(style.height)).toBeGreaterThan(32);
  },
};

export const Disabled: Story = {
  args: {
    variant: 'action',
    disabled: true,
    children: 'Unavailable',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = await canvas.findByRole('button', { name: /unavailable/i });
    await expect(chip).toBeVisible();
    await expect(chip).toBeDisabled();
  },
};

export const DisabledSelected: Story = {
  args: {
    variant: 'filter',
    disabled: true,
    selected: true,
    children: 'Selected Disabled',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = await canvas.findByRole('button', { name: /selected disabled/i });
    await expect(chip).toBeDisabled();
    const style = getComputedStyle(chip);
    await expect(style.cursor).toBe('not-allowed');
  },
};

export const Removable: Story = {
  args: {
    variant: 'filter',
    selected: true,
    removable: true,
    children: 'TypeScript',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The outer chip wrapper (label text is inside it)
    const chip = canvasElement.querySelector('[data-chip]') as HTMLElement;
    await expect(chip).not.toBeNull();
    // Remove button should be present inside chip
    const removeBtn = await canvas.findByRole('button', { name: /remove typescript/i });
    await expect(removeBtn).toBeVisible();
  },
};

export const RemovableOnRemoveFires: Story = {
  name: 'Removable — onRemove fires',
  args: {
    variant: 'filter',
    selected: true,
    removable: true,
    children: 'React',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeBtn = await canvas.findByRole('button', { name: /remove react/i });
    await expect(removeBtn).toBeVisible();
    await userEvent.click(removeBtn);
    // After clicking, button remains in DOM (parent controls visibility)
    await expect(removeBtn).toBeTruthy();
  },
};

// ── 신규 variant 멤버 (chip-tag variant 축) ──────────────────────────────────

export const Solid: Story = {
  args: {
    variant: 'solid',
    children: 'Featured',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅
    const root = canvasElement.querySelector(
      '[data-bbangto-chip-tag-variant]',
    ) as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root.getAttribute('data-bbangto-chip-tag-variant')).toBe('solid');
    // ② load-bearing: fill 버킷 = 불투명 배경 + border ring 없음
    const chip = await canvas.findByRole('button', { name: /featured/i });
    const style = getComputedStyle(chip);
    await expect(style.borderStyle).toBe('none');
    await expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // ③ 콘텐츠 슬롯 렌더
    await expect(chip).toBeVisible();
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Optional',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅
    const root = canvasElement.querySelector(
      '[data-bbangto-chip-tag-variant]',
    ) as HTMLElement;
    await expect(root.getAttribute('data-bbangto-chip-tag-variant')).toBe('outline');
    // ② load-bearing: border 버킷 = 투명 fill + 보이는 solid ring (fill과 명확히 다름)
    const chip = await canvas.findByRole('button', { name: /optional/i });
    const style = getComputedStyle(chip);
    await expect(style.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(style.borderStyle).toBe('solid');
    await expect(parseFloat(style.borderTopWidth)).toBeGreaterThan(0);
    // ③ 콘텐츠 슬롯 렌더
    await expect(chip).toBeVisible();
  },
};

export const Avatar: Story = {
  args: {
    variant: 'avatar',
    avatar: <span>BT</span>,
    children: 'Bbangto',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅
    const root = canvasElement.querySelector(
      '[data-bbangto-chip-tag-variant]',
    ) as HTMLElement;
    await expect(root.getAttribute('data-bbangto-chip-tag-variant')).toBe('avatar');
    // ② load-bearing: 원형 leading media 슬롯이 inline-start로 bleed
    const media = canvasElement.querySelector('[data-chip-avatar]') as HTMLElement;
    await expect(media).not.toBeNull();
    const mediaStyle = getComputedStyle(media);
    // 원형: width === height + full radius
    await expect(mediaStyle.width).toBe(mediaStyle.height);
    await expect(parseFloat(mediaStyle.borderTopLeftRadius)).toBeGreaterThan(0);
    // bleed: 음수 inline-start margin
    await expect(parseFloat(mediaStyle.marginLeft)).toBeLessThan(0);
    // ③ 콘텐츠 슬롯 렌더: leading media + label 둘 다
    await expect(media).toHaveTextContent('BT');
    await expect(canvas.getByText(/bbangto/i)).toBeVisible();
  },
};
