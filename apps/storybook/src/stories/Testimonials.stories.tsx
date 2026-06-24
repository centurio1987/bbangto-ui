import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Testimonials } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

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
