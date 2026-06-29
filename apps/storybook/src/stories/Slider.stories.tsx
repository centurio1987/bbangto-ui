import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider, type SliderProps } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within, waitFor, fireEvent } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/Slider',
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
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['primary', 'error', 'success', 'warning'] },
    variant: { control: 'select', options: ['solid', 'minimal', 'stepped'] },
    showValue: { control: 'boolean' },
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

// — New stories for Wave 1 extensions —

export const SizeSmall: Story = {
  name: 'Size / Small',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(40);
    return <Slider {...args} size="sm" value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const fill = canvasElement.querySelector('[data-bbangto-slider-fill]') as HTMLElement | null;
    const knob = canvasElement.querySelector('[data-bbangto-slider-knob]') as HTMLElement | null;
    await expect(fill).not.toBeNull();
    await expect(knob).not.toBeNull();
    // sm track height is 2px
    await expect(fill!.parentElement!.style.height).toBe('2px');
    // sm knob size is 12px
    await expect(knob!.style.width).toBe('12px');
    await expect(knob!.style.height).toBe('12px');
  },
};

export const SizeLarge: Story = {
  name: 'Size / Large',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(60);
    return <Slider {...args} size="lg" value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const fill = canvasElement.querySelector('[data-bbangto-slider-fill]') as HTMLElement | null;
    const knob = canvasElement.querySelector('[data-bbangto-slider-knob]') as HTMLElement | null;
    await expect(fill).not.toBeNull();
    await expect(knob).not.toBeNull();
    // lg track height is 6px
    await expect(fill!.parentElement!.style.height).toBe('6px');
    // lg knob size is 20px
    await expect(knob!.style.width).toBe('20px');
    await expect(knob!.style.height).toBe('20px');
  },
};

export const ColorError: Story = {
  name: 'Color / Error',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(70);
    return <Slider {...args} color="error" value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const fill = canvasElement.querySelector('[data-bbangto-slider-fill]') as HTMLElement | null;
    const knob = canvasElement.querySelector('[data-bbangto-slider-knob]') as HTMLElement | null;
    await expect(fill).not.toBeNull();
    await expect(knob).not.toBeNull();
    // fill should use error token
    await expect(fill!.style.backgroundColor).toContain('var(--bbangto-semantic-error-base)');
    // knob border should use error token.
    // NB: the component sets the `border` shorthand with a CSS var(), so the
    // `borderColor` longhand reads empty — assert on the shorthand instead.
    await expect(knob!.style.border).toContain('var(--bbangto-semantic-error-base)');
  },
};

export const ColorSuccess: Story = {
  name: 'Color / Success',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(80);
    return <Slider {...args} color="success" value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const fill = canvasElement.querySelector('[data-bbangto-slider-fill]') as HTMLElement | null;
    await expect(fill).not.toBeNull();
    await expect(fill!.style.backgroundColor).toContain('var(--bbangto-semantic-success-base)');
  },
};

export const ColorWarning: Story = {
  name: 'Color / Warning',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(55);
    return <Slider {...args} color="warning" value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const fill = canvasElement.querySelector('[data-bbangto-slider-fill]') as HTMLElement | null;
    await expect(fill).not.toBeNull();
    await expect(fill!.style.backgroundColor).toContain('var(--bbangto-semantic-warning-base)');
  },
};

export const ShowValue: Story = {
  name: 'Show Value Label',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(65);
    return <Slider {...args} showValue value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const label = canvasElement.querySelector('[data-bbangto-slider-label]') as HTMLElement | null;
    await expect(label).not.toBeNull();
    await expect(label!.textContent).toBe('65');
    // label should use semantic foreground token
    await expect(label!.style.color).toContain('var(--bbangto-semantic-foreground-base)');
  },
};

export const ShowValueWithSize: Story = {
  name: 'Show Value + Size Large',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(45);
    return <Slider {...args} showValue size="lg" value={value} onChange={(e) => setValue(Number(e.target.value))} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const label = canvasElement.querySelector('[data-bbangto-slider-label]') as HTMLElement | null;
    await expect(label).not.toBeNull();
    await expect(label!.textContent).toBe('45');
  },
};

// — New stories for the `variant` axis —

export const VariantMinimal: Story = {
  name: 'Variant / Minimal',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(50);
    return (
      <Slider
        {...args}
        variant="minimal"
        size="md"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const root = canvasElement.querySelector('[data-bbangto-slider]') as HTMLElement | null;
    const fill = canvasElement.querySelector('[data-bbangto-slider-fill]') as HTMLElement | null;
    const knob = canvasElement.querySelector('[data-bbangto-slider-knob]') as HTMLElement | null;

    // 1. data-attr present with the right value
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-slider-variant')).toBe('minimal');

    // 2. load-bearing style: minimal thins the track below the md baseline (4px → 2px)
    //    and shrinks the thumb below the md baseline (16px).
    await expect(fill).not.toBeNull();
    await expect(knob).not.toBeNull();
    const trackHeightPx = parseInt(fill!.parentElement!.style.height, 10);
    await expect(trackHeightPx).toBeLessThan(4);
    const knobWidthPx = parseInt(knob!.style.width, 10);
    await expect(knobWidthPx).toBeLessThan(16);

    // 3. content renders, is keyboard-focusable, and the controlled value
    //    updates through onChange. fireEvent.change is deterministic here;
    //    synthetic ArrowRight on range inputs does not increment reliably in
    //    this browser-test env (the Default story likewise avoids it).
    const slider = (await canvas.findByRole('slider')) as HTMLInputElement;
    await userEvent.tab();
    await expect(slider).toHaveFocus();
    fireEvent.change(slider, { target: { value: '75' } });
    await waitFor(() => expect(Number(slider.value)).toBe(75));
  },
};

export const VariantStepped: Story = {
  name: 'Variant / Stepped',
  render: (args: SliderProps) => {
    const [value, setValue] = useState(40);
    return (
      <Slider
        {...args}
        variant="stepped"
        min={0}
        max={100}
        step={20}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const root = canvasElement.querySelector('[data-bbangto-slider]') as HTMLElement | null;

    // 1. data-attr present with the right value
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-slider-variant')).toBe('stepped');

    // 2. load-bearing structure: ticks rendered at each step interval.
    //    range 0..100 with step 20 => 5 segments => 6 tick marks (inclusive ends).
    const ticks = canvasElement.querySelectorAll('[data-bbangto-slider-tick]');
    await expect(ticks.length).toBe(6);

    // 3. content renders, is keyboard-focusable, and the controlled value
    //    updates through onChange (deterministic via fireEvent.change).
    const slider = (await canvas.findByRole('slider')) as HTMLInputElement;
    await userEvent.tab();
    await expect(slider).toHaveFocus();
    fireEvent.change(slider, { target: { value: '60' } });
    await waitFor(() => expect(Number(slider.value)).toBe(60));
  },
};
