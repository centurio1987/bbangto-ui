import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    autoPlay: { control: 'boolean' },
    showArrows: { control: 'boolean' },
    showDots: { control: 'boolean' },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Slide = ({ tone, children }: { tone: string; children: React.ReactNode }) => (
  <div
    style={{
      minHeight: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: tone,
      color: 'var(--bbangto-semantic-foreground-base)',
      fontFamily: 'var(--bbangto-typography-font-family-sans)',
      border: '1px solid var(--bbangto-semantic-border-base)',
    }}
  >
    {children}
  </div>
);

export const Default: Story = {
  args: {
    autoPlay: false,
    children: [
      <Slide key="one" tone="var(--bbangto-semantic-background-elevated)">First slide</Slide>,
      <Slide key="two" tone="var(--bbangto-semantic-primary-subtle)">Second slide</Slide>,
      <Slide key="three" tone="var(--bbangto-semantic-warning-subtle)">Third slide</Slide>,
    ],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const track = canvasElement.querySelector('[data-bbangto-carousel-track]') as HTMLElement | null;
    const next = await canvas.findByRole('button', { name: 'Next slide' });

    await expect(track).not.toBeNull();
    await expect(getComputedStyle(track!).transitionProperty).toContain('transform');

    await userEvent.click(next);
    await expect(track!.style.transform).toContain('translateX');
    await expect(canvas.getByRole('button', { name: 'Go to slide 2' })).toHaveAttribute(
      'data-bbangto-carousel-dot',
      'active',
    );
  },
};
