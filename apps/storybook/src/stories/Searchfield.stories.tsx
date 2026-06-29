import type { Meta, StoryObj } from '@storybook/react';
import { Searchfield } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/Searchfield',
  component: Searchfield,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    error: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
} satisfies Meta<typeof Searchfield>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ─────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Search for anything...',
  },
};

// ── 신규 스토리 ────────────────────────────────────────────────────────────

export const SizeSm: Story = {
  name: 'Size / Small',
  args: {
    size: 'sm',
    placeholder: 'Search...',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const input = await canvas.findByRole('searchbox');
    await expect(input).toBeVisible();
    // 2. 컨테이너에 data-size 속성이 sm 임을 검증
    const container = input.closest('[data-bbangto-size]');
    await expect(container).not.toBeNull();
    await expect(container?.getAttribute('data-bbangto-size')).toBe('sm');
    // 3. 토큰 기반 높이가 하드코딩이 아님을 확인 (style 속성에 var(-- 포함)
    const containerStyle = (container as HTMLElement | null)?.getAttribute('style') ?? '';
    await expect(containerStyle).toContain('var(--bbangto-');
  },
};

export const SizeLg: Story = {
  name: 'Size / Large',
  args: {
    size: 'lg',
    placeholder: 'Search...',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('searchbox');
    await expect(input).toBeVisible();
    const container = input.closest('[data-bbangto-size]');
    await expect(container?.getAttribute('data-bbangto-size')).toBe('lg');
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    placeholder: 'Searching...',
    defaultValue: 'react hooks',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. input 렌더 확인
    const input = await canvas.findByRole('searchbox');
    await expect(input).toBeVisible();
    // 2. loading 상태일 때 스피너(status role)가 보여야 한다
    const spinner = canvas.getByRole('status');
    await expect(spinner).toBeInTheDocument();
    // 3. loading 상태에서 input 은 disabled
    await expect(input).toBeDisabled();
  },
};

export const Error: Story = {
  args: {
    error: true,
    placeholder: 'Search...',
    defaultValue: 'bad query',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('searchbox');
    await expect(input).toBeVisible();
    // error 상태일 때 컨테이너에 data-bbangto-error 속성이 있어야 한다
    const container = input.closest('[data-bbangto-error]');
    await expect(container).not.toBeNull();
    await expect(container?.getAttribute('data-bbangto-error')).toBe('true');
    // error 상태에서 border 색이 토큰 기반임을 확인 (style에 var(-- 포함)
    const containerStyle = (container as HTMLElement | null)?.getAttribute('style') ?? '';
    await expect(containerStyle).toContain('var(--bbangto-');
  },
};

export const Clearable: Story = {
  args: {
    clearable: true,
    defaultValue: 'clear me',
    placeholder: 'Search...',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('searchbox');
    await expect(input).toBeVisible();
    // 값이 있을 때 clear 버튼이 보여야 한다
    const clearBtn = canvas.getByRole('button', { name: /clear/i });
    await expect(clearBtn).toBeVisible();
    // clear 버튼 클릭 후 input 값이 비워져야 한다
    await userEvent.click(clearBtn);
    await expect(input).toHaveValue('');
    // 값이 없으면 clear 버튼이 사라져야 한다
    await expect(canvas.queryByRole('button', { name: /clear/i })).toBeNull();
  },
};

export const ClearableEmpty: Story = {
  name: 'Clearable / Empty (no button)',
  args: {
    clearable: true,
    placeholder: 'Type to search...',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const input = await canvas.findByRole('searchbox');
    await expect(input).toBeVisible();
    // 빈 상태에서 clear 버튼이 없어야 한다
    await expect(canvas.queryByRole('button', { name: /clear/i })).toBeNull();
    // 타이핑 후 clear 버튼이 나타나야 한다
    await userEvent.type(input, 'hello');
    const clearBtn = await canvas.findByRole('button', { name: /clear/i });
    await expect(clearBtn).toBeVisible();
  },
};
