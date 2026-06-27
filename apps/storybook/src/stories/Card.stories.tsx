import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Text, Button } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    elevation: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    bordered: {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled', 'retro', 'pixel'],
    },
    interactive: {
      control: 'boolean',
    },
    status: {
      control: 'select',
      options: ['none', 'error', 'success', 'warning'],
    },
    layout: {
      control: 'select',
      options: ['vertical', 'horizontal', 'overlay'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── 기존 스토리 (보존) ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    elevation: 'sm',
    padding: 'md',
    bordered: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
        <Text variant="title3">Card Title</Text>
        <Text variant="body2" color="muted">
          This is a card component that wraps its children with consistent spacing, borders, and
          shadows according to the theme.
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
          <Button variant="ghost" color="neutral">
            Cancel
          </Button>
          <Button variant="solid" color="primary">
            Confirm
          </Button>
        </div>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    ...Default.args,
    elevation: 'lg',
    bordered: false,
  },
};

// ── 신규 스토리 ──────────────────────────────────────────────────────────────

export const VariantOutlined: Story = {
  name: 'Variant / Outlined',
  args: {
    variant: 'outlined',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Outlined Card</Text>
        <Text variant="body2" color="muted">
          Border only, no shadow. Ideal for low-emphasis containers.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const heading = await canvas.findByText('Outlined Card');
    await expect(heading).toBeVisible();
    // 2. outlined variant — 카드 래퍼에 boxShadow 없음, border 있음
    const card = canvasElement.querySelector('[data-card-variant="outlined"]') as HTMLElement;
    await expect(card).not.toBeNull();
    const style = getComputedStyle(card);
    // outlined: shadow이 none이거나 empty
    const shadow = style.boxShadow;
    await expect(shadow === 'none' || shadow === '').toBe(true);
    // border가 설정돼 있음 (not 'none')
    await expect(style.borderStyle).not.toBe('none');
  },
};

export const VariantFilled: Story = {
  name: 'Variant / Filled',
  args: {
    variant: 'filled',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Filled Card</Text>
        <Text variant="body2" color="muted">
          Subtle background, no border or shadow. Used for inset / sunken areas.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByText('Filled Card');
    await expect(heading).toBeVisible();
    const card = canvasElement.querySelector('[data-card-variant="filled"]') as HTMLElement;
    await expect(card).not.toBeNull();
    const style = getComputedStyle(card);
    // filled: no border, no shadow
    const shadow = style.boxShadow;
    await expect(shadow === 'none' || shadow === '').toBe(true);
    await expect(style.borderStyle === 'none' || style.border === 'none').toBe(true);
  },
};

export const Retro: Story = {
  name: 'Variant / Retro',
  args: {
    variant: 'retro',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Retro Card</Text>
        <Text variant="body2" color="muted">
          Thick flat border with a hard offset shadow — no soft elevation.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 3. content slot renders
    const heading = await canvas.findByText('Retro Card');
    await expect(heading).toBeVisible();
    // 1. data-attr on root
    const card = canvasElement.querySelector(
      '[data-bbangto-card-variant="retro"]'
    ) as HTMLElement;
    await expect(card).not.toBeNull();
    // 2. load-bearing: thick solid border + hard offset shadow (0 blur / 0 spread)
    const style = getComputedStyle(card);
    await expect(style.borderTopStyle).toBe('solid');
    await expect(parseInt(style.borderTopWidth, 10)).toBeGreaterThanOrEqual(2);
    // zero radius, hard corners
    await expect(parseInt(style.borderTopLeftRadius, 10)).toBe(0);
    // hard offset: shadow present and contains a 0-blur / 0-spread pair
    await expect(style.boxShadow).not.toBe('none');
    await expect(style.boxShadow.includes('0px 0px')).toBe(true);
  },
};

export const Pixel: Story = {
  name: 'Variant / Pixel',
  args: {
    variant: 'pixel',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Pixel Card</Text>
        <Text variant="body2" color="muted">
          Stepped 8-bit frame built from layered box-shadow steps, zero radius.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 3. content slot renders
    const heading = await canvas.findByText('Pixel Card');
    await expect(heading).toBeVisible();
    // 1. data-attr on root
    const card = canvasElement.querySelector(
      '[data-bbangto-card-variant="pixel"]'
    ) as HTMLElement;
    await expect(card).not.toBeNull();
    // 2. load-bearing: frame is drawn by layered box-shadow steps, not a border.
    const style = getComputedStyle(card);
    // zero radius — hard pixel corners
    await expect(parseInt(style.borderTopLeftRadius, 10)).toBe(0);
    // no smooth border — the outline lives entirely in the box-shadow
    await expect(style.borderTopStyle).toBe('none');
    // multiple stepped shadow layers (each layer carries its own colour token)
    await expect(style.boxShadow).not.toBe('none');
    const layerCount = (style.boxShadow.match(/rgb/g) ?? []).length;
    await expect(layerCount).toBeGreaterThanOrEqual(2);
  },
};

