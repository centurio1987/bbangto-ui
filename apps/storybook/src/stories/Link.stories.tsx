import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@centurio1987/core';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'muted',
        'standalone',
        'inline',
        'outline',
        'solid',
        'ghost',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    underline: { control: 'select', options: ['always', 'hover', 'none'] },
    external: { control: 'boolean' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Read the documentation',
    href: '#docs',
    variant: 'default',
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const link = await canvas.findByRole('link', {
      name: /read the documentation/i,
    });
    await expect(link).toBeVisible();
    // 2. href 적용 검증
    await expect(link).toHaveAttribute('href', '#docs');
  },
};

export const Muted: Story = {
  args: {
    children: 'Secondary link',
    href: '#secondary',
    variant: 'muted',
    size: 'md',
  },
};

export const External: Story = {
  args: {
    children: 'Visit our GitHub',
    href: 'https://github.com',
    variant: 'standalone',
    external: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = await canvas.findByRole('link', { name: /visit our github/i });
    await expect(link).toBeVisible();
    // external -> target/rel 자동 설정 검증
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};

export const Inline: Story = {
  args: {
    children: 'an inline link',
    href: '#inline',
    variant: 'inline',
  },
  render: (args) => (
    <p
      style={{
        maxWidth: 360,
        fontFamily: 'sans-serif',
        lineHeight: 1.6,
      }}
    >
      This paragraph contains <Link {...args} /> that sits within the running
      text and stays underlined by default.
    </p>
  ),
};

export const Outline: Story = {
  args: {
    children: 'Bordered link',
    href: '#outline',
    variant: 'outline',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-link-variant]');
    await expect(root?.getAttribute('data-bbangto-link-variant')).toBe(
      'outline'
    );
    // 2. load-bearing chrome: a 1px solid border surface, no underline.
    const style = getComputedStyle(root as HTMLElement);
    await expect(style.borderTopStyle).toBe('solid');
    await expect(style.borderTopWidth).toBe('1px');
    await expect(style.textDecorationLine).toBe('none');
    await expect((root as HTMLAnchorElement).style.backgroundColor).toBe(
      'transparent'
    );
    // 3. content slot + a11y: stays a focusable link.
    const link = await canvas.findByRole('link', { name: /bordered link/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '#outline');
    link.focus();
    await expect(document.activeElement).toBe(link);
  },
};

export const Solid: Story = {
  args: {
    children: 'Filled link',
    href: '#solid',
    variant: 'solid',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-link-variant]');
    await expect(root?.getAttribute('data-bbangto-link-variant')).toBe('solid');
    // 2. load-bearing chrome: solid accent fill at rest, no border, no underline.
    const el = root as HTMLAnchorElement;
    const style = getComputedStyle(el);
    await expect(el.style.backgroundColor).toContain('primary');
    await expect(style.borderTopStyle).toBe('none');
    await expect(style.textDecorationLine).toBe('none');
    // 3. content slot + a11y: stays a focusable link.
    const link = await canvas.findByRole('link', { name: /filled link/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '#solid');
    link.focus();
    await expect(document.activeElement).toBe(link);
  },
};

export const Ghost: Story = {
  args: {
    children: 'Hover-fill link',
    href: '#ghost',
    variant: 'ghost',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // 1. data-attr hook
    const root = canvasElement.querySelector('[data-bbangto-link-variant]');
    await expect(root?.getAttribute('data-bbangto-link-variant')).toBe('ghost');
    // 2. load-bearing chrome: transparent + no border at rest, fills on hover.
    const el = root as HTMLAnchorElement;
    const style = getComputedStyle(el);
    await expect(style.borderTopStyle).toBe('none');
    await expect(el.style.backgroundColor).toBe('transparent');
    const link = await canvas.findByRole('link', { name: /hover-fill link/i });
    await userEvent.hover(link);
    await waitFor(async () => {
      await expect(el.style.backgroundColor).toContain('sunken');
    });
    // 3. content slot + a11y: stays a focusable link.
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '#ghost');
    link.focus();
    await expect(document.activeElement).toBe(link);
  },
};
