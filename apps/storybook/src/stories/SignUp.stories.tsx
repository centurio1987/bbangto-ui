import type { Meta, StoryObj } from '@storybook/react';
import { SignUp } from '@centurio1987/core';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';

const meta = {
  title: 'Patterns/SignUp',
  component: SignUp,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof SignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ───────────────────────────────────────────────────────────────────

/** 기본 회원가입 폼 — 빈 제출 시 검증 에러가 표시되고 onSubmit이 호출되지 않아야 한다. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. 폼이 렌더링됐는지 확인
    const submitBtn = await canvas.findByRole('button', { name: /회원가입/i });
    await expect(submitBtn).toBeVisible();

    // 2. 빈 상태로 제출
    await userEvent.click(submitBtn);

    // 3. 검증 에러가 표시되고 onSubmit은 호출되지 않아야 한다
    await waitFor(async () => {
      const nameError = canvas.queryByText(/이름을 입력해 주세요/);
      await expect(nameError).not.toBeNull();
    });
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

// ── ValidSubmit ───────────────────────────────────────────────────────────────

/** 유효한 값 입력 후 제출 — onSubmit이 올바른 값으로 호출되어야 한다. */
export const ValidSubmit: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. 각 필드 입력
    const nameInput = await canvas.findByPlaceholderText(/홍길동/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, '김철수');

    const emailInput = await canvas.findByPlaceholderText(/example@email\.com/i);
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');

    // password 입력 — placeholder로 찾음
    const passwordInputs = canvasElement.querySelectorAll<HTMLInputElement>('input[type="password"]');
    await userEvent.clear(passwordInputs[0]);
    await userEvent.type(passwordInputs[0], 'Password123!');

    await userEvent.clear(passwordInputs[1]);
    await userEvent.type(passwordInputs[1], 'Password123!');

    // 약관 동의
    const termsCheckbox = canvasElement.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if (termsCheckbox && !termsCheckbox.checked) {
      await userEvent.click(termsCheckbox);
    }

    // 2. 제출
    const submitBtn = await canvas.findByRole('button', { name: /회원가입/i });
    await userEvent.click(submitBtn);

    // 3. onSubmit이 올바른 값으로 호출됐는지 확인
    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledWith({
        name: '김철수',
        email: 'test@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        acceptTerms: true,
      });
    });
  },
};

// ── ValidationErrors ──────────────────────────────────────────────────────────

/** 개별 필드 검증 — 이메일 형식 오류와 비밀번호 불일치를 확인한다. */
export const ValidationErrors: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 이름 입력
    const nameInput = await canvas.findByPlaceholderText(/홍길동/i);
    await userEvent.type(nameInput, '테스터');

    // 잘못된 이메일 형식
    const emailInput = await canvas.findByPlaceholderText(/example@email\.com/i);
    await userEvent.type(emailInput, 'not-an-email');

    // 짧은 비밀번호
    const passwordInputs = canvasElement.querySelectorAll<HTMLInputElement>('input[type="password"]');
    await userEvent.type(passwordInputs[0], 'short');

    // 다른 confirmPassword
    await userEvent.type(passwordInputs[1], 'different');

    // 제출 (약관 미동의)
    const submitBtn = await canvas.findByRole('button', { name: /회원가입/i });
    await userEvent.click(submitBtn);

    // 에러 메시지 확인
    await waitFor(async () => {
      await expect(canvas.getByText(/올바른 이메일 형식이 아닙니다/)).toBeVisible();
      await expect(canvas.getByText(/최소 8자 이상/)).toBeVisible();
      await expect(canvas.getByText(/비밀번호가 일치하지 않습니다/)).toBeVisible();
      await expect(canvas.getByText(/이용약관에 동의해 주세요/)).toBeVisible();
    });

    // onSubmit 미호출 확인
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

// ── WithServerError ───────────────────────────────────────────────────────────

/** 서버 에러 prop — SectionMessage로 에러가 렌더링된다. */
export const WithServerError: Story = {
  args: {
    error: '이미 사용 중인 이메일입니다. 다른 이메일을 사용해 주세요.',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const errorMessage = await canvas.findByText(/이미 사용 중인 이메일/);
    // SectionMessage는 fadeIn(opacity:0→1)으로 진입하므로 애니메이션 완료를 기다린다.
    await waitFor(() => expect(errorMessage).toBeVisible());
  },
};

// ── Loading ───────────────────────────────────────────────────────────────────

/** loading prop — 버튼이 로딩 상태로 표시되고 필드가 비활성화된다. */
export const Loading: Story = {
  args: {
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitBtn = await canvas.findByRole('button', { name: /회원가입/i });
    await expect(submitBtn).toBeDisabled();
  },
};

// ── WithLogo ──────────────────────────────────────────────────────────────────

/** logo prop — 로고 노드가 헤더 상단에 렌더링된다. */
export const WithLogo: Story = {
  args: {
    logo: (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: 'var(--bbangto-semantic-primary-base, #0052cc)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 20,
        }}
      >
        B
      </div>
    ),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByRole('heading', { name: /회원가입/i });
    await expect(heading).toBeVisible();
  },
};
