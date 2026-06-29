import type { Meta, StoryObj } from '@storybook/react';
import { Thumbnail } from '@centurio1987/bbangto-ui-core';

const meta = {
  title: 'ARCHETYPE/Components/Atoms/Thumbnail',
  component: Thumbnail,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    ratio: {
      control: 'select',
      options: ['1:1', '4:3', '16:9'],
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
  },
} satisfies Meta<typeof Thumbnail>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    ratio: '16:9',
    radius: 'md',
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <Thumbnail {...args} />
    </div>
  ),
};

export const Fallback: Story = {
  args: {
    src: 'invalid-url',
    ratio: '4:3',
  },
  render: Default.render,
};
