import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Calendar, Card, DatePicker } from '@centurio1987/bbangto-ui-core';
import { mount, unmountAll } from './mount';

/**
 * 키보드로 닿게 만든 자리에는 포커스 표시가 보여야 한다(KAN-054 검토 §3-6).
 * 키보드 포커스인지(:focus-visible)는 흉내 낸 입력으로는 믿기 어려워 실제 키와 실제 클릭으로 본다.
 */
const outlineOf = (el: Element) => {
  const cs = getComputedStyle(el);
  return cs.outlineStyle === 'none' ? 'none' : `${cs.outlineStyle} ${cs.outlineWidth}`;
};
const byText = (root: HTMLElement, text: string) =>
  Array.from(root.querySelectorAll<HTMLElement>('button')).find((b) => b.textContent === text)!;

afterEach(unmountAll);

describe('포커스 표시 — 실제 입력', () => {
  it('Card: Tab 으로 오면 테두리, 마우스로 누르면 없다', async () => {
    const host = mount(
      <>
        <button type="button">Before</button>
        <Card onClick={() => {}} aria-label="Project">
          Project
        </Card>
      </>,
    );
    const card = host.querySelector<HTMLElement>('[aria-label="Project"]')!;
    byText(host, 'Before').focus();
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(document.activeElement).toBe(card));
    await vi.waitFor(() => expect(outlineOf(card)).toBe('solid 2px'));

    await userEvent.click(byText(host, 'Before'));
    await vi.waitFor(() => expect(outlineOf(card)).toBe('none'));
    await userEvent.click(card);
    await vi.waitFor(() => expect(document.activeElement).toBe(card));
    expect(outlineOf(card)).toBe('none');
  });

  it('Calendar: 화살표로 옮긴 날짜 칸에 테두리, 마우스로 누른 칸에는 없다', async () => {
    const host = mount(<Calendar defaultValue={new Date(2025, 0, 15)} />);
    const cell = (iso: string) => host.querySelector<HTMLElement>(`[data-bbangto-date="${iso}"]`)!;
    cell('2025-01-15').focus();
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect(document.activeElement).toBe(cell('2025-01-16')));
    await vi.waitFor(() => expect(outlineOf(cell('2025-01-16'))).toBe('solid 2px'));

    await userEvent.click(cell('2025-01-20'));
    await vi.waitFor(() => expect(document.activeElement).toBe(cell('2025-01-20')));
    expect(outlineOf(cell('2025-01-20'))).toBe('none');
    expect(outlineOf(cell('2025-01-16'))).toBe('none');
  });

  it('DatePicker: Tab 으로 온 기본 트리거에 테두리, 벗어나면 없다', async () => {
    function Demo() {
      const [value, setValue] = useState(new Date(2025, 0, 15));
      return (
        <>
          <button type="button">Before</button>
          <DatePicker value={value} onChange={setValue} />
          <button type="button">After</button>
        </>
      );
    }
    const host = mount(<Demo />);
    const trigger = host.querySelector<HTMLElement>('[data-datepicker-trigger]')!;
    expect(outlineOf(trigger)).toBe('none');
    byText(host, 'Before').focus();
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(document.activeElement).toBe(trigger));
    await vi.waitFor(() => expect(outlineOf(trigger)).toBe('solid 2px'));
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(outlineOf(trigger)).toBe('none'));
  });
});