export const Interactive: Story = {
  args: {
    variant: 'elevated',
    interactive: true,
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Interactive Card</Text>
        <Text variant="body2" color="muted">
          Clickable card — cursor changes to pointer and hover feedback is applied.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByText('Interactive Card');
    await expect(heading).toBeVisible();
    // interactive 카드는 role="button" 또는 tabIndex="0"을 가짐
    const card = canvasElement.querySelector('[data-card-interactive="true"]') as HTMLElement;
    await expect(card).not.toBeNull();
    await expect(card.getAttribute('role')).toBe('button');
    await expect(card.getAttribute('tabindex')).toBe('0');
    // cursor: pointer 검증
    const style = getComputedStyle(card);
    await expect(style.cursor).toBe('pointer');
    // 클릭 이벤트 — 에러 없이 완료
    await userEvent.click(card);
  },
};

export const StatusError: Story = {
  name: 'Status / Error',
  args: {
    status: 'error',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Error State</Text>
        <Text variant="body2" color="muted">
          Something went wrong. This card uses the error status token for the border accent.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const heading = await canvas.findByText('Error State');
    await expect(heading).toBeVisible();
    const card = canvasElement.querySelector('[data-card-status="error"]') as HTMLElement;
    await expect(card).not.toBeNull();
    // 상단 accent border가 적용돼 있음 (borderTop 색이 설정됨)
    const style = getComputedStyle(card);
    await expect(style.borderTopColor).not.toBe('');
    await expect(style.borderTopColor).not.toBe('transparent');
  },
};

export const StatusSuccess: Story = {
  name: 'Status / Success',
  args: {
    status: 'success',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Success State</Text>
        <Text variant="body2" color="muted">
          Operation completed. Top accent uses success color token.
        </Text>
      </div>
    ),
  },
};

export const StatusWarning: Story = {
  name: 'Status / Warning',
  args: {
    status: 'warning',
    padding: 'md',
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Warning State</Text>
        <Text variant="body2" color="muted">
          Proceed with caution. Top accent uses warning color token.
        </Text>
      </div>
    ),
  },
};

// ── Layout 축 스토리 ─────────────────────────────────────────────────────────

const mediaBlock = (
  <div
    role="img"
    aria-label="Sample media"
    style={{
      width: '100%',
      height: '100%',
      minHeight: '140px',
      backgroundColor: '#6366f1',
      backgroundImage: 'linear-gradient(135deg, #6366f1, #ec4899)',
    }}
  />
);

export const Horizontal: Story = {
  name: 'Layout / Horizontal',
  args: {
    layout: 'horizontal',
    variant: 'outlined',
    padding: 'md',
    media: mediaBlock,
    children: (
      <div style={{ maxWidth: '280px' }}>
        <Text variant="title3">Horizontal Card</Text>
        <Text variant="body2" color="muted">
          Media sits on the left, content flows on the right in a flex row.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 3. content still renders
    const heading = await canvas.findByText('Horizontal Card');
    await expect(heading).toBeVisible();
    // 1. data-attr present with right value on root
    const card = canvasElement.querySelector(
      '[data-bbangto-card-layout="horizontal"]'
    ) as HTMLElement;
    await expect(card).not.toBeNull();
    // 2. load-bearing style: flex row container with media on the left
    const style = getComputedStyle(card);
    await expect(style.display).toBe('flex');
    await expect(style.flexDirection).toBe('row');
    // media slot rendered
    const mediaEl = card.querySelector('[data-card-media]') as HTMLElement;
    await expect(mediaEl).not.toBeNull();
    await expect(canvas.getByRole('img', { name: 'Sample media' })).toBeInTheDocument();
  },
};

export const Overlay: Story = {
  name: 'Layout / Overlay',
  args: {
    layout: 'overlay',
    variant: 'elevated',
    padding: 'lg',
    media: mediaBlock,
    children: (
      <div style={{ maxWidth: '280px', color: '#ffffff' }}>
        <Text variant="title3">Overlay Card</Text>
        <Text variant="body2">
          Media fills the card; content is overlaid on top of a readable scrim.
        </Text>
      </div>
    ),
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 3. content still renders
    const heading = await canvas.findByText('Overlay Card');
    await expect(heading).toBeVisible();
    // 1. data-attr present with right value on root
    const card = canvasElement.querySelector(
      '[data-bbangto-card-layout="overlay"]'
    ) as HTMLElement;
    await expect(card).not.toBeNull();
    // root establishes a positioning context for the absolute media
    const cardStyle = getComputedStyle(card);
    await expect(cardStyle.position).toBe('relative');
    // 2. load-bearing style: media is absolutely positioned to fill the card
    const mediaEl = card.querySelector('[data-card-media]') as HTMLElement;
    await expect(mediaEl).not.toBeNull();
    const mediaStyle = getComputedStyle(mediaEl);
    await expect(mediaStyle.position).toBe('absolute');
    // scrim present for readability
    const scrim = card.querySelector('[data-card-scrim]') as HTMLElement;
    await expect(scrim).not.toBeNull();
    await expect(canvas.getByRole('img', { name: 'Sample media' })).toBeInTheDocument();
  },
};
