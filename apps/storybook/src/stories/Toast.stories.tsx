import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from '@centurio1987/core';

const meta = {
  title: 'Molecules/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Update successful',
    message: 'Your profile has been updated.',
    variant: 'success',
    duration: 0, // disable auto-hide for story
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '150px' }}>
      <Toast {...args} style={{ position: 'absolute', top: 0, right: 0 }} />
    </div>
  ),
};

export const ErrorToast: Story = {
  args: {
    title: 'Connection failed',
    message: 'Please check your internet connection.',
    variant: 'error',
    duration: 0,
  },
  render: Default.render,
};
