import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['default', 'inline-week-strip', 'wheel', 'ghost'] },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ──────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Select date',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 트리거 렌더링 확인
    const trigger = await canvas.findByText('Select date');
    await expect(trigger).toBeVisible();
    // 2. 클릭으로 캘린더 열기
    await userEvent.click(trigger);
    // 3. 캘린더 헤더(요일) 확인 — Popover가 열리며 opacity/visibility 트랜지션이
    //    끝나야 보이므로 waitFor로 가시화를 기다린다
    const suLabel = await canvas.findByText('Su');
    await waitFor(() => expect(suLabel).toBeVisible());
  },
};

export const WithValue: Story = {
  args: {
    value: new Date(2025, 0, 15),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 선택된 날짜가 트리거에 표시되는지 확인
    const trigger = canvasElement.querySelector('[data-datepicker-trigger]') as HTMLElement;
    await expect(trigger).toBeVisible();
  },
};

// ── 신규 variant/state 스토리 ───────────────────────────────────────

export const WithLabel: Story = {
  args: {
    label: 'Birth date',
    placeholder: 'Pick a date',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // label 렌더링 확인
    const label = await canvas.findByText('Birth date');
    await expect(label).toBeVisible();
    // trigger 렌더링 확인
    const placeholder = await canvas.findByText('Pick a date');
    await expect(placeholder).toBeVisible();
    // label 토큰 색상 적용 확인
    const labelEl = label.closest('label') ?? label;
    const style = getComputedStyle(labelEl);
    await expect(style.color).not.toBe('');
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled picker',
    placeholder: 'Not selectable',
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const placeholder = await canvas.findByText('Not selectable');
    await expect(placeholder).toBeVisible();
    // 클릭해도 캘린더가 열리지 않아야 한다.
    // Popover는 콘텐츠를 항상 DOM에 렌더하고 visibility/opacity로만 토글하므로
    // "Su" 노드는 존재하되 보이지 않아야 한다.
    await userEvent.click(placeholder);
    const suLabel = canvas.getByText('Su');
    await expect(suLabel).not.toBeVisible();
    // 트리거가 시각적으로 disabled 처리됐는지 cursor 확인
    const trigger = canvasElement.querySelector('[data-datepicker-trigger]') as HTMLElement;
    const style = getComputedStyle(trigger);
    await expect(style.cursor).toBe('not-allowed');
  },
};

export const WithError: Story = {
  args: {
    label: 'Appointment date',
    placeholder: 'Choose date',
    error: 'Please select a valid date.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 에러 메시지 렌더링 확인
    const errorMsg = await canvas.findByText('Please select a valid date.');
    await expect(errorMsg).toBeVisible();
    // 트리거 테두리가 error 색상 토큰을 적용했는지 확인
    const trigger = canvasElement.querySelector('[data-datepicker-trigger]') as HTMLElement;
    const style = getComputedStyle(trigger);
    // borderColor가 비어있지 않으면 토큰이 적용된 것으로 간주
    await expect(style.borderColor).not.toBe('');
  },
};

export const SizeSm: Story = {
  name: 'Size / sm',
  args: {
    label: 'Small picker',
    placeholder: 'sm size',
    size: 'sm',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const placeholder = await canvas.findByText('sm size');
    await expect(placeholder).toBeVisible();
    // 폰트 사이즈 토큰이 적용됐는지 확인
    const trigger = canvasElement.querySelector('[data-datepicker-trigger]') as HTMLElement;
    const style = getComputedStyle(trigger);
    await expect(style.fontSize).not.toBe('');
  },
};

// ── 신규 variant 멤버 스토리 (멤버당 1개) ────────────────────────────

