import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

/** Aggregate every <style> tag's textContent (avoids grabbing a single global @import style). */
const collectStyleText = (root: HTMLElement): string =>
  Array.from(root.querySelectorAll('style'))
    .map((s) => s.textContent ?? '')
    .join('\n');

const meta = {
  title: 'Blocks/FeatureGrid',
  component: FeatureGrid,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const SAMPLE_ITEMS = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: '빠른 빌드',
    description:
      '최적화된 번들러로 개발 서버를 즉시 구동하고, 변경 사항을 밀리초 단위로 반영합니다.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: '타입 안전',
    description:
      'TypeScript 타입 시스템으로 컴파일 단계에서 버그를 잡아냅니다. any 없는 코드를 기본값으로.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: '반응형 그리드',
    description:
      '미디어 쿼리 없이 auto-fit/minmax로 화면 크기에 맞게 자동으로 컬럼이 조정됩니다.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: '접근성 내장',
    description:
      '시맨틱 HTML, ARIA 레이블, 키보드 내비게이션이 기본으로 포함됩니다.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    title: '디자인 토큰',
    description:
      '색상, 간격, 타이포그래피 모두 CSS 변수 토큰으로 관리해 테마 전환이 간단합니다.',
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: '성능 모니터링',
    description:
      '번들 크기와 런타임 성능을 지속적으로 분석해 회귀를 사전에 방지합니다.',
  },
];

/** 기본 스토리: 헤더(제목 + 부제) + 6개 피처 카드 */
export const Default: Story = {
  args: {
    title: '왜 bbangto-ui인가요?',
    subtitle:
      '개발자 경험과 사용자 경험 모두를 최우선으로 설계한 컴포넌트 라이브러리입니다.',
    items: SAMPLE_ITEMS,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 섹션 제목이 렌더되는지 확인
    const heading = await canvas.findByRole('heading', {
      name: '왜 bbangto-ui인가요?',
    });
    await expect(heading).toBeVisible();

    // 2. 부제목이 렌더되는지 확인
    const subtitle = await canvas.findByText(
      /개발자 경험과 사용자 경험 모두를/
    );
    await expect(subtitle).toBeVisible();

    // 3. 모든 피처 항목 헤딩이 렌더되는지 확인
    const featureHeadings = canvas.getAllByRole('heading', { level: 3 });
    await expect(featureHeadings).toHaveLength(SAMPLE_ITEMS.length);

    // 4. 첫 번째 항목 타이틀/설명 확인
    const firstTitle = await canvas.findByRole('heading', { name: '빠른 빌드' });
    await expect(firstTitle).toBeVisible();

    const firstDesc = await canvas.findByText(/최적화된 번들러로/);
    await expect(firstDesc).toBeVisible();
  },
};

/** 아이콘 없는 미니멀 버전 */
export const WithoutIcons: Story = {
  args: {
    title: '핵심 원칙',
    items: [
      {
        title: '단순함',
        description: '복잡한 API를 최소화하고 직관적인 인터페이스를 제공합니다.',
      },
      {
        title: '일관성',
        description: '모든 컴포넌트가 동일한 토큰과 패턴을 따릅니다.',
      },
      {
        title: '확장성',
        description: '작은 프로젝트부터 대규모 앱까지 유연하게 대응합니다.',
      },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const heading = await canvas.findByRole('heading', { name: '핵심 원칙' });
    await expect(heading).toBeVisible();

    const items = canvas.getAllByRole('heading', { level: 3 });
    await expect(items).toHaveLength(3);
  },
};

/** 헤더 없이 아이템만 표시 */
export const ItemsOnly: Story = {
  args: {
    items: SAMPLE_ITEMS.slice(0, 3),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const items = canvas.getAllByRole('heading', { level: 3 });
    await expect(items).toHaveLength(3);
  },
};

/** alternating: 행마다 아이콘/텍스트가 좌우로 교차하는 지그재그 (≥lg에서 2-col) */
export const LayoutAlternating: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  args: {
    layout: 'alternating',
    title: '교차 레이아웃',
    items: SAMPLE_ITEMS.slice(0, 4),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 가 올바른 값으로 존재
    const section = canvasElement.querySelector(
      '[data-bbangto-featuregrid-layout]'
    ) as HTMLElement | null;
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-featuregrid-layout')).toBe(
      'alternating'
    );

    // 2. load-bearing: scoped 2-col(row-reverse zig-zag) 규칙이 <style>에 존재
    const styleText = collectStyleText(canvasElement);
    await expect(styleText).toContain('flex-direction: row');
    await expect(styleText).toContain('row-reverse');
    await expect(styleText).toContain('nth-child(even)');

    // 3. 콘텐츠 슬롯 렌더 확인
    const items = canvas.getAllByRole('heading', { level: 3 });
    await expect(items).toHaveLength(4);
    await expect(
      canvas.getByRole('heading', { name: '빠른 빌드' })
    ).toBeVisible();
  },
};

/** list: 단일 컬럼 세로 스택 */
export const LayoutList: Story = {
  args: {
    layout: 'list',
    title: '리스트 레이아웃',
    items: SAMPLE_ITEMS.slice(0, 4),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector(
      '[data-bbangto-featuregrid-layout]'
    ) as HTMLElement | null;
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-featuregrid-layout')).toBe(
      'list'
    );

    // 2. load-bearing: 컨테이너가 단일 컬럼(flex column)
    const list = section!.querySelector('ul') as HTMLElement;
    const listStyle = getComputedStyle(list);
    await expect(listStyle.display).toBe('flex');
    await expect(listStyle.flexDirection).toBe('column');

    // 3. 콘텐츠 슬롯 렌더 확인
    const items = canvas.getAllByRole('heading', { level: 3 });
    await expect(items).toHaveLength(4);
  },
};

/** bento: 일부 아이템이 2칸/2행을 차지하는 혼합 스팬 그리드 (≥lg) */
export const LayoutBento: Story = {
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  args: {
    layout: 'bento',
    title: '벤토 레이아웃',
    items: SAMPLE_ITEMS,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector(
      '[data-bbangto-featuregrid-layout]'
    ) as HTMLElement | null;
    await expect(section).not.toBeNull();
    await expect(section!.getAttribute('data-bbangto-featuregrid-layout')).toBe(
      'bento'
    );

    // 2. load-bearing: 컨테이너가 grid, scoped 스팬 규칙이 <style>에 존재
    const list = section!.querySelector('ul') as HTMLElement;
    await expect(getComputedStyle(list).display).toBe('grid');

    const styleText = collectStyleText(canvasElement);
    await expect(styleText).toContain('grid-column: span 2');
    await expect(styleText).toContain('grid-row: span 2');

    // 3. 콘텐츠 슬롯 렌더 확인
    const items = canvas.getAllByRole('heading', { level: 3 });
    await expect(items).toHaveLength(SAMPLE_ITEMS.length);
  },
};
