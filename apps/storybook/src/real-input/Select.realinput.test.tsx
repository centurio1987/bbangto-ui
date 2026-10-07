import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import { Select } from '@centurio1987/bbangto-ui-core';
import { mount, unmountAll } from './mount';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
];

function SelectDemo() {
  const [value, setValue] = useState('');
  return (
    <>
      <button type="button">Before</button>
      <Select aria-label="Fruit" options={options} value={value} onChange={setValue} placeholder="Pick" />
      <output data-testid="value">{value}</output>
    </>
  );
}

afterEach(unmountAll);

describe('Select — 실제 키 입력', () => {
  it('Tab 으로 닿고 ↓ 로 열어 ↓·Enter 로 고르면 닫히고 포커스가 combobox 에 남는다', async () => {
    const host = mount(<SelectDemo />);
    host.querySelector<HTMLButtonElement>('button')!.focus();

    await userEvent.keyboard('{Tab}');
    const combobox = host.querySelector<HTMLElement>('[role="combobox"]')!;
    await vi.waitFor(() => expect(document.activeElement).toBe(combobox));

    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => expect(combobox.getAttribute('aria-expanded')).toBe('true'));
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    await vi.waitFor(() => expect(host.querySelector('[data-testid="value"]')!.textContent).toBe('banana'));
    expect(combobox.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(combobox);
  });
});
