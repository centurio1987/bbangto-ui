import type { Meta, StoryObj } from '@storybook/react';
import { FormLayout, FormSection, FormRow } from '@centurio1987/core';
import { Input } from '@centurio1987/core';
import { Checkbox } from '@centurio1987/core';
import { expect, userEvent, within, waitFor, fn } from 'storybook/test';

const meta = {
  title: 'Patterns/FormLayout',
  component: FormLayout,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof FormLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default (basic submit flow) ────────────────────────────────────────────

export const Default: Story = {
  args: {
    title: '프로필 편집',
    description: '기본 정보를 수정할 수 있습니다.',
    submitLabel: '저장',
    cancelLabel: '취소',
    onCancel: fn(),
    onSubmit: fn(),
  },
  render: (args) => (
    <FormLayout {...args}>
      <FormSection title="기본 정보" description="이름과 이메일을 입력하세요.">
        <FormRow label="이름" htmlFor="name" required>
          <Input id="name" placeholder="홍길동" fullWidth />
        </FormRow>
        <FormRow label="이메일" htmlFor="email" required hint="업무용 이메일을 권장합니다.">
          <Input id="email" type="email" placeholder="user@example.com" fullWidth />
        </FormRow>
      </FormSection>
    </FormLayout>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인
    const heading = await canvas.findByText('프로필 편집');
    await expect(heading).toBeVisible();

    // 2. 제출 버튼 존재 확인
    const submitBtn = canvas.getByRole('button', { name: /저장/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toHaveAttribute('type', 'submit');

    // 3. 제출 → onSubmit 호출됨
    await userEvent.click(submitBtn);
    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalledTimes(1);
    });

    // 4. 취소 버튼 → onCancel 호출됨
    const cancelBtn = canvas.getByRole('button', { name: /취소/i });
    await userEvent.click(cancelBtn);
    await waitFor(() => {
      expect(args.onCancel).toHaveBeenCalledTimes(1);
    });
  },
};

// ─── WithError (error summary banner) ───────────────────────────────────────

export const WithError: Story = {
  args: {
    title: '비밀번호 변경',
    error: '현재 비밀번호가 올바르지 않습니다. 다시 확인해 주세요.',
    onSubmit: fn(),
  },
  render: (args) => (
    <FormLayout {...args}>
      <FormRow label="현재 비밀번호" htmlFor="current-pw" required>
        <Input id="current-pw" type="password" placeholder="••••••••" fullWidth />
      </FormRow>
      <FormRow label="새 비밀번호" htmlFor="new-pw" required>
        <Input id="new-pw" type="password" placeholder="••••••••" fullWidth />
      </FormRow>
    </FormLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // error prop → SectionMessage(role=alert) 렌더링 확인
    const alert = await canvas.findByRole('alert');
    // SectionMessage는 fadeIn(opacity:0→1)으로 진입하므로 애니메이션 완료를 기다린다.
    await waitFor(() => expect(alert).toBeVisible());
    await expect(alert).toHaveTextContent('현재 비밀번호가 올바르지 않습니다');
  },
};

// ─── WithFieldError (FormRow inline error + aria) ────────────────────────────

export const WithFieldError: Story = {
  args: {
    title: '이메일 수정',
    onSubmit: fn(),
  },
  render: (args) => (
    <FormLayout {...args}>
      <FormRow
        label="이메일"
        htmlFor="email-err"
        required
        error="올바른 이메일 형식을 입력하세요."
      >
        <Input id="email-err" type="email" value="not-an-email" readOnly fullWidth />
      </FormRow>
    </FormLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // FormRow error 메시지 표시 확인
    const errorMsg = await canvas.findByText('올바른 이메일 형식을 입력하세요.');
    await expect(errorMsg).toBeVisible();

    // 입력 필드 aria-invalid=true 확인
    const input = canvas.getByDisplayValue('not-an-email');
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  },
};

// ─── Loading state ───────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    title: '저장 중...',
    loading: true,
    onSubmit: fn(),
  },
  render: (args) => (
    <FormLayout {...args}>
      <FormRow label="이름" htmlFor="name-loading">
        <Input id="name-loading" defaultValue="홍길동" fullWidth />
      </FormRow>
    </FormLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // submit 버튼이 loading(aria-busy) 상태임을 확인
    const submitBtn = await canvas.findByRole('button', { name: /저장/i });
    await expect(submitBtn).toHaveAttribute('aria-busy', 'true');
    await expect(submitBtn).toBeDisabled();
  },
};

// ─── MultiSection (복수 FormSection) ────────────────────────────────────────

export const MultiSection: Story = {
  args: {
    title: '계정 설정',
    submitLabel: '변경 저장',
    onSubmit: fn(),
  },
  render: (args) => (
    <FormLayout {...args}>
      <FormSection title="개인 정보">
        <FormRow label="이름" htmlFor="ms-name" required>
          <Input id="ms-name" placeholder="홍길동" fullWidth />
        </FormRow>
      </FormSection>
      <FormSection title="알림 설정" description="원하는 알림 유형을 선택하세요.">
        <FormRow label="이메일 알림" htmlFor="ms-email-notify">
          <Checkbox id="ms-email-notify" label="이메일로 알림 받기" />
        </FormRow>
      </FormSection>
    </FormLayout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // 두 섹션의 legend(title) 확인
    const personalTitle = await canvas.findByText('개인 정보');
    await expect(personalTitle).toBeVisible();

    const notifyTitle = canvas.getByText('알림 설정');
    await expect(notifyTitle).toBeVisible();

    // fieldset 요소가 존재하는지 확인
    const fieldsets = canvasElement.querySelectorAll('fieldset');
    await expect(fieldsets.length).toBeGreaterThanOrEqual(2);
  },
};
