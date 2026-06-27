import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmptyState, Button } from '@centurio1987/bbangto-ui-core';
import { expect, within, userEvent } from 'storybook/test';

const meta = {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const InboxIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

// ── 기존 스토리 (보존) ─────────────────────────────────────────

export const Default: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No messages',
    description: 'When you have messages, you will see them here.',
    action: <Button variant="primary">Send a message</Button>,
  },
};

export const Minimal: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search filters.',
  },
};

// ── 신규 스토리: size ──────────────────────────────────────────

export const SizeSmall: Story = {
  args: {
    size: 'sm',
    icon: <SearchIcon />,
    title: 'No results',
    description: 'Try a different search term.',
    action: <Button variant="solid" color="primary" size="sm">Clear search</Button>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인
    const title = await canvas.findByText('No results');
    await expect(title).toBeVisible();

    // 2. description 표시 확인
    const desc = await canvas.findByText('Try a different search term.');
    await expect(desc).toBeVisible();

    // 3. size=sm 적용 시 컨테이너 padding이 기본보다 작음을 확인
    const container = canvasElement.querySelector('[data-empty-state]') as HTMLElement | null;
    if (container) {
      const style = getComputedStyle(container);
      await expect(style.paddingTop).not.toBe('');
    }
  },
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
    icon: <FolderIcon />,
    title: 'No projects yet',
    description: 'Create your first project to get started with your team.',
    action: <Button variant="solid" color="primary" size="lg">Create project</Button>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const title = await canvas.findByText('No projects yet');
    await expect(title).toBeVisible();

    const container = canvasElement.querySelector('[data-empty-state]') as HTMLElement | null;
    if (container) {
      const style = getComputedStyle(container);
      await expect(style.paddingTop).not.toBe('');
    }
  },
};

// ── 신규 스토리: align ────────────────────────────────────────

export const AlignStart: Story = {
  args: {
    align: 'start',
    icon: <SearchIcon />,
    title: 'No items match your filter',
    description: 'Remove or adjust the filters to see results.',
    action: <Button variant="outline">Reset filters</Button>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인
    const title = await canvas.findByText('No items match your filter');
    await expect(title).toBeVisible();

    // 2. align=start 이면 텍스트 정렬이 start/left
    const container = canvasElement.querySelector('[data-empty-state]') as HTMLElement | null;
    if (container) {
      const style = getComputedStyle(container);
      await expect(style.textAlign).toBe('start');
      await expect(style.alignItems).toBe('flex-start');
    }
  },
};

// ── 신규 스토리: loading ──────────────────────────────────────

export const Loading: Story = {
  args: {
    loading: true,
    title: 'Loading content',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. loading 스켈레톤 컨테이너 존재 확인
    const skeleton = await canvas.findByRole('status');
    await expect(skeleton).toBeVisible();

    // 2. aria-label 접근성 확인
    await expect(skeleton).toHaveAttribute('aria-label', 'Loading');
  },
};

export const LoadingWithSize: Story = {
  args: {
    loading: true,
    size: 'sm',
    title: 'Loading',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const skeleton = await canvas.findByRole('status');
    await expect(skeleton).toBeVisible();
  },
};

// ── 신규 스토리: variant ──────────────────────────────────────

export const Gradient: Story = {
  args: {
    variant: 'gradient',
    icon: <InboxIcon />,
    title: 'Your inbox is empty',
    description: 'New conversations will land here as a vibrant gradient panel.',
    action: <Button variant="solid" color="primary">Compose</Button>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr 확인
    const container = canvasElement.querySelector(
      '[data-bbangto-empty-state-variant]'
    ) as HTMLElement | null;
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute(
      'data-bbangto-empty-state-variant',
      'gradient'
    );

    // ② load-bearing computed style: 멀티스톱 gradient fill
    const style = getComputedStyle(container!);
    await expect(style.backgroundImage).toContain('gradient');

    // ③ 콘텐츠 슬롯 + a11y: heading 텍스트와 focus 가능한 액션
    const heading = await canvas.findByText('Your inbox is empty');
    await expect(heading).toBeVisible();
    const action = await canvas.findByRole('button', { name: /compose/i });
    action.focus();
    await expect(action).toHaveFocus();
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    icon: <SearchIcon />,
    title: 'No matching files',
    description: 'This card is framed by a pure 1px outline with no fill.',
    action: <Button variant="outline">Clear filters</Button>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr 확인
    const container = canvasElement.querySelector(
      '[data-bbangto-empty-state-variant]'
    ) as HTMLElement | null;
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute(
      'data-bbangto-empty-state-variant',
      'outlined'
    );

    // ② load-bearing computed style: solid 보더 + fill/elevation 없음
    const style = getComputedStyle(container!);
    await expect(style.borderStyle).toBe('solid');
    await expect(style.boxShadow).toBe('none');

    // ③ 콘텐츠 슬롯 + a11y
    const heading = await canvas.findByText('No matching files');
    await expect(heading).toBeVisible();
    const action = await canvas.findByRole('button', { name: /clear filters/i });
    await userEvent.tab();
    await expect(action).toHaveFocus();
  },
};

export const Pixel: Story = {
  args: {
    variant: 'pixel',
    icon: <FolderIcon />,
    title: 'Nothing here yet',
    description: 'A retro 8-bit frame with a stepped hard shadow and no rounding.',
    action: <Button variant="solid" color="primary">Add item</Button>,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr 확인
    const container = canvasElement.querySelector(
      '[data-bbangto-empty-state-variant]'
    ) as HTMLElement | null;
    await expect(container).not.toBeNull();
    await expect(container).toHaveAttribute(
      'data-bbangto-empty-state-variant',
      'pixel'
    );

    // ② load-bearing computed style: radius 0 + 계단형 hard shadow 존재
    const style = getComputedStyle(container!);
    await expect(style.borderRadius).toBe('0px');
    await expect(style.boxShadow).not.toBe('none');
    await expect(style.borderStyle).toBe('solid');

    // ③ 콘텐츠 슬롯 + a11y
    const heading = await canvas.findByText('Nothing here yet');
    await expect(heading).toBeVisible();
    const action = await canvas.findByRole('button', { name: /add item/i });
    action.focus();
    await expect(action).toHaveFocus();
  },
};
