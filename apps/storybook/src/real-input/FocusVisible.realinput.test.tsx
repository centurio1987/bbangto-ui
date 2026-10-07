import React, { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { userEvent } from 'vitest/browser';
import {
  Button,
  Calendar,
  Card,
  DatePicker,
  Dock,
  Input,
  Link,
  Menu,
  MenuItem,
  NumberField,
  Radio,
  RadioGroup,
  RichTextEditor,
  ScrollArea,
  Searchfield,
  Switch,
  Textarea,
  TreeView,
} from '@centurio1987/bbangto-ui-core';
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

/**
 * root 안에서 눈에 보이는 테두리를 그린 요소의 테두리 모양 목록(KAN-059).
 * 테두리를 그리는 자리는 컴포넌트마다 다르다 — 자기 자신, 감싼 상자, 숨긴 입력 대신 트랙. 그래서 요소를 고르지 않고
 * 컴포넌트 안을 훑는다. 숨긴 입력에 브라우저가 그리는 기본 테두리는 보이지 않으므로 세지 않는다 — 크기가 4px 이하이거나,
 * 잘라 낸(clip·clip-path) 요소다(Radio segmented 의 입력은 크기는 16px 이고 clip 으로 숨는다).
 */
const ringsIn = (root: Element) =>
  [root, ...Array.from(root.querySelectorAll('*'))]
    .filter((el) => {
      const cs = getComputedStyle(el);
      if (cs.outlineStyle === 'none' || parseFloat(cs.outlineWidth) === 0) return false;
      if (cs.clip !== 'auto' || cs.clipPath !== 'none') return false;
      const r = el.getBoundingClientRect();
      return r.width > 4 && r.height > 4;
    })
    .map(outlineOf);

/** Before 버튼 · 컴포넌트 · After 버튼을 나란히 그리고, 컴포넌트를 감싼 요소를 돌려준다. */
function mountBetween(ui: React.ReactElement) {
  const host = mount(
    <>
      <button type="button">Before</button>
      <div data-under-test>{ui}</div>
      <button type="button">After</button>
    </>,
  );
  return { host, root: host.querySelector<HTMLElement>('[data-under-test]')! };
}

/** Before 에서 실제 Tab 을 n 번 눌러 컴포넌트 안으로 들어간다. */
async function tabIn(host: HTMLElement, times = 1) {
  byText(host, 'Before').focus();
  for (let i = 0; i < times; i++) await userEvent.keyboard('{Tab}');
}

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

/**
 * KAN-059 — 브라우저 기본 테두리를 끄거나 입력을 숨긴 나머지 core 컴포넌트.
 * 키보드(Tab·화살표)로 오면 컴포넌트 안에 2px 테두리가 하나 보이고, 마우스로 누르거나 벗어나면 없다.
 * 글자 입력칸은 마우스로 눌러도 브라우저가 키보드 포커스로 치므로 클릭 대신 벗어날 때를 본다.
 */
describe('포커스 표시 — 실제 입력 (KAN-059)', () => {
  it('Button: Tab 으로 오면 테두리, 마우스로 누르면 없다', async () => {
    const { host, root } = mountBetween(<Button>Save</Button>);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('Save'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(byText(host, 'Before'));
    await userEvent.click(byText(host, 'Save'));
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('Save'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Link: 글자 변형도 Tab 으로 오면 테두리, 마우스로 누르면 없다', async () => {
    const { host, root } = mountBetween(
      <Link href="#focus-ring" onClick={(e) => e.preventDefault()}>
        Docs
      </Link>,
    );
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('Docs'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(byText(host, 'Before'));
    await userEvent.click(root.querySelector('a')!);
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('Docs'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Link: 상자 변형은 box-shadow 가 아니라 같은 테두리를 쓴다', async () => {
    const { host, root } = mountBetween(
      <Link variant="outline" href="#focus-ring" onClick={(e) => e.preventDefault()}>
        Docs
      </Link>,
    );
    await tabIn(host);
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    expect(getComputedStyle(root.querySelector('a')!).boxShadow).toBe('none');
  });

  it('NumberField: 증감 버튼은 Tab 이면 테두리, 클릭이면 없다', async () => {
    const { host, root } = mountBetween(<NumberField defaultValue={5} />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('감소'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(root.querySelector<HTMLElement>('[aria-label="증가"]')!);
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('NumberField: 입력에 Tab 으로 오면 바깥 상자에 테두리, 벗어나면 없다', async () => {
    const { host, root } = mountBetween(<NumberField defaultValue={5} />);
    await tabIn(host, 2);
    await vi.waitFor(() => expect(document.activeElement?.tagName).toBe('INPUT'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{Tab}{Tab}');
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('After'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('NumberField: seven-segment 는 숨긴 입력에 Tab 으로 오면 숫자 판에 테두리', async () => {
    const { host, root } = mountBetween(<NumberField variant="seven-segment" defaultValue={5} />);
    await tabIn(host, 2);
    await vi.waitFor(() => expect(document.activeElement?.tagName).toBe('INPUT'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{Tab}{Tab}');
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('TreeView: Tab 으로 온 항목과 화살표로 옮긴 항목에 테두리, 마우스로 누르면 없다', async () => {
    const nodes = [
      { id: 'a', label: 'Alpha' },
      { id: 'b', label: 'Beta' },
    ];
    const { host, root } = mountBetween(<TreeView nodes={nodes} />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('role')).toBe('treeitem'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => expect(document.activeElement?.textContent).toContain('Beta'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(root.querySelector('[role="treeitem"]')!);
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Menu: Tab 으로 온 항목과 화살표로 옮긴 항목에 테두리, 마우스로 누르면 없다', async () => {
    const { host, root } = mountBetween(
      <Menu>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>,
    );
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('Copy'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{ArrowDown}');
    await vi.waitFor(() => expect(document.activeElement?.textContent).toBe('Paste'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(root.querySelector('[role="menuitem"]')!);
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Dock: Tab 으로 온 항목에 테두리, 마우스로 누르면 없다', async () => {
    const items = [
      { icon: <span>A</span>, label: 'Home' },
      { icon: <span>B</span>, label: 'Search' },
    ];
    const { host, root } = mountBetween(<Dock items={items} />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Home'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(root.querySelector('[aria-label="Search"]')!);
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('ScrollArea: Tab 으로 온 스크롤 상자에 테두리, 마우스로 누르면 없다', async () => {
    const { host, root } = mountBetween(
      <ScrollArea maxHeight={80}>
        <p style={{ height: 300, margin: 0 }}>Long content</p>
      </ScrollArea>,
    );
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('tabindex')).toBe('0'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(byText(host, 'Before'));
    await userEvent.click(root.querySelector<HTMLElement>('[data-bbangto-scrollarea]')!);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('tabindex')).toBe('0'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Input: Tab 으로 오면 감싼 상자에 테두리, 벗어나면 없다 — 소비자 onFocus 도 돈다', async () => {
    const onFocus = vi.fn();
    const { host, root } = mountBetween(<Input aria-label="Name" onFocus={onFocus} />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Name'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    expect(onFocus).toHaveBeenCalledTimes(1);
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Input: composer-panel 변형도 감싼 상자에 테두리', async () => {
    const { host, root } = mountBetween(<Input variant="composer-panel" aria-label="Message" />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('aria-label')).toBe('Message'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
  });

  it('Textarea: Tab 으로 오면 테두리, 벗어나면 없다', async () => {
    const { host, root } = mountBetween(<Textarea aria-label="Notes" />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.tagName).toBe('TEXTAREA'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Searchfield: Tab 으로 오면 감싼 상자에 테두리, 벗어나면 없다', async () => {
    const { host, root } = mountBetween(<Searchfield aria-label="Search" />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.tagName).toBe('INPUT'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('RichTextEditor: 편집 영역에 오면 바깥 상자에 테두리, 벗어나면 없다', async () => {
    const { host, root } = mountBetween(<RichTextEditor />);
    byText(host, 'After').focus();
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('contenteditable')).toBe('true'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{Tab}');
    await vi.waitFor(() => expect(ringsIn(root)).toEqual([]));
  });

  it('Switch: 숨긴 입력에 Tab 으로 오면 트랙에 테두리, 마우스로 누르면 없다', async () => {
    const { host, root } = mountBetween(<Switch label="Wi-Fi" />);
    await tabIn(host);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('role')).toBe('switch'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(byText(host, 'Before'));
    await userEvent.click(root.querySelector('label')!);
    await vi.waitFor(() => expect(document.activeElement?.getAttribute('role')).toBe('switch'));
    expect(ringsIn(root)).toEqual([]);
  });

  it('Radio: segmented 는 숨긴 입력에 Tab 으로 오면 그 조각에 테두리, 마우스로 누르면 없다', async () => {
    const { host, root } = mountBetween(
      <RadioGroup name="size" variant="segmented">
        <Radio value="s" label="S" defaultChecked />
        <Radio value="m" label="M" />
      </RadioGroup>,
    );
    await tabIn(host);
    await vi.waitFor(() => expect((document.activeElement as HTMLInputElement | null)?.value).toBe('s'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.keyboard('{ArrowRight}');
    await vi.waitFor(() => expect((document.activeElement as HTMLInputElement | null)?.value).toBe('m'));
    await vi.waitFor(() => expect(ringsIn(root)).toEqual(['solid 2px']));
    await userEvent.click(byText(host, 'Before'));
    await userEvent.click(root.querySelectorAll('label')[0]!);
    await vi.waitFor(() => expect((document.activeElement as HTMLInputElement | null)?.value).toBe('s'));
    expect(ringsIn(root)).toEqual([]);
  });
});
