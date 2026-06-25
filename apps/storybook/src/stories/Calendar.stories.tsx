import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from '@centurio1987/core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

const meta = {
  title: 'Molecules/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ─────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    defaultValue: new Date(2025, 0, 15),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인 — 헤더 월 라벨
    const headerLabel = await canvas.findByText(/January 2025/i);
    await expect(headerLabel).toBeVisible();

    // 2. "다음 달" 버튼 클릭 → 헤더가 February 2025 로 바뀌는지 검증
    const nextBtn = await canvas.findByRole('button', { name: '다음 달' });
    await userEvent.click(nextBtn);
    await waitFor(async () => {
      const updatedLabel = canvas.getByText(/February 2025/i);
      await expect(updatedLabel).toBeVisible();
    });
  },
};

// ── SelectDate ───────────────────────────────────────────────────────────────

export const SelectDate: Story = {
  name: 'Select a date',
  args: {
    defaultValue: new Date(2025, 0, 1),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 날짜 그리드가 렌더됐는지 확인
    const grid = await canvas.findByRole('grid');
    await expect(grid).toBeVisible();

    // day=15 버튼 클릭
    const dayCells = canvasElement.querySelectorAll('[role="gridcell"] button');
    const day15Btn = Array.from(dayCells).find(
      (btn) => btn.textContent?.trim() === '15'
    ) as HTMLButtonElement | undefined;
    await expect(day15Btn).toBeTruthy();

    await userEvent.click(day15Btn!);

    // 클릭 후 aria-selected="true"가 해당 버튼에 적용됐는지 검증
    await waitFor(() => {
      expect(day15Btn!.getAttribute('aria-selected')).toBe('true');
    });
  },
};

// ── WithValue (controlled) ───────────────────────────────────────────────────

export const WithValue: Story = {
  name: 'Controlled value',
  args: {
    value: new Date(2025, 2, 10),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 헤더에 March 2025가 보이는지 확인
    const headerLabel = await canvas.findByText(/March 2025/i);
    await expect(headerLabel).toBeVisible();

    // day=10이 aria-selected="true"인지 확인
    const dayCells = canvasElement.querySelectorAll('[role="gridcell"] button');
    const day10Btn = Array.from(dayCells).find(
      (btn) => btn.textContent?.trim() === '10'
    ) as HTMLButtonElement | undefined;
    await expect(day10Btn).toBeTruthy();
    await expect(day10Btn!.getAttribute('aria-selected')).toBe('true');
  },
};

// ── WithMinMax ────────────────────────────────────────────────────────────────

export const WithMinMax: Story = {
  name: 'Min / max range',
  args: {
    defaultValue: new Date(2025, 0, 15),
    min: new Date(2025, 0, 10),
    max: new Date(2025, 0, 20),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 범위 밖 날짜(day=5)는 disabled 상태여야 함
    const dayCells = canvasElement.querySelectorAll('[role="gridcell"] button');
    const day5Btn = Array.from(dayCells).find(
      (btn) => btn.textContent?.trim() === '5'
    ) as HTMLButtonElement | undefined;
    await expect(day5Btn).toBeTruthy();
    await expect(day5Btn!).toBeDisabled();

    // 범위 안 날짜(day=15)는 활성
    const day15Btn = Array.from(dayCells).find(
      (btn) => btn.textContent?.trim() === '15'
    ) as HTMLButtonElement | undefined;
    await expect(day15Btn).toBeTruthy();
    await expect(day15Btn!).not.toBeDisabled();
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    defaultValue: new Date(2025, 0, 15),
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 헤더 렌더링 확인
    const headerLabel = await canvas.findByText(/January 2025/i);
    await expect(headerLabel).toBeVisible();

    // 다음 달 버튼은 disabled 상태
    const nextBtn = canvas.getByRole('button', { name: '다음 달' });
    await expect(nextBtn).toBeDisabled();

    // 날짜 버튼들도 모두 disabled
    const dayCells = canvasElement.querySelectorAll('[role="gridcell"] button');
    await expect(dayCells.length).toBeGreaterThan(0);
    const allDisabled = Array.from(dayCells).every((btn) => (btn as HTMLButtonElement).disabled);
    await expect(allDisabled).toBe(true);
  },
};

// ── LayoutCompact ─────────────────────────────────────────────────────────────

