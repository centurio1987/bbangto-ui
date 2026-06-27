import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Testimonials } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Blocks/Testimonials',
  component: Testimonials,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Testimonials>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    quote:
      'The design system saved our team weeks of work. Every component is thoughtfully crafted and the token system makes theming effortless.',
    author: 'Jisoo Kim',
    role: 'Lead Product Designer, LoopWorks',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    quote:
      'I integrated bbangto-ui into our React app in an afternoon. Accessibility is baked in by default — that alone was worth it.',
    author: 'Minho Lee',
    role: 'Frontend Engineer, Crafter Studio',
  },
  {
    quote:
      'The motion foundation makes subtle animations feel native, not bolted on. Our users noticed the difference immediately.',
    author: 'Yuna Park',
    role: 'CTO, Moonly',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
];

export const Default: Story = {
  args: {
    title: 'What our users say',
    items: sampleItems,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 섹션 제목 렌더링 확인
    const heading = await canvas.findByRole('heading', { name: 'What our users say' });
    await expect(heading).toBeVisible();

    // 2. 모든 testimonial 항목이 렌더됐는지 확인 (author 이름으로)
    for (const item of sampleItems) {
      const authorEl = await canvas.findByText(item.author);
      await expect(authorEl).toBeVisible();
    }

    // 3. 첫 번째 인용문 내용 렌더링 확인
    const firstQuote = await canvas.findByText(
      /The design system saved our team weeks of work/i
    );
    await expect(firstQuote).toBeVisible();

    // 4. 역할(role) 텍스트가 렌더됐는지 확인
    const roleEl = await canvas.findByText('Lead Product Designer, LoopWorks');
    await expect(roleEl).toBeVisible();
  },
};

export const WithoutTitle: Story = {
  name: 'Without Title',
  args: {
    items: [
      {
        quote:
          'Honestly the cleanest component library I have worked with. The forwardRef pattern and token system are exactly what I needed.',
        author: 'Donghyun Cho',
        role: 'Staff Engineer, Vertex',
      },
      {
        quote:
          'The Avatar and Card composition inside Testimonials blocks just works out of the box. No wrestling with CSS specificity.',
        author: 'Sooyeon Lim',
        role: 'Design Systems Lead, Radius Inc.',
        avatar: 'https://i.pravatar.cc/150?img=9',
      },
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 제목 없이 아이템들만 렌더됐는지 확인
    const authorEl = await canvas.findByText('Donghyun Cho');
    await expect(authorEl).toBeVisible();

    // h2 heading이 없어야 함
    const headings = canvasElement.querySelectorAll('h2');
    await expect(headings.length).toBe(0);
  },
};

export const LayoutCarousel: Story = {
  name: 'Layout: Carousel',
  args: {
    title: 'What our users say',
    items: sampleItems,
    layout: 'carousel',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector(
      '[data-bbangto-testimonials-layout]'
    ) as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-testimonials-layout')).toBe(
      'carousel'
    );

    // 2. load-bearing: 스크롤러가 overflow-x auto/scroll + scroll-snap 적용
    const scroller = canvasElement.querySelector(
      '.bbangto-testimonials-carousel'
    ) as HTMLElement;
    await expect(scroller).not.toBeNull();
    const scrollerStyle = getComputedStyle(scroller);
    await expect(['auto', 'scroll']).toContain(scrollerStyle.overflowX);
    await expect(scrollerStyle.scrollSnapType).toContain('x');

    // 2b. 스크롤러가 키보드 포커스 가능해야 함 (tabIndex=0)
    await expect(scroller.getAttribute('tabindex')).toBe('0');
    scroller.focus();
    await expect(document.activeElement).toBe(scroller);

    // 2c. prefers-reduced-motion 폴백 규칙이 scoped <style>에 존재
    const allStyles = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(allStyles).toContain('prefers-reduced-motion');
    await expect(allStyles).toContain('scroll-behavior: auto');

    // 3. 인용문/저자 콘텐츠가 여전히 렌더됨
    for (const item of sampleItems) {
      const authorEl = await canvas.findByText(item.author);
      await expect(authorEl).toBeVisible();
    }
  },
};

export const LayoutSingle: Story = {
  name: 'Layout: Single',
  args: {
    title: 'What our users say',
    items: sampleItems,
    layout: 'single',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector(
      '[data-bbangto-testimonials-layout]'
    ) as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-testimonials-layout')).toBe(
      'single'
    );

    // 2. load-bearing: 하나의 prominent 인용문만 렌더 (첫 번째 아이템)
    const quotes = canvasElement.querySelectorAll('blockquote');
    await expect(quotes.length).toBe(1);
    const featured = await canvas.findByText(
      /The design system saved our team weeks of work/i
    );
    await expect(featured).toBeVisible();

    // 첫 번째 저자만 노출, 나머지는 렌더되지 않음
    await expect(await canvas.findByText('Jisoo Kim')).toBeVisible();
    await expect(canvas.queryByText('Minho Lee')).toBeNull();
  },
};

