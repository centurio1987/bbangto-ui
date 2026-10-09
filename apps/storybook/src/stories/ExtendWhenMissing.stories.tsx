/**
 * README 「원하는 것이 없을 때」 절의 예제를 실제로 그려 본다 (KAN-067).
 *
 * 예제 원문은 `_readmeExamples/` 에 있고, README 는 그 파일을 글자 그대로 싣는다. 둘이 같은지는
 * `packages/foundations/src/publishedDocs.test.ts` 가 `pnpm test:unit` 에서 본다. 여기서는 그 예제가
 * 라이브러리를 고치지 않고도 돈다는 것 — 토큰 색을 받고, 키보드로 고를 수 있고, atom 이 노드와 엣지를
 * 그린다는 것 — 을 브라우저에서 확인한다. 예제가 틀리면 앱 에이전트가 따라 하다 막혀 다시 라이브러리를
 * 떠난다. 그것을 막는 자리다.
 *
 * Provider 는 전역 데코레이터(`.storybook/preview.tsx`)가 감싼다 — README 예제도 Provider 안에 두라고 적는다.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { RatingExample } from './_readmeExamples/coreExtend';
import { DecisionSketch } from './_readmeExamples/vizCompose';

const meta = {
  title: 'Overview/Extend When Missing',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** 토큰 변수가 이 자리에서 실제로 어떤 색으로 풀리는지 — 같은 Provider 안에 탐침을 꽂아 잰다. */
function resolvedColor(host: HTMLElement, cssVar: string): string {
  const probe = document.createElement('span');
  probe.style.color = `var(${cssVar})`;
  host.appendChild(probe);
  const color = getComputedStyle(probe).color;
  probe.remove();
  return color;
}

export const CoreRating: Story = {
  render: () => <RatingExample />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const group = await canvas.findByRole('radiogroup', { name: '만족도' });
    const star = (n: number) => canvas.getByRole('radio', { name: `${n}점` });

    // 1. 처음 값 3 — 셋째만 선택, Tab 으로 들어오는 자리도 셋째 하나
    await expect(star(3)).toHaveAttribute('aria-checked', 'true');
    await expect(group.querySelectorAll('[tabindex="0"]')).toHaveLength(1);

    // 2. 토큰 색 — 채운 별은 primary, 빈 별은 border-strong. Provider 밖이면 둘 다 브라우저 기본색이 된다
    const primary = resolvedColor(group, '--bbangto-semantic-primary-base');
    const empty = resolvedColor(group, '--bbangto-semantic-border-strong');
    await expect(primary).not.toBe(empty);
    await expect(getComputedStyle(star(1)).color).toBe(primary);
    await expect(getComputedStyle(star(5)).color).toBe(empty);

    // 3. 클릭과 키보드 — 4점을 누른 뒤 ← 로 3점, End 로 5점. 포커스가 고른 별을 따라간다
    await userEvent.click(star(4));
    await expect(star(4)).toHaveAttribute('aria-checked', 'true');
    await userEvent.keyboard('{ArrowLeft}');
    await expect(star(3)).toHaveAttribute('aria-checked', 'true');
    await expect(star(3)).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(star(5)).toHaveAttribute('aria-checked', 'true');
    await expect(getComputedStyle(star(5)).color).toBe(primary);
  },
};

export const VizCompose: Story = {
  render: () => <DecisionSketch />,
  play: async ({ canvasElement }) => {
    const svg = canvasElement.querySelector('[data-bbangto-viz-canvas]');
    await expect(svg).not.toBeNull();
    await expect(svg!.querySelector('title')?.textContent).toBe('예산에 따른 개발 방식 결정');

    // 노드 셋(마름모 하나 · 둥근 사각형 둘)과 이름표
    await expect(svg!.querySelectorAll('[data-bbangto-viz-node-shape="diamond"]')).toHaveLength(1);
    await expect(svg!.querySelectorAll('[data-bbangto-viz-node-shape="rounded"]')).toHaveLength(2);
    await expect(svg!.textContent).toContain('외주 입찰');
    await expect(svg!.textContent).toContain('내부 개발');

    // 엣지 둘이 id 로 노드를 찾아 실제 경로를 그린다 — 노드가 Canvas 바로 아래가 아니면 여기서 0이 된다
    const edges = svg!.querySelectorAll('path[data-bbangto-viz-edge]');
    await expect(edges).toHaveLength(2);
    for (const e of Array.from(edges)) await expect((e.getAttribute('d') ?? '').length).toBeGreaterThan(4);
  },
};
