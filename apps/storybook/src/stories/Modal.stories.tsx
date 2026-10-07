import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button } from '@centurio1987/bbangto-ui-core';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['popup', 'full', 'bottom-sheet', 'side-sheet'],
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

/**
 * variant="side-sheet" — inline-end(우측) 뷰포트 엣지에 도킹되는 사이드 시트.
 * 전체 높이(block-size:100vh) + max-inline-size 토큰으로 폭 제한 + translateX 진입.
 * bottom-sheet(block-end 도킹, full inline-size, translateY)와 앵커·슬라이드 축이 다르다.
 */
export const SideSheet: Story = {
  name: 'Side Sheet',
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Side Sheet</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Filters"
          variant="side-sheet"
          size="sm"
        >
          <p>Apply filters to narrow the result list.</p>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /Open Side Sheet/i });
    await userEvent.click(trigger);

    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog).toBeVisible());

    // ① data-attr 훅 검증
    const root = canvasElement.querySelector('[data-bbangto-dialog-variant]');
    await expect(root).not.toBeNull();
    await expect(root).toHaveAttribute('data-bbangto-dialog-variant', 'side-sheet');
    await expect(root).toBe(dialog);

    // ② load-bearing 스타일: 슬라이드 축이 X(translateX) — bottom-sheet의 Y축과 구분되는 핵심.
    await waitFor(() => {
      const cs = getComputedStyle(dialog);
      expect(cs.getPropertyValue('--bbangto-slide-x').trim()).toBe('100%');
      expect(cs.getPropertyValue('--bbangto-slide-y').trim()).toBe('0');
    });
    // inline-size가 max-inline-size 토큰(sm)으로 제한됨 — full-width 아님.
    await expect(dialog.style.maxWidth).toBe('320px');
    // 루트가 inline-end(우측) 엣지에 도킹됨 (popup/bottom-sheet의 center와 구분).
    const overlay = dialog.parentElement as HTMLElement;
    await expect(getComputedStyle(overlay).justifyContent).toBe('flex-end');

    // ③ 콘텐츠 슬롯 렌더 + a11y 계약 유지
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(canvas.getByRole('heading', { name: /Filters/i })).toBeVisible();
    await expect(canvas.getByText(/Apply filters to narrow the result list/i)).toBeVisible();

    // 키보드 계약: Escape 로 닫힘 (focus trap + Esc 유지 확인)
    fireEvent.keyDown(dialog, { key: 'Escape' });
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  },
};

// ── 키보드 (KAN-054) ────────────────────────────────────────────────

function KeyboardModalDemo({ onKeyDown }: { onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open settings</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings" onKeyDown={onKeyDown}>
        <label>
          Name <input name="name" />
        </label>
        <Button onClick={() => setIsOpen(false)}>Done</Button>
      </Modal>
    </>
  );
}

export const Keyboard: Story = {
  args: { isOpen: false, onClose: () => {}, children: null },
  render: () => <KeyboardModalDemo />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Open settings' });

    // 키보드만으로 연다 — 포커스가 대화상자 안으로 들어간다.
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    // Tab 이 대화상자 안에서 돈다 — 마지막 요소 다음은 첫 요소다.
    const input = within(dialog).getByRole('textbox');
    const done = within(dialog).getByRole('button', { name: 'Done' });
    done.focus();
    await userEvent.tab();
    await expect(dialog.contains(document.activeElement)).toBe(true);
    input.focus();
    await userEvent.tab({ shift: true });
    await expect(dialog.contains(document.activeElement)).toBe(true);

    // Esc 로 닫히고 연 버튼으로 포커스가 돌아온다.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

// 합성 규칙(KAN-054): 외부 onKeyDown 이 먼저 돌고, preventDefault 하면 내부 처리(Esc 닫기)를 건너뛴다.
export const KeyDownPreventDefault: Story = {
  args: { isOpen: false, onClose: () => {}, children: null },
  render: () => (
    <KeyboardModalDemo
      onKeyDown={(e) => {
        if (e.key === 'Escape') e.preventDefault();
      }}
    />
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Open settings' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const dialog = await canvas.findByRole('dialog');
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    // 외부가 Esc 를 막았으므로 열린 채로 남는다.
    await userEvent.keyboard('{Escape}');
    await new Promise((r) => setTimeout(r, 300));
    await expect(canvas.getByRole('dialog')).toBeInTheDocument();

    // 막지 않은 키(Tab 가두기)는 그대로 돈다.
    within(dialog).getByRole('button', { name: 'Done' }).focus();
    await userEvent.tab();
    await expect(dialog.contains(document.activeElement)).toBe(true);
  },
};
