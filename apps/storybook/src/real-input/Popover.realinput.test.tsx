import React from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Button, Popover } from '@centurio1987/bbangto-ui-core';
import { mount, unmountAll } from './mount';

afterEach(unmountAll);

describe('Popover — 실제 키 입력', () => {
  it('Enter 로 열면 포커스가 패널 안으로 가고, Esc 로 닫으면 트리거로 돌아온다', async () => {
    const host = mount(
      <Popover content={<input aria-label="Keyword" />}>
        <Button>Filters</Button>
      </Popover>,
    );
    const trigger = Array.from(host.querySelectorAll('button')).find((b) => b.textContent === 'Filters')!;
    const panel = host.querySelector<HTMLElement>('[role="dialog"]')!;
    trigger.focus();

    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('true'));
    await vi.waitFor(() => expect(panel.contains(document.activeElement)).toBe(true));

    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
