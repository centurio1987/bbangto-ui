import type { Meta, StoryObj } from '@storybook/react';
import { NumberField } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/NumberField',
  component: NumberField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 0, step: 1, size: 'md' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인
    const input = await canvas.findByRole('spinbutton');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue(0);

    // 2. 증가 버튼 클릭 시 표시 값이 +step
    const increment = canvas.getByRole('button', { name: '증가' });
    await userEvent.click(increment);
    await expect(input).toHaveValue(1);

    await userEvent.click(increment);
    await expect(input).toHaveValue(2);

    // 3. 감소 버튼 검증
    const decrement = canvas.getByRole('button', { name: '감소' });
    await userEvent.click(decrement);
    await expect(input).toHaveValue(1);
  },
};

export const WithBounds: Story = {
  args: { defaultValue: 5, min: 0, max: 5, step: 1 },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole('spinbutton');
    await expect(input).toHaveValue(5);

    // max 경계에서 증가 버튼 비활성
    const increment = canvas.getByRole('button', { name: '증가' });
    await expect(increment).toBeDisabled();

    // 감소하면 max 미만이 되어 증가 버튼 다시 활성
    const decrement = canvas.getByRole('button', { name: '감소' });
    await userEvent.click(decrement);
    await expect(input).toHaveValue(4);
    await expect(increment).toBeEnabled();
  },
};

export const Disabled: Story = {
  args: { defaultValue: 3, disabled: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const input = await canvas.findByRole('spinbutton');
    await expect(input).toBeDisabled();
    await expect(canvas.getByRole('button', { name: '증가' })).toBeDisabled();
    await expect(canvas.getByRole('button', { name: '감소' })).toBeDisabled();
  },
};
