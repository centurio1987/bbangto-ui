import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button } from '@centurio1987/core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['popup', 'full', 'bottom-sheet'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ──────────────────────────────────────────────

export const Popup: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Popup Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action" variant="popup">
          Are you sure you want to proceed? This action cannot be undone.
        </Modal>
      </>
    );
  },
};

export const Full: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Full Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings" variant="full">
          Here is a full screen modal commonly used for complex forms or detailed views on mobile.
        </Modal>
      </>
    );
  },
};

export const BottomSheet: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Sheet</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Share" variant="bottom-sheet">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>Copy Link</li>
            <li style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>Share to X</li>
            <li style={{ padding: '16px 0' }}>Share to Facebook</li>
          </ul>
        </Modal>
      </>
    );
  },
};

// ── 신규 스토리 ─────────────────────────────────────────────────────

/**
 * size="sm" — 작은 확인/경고 팝업에 적합
 */
export const SizeSmall: Story = {
  name: 'Size / Small',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Small Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Item"
          variant="popup"
          size="sm"
        >
          Are you sure you want to delete this item?
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 트리거 버튼 렌더링 확인
    const trigger = await canvas.findByRole('button', { name: /Open Small Modal/i });
    await expect(trigger).toBeVisible();

    // 2. 모달 열기
    await userEvent.click(trigger);

    // 3. dialog role 확인
    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());

    // 4. size="sm" 이면 maxWidth가 sm 값으로 적용됐는지 스타일 검증
    const style = dialog.style;
    await expect(style.maxWidth).toBe('320px');

    // 5. 닫기
    const closeBtn = canvas.getByRole('button', { name: /Close modal/i });
    await userEvent.click(closeBtn);
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  },
};

/**
 * size="lg" — 넓은 콘텐츠(폼, 미리보기) 팝업에 적합
 */
export const SizeLarge: Story = {
  name: 'Size / Large',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Large Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit Profile"
          variant="popup"
          size="lg"
        >
          <p>Name field, bio field, avatar upload… (demo content)</p>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /Open Large Modal/i });
    await userEvent.click(trigger);

    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());

    // size="lg" maxWidth 검증
    await expect(dialog.style.maxWidth).toBe('640px');

    const closeBtn = canvas.getByRole('button', { name: /Close modal/i });
    await userEvent.click(closeBtn);
  },
};

/**
 * footer — 액션 버튼 슬롯 사용 예시 (확인/취소 패턴)
 */
export const WithFooter: Story = {
  name: 'With Footer',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal with Footer</Button>
        {confirmed && <p role="status">Confirmed!</p>}
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Purchase"
          variant="popup"
          footer={
            <>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button
                variant="solid"
                color="primary"
                onClick={() => { setConfirmed(true); setIsOpen(false); }}
              >
                Confirm
              </Button>
            </>
          }
        >
          You are about to purchase 1 item for $9.99.
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /Open Modal with Footer/i });
    await userEvent.click(trigger);

    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());

    // footer 슬롯 렌더링 확인 (Cancel, Confirm 버튼 존재)
    await expect(canvas.getByRole('button', { name: /Cancel/i })).toBeVisible();
    await expect(canvas.getByRole('button', { name: /Confirm/i })).toBeVisible();

    // Confirm 버튼 클릭 → 모달 닫힘 + 상태 변경 확인
    await userEvent.click(canvas.getByRole('button', { name: /^Confirm$/i }));
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
    await expect(canvas.getByRole('status')).toHaveTextContent('Confirmed!');
  },
};

/**
 * loading — 비동기 작업 진행 중 닫기/버튼 비활성화
 */
export const LoadingState: Story = {
  name: 'State / Loading',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Loading Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Processing…"
          variant="popup"
          loading={true}
          footer={
            <Button variant="solid" color="primary" loading={true}>
              Saving
            </Button>
          }
        >
          Please wait while your request is being processed.
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /Open Loading Modal/i });
    await userEvent.click(trigger);

    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());

    // loading=true 이면 close 버튼이 disabled 상태여야 한다
    const closeBtn = canvas.getByRole('button', { name: /Close modal/i });
    await expect(closeBtn).toBeDisabled();

    // aria-busy 속성 검증
    await expect(dialog).toHaveAttribute('aria-busy', 'true');
  },
};

/**
 * closeOnOverlayClick=false — 오버레이 클릭으로 닫히지 않아야 하는 경우
 */
export const NoOverlayClose: Story = {
  name: 'closeOnOverlayClick=false',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Persistent Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Required Action"
          variant="popup"
          closeOnOverlayClick={false}
        >
          You must take an action to close this modal. Clicking outside will not close it.
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /Open Persistent Modal/i });
    await userEvent.click(trigger);

    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());

    // X 버튼으로는 닫힘
    const closeBtn = canvas.getByRole('button', { name: /Close modal/i });
    await userEvent.click(closeBtn);
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  },
};
