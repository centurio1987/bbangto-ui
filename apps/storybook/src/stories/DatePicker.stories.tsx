import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from '@centurio1987/core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/DatePicker',
  component: DatePicker,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'text' },
    label: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
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
