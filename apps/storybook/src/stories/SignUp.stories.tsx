import type { Meta, StoryObj } from '@storybook/react';
import { SignUp } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Patterns/SignUp',
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

// ── LayoutSplit ─────────────────────────────────────────────────────────────

/**
 * layout="split" — marketing 패널 | 폼 2-col(>=lg). 스코프드 <style>의
 * 2-col @media 규칙이 존재해야 하고, 폼 검증/제출은 그대로 동작해야 한다.
 */
export const LayoutSplit: Story = {
  args: {
    layout: 'split',
    marketingPanel: (
      <div data-testid="mktg" style={{ padding: 24 }}>
        <h3>빵토에 오신 것을 환영합니다</h3>
        <p>지금 가입하고 시작하세요.</p>
      </div>
    ),
  },
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-signup-layout]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-signup-layout')).toBe('split');

    // 2. load-bearing: 스코프드 2-col @media 규칙이 존재해야 한다 (AGGREGATED).
    const allStyles = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(allStyles).toMatch(/bbangto-signup-split/);
    await expect(allStyles).toMatch(/grid-template-columns:\s*1fr 1fr/);

    // 패널이 렌더링됐는지 확인
    await expect(canvas.getByTestId('mktg')).toBeVisible();

    // 3. 폼/플로우 여전히 동작: 필드 존재 + 빈 제출 시 검증 에러
    const submitBtn = await canvas.findByRole('button', { name: /회원가입/i });
    await expect(canvas.getByPlaceholderText(/홍길동/i)).toBeVisible();
    await userEvent.click(submitBtn);
    await waitFor(async () => {
      await expect(canvas.getByText(/이름을 입력해 주세요/)).toBeVisible();
    });
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

// ── LayoutMinimal ───────────────────────────────────────────────────────────

/**
 * layout="minimal" — borderless/compact. 카드에 테두리·그림자 같은 chrome이
 * 없어야 하고, 폼 검증/제출은 그대로 동작해야 한다.
 */
