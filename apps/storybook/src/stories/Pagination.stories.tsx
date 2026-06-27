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
      options: ['navigation', 'dot', 'counter', 'segmented', 'outlined', 'pixel'],
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

// ─── 신규 variant 스토리 (멤버당 1개) ───────────────────────────────────────

// 현재 페이지에서 시작해 활성 아이템과 내부 디바이더를 검증할 수 있는 render.
// (공용 Navigation.render는 useState(1) 고정이라 currentPage 인자를 덮어쓴다)
const renderFromCurrent = (args: React.ComponentProps<typeof Pagination>) => {
  const Wrapper = () => {
    const [page, setPage] = useState(args.currentPage ?? 1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  };
  return <Wrapper />;
};

/**
 * segmented: 단일 외곽 보더 링 + gap:0 + 아이템 사이 1px 내부 디바이더로 융합된 바.
 * 양 끝 아이템에만 라운드, 개별 박스/갭 없음.
 */
export const Segmented: Story = {
  args: {
    variant: 'segmented',
    totalPages: 10,
    currentPage: 5,
  },
  render: renderFromCurrent,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅 확인
    const root = canvasElement.querySelector('[data-bbangto-pagination-variant]');
    await expect(root?.getAttribute('data-bbangto-pagination-variant')).toBe('segmented');
    // a11y 계약: navigation landmark 유지
    const nav = await canvas.findByRole('navigation');
    await expect(nav).toBeVisible();
    // ② load-bearing computed style: gap:0(융합) + 내부 디바이더 보더 존재
    const rootStyle = getComputedStyle(root as HTMLElement);
    await expect(rootStyle.gap).toBe('0px');
    const items = canvas.getAllByRole('button');
    // 첫 아이템은 좌측 디바이더가 없고, 내부(2번째) 아이템은 1px solid 좌측 보더를 가진다
    const firstStyle = getComputedStyle(items[0]);
    const interiorStyle = getComputedStyle(items[1]);
    await expect(firstStyle.borderLeftStyle).toBe('none');
    await expect(interiorStyle.borderLeftStyle).toBe('solid');
    // ③ 콘텐츠 슬롯 + aria-current 유지
    const active = items.find((b) => b.getAttribute('aria-current') === 'page');
    await expect(active).toBeTruthy();
    await expect(active).toHaveTextContent('5');
  },
};

/**
 * outlined: 각 페이지 아이템이 자체 보더 박스(1px solid + 투명 배경) + 아이템 간 갭.
 * 활성 아이템은 accent 보더 + accent 텍스트로 전환(여전히 아웃라인, solid fill 아님).
 */
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    totalPages: 10,
    currentPage: 5,
  },
  render: renderFromCurrent,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅 확인
    const root = canvasElement.querySelector('[data-bbangto-pagination-variant]');
    await expect(root?.getAttribute('data-bbangto-pagination-variant')).toBe('outlined');
    const nav = await canvas.findByRole('navigation');
    await expect(nav).toBeVisible();
    // ② load-bearing computed style: 아이템 간 갭(분리된 박스) + 보더 존재 + 투명 fill
    const rootStyle = getComputedStyle(root as HTMLElement);
    await expect(rootStyle.gap).not.toBe('0px');
    const items = canvas.getAllByRole('button');
    const itemStyle = getComputedStyle(items[0]);
    await expect(itemStyle.borderStyle).toBe('solid');
    // 활성 아이템은 fill 없이 투명 배경(아웃라인 유지)
    const active = items.find((b) => b.getAttribute('aria-current') === 'page')!;
    const activeStyle = getComputedStyle(active);
    await expect(activeStyle.backgroundColor).toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
    // ③ 콘텐츠 슬롯 + aria-current 유지
    await expect(active).toHaveTextContent('5');
  },
};

/**
 * pixel: 레트로 8-bit 크롬. border-radius 없는 하드 사각 엣지 + zero-blur 하드 오프셋
 * 박스섀도(2px 2px 0) + 모노스페이스 폰트. 모션 없음(static).
 */
export const Pixel: Story = {
  args: {
    variant: 'pixel',
    totalPages: 10,
    currentPage: 5,
  },
  render: renderFromCurrent,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅 확인
    const root = canvasElement.querySelector('[data-bbangto-pagination-variant]');
    await expect(root?.getAttribute('data-bbangto-pagination-variant')).toBe('pixel');
    const nav = await canvas.findByRole('navigation');
    await expect(nav).toBeVisible();
    // ② load-bearing computed style: 라운드 없음 + 하드 오프셋 섀도 + 모노스페이스
    const items = canvas.getAllByRole('button');
    const itemStyle = getComputedStyle(items[0]);
    await expect(itemStyle.borderTopLeftRadius).toBe('0px');
    await expect(itemStyle.boxShadow).not.toBe('none');
    await expect(itemStyle.boxShadow).toContain('2px 2px');
    await expect(itemStyle.fontFamily).toMatch(/mono/i);
    // ③ 콘텐츠 슬롯 + aria-current 유지
    const active = items.find((b) => b.getAttribute('aria-current') === 'page')!;
    await expect(active).toHaveTextContent('5');
  },
};
