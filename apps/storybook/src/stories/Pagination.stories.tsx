import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['navigation', 'dot', 'counter'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    totalPages: { control: 'number' },
    disabled: { control: 'boolean' },
    showEdges: { control: 'boolean' },
    siblings: { control: 'number' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 기존 스토리 (보존) ────────────────────────────────────────────────────

export const Navigation: Story = {
  args: {
    variant: 'navigation',
    totalPages: 10,
  },
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    totalPages: 5,
  },
  render: Navigation.render,
};

export const Counter: Story = {
  args: {
    variant: 'counter',
    totalPages: 12,
  },
  render: Navigation.render,
};

// ─── 신규 스토리 ────────────────────────────────────────────────────────────

/** size="sm": 버튼 크기가 줄어야 하며 토큰 기반 크기 적용 확인 */
export const SizeSmall: Story = {
  args: {
    variant: 'navigation',
    totalPages: 8,
    size: 'sm',
  },
  render: Navigation.render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 이전/다음 버튼이 존재하고 보이는지 확인
    const prevBtn = await canvas.findByRole('button', { name: /prev/i });
    await expect(prevBtn).toBeVisible();
    // sm 크기에서 버튼은 inline-flex 레이아웃으로 렌더된다 (인라인 스타일 검증)
    await expect(prevBtn.style.display).toBe('inline-flex');
  },
};

/** size="lg": 큰 버튼 크기 확인 */
export const SizeLarge: Story = {
  args: {
    variant: 'navigation',
    totalPages: 8,
    size: 'lg',
  },
  render: Navigation.render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const nextBtn = await canvas.findByRole('button', { name: /next/i });
    await expect(nextBtn).toBeVisible();
    await expect(nextBtn.style.display).toBe('inline-flex');
  },
};

/** disabled 전체 비활성화: 이전/다음 버튼이 모두 disabled 상태여야 함 */
export const Disabled: Story = {
  args: {
    variant: 'navigation',
    totalPages: 10,
    currentPage: 5,
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const prevBtn = await canvas.findByRole('button', { name: /prev/i });
    const nextBtn = await canvas.findByRole('button', { name: /next/i });
    await expect(prevBtn).toBeDisabled();
    await expect(nextBtn).toBeDisabled();
  },
};

/** showEdges: 첫 페이지/마지막 페이지 바로가기 버튼 노출 확인 */
export const ShowEdges: Story = {
  args: {
    variant: 'navigation',
    totalPages: 20,
    currentPage: 10,
    showEdges: true,
  },
  render: Navigation.render,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 첫 페이지 버튼(«)과 마지막 페이지 버튼(»)이 존재해야 함
    const firstBtn = await canvas.findByRole('button', { name: /first/i });
    const lastBtn = await canvas.findByRole('button', { name: /last/i });
    await expect(firstBtn).toBeVisible();
    await expect(lastBtn).toBeVisible();
    // 첫 페이지 버튼 클릭 후 페이지 1 표시 확인 — disabled 상태 확인
    await userEvent.click(firstBtn);
    await expect(firstBtn).toBeDisabled();
  },
};

/** siblings=1: 현재 페이지 좌우 1개씩만 노출 */
export const SiblingsOne: Story = {
  args: {
    variant: 'navigation',
    totalPages: 20,
    currentPage: 10,
    siblings: 1,
  },
  // 전용 render: 초기 페이지를 currentPage(=10)로 시작해야 siblings 윈도우를 검증할 수 있다
  // (공용 Navigation.render는 useState(1)로 고정되어 currentPage 인자를 덮어쓴다)
  render: (args) => {
    const [page, setPage] = useState(args.currentPage ?? 1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 9, 10, 11 이 보여야 하고 8, 12는 없어야 함 (window: 1 sibling 각 방향)
    await expect(await canvas.findByText('10')).toBeVisible();
    await expect(canvas.queryByText('8')).toBeNull();
    await expect(canvas.queryByText('12')).toBeNull();
  },
};