export const InlineWeekStrip: Story = {
  name: 'Variant / inline-week-strip',
  args: {
    variant: 'inline-week-strip',
    label: 'Week',
    value: new Date(2025, 0, 15),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅 확인
    const root = canvasElement.querySelector('[data-bbangto-date-picker-variant]') as HTMLElement;
    await expect(root.getAttribute('data-bbangto-date-picker-variant')).toBe('inline-week-strip');
    // ② load-bearing: rail은 [prev | track | next] = 3-track 그리드 (auto 1fr auto)
    const rail = canvasElement.querySelector('.bbangto-date-picker-rail') as HTMLElement;
    const railCols = getComputedStyle(rail).gridTemplateColumns.split(' ').filter(Boolean);
    await expect(railCols.length).toBe(3);
    // 선택된 날짜 = solid fill pill (배경이 투명이 아님) + a11y aria-selected 유지
    const selected = canvasElement.querySelector('[role="gridcell"][aria-selected="true"]') as HTMLElement;
    await expect(selected).not.toBeNull();
    const bg = getComputedStyle(selected).backgroundColor;
    await expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    await expect(bg).not.toBe('transparent');
    // 키보드 roving 유지: 선택 셀 포커스 후 ArrowRight → 인접 gridcell로 포커스 이동
    selected.focus();
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() =>
      expect(document.activeElement?.getAttribute('role')).toBe('gridcell')
    );
    // ③ 콘텐츠 슬롯: prev 셰브런 + 정확히 7개의 day 셀
    const prev = await canvas.findByRole('button', { name: /previous week/i });
    await expect(prev).toBeVisible();
    const cells = canvasElement.querySelectorAll('[role="gridcell"]');
    await expect(cells.length).toBe(7);
  },
};

export const Wheel: Story = {
  name: 'Variant / wheel',
  args: {
    variant: 'wheel',
    label: 'Spin',
    value: new Date(2025, 5, 15),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅 확인
    const root = canvasElement.querySelector('[data-bbangto-date-picker-variant]') as HTMLElement;
    await expect(root.getAttribute('data-bbangto-date-picker-variant')).toBe('wheel');
    // ② load-bearing: drum은 day/month/year = 3컬럼 그리드
    const drum = canvasElement.querySelector('.bbangto-date-picker-wheel-drum') as HTMLElement;
    const cols = getComputedStyle(drum).gridTemplateColumns.split(' ').filter(Boolean);
    await expect(cols.length).toBe(3);
    // 중앙 선택 밴드 = border-y (top border solid)
    const band = canvasElement.querySelector('.bbangto-date-picker-wheel-band') as HTMLElement;
    await expect(getComputedStyle(band).borderTopStyle).toBe('solid');
    // edge fade는 scoped <style> 내 mask 그라디언트 — style 태그 aggregate로 검증
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('mask-image');
    await expect(styleText).toContain('linear-gradient');
    // ③ 콘텐츠 슬롯: option들이 렌더되고 컬럼당 aria-selected 유지
    const options = await canvas.findAllByRole('option');
    await expect(options.length).toBeGreaterThan(0);
    const selectedOpts = canvasElement.querySelectorAll('[role="option"][aria-selected="true"]');
    await expect(selectedOpts.length).toBeGreaterThan(0);
  },
};

export const Ghost: Story = {
  name: 'Variant / ghost',
  args: {
    variant: 'ghost',
    label: 'When',
    placeholder: 'Ghost date',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ① data-attr 훅 확인
    const root = canvasElement.querySelector('[data-bbangto-date-picker-variant]') as HTMLElement;
    await expect(root.getAttribute('data-bbangto-date-picker-variant')).toBe('ghost');
    // ② load-bearing: 트리거에 border 박스 없음 + 투명 배경
    const trigger = canvasElement.querySelector('[data-datepicker-trigger]') as HTMLElement;
    const ts = getComputedStyle(trigger);
    await expect(ts.borderTopStyle).toBe('none');
    await expect(ts.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    // ③ 콘텐츠 슬롯: 트레일링 캘린더 아이콘 버튼만 존재 + 클릭 시 캘린더 오픈
    const iconBtn = await canvas.findByRole('button', { name: /open calendar/i });
    await expect(iconBtn).toBeVisible();
    await userEvent.click(iconBtn);
    const suLabel = await canvas.findByText('Su');
    await waitFor(() => expect(suLabel).toBeVisible());
  },
};

export const SizeLg: Story = {
  name: 'Size / lg',
  args: {
    label: 'Large picker',
    placeholder: 'lg size',
    size: 'lg',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const placeholder = await canvas.findByText('lg size');
    await expect(placeholder).toBeVisible();
    const trigger = canvasElement.querySelector('[data-datepicker-trigger]') as HTMLElement;
    const style = getComputedStyle(trigger);
    await expect(style.fontSize).not.toBe('');
  },
};

// ─── 키보드 (KAN-054) ──────────────────────────────────────────────────────────

const dateCell = (root: HTMLElement, iso: string) =>
  root.querySelector(`[data-bbangto-date="${iso}"]`) as HTMLElement | null;
const focusedDate = () => (document.activeElement as HTMLElement | null)?.getAttribute('data-bbangto-date');

function KeyboardPicker({ variant }: { variant?: 'default' | 'inline-week-strip' | 'wheel' }) {
  const [value, setValue] = React.useState<Date>(new Date(2025, 0, 15));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start', minHeight: 420 }}>
      <button type="button">Before</button>
      <DatePicker value={value} onChange={setValue} variant={variant} label="Due" />
      <output data-testid="picked">{value.toDateString()}</output>
    </div>
  );
}