export const LayoutMasonry: Story = {
  name: 'Layout: Masonry',
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  args: {
    title: 'What our users say',
    items: sampleItems,
    layout: 'masonry',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector(
      '[data-bbangto-testimonials-layout]'
    ) as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-testimonials-layout')).toBe(
      'masonry'
    );

    // 2. load-bearing: column-count masonry (> 1 컬럼)
    const wall = canvasElement.querySelector(
      '.bbangto-testimonials-masonry'
    ) as HTMLElement;
    await expect(wall).not.toBeNull();
    const columnCount = Number(getComputedStyle(wall).columnCount);
    await expect(columnCount).toBeGreaterThan(1);

    // 3. 모든 인용문/저자가 여전히 렌더됨
    for (const item of sampleItems) {
      const authorEl = await canvas.findByText(item.author);
      await expect(authorEl).toBeVisible();
    }
  },
};

export const LayoutSplitMedia: Story = {
  name: 'Layout: Split Media',
  parameters: {
    viewport: { defaultViewport: 'desktop' },
  },
  args: {
    title: 'What our users say',
    items: sampleItems,
    layout: 'split-media',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector(
      '[data-bbangto-testimonials-layout]'
    ) as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-testimonials-layout')).toBe(
      'split-media'
    );

    // 2. load-bearing (a): scoped 2-track 규칙이 aggregate <style>에 존재
    const allStyles = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(allStyles).toContain('grid-template-columns: 5fr 4fr');

    // 2. load-bearing (b): dominant 미디어 패널이 portrait aspect-ratio를 가짐
    //    (뷰포트와 무관한 안정 inline 속성)
    const mediaPanel = canvasElement.querySelector(
      '.bbangto-testimonials-media'
    ) as HTMLElement;
    await expect(mediaPanel).not.toBeNull();
    const aspect = getComputedStyle(mediaPanel).aspectRatio;
    await expect(aspect).not.toBe('auto');
    await expect(aspect).toContain('/');

    // 2. load-bearing (c): 한 번에 testimonial 하나만 in view (단일 카드/인용문)
    await expect(canvasElement.querySelectorAll('blockquote').length).toBe(1);

    // 3. 콘텐츠 슬롯 + prev/next 인터랙션: next 클릭 시 다음 저자로 전환
    await expect(await canvas.findByText('Jisoo Kim')).toBeVisible();
    const next = canvas.getByRole('button', { name: 'Next testimonial' });
    await expect(canvas.getByRole('button', { name: 'Previous testimonial' })).toBeVisible();
    await userEvent.click(next);
    await expect(await canvas.findByText('Minho Lee')).toBeVisible();
    // 여전히 단일 인용문만 in view
    await expect(canvasElement.querySelectorAll('blockquote').length).toBe(1);
  },
};

export const LayoutStackedDeck: Story = {
  name: 'Layout: Stacked Deck',
  args: {
    title: 'What our users say',
    items: sampleItems,
    layout: 'stacked-deck',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr 확인
    const section = canvasElement.querySelector(
      '[data-bbangto-testimonials-layout]'
    ) as HTMLElement;
    await expect(section).not.toBeNull();
    await expect(section.getAttribute('data-bbangto-testimonials-layout')).toBe(
      'stacked-deck'
    );

    // 2. load-bearing: 카드들이 position:absolute로 겹쳐 쌓이고 z-index가 내림차순
    const cards = Array.from(
      canvasElement.querySelectorAll('.bbangto-testimonials-deck-card')
    ) as HTMLElement[];
    await expect(cards.length).toBeGreaterThan(1);
    const zIndexes = cards.map((c) => {
      const cs = getComputedStyle(c);
      // 모든 deck 카드는 absolute 포지셔닝이어야 함
      expect(cs.position).toBe('absolute');
      return Number(cs.zIndex);
    });
    // front → back 으로 갈수록 z-index가 엄격히 감소
    for (let i = 1; i < zIndexes.length; i++) {
      await expect(zIndexes[i]).toBeLessThan(zIndexes[i - 1]);
    }

    // 3. 콘텐츠 슬롯: 스택을 구성하는 testimonial 저자들이 렌더됨
    for (const item of sampleItems) {
      const authorEl = await canvas.findByText(item.author);
      await expect(authorEl).toBeVisible();
    }
  },
};
