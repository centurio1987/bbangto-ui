import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider, type SliderProps } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: SliderProps) => {
    const [value, setValue] = useState(50);
    return <Slider {...args} value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const slider = await canvas.findByRole('slider');
    const fill = canvasElement.querySelector('[data-bbangto-slider-fill]') as HTMLElement | null;
    const knob = canvasElement.querySelector('[data-bbangto-slider-knob]') as HTMLElement | null;

    await expect(fill).not.toBeNull();
    await expect(knob).not.toBeNull();
    await expect(getComputedStyle(fill!).transitionProperty).toContain('width');
    await expect(getComputedStyle(knob!).transitionProperty).toContain('left');

    await userEvent.tab();
    await expect(slider).toHaveFocus();
    await expect(knob!.style.boxShadow).toContain('var(--bbangto-semantic-primary-subtle)');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

export const Disabled: Story = {
  args: {
    value: 30,
    disabled: true,
  },
};
