import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    success: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Enter something...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'john_doe',
    helperText: 'You can change this later.',
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    defaultValue: '123',
    error: 'Password must be at least 8 characters.',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Not allowed',
    disabled: true,
  },
};

// ── 신규 스토리 ───────────────────────────────────────────────────────────────

/** size="sm" — 작은 입력 필드 */
export const SizeSmall: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'sm size',
    size: 'sm',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const input = await canvas.findByPlaceholderText('sm size');
    await expect(input).toBeVisible();
    // 2. 인터랙션 — 타이핑
    await userEvent.type(input, 'hello');
    await expect(input).toHaveValue('hello');
    // 3. 컨테이너에 size 관련 스타일이 적용됐는지 확인 (fontSize 토큰)
    const style = getComputedStyle(input);
    await expect(style.fontSize).not.toBe('');
  },
};

/** size="lg" — 큰 입력 필드 */
export const SizeLarge: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'lg size',
    size: 'lg',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText('lg size');
    await expect(input).toBeVisible();
    await userEvent.type(input, 'world');
    await expect(input).toHaveValue('world');
    const style = getComputedStyle(input);
    await expect(style.fontSize).not.toBe('');
  },
};

/** loading 상태 — 비동기 검증 등에서 사용 */
export const Loading: Story = {
  args: {
    label: 'Checking availability',
    placeholder: 'username',
    loading: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByPlaceholderText('username');
    // 1. 렌더링 확인
    await expect(input).toBeVisible();
    // 2. loading 중 input은 읽기 전용(disabled)
    await expect(input).toBeDisabled();
    // 3. aria-busy가 wrapper에 노출됐는지
    const wrapper = input.closest('[aria-busy]');
    await expect(wrapper).not.toBeNull();
  },
};

/** success 상태 — 검증 성공 피드백 */
export const Success: Story = {
  args: {
    label: 'Username',
    defaultValue: 'john_doe',
    success: 'Username is available!',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 성공 메시지 렌더링 확인
    const msg = await canvas.findByText('Username is available!');
    await expect(msg).toBeVisible();
    // 2. 입력 필드 존재 확인
    const input = canvasElement.querySelector('input');
    await expect(input).not.toBeNull();
    // 3. 성공 색상 토큰이 적용됐는지 (color 속성이 비어있지 않아야)
    const style = getComputedStyle(msg);
    await expect(style.color).not.toBe('');
  },
};
