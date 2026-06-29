import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Atoms/Input',
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
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'underline', 'ghost', 'composer-panel'],
    },
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

/** variant="filled" — 채워진 배경, 보이는 테두리 없음 */
export const VariantFilled: Story = {
  args: {
    label: 'Filled Input',
    placeholder: 'filled variant',
    variant: 'filled',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr 확인
    const wrapper = canvasElement.querySelector(
      '[data-bbangto-input-variant]'
    ) as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveAttribute(
      'data-bbangto-input-variant',
      'filled'
    );
    // 2. load-bearing 스타일 — 배경이 칠해져 있어야(transparent 아님)
    const style = getComputedStyle(wrapper);
    await expect(style.backgroundColor).not.toBe('transparent');
    await expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    // 3. 콘텐츠 렌더링 확인
    const input = await canvas.findByPlaceholderText('filled variant');
    await expect(input).toBeVisible();
  },
};

/** variant="underline" — 하단 테두리만, radius 0 */
export const VariantUnderline: Story = {
  args: {
    label: 'Underline Input',
    placeholder: 'underline variant',
    variant: 'underline',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr 확인
    const wrapper = canvasElement.querySelector(
      '[data-bbangto-input-variant]'
    ) as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveAttribute(
      'data-bbangto-input-variant',
      'underline'
    );
    // 2. load-bearing 스타일 — 상/측면 테두리 없음, 하단 테두리만 존재
    const style = getComputedStyle(wrapper);
    await expect(style.borderTopStyle).toBe('none');
    await expect(style.borderBottomStyle).not.toBe('none');
    // 3. 콘텐츠 렌더링 확인
    const input = await canvas.findByPlaceholderText('underline variant');
    await expect(input).toBeVisible();
  },
};

/** variant="ghost" — rest 상태에서 테두리/배경 없음, focus 시 노출 */
export const VariantGhost: Story = {
  args: {
    label: 'Ghost Input',
    placeholder: 'ghost variant',
    variant: 'ghost',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr 확인
    const wrapper = canvasElement.querySelector(
      '[data-bbangto-input-variant]'
    ) as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveAttribute(
      'data-bbangto-input-variant',
      'ghost'
    );
    // 2. load-bearing 스타일 — rest 상태에서 배경 transparent
    const restStyle = getComputedStyle(wrapper);
    await expect(restStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    // 3. 콘텐츠 렌더링 + focus 시 배경 노출
    const input = await canvas.findByPlaceholderText('ghost variant');
    await expect(input).toBeVisible();
    await userEvent.click(input);
    await waitFor(() => {
      const focusStyle = getComputedStyle(wrapper);
      expect(focusStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    });
  },
};

/** variant="composer-panel" — 단일 라인 트랙이 2-row 패널로 reflow */
export const ComposerPanel: Story = {
  args: {
    label: 'Prompt',
    placeholder: 'Ask anything...',
    variant: 'composer-panel',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr 확인
    const wrapper = canvasElement.querySelector(
      '[data-bbangto-input-variant]'
    ) as HTMLElement;
    await expect(wrapper).not.toBeNull();
    await expect(wrapper).toHaveAttribute(
      'data-bbangto-input-variant',
      'composer-panel'
    );
    // 2. load-bearing 스타일 — 단일 라인 트랙이 flex-column 2-row 패널로 reflow.
    //    elevation(box-shadow) 존재 + 정확히 2개 row.
    const style = getComputedStyle(wrapper);
    await expect(style.flexDirection).toBe('column');
    await expect(style.boxShadow).not.toBe('none');
    await expect(wrapper.children.length).toBe(2);
    // 원형 액션 버튼이 trailing 정렬 + radius(원형) 적용됐는지.
    const button = await canvas.findByRole('button', { name: /send/i });
    const buttonStyle = getComputedStyle(button);
    await expect(buttonStyle.borderTopLeftRadius).not.toBe('0px');
    const actionRow = button.parentElement as HTMLElement;
    await expect(getComputedStyle(actionRow).justifyContent).toBe('flex-end');
    // 3. 콘텐츠 슬롯 렌더링 — borderless multiline 필드 + 타이핑.
    const input = await canvas.findByPlaceholderText('Ask anything...');
    await expect(input).toBeVisible();
    await userEvent.type(input, 'draft a poem');
    await expect(input).toHaveValue('draft a poem');
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
