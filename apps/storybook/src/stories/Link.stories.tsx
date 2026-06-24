import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'muted', 'standalone', 'inline'],
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
