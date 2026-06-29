import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '@centurio1987/bbangto-ui-core';

const meta = {
  title: 'ARCHETYPE/Components/Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display1', 'display2', 'title1', 'title2', 'title3',
        'heading1', 'heading2', 'body1', 'body2', 'label1',
        'label2', 'caption1', 'caption2'
      ],
    },
    color: {
      control: 'select',
      options: ['base', 'muted', 'subtle', 'inverse', 'primary', 'error', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body1',
    color: 'base',
  },
};

export const Display: Story = {
  args: {
    children: 'Display Typography',
    variant: 'display1',
  },
};

export const Muted: Story = {
  args: {
    children: 'This text is less important',
    variant: 'body2',
    color: 'muted',
  },
};
