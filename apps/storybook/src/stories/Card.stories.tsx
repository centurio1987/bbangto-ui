import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Text, Button } from '@centurio1987/core';

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
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    elevation: 'sm',
    padding: 'md',
    bordered: true,
    children: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '300px' }}>
        <Text variant="title3">Card Title</Text>
        <Text variant="body2" color="muted">
          This is a card component that wraps its children with consistent spacing, borders, and shadows according to the theme.
        </Text>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
          <Button variant="ghost" color="neutral">Cancel</Button>
          <Button variant="solid" color="primary">Confirm</Button>
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
