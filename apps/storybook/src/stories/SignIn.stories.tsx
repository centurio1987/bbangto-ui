import type { Meta, StoryObj } from '@storybook/react';
import { SignIn } from '@centurio1987/core';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';

const meta = {
  title: 'Patterns/SignIn',
  component: SignIn,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SignIn>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default: 중앙 폼 레이아웃 ──────────────────────────────────────────────
export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인
    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    await expect(emailInput).toBeVisible();

    const passwordInput = await canvas.findByPlaceholderText('비밀번호를 입력하세요');
    await expect(passwordInput).toBeVisible();

    const submitButton = await canvas.findByRole('button', { name: '로그인' });
    await expect(submitButton).toBeVisible();
  },
};

// ─── ValidationErrors: 빈 제출 → 검증 에러 표시, onSubmit 미호출 ─────────────
export const ValidationErrors: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ args, canvasElement }: { args: { onSubmit: ReturnType<typeof fn> }; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const submitButton = await canvas.findByRole('button', { name: '로그인' });

    // 빈 폼 제출
    await userEvent.click(submitButton);

    // 검증 에러가 표시되어야 함
    await waitFor(async () => {
      const emailError = canvas.getByText('이메일을 입력하세요.');
      await expect(emailError).toBeVisible();
    });

    // onSubmit이 호출되지 않아야 함
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

// ─── InvalidEmail: 이메일 형식 오류 ──────────────────────────────────────────
export const InvalidEmail: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ args, canvasElement }: { args: { onSubmit: ReturnType<typeof fn> }; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    const passwordInput = await canvas.findByPlaceholderText('비밀번호를 입력하세요');
    const submitButton = await canvas.findByRole('button', { name: '로그인' });

    // 이메일 형식 오류
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, 'somepassword');
    await userEvent.click(submitButton);

    await waitFor(async () => {
      const emailError = canvas.getByText('올바른 이메일 형식을 입력하세요.');
      await expect(emailError).toBeVisible();
    });

    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

// ─── SuccessfulSubmit: 유효값 입력 후 제출 → onSubmit 올바른 값으로 호출 ────
export const SuccessfulSubmit: Story = {
  args: {
    onSubmit: fn(),
  },
  play: async ({ args, canvasElement }: { args: { onSubmit: ReturnType<typeof fn> }; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    const passwordInput = await canvas.findByPlaceholderText('비밀번호를 입력하세요');
    const rememberCheckbox = await canvas.findByRole('checkbox');
    const submitButton = await canvas.findByRole('button', { name: '로그인' });

    // 유효한 값 입력
    await userEvent.type(emailInput, 'user@example.com');
    await userEvent.type(passwordInput, 'securepassword');
    await userEvent.click(rememberCheckbox);
    await userEvent.click(submitButton);

    // onSubmit이 올바른 값으로 호출되어야 함
    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'securepassword',
        remember: true,
      });
    });
  },
};

// ─── WithError: 서버 에러 표시 ───────────────────────────────────────────────
export const WithError: Story = {
  args: {
    onSubmit: fn(),
    error: '이메일 또는 비밀번호가 올바르지 않습니다.',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 에러 메시지가 SectionMessage로 표시되어야 함
    const errorMessage = await canvas.findByText('이메일 또는 비밀번호가 올바르지 않습니다.');
    // SectionMessage는 fadeIn(opacity:0→1)으로 진입하므로 애니메이션 완료를 기다린다.
    await waitFor(() => expect(errorMessage).toBeVisible());
  },
};

// ─── Loading: 로딩 상태에서 버튼 비활성 ─────────────────────────────────────
export const Loading: Story = {
  args: {
    onSubmit: fn(),
    loading: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const submitButton = await canvas.findByRole('button', { name: '로그인' });
    await expect(submitButton).toBeDisabled();
  },
};

// ─── WithLogo: 로고 포함 ─────────────────────────────────────────────────────
export const WithLogo: Story = {
  args: {
    onSubmit: fn(),
    logo: (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 22,
        }}
      >
        B
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    await expect(emailInput).toBeVisible();
  },
};

// ─── SplitLayout: marketingPanel 포함 split 레이아웃 ─────────────────────────
export const SplitLayout: Story = {
  args: {
    onSubmit: fn(),
    marketingPanel: (
      <div style={{ maxWidth: 480, color: '#1e1b4b' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          bbangto-ui로 빠르게 시작하세요
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75 }}>
          아름다운 디자인 시스템으로 최고의 사용자 경험을 만드세요.
        </p>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    await expect(emailInput).toBeVisible();

    // 마케팅 패널 텍스트도 보여야 함
    const marketingText = await canvas.findByText('bbangto-ui로 빠르게 시작하세요');
    await expect(marketingText).toBeVisible();
  },
};
