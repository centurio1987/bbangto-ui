import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { DatePicker } from '@centurio1987/bbangto-ui-core';
import { mount, unmountAll } from './mount';

function Demo() {
  const [value, setValue] = useState(new Date(2025, 0, 15));
  return <DatePicker value={value} onChange={setValue} />;
}

const focusedDate = () => (document.activeElement as HTMLElement | null)?.getAttribute('data-bbangto-date');

afterEach(unmountAll);

describe('DatePicker — 실제 키 입력', () => {
  it('Enter 로 열면 선택된 날에 포커스가 가고, Esc 로 닫으면 트리거로 돌아온다', async () => {
    const host = mount(<Demo />);
    const trigger = host.querySelector<HTMLElement>('[data-datepicker-trigger]')!;
    trigger.focus();

    await userEvent.keyboard('{Enter}');
    await vi.waitFor(() => expect(focusedDate()).toBe('2025-01-15'));
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(focusedDate()).toBe('2025-01-16'));

    await userEvent.keyboard('{Escape}');
    await vi.waitFor(() => expect(trigger.getAttribute('aria-expanded')).toBe('false'));
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
  });
});