export const LayoutCompact: Story = {
  name: 'Layout: compact',
  args: {
    defaultValue: new Date(2025, 0, 15),
    layout: 'compact',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 검증 — root에 layout=compact
    const root = canvasElement.querySelector('[data-bbangto-calendar-layout]') as HTMLElement;
    await expect(root).toBeTruthy();
    await expect(root.getAttribute('data-bbangto-calendar-layout')).toBe('compact');

    // 3. 콘텐츠 렌더 확인 — 헤더 + 그리드
    const headerLabel = await canvas.findByText(/January 2025/i);
    await expect(headerLabel).toBeVisible();
    const grid = await canvas.findByRole('grid');
    await expect(grid).toBeVisible();

    // 2. load-bearing: compact day-cell fontSize는 month 레이아웃(16px body)보다 작아야 함
    const dayCells = canvasElement.querySelectorAll('[role="gridcell"] button');
    const day15Btn = Array.from(dayCells).find(
      (btn) => btn.textContent?.trim() === '15'
    ) as HTMLButtonElement | undefined;
    await expect(day15Btn).toBeTruthy();
    const compactFontPx = parseFloat(getComputedStyle(day15Btn!).fontSize);
    await expect(compactFontPx).toBeGreaterThan(0);
    await expect(compactFontPx).toBeLessThan(16);

    // 클릭하면 여전히 선택이 동작 (SelectDate 패턴)
    await userEvent.click(day15Btn!);
    await waitFor(() => {
      expect(day15Btn!.getAttribute('aria-selected')).toBe('true');
    });
  },
};

// ── LayoutDual ────────────────────────────────────────────────────────────────

export const LayoutDual: Story = {
  name: 'Layout: dual',
  args: {
    defaultValue: new Date(2025, 0, 15),
    layout: 'dual',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 검증
    const root = canvasElement.querySelector('[data-bbangto-calendar-layout]') as HTMLElement;
    await expect(root).toBeTruthy();
    await expect(root.getAttribute('data-bbangto-calendar-layout')).toBe('dual');

    // 2. load-bearing: 두 개의 month grid 컨테이너가 존재 (current + next month)
    const grids = canvasElement.querySelectorAll('[role="grid"]');
    await expect(grids.length).toBe(2);
    await expect(canvas.getByRole('grid', { name: /January 2025/i })).toBeVisible();
    await expect(canvas.getByRole('grid', { name: /February 2025/i })).toBeVisible();

    // 3. 콘텐츠 렌더 확인 — 헤더
    const headerLabel = await canvas.findByText(/January 2025/i);
    await expect(headerLabel).toBeVisible();

    // 두 번째(다음 달) 그리드의 날짜를 클릭해도 동일 핸들러로 선택됨
    const febGrid = canvas.getByRole('grid', { name: /February 2025/i });
    const febButtons = febGrid.querySelectorAll('[role="gridcell"] button');
    const feb20Btn = Array.from(febButtons).find(
      (btn) => btn.textContent?.trim() === '20'
    ) as HTMLButtonElement | undefined;
    await expect(feb20Btn).toBeTruthy();
    await userEvent.click(feb20Btn!);
    await waitFor(() => {
      expect(feb20Btn!.getAttribute('aria-selected')).toBe('true');
    });
  },
};

// ── LayoutWeek ────────────────────────────────────────────────────────────────

export const LayoutWeek: Story = {
  name: 'Layout: week',
  args: {
    defaultValue: new Date(2025, 0, 15),
    layout: 'week',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 검증
    const root = canvasElement.querySelector('[data-bbangto-calendar-layout]') as HTMLElement;
    await expect(root).toBeTruthy();
    await expect(root.getAttribute('data-bbangto-calendar-layout')).toBe('week');

    // 3. 콘텐츠 렌더 확인 — 그리드
    const grid = await canvas.findByRole('grid');
    await expect(grid).toBeVisible();

    // 2. load-bearing: 선택일(15일)이 속한 한 주 = 정확히 7개의 day 버튼만 렌더
    const dayCells = canvasElement.querySelectorAll('[role="gridcell"] button');
    await expect(dayCells.length).toBe(7);

    // 클릭하면 여전히 선택 동작
    const day15Btn = Array.from(dayCells).find(
      (btn) => btn.textContent?.trim() === '15'
    ) as HTMLButtonElement | undefined;
    await expect(day15Btn).toBeTruthy();
    await userEvent.click(day15Btn!);
    await waitFor(() => {
      expect(day15Btn!.getAttribute('aria-selected')).toBe('true');
    });
  },
};

// ── NavigateMonths ────────────────────────────────────────────────────────────

export const NavigateMonths: Story = {
  name: 'Navigate months',
  args: {
    defaultValue: new Date(2025, 5, 1),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 초기 월 확인
    const initialLabel = await canvas.findByText(/June 2025/i);
    await expect(initialLabel).toBeVisible();

    // 이전 달 이동
    const prevBtn = canvas.getByRole('button', { name: '이전 달' });
    await userEvent.click(prevBtn);
    await waitFor(() => {
      expect(canvas.getByText(/May 2025/i)).toBeVisible();
    });

    // 다시 다음 달 이동
    const nextBtn = canvas.getByRole('button', { name: '다음 달' });
    await userEvent.click(nextBtn);
    await waitFor(() => {
      expect(canvas.getByText(/June 2025/i)).toBeVisible();
    });
  },
};
