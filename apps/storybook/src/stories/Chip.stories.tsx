import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@centurio87/core';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['action', 'filter'],
    },
    selected: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filter: Story = {
  args: {
    variant: 'filter',
    selected: false,
    children: 'Backend',
  },
};

export const FilterSelected: Story = {
  args: {
    variant: 'filter',
    selected: true,
    children: 'Frontend',
  },
};

export const Action: Story = {
  args: {
    variant: 'action',
    children: 'Download',
  },
};
