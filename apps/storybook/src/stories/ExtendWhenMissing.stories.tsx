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
 * `VizOutsideProvider` 하나만 데코레이터를 끄고, 그 말이 왜 필요한지를 잰다 (KAN-072).
 */
import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';
import { Flowchart } from '@centurio1987/bbangto-ui-visualization';
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

    // 색을 비워 둔 그림은 Provider 안에서만 칠해진다 — README 가 「Provider 안에 둔다」고 적는 근거다.
    // 밖이면 도형은 검게 채워지고(rgb(0, 0, 0)) 엣지 stroke 는 none 이다(2026-10-09 chromium 실측).
    await expect(svg!.closest('[data-bbangto-viz-style-guide]')).not.toBeNull();
    for (const e of Array.from(edges)) await expect(getComputedStyle(e).stroke).not.toBe('none');
    const diamond = svg!.querySelector('[data-bbangto-viz-node-shape="diamond"]')!;
    await expect(getComputedStyle(diamond).fill).not.toBe('rgb(0, 0, 0)');
  },
};

/**
 * Provider 밖에서는 무엇이 그려지는가 — 루트 `README.md` 사례 8 과 `packages/visualization/README.md`
 * 「원하는 것이 없을 때」·「구현 규약」이 적는 사실의 근거다. 예전 서술(「무채색 base 로 떨어져 캔버스는 흰색,
 * 선은 #333333」)은 틀렸다. 무채색으로 떨어지는 것은 `useVizFoundation()` 이 돌려주는 JS 값뿐이고, 그림은 색
 * 변수와 계약 스타일시트가 둘 다 없어 SVG 기본값으로 그려진다. 라이브러리가 나중에 기본 색을 갖게 되면 이
 * 스토리가 먼저 빨개진다 — 그때 README 두 곳도 함께 고친다.
 *
 * 일부러 나쁜 렌더를 재는 스토리다. 글자와 도형이 같은 검정이라 a11y 대비 경고가 나는 것이 정상이다.
 */
function PipelineWithoutProvider() {
  // 루트 README 사례 8 절차 1 의 Flowchart 를 Provider 만 빼고 그대로 옮겼다.
  return (
    <Flowchart
      width={540}
      height={124}
      data={{
        nodes: [
          { id: 'ingest', x: 20, y: 20, width: 140, height: 64, label: 'Ingest' },
          { id: 'check', x: 200, y: 20, width: 140, height: 64, label: 'Valid?', shape: 'diamond' },
          { id: 'store', x: 380, y: 20, width: 140, height: 64, label: 'Store' },
        ],
        edges: [
          { id: 'e1', from: 'ingest', to: 'check', markerEnd: 'arrow' },
          { id: 'e2', from: 'check', to: 'store', label: 'yes', markerEnd: 'arrow' },
        ],
      }}
    />
  );
}

export const VizOutsideProvider: Story = {
  parameters: { bbangtoProviders: false },
  render: () => (
    <div>
      <div data-sample="flowchart">
        <PipelineWithoutProvider />
      </div>
      <div data-sample="atoms">
        <DecisionSketch />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const sample of ['flowchart', 'atoms']) {
      const host = canvasElement.querySelector<HTMLElement>(`[data-sample="${sample}"]`)!;
      const svg = host.querySelector('[data-bbangto-viz-canvas]')!;
      await expect(svg).not.toBeNull();
      await expect(host.closest('[data-bbangto-viz-style-guide]')).toBeNull();

      // 캔버스는 흰색이 아니라 배경이 없다(투명)
      await expect(getComputedStyle(svg).backgroundColor).toBe('rgba(0, 0, 0, 0)');

      // 도형은 검게 채워지고 테두리가 없다
      const shapes = Array.from(svg.querySelectorAll('[data-bbangto-viz-node-shape]'));
      await expect(shapes).toHaveLength(3);
      for (const s of shapes) {
        await expect(getComputedStyle(s).fill).toBe('rgb(0, 0, 0)');
        await expect(getComputedStyle(s).stroke).toBe('none');
      }

      // 이름표 글자도 검정이라 검은 도형 위에서 읽히지 않는다
      const labels = Array.from(svg.querySelectorAll('[data-bbangto-viz-node-label] text'));
      await expect(labels).toHaveLength(3);
      for (const t of labels) await expect(getComputedStyle(t).fill).toBe('rgb(0, 0, 0)');

      // 엣지 선은 그려지지 않는다. 화살촉 마커는 따로 칠해져 검은 삼각형만 남는다
      const edges = Array.from(svg.querySelectorAll('path[data-bbangto-viz-edge]'));
      await expect(edges).toHaveLength(2);
      for (const e of edges) {
        await expect(getComputedStyle(e).stroke).toBe('none');
        const ref = /url\(#([^)]+)\)/.exec(e.getAttribute('marker-end') ?? '')?.[1];
        await expect(ref).toBeDefined();
        const head = svg.querySelector(`marker[id="${ref}"] > *`);
        await expect(head).not.toBeNull();
        await expect(getComputedStyle(head!).fill).toBe('rgb(0, 0, 0)');
      }
    }
  },
};