export const LayoutMinimal: Story = {
  args: {
    layout: 'minimal',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-signup-layout]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-signup-layout')).toBe('minimal');

    // 2. load-bearing: 카드 chrome 부재 — 폼을 감싸는 어느 조상에도
    //    가시적 border/box-shadow가 없어야 한다(borderless).
    const form = canvasElement.querySelector<HTMLFormElement>('form');
    await expect(form).not.toBeNull();
    let node: HTMLElement | null = form;
    while (node && node !== canvasElement) {
      const cs = getComputedStyle(node);
      const hasBorder =
        cs.borderTopStyle !== 'none' && parseFloat(cs.borderTopWidth) > 0;
      await expect(hasBorder).toBe(false);
      await expect(cs.boxShadow === 'none' || cs.boxShadow === '').toBe(true);
      node = node.parentElement;
    }

    // 3. 폼/플로우 여전히 동작: 유효 값 입력 후 onSubmit 호출
    await userEvent.type(canvas.getByPlaceholderText(/홍길동/i), '김철수');
    await userEvent.type(canvas.getByPlaceholderText(/example@email\.com/i), 'test@example.com');
    const pw = canvasElement.querySelectorAll<HTMLInputElement>('input[type="password"]');
    await userEvent.type(pw[0], 'Password123!');
    await userEvent.type(pw[1], 'Password123!');
    const terms = canvasElement.querySelector<HTMLInputElement>('input[type="checkbox"]');
    if (terms && !terms.checked) await userEvent.click(terms);

    await userEvent.click(await canvas.findByRole('button', { name: /회원가입/i }));
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

// ── LayoutSocialFirst ───────────────────────────────────────────────────────

/**
 * layout="social-first" — 소셜 버튼이 폼 필드보다 먼저(위에) 렌더링된다.
 * DOM 순서로 social 블록이 form 앞에 있음을 확인하고, 폼 검증도 동작해야 한다.
 */
export const LayoutSocialFirst: Story = {
  args: {
    layout: 'social-first',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-signup-layout]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-signup-layout')).toBe('social-first');

    // 2. load-bearing: social 블록이 form 앞에 위치해야 한다.
    const social = canvasElement.querySelector<HTMLElement>('[data-bbangto-signup-social]');
    const form = canvasElement.querySelector<HTMLFormElement>('form');
    await expect(social).not.toBeNull();
    await expect(form).not.toBeNull();
    // social-first: 소셜 버튼이 첫 폼 필드보다 먼저 나와야 한다.
    const order = social!.compareDocumentPosition(form!);
    await expect(order & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    // 소셜 provider 버튼 존재 확인
    await expect(canvas.getByRole('button', { name: /Google/i })).toBeVisible();

    // 3. 폼/플로우 여전히 동작: 빈 제출 시 검증 에러 + onSubmit 미호출
    await userEvent.click(await canvas.findByRole('button', { name: /^회원가입$/i }));
    await waitFor(async () => {
      await expect(canvas.getByText(/이름을 입력해 주세요/)).toBeVisible();
    });
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

// ── LayoutFrosted ─────────────────────────────────────────────────────────────

/**
 * layout="frosted" — glass-chrome 카드. 루트는 토큰 합성 그라디언트 backdrop을
 * 깔고, 폼 카드는 그 위에 반투명 + backdrop-blur 글래스 패널로 떠 있다. 부유감은
 * box-shadow elevation이 아니라 blur로 표현되며, 1px 반투명 border가 있다.
 * 폼 검증/제출과 label·aria-invalid·tab order a11y 계약은 그대로 유지돼야 한다.
 */
export const LayoutFrosted: Story = {
  args: {
    layout: 'frosted',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const root = canvasElement.querySelector<HTMLElement>('[data-bbangto-signup-layout]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-signup-layout')).toBe('frosted');

    // 2-a. load-bearing(backdrop): 루트에 그라디언트 backdrop이 합성돼 있어야 한다.
    const rootStyle = getComputedStyle(root!);
    await expect(rootStyle.backgroundImage).toMatch(/gradient/);

    // 2-b. load-bearing(glass chrome): 글래스 패널은 backdrop blur로 떠 있고
    //      (box-shadow elevation 아님), 1px 반투명 border가 있어야 한다.
    const panel = canvasElement.querySelector<HTMLElement>('.bbangto-signup-frosted');
    await expect(panel).not.toBeNull();
    const panelStyle = getComputedStyle(panel!);
    const backdrop =
      panelStyle.getPropertyValue('backdrop-filter') ||
      panelStyle.getPropertyValue('-webkit-backdrop-filter');
    await expect(backdrop).toMatch(/blur/);
    // elevation 대신 blur: box-shadow가 없어야 한다.
    await expect(panelStyle.boxShadow === 'none' || panelStyle.boxShadow === '').toBe(true);
    // 은은한 1px 반투명 border (solid + 폭 존재).
    await expect(panelStyle.borderTopStyle).toBe('solid');
    await expect(parseFloat(panelStyle.borderTopWidth)).toBeGreaterThan(0);

    // 3. 콘텐츠 슬롯 + a11y 계약: label 연관/aria-invalid/제출 플로우 유지.
    const nameInput = canvas.getByLabelText('이름');
    await expect(nameInput).toBeVisible();

    // 빈 제출 → 검증 에러 + aria-invalid + onSubmit 미호출
    await userEvent.click(await canvas.findByRole('button', { name: /회원가입/i }));
    await waitFor(async () => {
      await expect(canvas.getByText(/이름을 입력해 주세요/)).toBeVisible();
    });
    await expect(nameInput).toHaveAttribute('aria-invalid', 'true');
    await expect(args.onSubmit).not.toHaveBeenCalled();

    // tab order 유지: name 입력이 포커스를 받을 수 있어야 한다.
    nameInput.focus();
    await expect(nameInput).toHaveFocus();
  },
};
