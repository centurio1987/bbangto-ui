import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    resize: { control: 'select', options: ['none', 'vertical', 'horizontal', 'both'] },
    variant: { control: 'select', options: ['default', 'soft'] },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ──────────────────────────────────────────────────

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
};

export const WithLabelAndHelperText: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
    helperText: 'Max 500 characters',
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
    error: 'This field is required',
  },
};

// ── 신규 스토리 ──────────────────────────────────────────────────────────

/**
 * size="sm" — compact textarea for tight layouts
 */
export const SizeSmall: Story = {
  args: {
    label: 'Short note',
    placeholder: 'Add a quick note...',
    size: 'sm',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인
    const textarea = await canvas.findByPlaceholderText('Add a quick note...');
    await expect(textarea).toBeVisible();

    // 2. 인터랙션 — 타이핑
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'sm size input');
    await expect(textarea).toHaveValue('sm size input');

    // 3. 토큰 적용 확인 — fontSize가 비어있지 않아야 한다
    const style = getComputedStyle(textarea);
    await expect(style.fontSize).not.toBe('');
  },
};

/**
 * size="lg" — spacious textarea for long-form content
 */
export const SizeLarge: Story = {
  args: {
    label: 'Detailed description',
    placeholder: 'Describe in detail...',
    size: 'lg',
    helperText: 'Use this for longer content.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const textarea = await canvas.findByPlaceholderText('Describe in detail...');
    await expect(textarea).toBeVisible();

    // lg size는 minHeight이 크다 — 최소 높이가 설정됐는지 style 속성으로 확인
    await expect(textarea.style.minHeight).toBe('120px');

    await userEvent.click(textarea);
    await userEvent.type(textarea, 'large size');
    await expect(textarea).toHaveValue('large size');
  },
};

/**
 * resize="none" — prevents user from resizing the textarea
 */
export const ResizeNone: Story = {
  args: {
    label: 'Fixed size',
    placeholder: 'Cannot be resized...',
    resize: 'none',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const textarea = await canvas.findByPlaceholderText('Cannot be resized...');
    await expect(textarea).toBeVisible();

    // resize 속성이 style에 반영됐는지 확인
    await expect(textarea.style.resize).toBe('none');

    await userEvent.click(textarea);
    await userEvent.type(textarea, 'no resize');
    await expect(textarea).toHaveValue('no resize');
  },
};

/**
 * loading — interaction disabled while an async action is in progress
 */
export const Loading: Story = {
  args: {
    label: 'Submitting',
    placeholder: 'Please wait...',
    loading: true,
    value: 'Sending your message...',
    onChange: () => undefined,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const textarea = await canvas.findByPlaceholderText('Please wait...');
    await expect(textarea).toBeVisible();

    // loading=true → disabled 처리 + aria-busy
    await expect(textarea).toBeDisabled();
    await expect(textarea).toHaveAttribute('aria-busy', 'true');

    // 컨테이너 opacity 확인
    const container = textarea.closest('div');
    if (container) {
      await expect(container.style.opacity).toBe('0.5');
    }
  },
};

/**
 * variant="soft" — borderless field flush inside one filled, rounded,
 * subtly elevated surface (no outline ring)
 */
export const Soft: Story = {
  args: {
    label: 'Soft surface',
    placeholder: 'Write inside a filled surface...',
    variant: 'soft',
    helperText: 'No outline ring — just a filled rounded panel.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr 확인
    const root = canvasElement.querySelector('[data-bbangto-textarea-variant]');
    await expect(root).not.toBeNull();
    await expect(root).toHaveAttribute('data-bbangto-textarea-variant', 'soft');

    // ③ 콘텐츠 슬롯 렌더
    const textarea = await canvas.findByPlaceholderText('Write inside a filled surface...');
    await expect(textarea).toBeVisible();

    // ② load-bearing computed style — 채워진 배경 + 외곽선 링 없음 + 큰 라운드
    const style = getComputedStyle(textarea);
    // filled surface: 배경색이 투명하지 않다
    await expect(style.backgroundColor).not.toBe('');
    await expect(style.backgroundColor).not.toBe('transparent');
    await expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // no outline ring: 에러가 없으므로 border-style 가 none
    await expect(style.borderStyle).toBe('none');
    // subtle elevation: box-shadow 가 존재한다
    await expect(style.boxShadow).not.toBe('');
    await expect(style.boxShadow).not.toBe('none');

    // 인터랙션 — 타이핑
    await userEvent.click(textarea);
    await userEvent.type(textarea, 'soft variant');
    await expect(textarea).toHaveValue('soft variant');
  },
};

/**
 * Disabled — shows all disabled visual affordances
 */
export const Disabled: Story = {
  args: {
    label: 'Read-only field',
    placeholder: 'Disabled textarea...',
    disabled: true,
    value: 'This value cannot be changed.',
    onChange: () => undefined,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const textarea = await canvas.findByPlaceholderText('Disabled textarea...');
    await expect(textarea).toBeVisible();
    await expect(textarea).toBeDisabled();

    // disabled 상태에서 cursor: not-allowed 적용 확인
    await expect(textarea.style.cursor).toBe('not-allowed');
  },
};