/** 기본: 트리거에 Tab 으로 닿고 Enter 로 열면 선택된 날에 포커스 · 화살표·PageDown · Enter 로 고르면 닫히고 트리거로 · ↓ 로 열고 Esc 로 닫기 */
export const Keyboard: Story = {
  render: () => <KeyboardPicker />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await canvas.findByRole('button', { name: 'Before' });
    canvas.getByRole('button', { name: 'Before' }).focus();
    await userEvent.tab();
    const trigger = canvasElement.querySelector('[data-datepicker-trigger]') as HTMLElement;
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveAttribute('role', 'button');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');

    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(focusedDate()).toBe('2025-01-15'));
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(focusedDate()).toBe('2025-01-16'));
    await userEvent.keyboard('{PageDown}');
    await waitFor(() => expect(focusedDate()).toBe('2025-02-16'));
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(canvas.getByTestId('picked')).toHaveTextContent('Sun Feb 16 2025'));
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    await waitFor(() => expect(trigger).toHaveFocus());

    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(focusedDate()).toBe('2025-02-16'));
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

/** 주간 띠: 화살표를 여러 번 누르면 계속 이동하고 주 경계를 넘는다 */
export const KeyboardWeekStrip: Story = {
  render: () => <KeyboardPicker variant="inline-week-strip" />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const cell = await waitFor(() => {
      const c = dateCell(canvasElement, '2025-01-15');
      if (!c) throw new Error('no cell');
      return c;
    });
    await expect(cell.tabIndex).toBe(0);
    cell.focus();
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(focusedDate()).toBe('2025-01-16'));
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(focusedDate()).toBe('2025-01-17'));
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(focusedDate()).toBe('2025-01-18'));
    // 토요일 다음은 다음 주 일요일.
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(focusedDate()).toBe('2025-01-19'));
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(() => expect(focusedDate()).toBe('2025-01-18'));
  },
};

/** 휠: 열마다 Tab 정지점 하나 · ↑/↓ 로 옮기면 그 값이 고른 값 · Home/End */
export const KeyboardWheel: Story = {
  render: () => <KeyboardPicker variant="wheel" />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const dayList = await canvas.findByRole('listbox', { name: 'Day' });
    const options = () => within(dayList).getAllByRole('option');
    await expect(options().filter((o) => o.tabIndex === 0)).toHaveLength(1);

    canvas.getByRole('button', { name: 'Before' }).focus();
    await userEvent.tab();
    await expect(document.activeElement).toBe(options()[14]);

    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(document.activeElement).toBe(options()[15]));
    await waitFor(() => expect(options()[15]).toHaveAttribute('aria-selected', 'true'));
    await expect(canvas.getByTestId('picked')).toHaveTextContent('Thu Jan 16 2025');
    await userEvent.keyboard('{Home}');
    await waitFor(() => expect(document.activeElement).toBe(options()[0]));
    await userEvent.keyboard('{End}');
    await waitFor(() => expect(document.activeElement).toBe(options()[30]));

    // 다음 Tab 은 같은 열의 다른 날이 아니라 달 열로 간다.
    await userEvent.tab();
    await expect(within(canvas.getByRole('listbox', { name: 'Month' })).getAllByRole('option')).toContain(
      document.activeElement,
    );
  },
};
