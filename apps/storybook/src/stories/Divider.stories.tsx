import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '@centurio87/core';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['normal', 'thick'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'normal',
  },
  render: (args) => (
    <div style={{ width: '300px', padding: '16px 0' }}>
      <div>Above</div>
      <Divider {...args} style={{ margin: '16px 0' }} />
      <div>Below</div>
    </div>
  ),
};

export const Thick: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'thick',
  },
  render: Horizontal.render,
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'normal',
  },
  render: (args) => (
    <div style={{ display: 'flex', height: '100px', alignItems: 'center', gap: '16px' }}>
      <div>Left</div>
      <Divider {...args} />
      <div>Right</div>
    </div>
  ),
};
