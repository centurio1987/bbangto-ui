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
import { FoundationProvider, lightFoundation, StyleGuideProvider, type StyleGuide } from '@centurio1987/bbangto-ui-core';
import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens';

const mounted: { root: Root; host: HTMLElement }[] = [];

function render(tree: React.ReactElement): HTMLElement {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const root = createRoot(host);
  flushSync(() => root.render(tree));
  mounted.push({ root, host });
  return host;
}

/** ui 를 foundation(기본 light) 아래 document.body 에 그린다. */
export function mount(ui: React.ReactElement, foundation: BbangtoFoundation = lightFoundation): HTMLElement {
  return render(<FoundationProvider foundation={foundation}>{ui}</FoundationProvider>);
}

/**
 * ui 를 style guide 의 색 스킴(foundationKey) 아래 그린다. 모티프 CSS 가 읽는 확장 변수(`--bbangto-ext-*`)는
 * FoundationProvider 가 아니라 StyleGuideProvider 가 깔아서, 모티프 래퍼를 잴 때는 이쪽을 쓴다. (KAN-065)
 */
export function mountStyleGuide(ui: React.ReactElement, styleGuide: StyleGuide, foundationKey?: string): HTMLElement {
  return render(
    <StyleGuideProvider styleGuide={styleGuide} foundationKey={foundationKey} fonts="none">
      {ui}
    </StyleGuideProvider>,
  );
}

/** 그린 것을 모두 걷는다. afterEach 에서 부른다. */
export function unmountAll(): void {
  for (const { root, host } of mounted.splice(0)) {
    root.unmount();
    host.remove();
  }
}
