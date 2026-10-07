import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Button, DropdownMenu, MenuItem } from '@centurio1987/bbangto-ui-core';
import { mount, unmountAll } from './mount';

function Demo() {
  const [selected, setSelected] = useState('');
  return (
    <>
      <DropdownMenu trigger={<Button>Edit</Button>}>
        <MenuItem onSelect={() => setSelected('Undo')}>Undo</MenuItem>
        <MenuItem onSelect={() => setSelected('Redo')}>Redo</MenuItem>
        <MenuItem onSelect={() => setSelected('Find')}>Find</MenuItem>
      </DropdownMenu>
      <output data-testid="selected">{selected}</output>
    </>
  );
}

afterEach(unmountAll);

describe('DropdownMenu — 실제 키 입력', () => {
  for (const key of ['{Enter}', ' ']) {
    it(`${key === ' ' ? 'Space' : 'Enter'} 로 열면 첫 항목에 포커스, ↓·Enter 로 고르면 닫히고 트리거로 돌아온다`, async () => {
      const host = mount(<Demo />);
      const trigger = Array.from(host.querySelectorAll('button')).find((b) => b.textContent === 'Edit')!;
      const items = Array.from(host.querySelectorAll<HTMLElement>('[role="menuitem"]'));
      trigger.focus();

      await userEvent.keyboard(key);
      await vi.waitFor(() => expect(document.activeElement).toBe(items[0]));
      expect(trigger.getAttribute('aria-expanded')).toBe('true');

      await userEvent.keyboard('{ArrowDown}');
      await vi.waitFor(() => expect(document.activeElement).toBe(items[1]));
      await userEvent.keyboard('{Enter}');

      await vi.waitFor(() => expect(host.querySelector('[data-testid="selected"]')!.textContent).toBe('Redo'));
      await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
      await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
    });
  }
});
