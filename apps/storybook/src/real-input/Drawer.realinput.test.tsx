import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Button, Drawer } from '@centurio1987/bbangto-ui-core';
import { mount, unmountAll } from './mount';

function DrawerDemo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open drawer</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="sm" aria-labelledby="ri-drawer-title">
        <h2 id="ri-drawer-title">Filters</h2>
        <label>
          Keyword <input name="keyword" />
        </label>
        <Button onClick={() => setIsOpen(false)}>Close</Button>
      </Drawer>
    </>
  );
}

afterEach(unmountAll);

describe('Drawer — 실제 키 입력', () => {
  it('Enter 로 열면 포커스가 패널 안으로 가고, Tab 이 안에서 돌고, Esc 로 닫으면 트리거로 돌아온다', async () => {
    const host = mount(<DrawerDemo />);
    const trigger = Array.from(host.querySelectorAll('button')).find((b) => b.textContent === 'Open drawer')!;
    trigger.focus();

    await userEvent.keyboard('{Enter}');
    const dialog = await vi.waitFor(() => {
      const d = document.querySelector<HTMLElement>('[role="dialog"]');
      if (!d) throw new Error('drawer not open');
      return d;
    });
    await vi.waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));

    // 마지막 요소에서 Tab 을 누르면 첫 요소로 — 패널 밖으로 안 나간다.
    const close = Array.from(dialog.querySelectorAll('button')).find((b) => b.textContent === 'Close')!;
    close.focus();
    await userEvent.keyboard('{Tab}');
    expect(dialog.contains(document.activeElement)).toBe(true);

    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(document.querySelector('[role="dialog"]')).toBeNull());
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
