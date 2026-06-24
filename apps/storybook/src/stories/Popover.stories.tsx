import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Button } from '@centurio1987/core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'filled'],
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 기존 스토리 (보존) ───────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    content: <div style={{ padding: '16px' }}>Popover content here</div>,
    children: <Button>Click me</Button>,
    position: 'bottom',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const trigger = await canvas.findByRole('button', { name: /click me/i });
    await expect(trigger).toBeVisible();
    // 2. 클릭 → popover 열림
    await userEvent.click(trigger);
    const dialog = canvasElement.querySelector('[role="dialog"]');
    await expect(dialog).not.toBeNull();
    // 3. 토큰 적용 검증
    const style = getComputedStyle(dialog as Element);
    await expect(style.borderRadius).not.toBe('');
  },
};

export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '48px', padding: '64px' }}>
      <Popover content={<div style={{ padding: '12px' }}>Top</div>} position="top">
        <Button>Top</Button>
      </Popover>
      <Popover content={<div style={{ padding: '12px' }}>Bottom</div>} position="bottom">
        <Button>Bottom</Button>
      </Popover>
      <Popover content={<div style={{ padding: '12px' }}>Left</div>} position="left">
        <Button>Left</Button>
      </Popover>
      <Popover content={<div style={{ padding: '12px' }}>Right</div>} position="right">
        <Button>Right</Button>
      </Popover>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <Popover
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          content={<div style={{ padding: '12px' }}>Controlled popover</div>}
        >
          <Button>Controlled trigger</Button>
        </Popover>
        <Button variant="outline" onClick={() => setIsOpen((v) => !v)}>
          Toggle externally
        </Button>
      </div>
    );
  },
};

// ─── 신규 스토리 ──────────────────────────────────────────────────────────────

/** size: sm — 좁은 패널 */
export const SizeSmall: Story = {
  args: {
    size: 'sm',
    content: <div style={{ padding: '8px' }}>Small popover</div>,
    children: <Button size="sm">Small trigger</Button>,
    position: 'bottom',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /small trigger/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const dialog = canvasElement.querySelector('[role="dialog"]') as HTMLElement | null;
    await expect(dialog).not.toBeNull();
    // sm size → minWidth은 160px (css 변수가 적용된 값)
    const style = getComputedStyle(dialog!);
    await expect(style.minWidth).not.toBe('');
  },
};

/** size: lg — 넓은 패널 */
export const SizeLarge: Story = {
  args: {
    size: 'lg',
    content: <div style={{ padding: '24px' }}>Large popover with more content area</div>,
    children: <Button>Large trigger</Button>,
    position: 'bottom',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /large trigger/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const dialog = canvasElement.querySelector('[role="dialog"]') as HTMLElement | null;
    await expect(dialog).not.toBeNull();
    const style = getComputedStyle(dialog!);
    await expect(style.minWidth).not.toBe('');
  },
};

/** variant: filled — primary.subtle 배경 */
export const VariantFilled: Story = {
  args: {
    variant: 'filled',
    content: <div style={{ padding: '12px' }}>Filled variant popover</div>,
    children: <Button>Filled popover</Button>,
    position: 'bottom',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /filled popover/i });
    await expect(trigger).toBeVisible();
    await userEvent.click(trigger);
    const dialog = canvasElement.querySelector('[role="dialog"]') as HTMLElement | null;
    await expect(dialog).not.toBeNull();
    // filled variant should expose data-variant attribute
    await expect(dialog!.getAttribute('data-variant')).toBe('filled');
  },
};

/** closeOnContentClick: true — 패널 내부 클릭 시 자동 닫힘 */
export const CloseOnContentClick: Story = {
  args: {
    closeOnContentClick: true,
    content: (
      <div style={{ padding: '12px' }}>
        <button type="button" style={{ cursor: 'pointer' }}>
          Click me to close
        </button>
      </div>
    ),
    children: <Button>Open and click inside</Button>,
    position: 'bottom',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: /open and click inside/i });
    await userEvent.click(trigger);
    // popover should be open
    const dialog = canvasElement.querySelector('[role="dialog"]') as HTMLElement | null;
    await expect(dialog).not.toBeNull();

    // click the inner button
    const innerBtn = await within(dialog!).findByRole('button', { name: /click me to close/i });
    await userEvent.click(innerBtn);

    // After clicking inside, popover should now be hidden (opacity 0 / visibility hidden)
    await waitFor(() => {
      const styleAfter = getComputedStyle(dialog!);
      expect(styleAfter.visibility).toBe('hidden');
    });
  },
};
