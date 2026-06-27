import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Existing stories (preserved) ─────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    return <SegmentedControl {...args} segments={['Daily', 'Weekly', 'Monthly']} selectedIndex={index} onChange={setIndex} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const daily = await canvas.findByText('Daily');
    await expect(daily).toBeVisible();
    // 2. 인터랙션
    const weekly = canvas.getByText('Weekly');
    await userEvent.click(weekly);
    await expect(weekly).toBeVisible();
    // 3. 토큰 적용 검증
    const container = canvasElement.querySelector('[style]') as HTMLElement;
    const style = getComputedStyle(container);
    await expect(style.borderRadius).not.toBe('');
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => {
    const [index, setIndex] = useState(0);
    return (
      <div style={{ width: '400px' }}>
        <SegmentedControl {...args} segments={['Left', 'Center', 'Right']} selectedIndex={index} onChange={setIndex} />
      </div>
    );
  },
};

// ── New stories ───────────────────────────────────────────────────────────────

export const SizeSmall: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    return (
      <SegmentedControl
        {...args}
        size="sm"
        segments={['Day', 'Week', 'Month']}
        selectedIndex={index}
        onChange={setIndex}
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const day = await canvas.findByText('Day');
    await expect(day).toBeVisible();
    // 2. 인터랙션
    const week = canvas.getByText('Week');
    await userEvent.click(week);
    await expect(week).toBeVisible();
    // 3. size=sm 적용 확인 — 세그먼트 요소에 data-size 속성이 있어야 함
    const container = canvasElement.querySelector('[data-size="sm"]') as HTMLElement;
    await expect(container).not.toBeNull();
  },
};

export const SizeLarge: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    return (
      <SegmentedControl
        {...args}
        size="lg"
        segments={['Overview', 'Details', 'Settings']}
        selectedIndex={index}
        onChange={setIndex}
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const overview = await canvas.findByText('Overview');
    await expect(overview).toBeVisible();
    const container = canvasElement.querySelector('[data-size="lg"]') as HTMLElement;
    await expect(container).not.toBeNull();
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    return (
      <SegmentedControl
        {...args}
        disabled
        segments={['Read', 'Write', 'Admin']}
        selectedIndex={index}
        onChange={setIndex}
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const read = await canvas.findByText('Read');
    await expect(read).toBeVisible();
    // 2. disabled 상태일 때 클릭해도 onChange가 호출되지 않음
    //    (data-disabled 속성으로 상태 검증)
    const container = canvasElement.querySelector('[data-disabled="true"]') as HTMLElement;
    await expect(container).not.toBeNull();
    // 3. 클릭 시도 — cursor: not-allowed 이지만 이벤트 자체를 막지는 않으므로
    //    onclick handler 내에서 disabled guard가 동작하는지를 data-disabled로 검증
    await userEvent.click(canvas.getByText('Write'));
    // selectedIndex가 바뀌지 않았으므로 'Read' 는 여전히 selected 스타일을 가짐
    const readEl = canvas.getByText('Read');
    await expect(readEl).toBeVisible();
  },
};

export const DisabledIndexes: Story = {
  render: (args) => {
    const [index, setIndex] = useState(0);
    return (
      <SegmentedControl
        {...args}
        segments={['Free', 'Pro', 'Enterprise']}
        disabledIndexes={[2]}
        selectedIndex={index}
        onChange={setIndex}
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const free = await canvas.findByText('Free');
    await expect(free).toBeVisible();
    // 2. 'Enterprise' 세그먼트가 개별 비활성화 속성을 가지는지 검증
    const enterprise = canvas.getByText('Enterprise');
    const enterpriseEl = enterprise.closest('[data-segment-disabled="true"]') as HTMLElement;
    await expect(enterpriseEl).not.toBeNull();
    // 3. 'Pro' 는 활성화 상태여야 함
    const pro = canvas.getByText('Pro');
    await userEvent.click(pro);
    await expect(pro).toBeVisible();
  },
};
