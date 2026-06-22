import type { Meta, StoryObj } from '@storybook/react';
import { Searchfield } from '@centurio87/core';

const meta = {
  title: 'Molecules/Searchfield',
  component: Searchfield,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Searchfield>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search for anything...',
  },
};
