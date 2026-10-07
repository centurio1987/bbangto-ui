import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Button, Modal } from '@centurio1987/bbangto-ui-core';
import { mount, unmountAll } from './mount';

function ModalDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings">
        <label>
          Name <input name="name" />
        </label>
      </Modal>
    </>
  );
}

afterEach(unmountAll);

describe('Modal — 실제 키 입력', () => {
  it('Enter 로 열면 포커스가 대화상자 안으로 가고, Esc 로 닫으면 트리거로 돌아온다', async () => {
    const host = mount(<ModalDemo />);
    const trigger = Array.from(host.querySelectorAll('button')).find((b) => b.textContent === 'Open modal')!;
    trigger.focus();

    await userEvent.keyboard('{Enter}');
    const dialog = await vi.waitFor(() => {
      const d = document.querySelector<HTMLElement>('[role="dialog"]');
      if (!d) throw new Error('dialog not open');
      return d;
    });
    await vi.waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeNull());
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
