import type { Meta, StoryObj } from '@storybook/react';
import { NumberField } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/NumberField',
  component: NumberField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['outline', 'seven-segment'] },
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

export const SevenSegment: Story = {
  args: { defaultValue: 12, step: 1, size: 'md', variant: 'seven-segment' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr 훅 확인
    const root = canvasElement.querySelector(
      '[data-bbangto-number-variant]'
    ) as HTMLElement;
    await expect(root).not.toBeNull();
    await expect(root.getAttribute('data-bbangto-number-variant')).toBe(
      'seven-segment'
    );

    // ② load-bearing computed style — 7-segment readout treatment.
    // 어두운 screen 패널: 배경이 투명이 아니라 실제 색으로 채워져 있어야 함.
    const readout = canvasElement.querySelector(
      '.bbangto-number-readout'
    ) as HTMLElement;
    await expect(readout).not.toBeNull();
    const readoutStyle = getComputedStyle(readout);
    await expect(readoutStyle.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
    await expect(readoutStyle.backgroundColor).not.toBe('transparent');
    // 등폭(monospace) 셀 정렬: readout 폰트가 monospace 스택으로 해석되어야 함.
    await expect(readoutStyle.fontFamily.toLowerCase()).toContain('mono');

    // 활성 세그먼트 accent glow: lit 글리프에 text-shadow(글로우)가 존재해야 함.
    const lit = canvasElement.querySelector(
      '.bbangto-number-segment-lit'
    ) as HTMLElement;
    await expect(lit).not.toBeNull();
    const litStyle = getComputedStyle(lit);
    await expect(litStyle.textShadow).not.toBe('none');
    await expect(litStyle.textShadow.trim()).not.toBe('');

    // 고정폭 digit 셀: 값(12)의 자릿수만큼 셀이 렌더되어야 함.
    const cells = canvasElement.querySelectorAll('.bbangto-number-cell');
    await expect(cells.length).toBe(2);

    // ③ 콘텐츠 슬롯 — 접근 가능한 spinbutton + 스텝 버튼이 살아 있어야 함.
    const input = await canvas.findByRole('spinbutton');
    await expect(input).toHaveValue(12);

    const increment = canvas.getByRole('button', { name: '증가' });
    await userEvent.click(increment);
    await expect(input).toHaveValue(13);
    // readout 셀이 새 값(13)을 반영.
    await expect(
      canvasElement.querySelectorAll('.bbangto-number-cell').length
    ).toBe(2);

    const decrement = canvas.getByRole('button', { name: '감소' });
    await userEvent.click(decrement);
    await expect(input).toHaveValue(12);
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
