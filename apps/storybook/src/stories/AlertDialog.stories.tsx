import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog, Button } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    actionsAlign: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 기존 스토리 (보존) ────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Alert Dialog</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to proceed? This action cannot be undone."
        />
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인 — 트리거 버튼
    const trigger = await canvas.findByRole('button', { name: /open alert dialog/i });
    await expect(trigger).toBeVisible();
    // 2. 다이얼로그 열기
    await userEvent.click(trigger);
    // 3. 다이얼로그 요소 확인
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    // 4. Cancel 버튼 클릭으로 닫기
    const cancelBtn = within(document.body).getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);
    // exit animation keeps the dialog mounted briefly; wait for unmount
    await waitFor(() => expect(within(document.body).queryByRole('dialog')).toBeNull());
  },
};

export const Destructive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button color="error" onClick={() => setIsOpen(true)}>Delete Account</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Delete Account"
          description="This will permanently delete your account and all associated data. This action cannot be undone."
          confirmText="Delete"
          isDestructive
        />
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /delete account/i });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    // Confirm 버튼이 error color(isDestructive)임을 텍스트로 확인
    // 트리거 버튼("Delete Account")과 구분하기 위해 정확히 "Delete"만 매칭
    const confirmBtn = within(document.body).getByRole('button', { name: /^delete$/i });
    await expect(confirmBtn).toBeVisible();
    await userEvent.click(within(document.body).getByRole('button', { name: /cancel/i }));
  },
};

// ─── 신규 스토리: size ─────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Dialog</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Remove Item"
          description="Remove this item from your list?"
          confirmText="Remove"
          size="sm"
        />
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /open small dialog/i });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    // size="sm" → maxWidth이 280px인 패널 확인
    const style = getComputedStyle(dialog);
    await expect(style.maxWidth).toBe('280px');
    await userEvent.click(within(document.body).getByRole('button', { name: /cancel/i }));
  },
};

export const SizeLarge: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Dialog</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Terms of Service Update"
          description="Our terms of service have been updated. Please review the changes carefully before confirming. By clicking Agree you acknowledge that you have read and accept the new terms."
          confirmText="Agree"
          size="lg"
        />
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /open large dialog/i });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    const style = getComputedStyle(dialog);
    await expect(style.maxWidth).toBe('560px');
    await userEvent.click(within(document.body).getByRole('button', { name: /cancel/i }));
  },
};

// ─── 신규 스토리: loading ──────────────────────────────────────────────────────

export const LoadingConfirm: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Loading Dialog</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => {}}
          title="Submitting Request"
          description="Please wait while your request is being processed."
          confirmText="Submit"
          loading
        />
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /open loading dialog/i });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    // loading=true → confirm 버튼이 aria-busy=true
    const confirmBtn = within(document.body).getByRole('button', { name: /submit/i });
    await expect(confirmBtn).toHaveAttribute('aria-busy', 'true');
    // loading=true → confirm 버튼 disabled(interaction 불가)
    await expect(confirmBtn).toBeDisabled();
    await userEvent.click(within(document.body).getByRole('button', { name: /cancel/i }));
  },
};

// ─── 신규 스토리: icon ─────────────────────────────────────────────────────────

export const WithIcon: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const WarningIcon = (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Icon Dialog</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Unsaved Changes"
          description="You have unsaved changes. Do you want to discard them?"
          confirmText="Discard"
          cancelText="Keep Editing"
          icon={WarningIcon}
          isDestructive
        />
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /open icon dialog/i });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    // icon이 렌더됐는지 aria-hidden svg로 확인
    const icon = dialog.querySelector('[aria-hidden="true"]');
    await expect(icon).not.toBeNull();
    await userEvent.click(within(document.body).getByRole('button', { name: /keep editing/i }));
  },
};

// ─── 신규 스토리: actionsAlign ─────────────────────────────────────────────────

export const ActionsAlignLeft: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left-Aligned Dialog</Button>
        <AlertDialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          title="Confirm Submission"
          description="Submit your application? You can edit it later."
          confirmText="Submit"
          actionsAlign="left"
        />
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /open left-aligned dialog/i });
    await userEvent.click(trigger);
    const dialog = await within(document.body).findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());
    // actionsAlign="left" → actions 컨테이너 justifyContent=flex-start
    const actionsContainer = dialog.querySelector('[data-actions]');
    await expect(actionsContainer).not.toBeNull();
    const style = getComputedStyle(actionsContainer!);
    await expect(style.justifyContent).toBe('flex-start');
    await userEvent.click(within(document.body).getByRole('button', { name: /cancel/i }));
  },
};
