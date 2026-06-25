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

// ─── LayoutSplit: 명시적 layout='split' + 반응형 2-col 스코프 규칙 검증 ──────
export const LayoutSplit: Story = {
  args: {
    onSubmit: fn(),
    layout: 'split',
    marketingPanel: (
      <div style={{ maxWidth: 480, color: '#1e1b4b' }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>
          분할 레이아웃
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.75 }}>
          마케팅 패널과 폼이 나란히 배치됩니다.
        </p>
      </div>
    ),
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  play: async ({ args, canvasElement }: { args: { onSubmit: ReturnType<typeof fn> }; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 검증
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-signin-layout]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-signin-layout')).toBe('split');

    // 2. load-bearing: 스코프된 2-col @media 규칙이 존재해야 함
    const aggregatedStyles = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(aggregatedStyles).toContain('grid-template-columns: 1fr 1fr');
    await expect(aggregatedStyles).toContain('bbangto-signin-split');
    // 루트는 grid display 여야 함
    await expect(getComputedStyle(root!).display).toBe('grid');

    // 3. 폼 동작: 이메일 필드 + 제출이 여전히 작동해야 함
    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    const passwordInput = await canvas.findByPlaceholderText('비밀번호를 입력하세요');
    const submitButton = await canvas.findByRole('button', { name: '로그인' });
    await expect(emailInput).toBeVisible();

    await userEvent.type(emailInput, 'split@example.com');
    await userEvent.type(passwordInput, 'securepassword');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledWith({
        email: 'split@example.com',
        password: 'securepassword',
        remember: false,
      });
    });
  },
};

// ─── LayoutMinimal: 카드 크롬 없는 컴팩트 레이아웃 ──────────────────────────
export const LayoutMinimal: Story = {
  args: {
    onSubmit: fn(),
    layout: 'minimal',
  },
  play: async ({ args, canvasElement }: { args: { onSubmit: ReturnType<typeof fn> }; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 검증
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-signin-layout]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-signin-layout')).toBe('minimal');

    // 2. load-bearing: 폼 컨테이너에 카드 보더/섀도가 없어야 함 (chromeless)
    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    const form = emailInput.closest('form');
    await expect(form).not.toBeNull();
    const container = form!.parentElement as HTMLElement;
    const containerStyle = getComputedStyle(container);
    // 카드 크롬이 없어야 함: 보더 폭 0, 섀도 none
    await expect(containerStyle.borderTopWidth).toBe('0px');
    await expect(containerStyle.boxShadow).toBe('none');

    // 3. 폼 동작: 이메일 필드 + 제출
    const passwordInput = await canvas.findByPlaceholderText('비밀번호를 입력하세요');
    const submitButton = await canvas.findByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'minimal@example.com');
    await userEvent.type(passwordInput, 'securepassword');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledWith({
        email: 'minimal@example.com',
        password: 'securepassword',
        remember: false,
      });
    });
  },
};

// ─── LayoutSocialFirst: 소셜 버튼이 폼 위에 렌더 ────────────────────────────
export const LayoutSocialFirst: Story = {
  args: {
    onSubmit: fn(),
    layout: 'social-first',
    socialButtons: (
      <>
        <button type="button" data-testid="social-google">
          Google로 계속하기
        </button>
        <button type="button" data-testid="social-github">
          GitHub로 계속하기
        </button>
      </>
    ),
  },
  play: async ({ args, canvasElement }: { args: { onSubmit: ReturnType<typeof fn> }; canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 검증
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-signin-layout]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-signin-layout')).toBe('social-first');

    // 2. load-bearing: 소셜 버튼이 DOM 순서상 폼 필드보다 먼저 와야 함
    const googleBtn = await canvas.findByTestId('social-google');
    const emailInput = await canvas.findByPlaceholderText('이메일을 입력하세요');
    await expect(googleBtn).toBeVisible();
    // compareDocumentPosition: FOLLOWING(4) → email이 google 뒤에 옴
    const position = googleBtn.compareDocumentPosition(emailInput);
    await expect(position & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    // 소셜 블록이 폼보다 앞에 위치
    const socialBlock = canvasElement.querySelector<HTMLElement>('[data-bbangto-signin-social]');
    const form = emailInput.closest('form');
    await expect(socialBlock).not.toBeNull();
    await expect(form).not.toBeNull();
    await expect(
      socialBlock!.compareDocumentPosition(form!) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    // 3. 폼 동작: 이메일 필드 + 제출
    const passwordInput = await canvas.findByPlaceholderText('비밀번호를 입력하세요');
    const submitButton = await canvas.findByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'social@example.com');
    await userEvent.type(passwordInput, 'securepassword');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledWith({
        email: 'social@example.com',
        password: 'securepassword',
        remember: false,
      });
    });
  },
};
