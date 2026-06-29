import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    labelPosition: { control: 'select', options: ['right', 'left'] },
    variant: { control: 'select', options: ['solid', 'outline'] },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

// ──────────────────────────────────────────────
// 기존 스토리 (보존)
// ──────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchEl = await canvas.findByRole('switch');
    await expect(switchEl).toBeVisible();
    // toggle on
    await userEvent.click(switchEl.closest('label') ?? switchEl);
    await expect(switchEl).toBeChecked();
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} label="Enable notifications" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Enable notifications')).toBeVisible();
    const switchEl = await canvas.findByRole('switch');
    await expect(switchEl).toBeChecked();
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Switch',
    disabled: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchEl = await canvas.findByRole('switch');
    await expect(switchEl).toBeDisabled();
  },
};

// ──────────────────────────────────────────────
// 신규: size variants
// ──────────────────────────────────────────────

export const SizeSmall: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} size="sm" label="Small" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchEl = await canvas.findByRole('switch');
    await expect(switchEl).toBeVisible();
    // 트랙 요소에 data-size 속성 검증
    const track = canvasElement.querySelector('[data-size="sm"]');
    await expect(track).not.toBeNull();
  },
};

export const SizeLarge: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} size="lg" label="Large" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchEl = await canvas.findByRole('switch');
    await expect(switchEl).toBeVisible();
    const track = canvasElement.querySelector('[data-size="lg"]');
    await expect(track).not.toBeNull();
  },
};

export const AllSizes: Story = {
  render: () => {
    const [sm, setSm] = useState(false);
    const [md, setMd] = useState(true);
    const [lg, setLg] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch size="sm" label="Small (sm)" checked={sm} onChange={(e) => setSm(e.target.checked)} />
        <Switch size="md" label="Medium (md — default)" checked={md} onChange={(e) => setMd(e.target.checked)} />
        <Switch size="lg" label="Large (lg)" checked={lg} onChange={(e) => setLg(e.target.checked)} />
      </div>
    );
  },
};

// ──────────────────────────────────────────────
// 신규: loading state
// ──────────────────────────────────────────────

export const Loading: Story = {
  args: {
    label: 'Saving…',
    loading: true,
    checked: true,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchEl = await canvas.findByRole('switch');
    // loading 상태는 disabled처럼 비활성화
    await expect(switchEl).toBeDisabled();
    // aria-busy 표시
    const container = canvasElement.querySelector('[aria-busy="true"]');
    await expect(container).not.toBeNull();
  },
};

export const LoadingUnchecked: Story = {
  args: {
    label: 'Loading state (unchecked)',
    loading: true,
    checked: false,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const switchEl = await canvas.findByRole('switch');
    await expect(switchEl).toBeDisabled();
  },
};

// ──────────────────────────────────────────────
// 신규: labelPosition
// ──────────────────────────────────────────────

export const LabelLeft: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Switch {...args} label="Label on left" labelPosition="left" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const labelText = canvas.getByText('Label on left');
    await expect(labelText).toBeVisible();
    // 라벨이 트랙보다 앞(왼쪽)에 렌더되는지: 라벨 span이 track div보다 DOM상 먼저 위치해야 함
    const label = canvasElement.querySelector('label');
    const children = label ? Array.from(label.childNodes).filter((n) => n.nodeType === 1) as Element[] : [];
    // 첫 번째 element child가 텍스트를 포함하는 span이어야 함
    await expect(children[0]?.textContent).toBe('Label on left');
  },
};

// ──────────────────────────────────────────────
// 신규: variant — outline
// ──────────────────────────────────────────────

export const Outline: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        {...args}
        variant="outline"
        label="Outline switch"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr 훅 확인
    const root = canvasElement.querySelector('[data-bbangto-toggle-variant="outline"]');
    await expect(root).not.toBeNull();

    // ② load-bearing computed style: chrome가 fill→border로 전환됨.
    //    track 배경은 투명, border는 solid로 존재해야 한다 (filled-pill과 구별).
    const track = root?.querySelector('[data-size]') as HTMLElement | null;
    await expect(track).not.toBeNull();
    const trackStyle = getComputedStyle(track!);
    await expect(trackStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');
    await expect(trackStyle.borderTopStyle).toBe('solid');
    await expect(trackStyle.borderTopWidth).not.toBe('0px');

    // ③ 콘텐츠 슬롯 렌더 + 토글 동작
    const switchEl = await canvas.findByRole('switch');
    await expect(canvas.getByText('Outline switch')).toBeVisible();
    await userEvent.click(switchEl.closest('label') ?? switchEl);
    await expect(switchEl).toBeChecked();
  },
};
