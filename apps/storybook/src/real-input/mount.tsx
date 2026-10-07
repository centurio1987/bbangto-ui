/**
 * 실제 키 입력 테스트(KAN-054)의 공용 마운트.
 *
 * play 테스트의 `storybook/test` `userEvent` 는 이벤트를 흉내 낸다. 그래서 열 때 포커스가 옮겨 가는 오버레이의
 * 렌더 순서 결함(KAN-053: Enter 로 연 Modal 에 포커스가 안 들어감)을 못 잡는다. 이 폴더의 테스트는
 * `vitest/browser` 의 `userEvent` 로 Playwright 를 거쳐 실제 키를 보낸다.
 * 어느 컴포넌트가 여기 테스트를 가져야 하는지는 루트 `keyboard-coverage.json` 의 `realInput` 이 정한다.
 */
import React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { FoundationProvider, lightFoundation } from '@centurio1987/bbangto-ui-core';

const mounted: { root: Root; host: HTMLElement }[] = [];

/** ui 를 light foundation 아래 document.body 에 그린다. */
export function mount(ui: React.ReactElement): HTMLElement {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  flushSync(() => root.render(<FoundationProvider foundation={lightFoundation}>{ui}</FoundationProvider>));
  mounted.push({ root, host });
  return host;
}

/** 그린 것을 모두 걷는다. afterEach 에서 부른다. */
export function unmountAll(): void {
  for (const { root, host } of mounted.splice(0)) {
    root.unmount();
    host.remove();
  }
}
