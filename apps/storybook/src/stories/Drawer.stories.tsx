import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, Drawer } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Organisms/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'radio', options: ['left', 'right'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function DrawerDemo({ position = 'right' }: { position?: 'left' | 'right' }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        position={position}
        size="sm"
        aria-labelledby="drawer-demo-title"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 24 }}>
          <h2 id="drawer-demo-title" style={{ margin: 0 }}>Filters</h2>
          <label>
            Keyword <input name="keyword" />
          </label>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </div>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  args: { isOpen: false, onClose: () => {}, children: null },
  render: () => <DrawerDemo />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByRole('button', { name: 'Open drawer' }));

    const dialog = await canvas.findByRole('dialog');
    // 겹침막이 fade-in 으로 시작해 첫 프레임은 투명하다.
    await waitFor(() => expect(dialog).toBeVisible());
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    await userEvent.click(within(dialog).getByRole('button', { name: 'Close' }));
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  },
};

// ─── 키보드 계약 (WAI-ARIA APG Dialog 패턴) ────────────────────────────────
// 열면 포커스가 패널 안으로 들어가고, Tab/Shift+Tab 이 패널 안에서 돌며,
// Esc 로 닫히고, 닫히면 연 버튼으로 포커스가 돌아온다.

export const Keyboard: Story = {
  args: { isOpen: false, onClose: () => {}, children: null },
  render: () => <DrawerDemo />,
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Open drawer' });

    // 키보드만으로 연다.
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    // 제목이 대화상자의 이름이 된다.
    const dialog = await canvas.findByRole('dialog', { name: 'Filters' });

    // ① 열면 포커스가 패널 안으로 들어간다.
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    // ② Tab 이 패널 안에서 돈다 — 마지막 요소 다음은 첫 요소다.
    const input = within(dialog).getByRole('textbox');
    const close = within(dialog).getByRole('button', { name: 'Close' });
    input.focus();
    await userEvent.tab();
    await expect(close).toHaveFocus();
    await userEvent.tab();
    await expect(input).toHaveFocus();
    await userEvent.tab({ shift: true });
    await expect(close).toHaveFocus();

    // ③ Esc 로 닫힌다.
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());

    // ④ 닫히면 연 버튼으로 포커스가 돌아온다.
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
