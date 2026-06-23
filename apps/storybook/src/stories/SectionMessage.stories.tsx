import type { Meta, StoryObj } from '@storybook/react';
import { SectionMessage } from '@centurio1987/core';

const meta = {
  title: 'Molecules/SectionMessage',
  component: SectionMessage,
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
} satisfies Meta<typeof SectionMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Important update',
    message: 'We have updated our terms of service.',
    variant: 'info',
  },
};

export const Warning: Story = {
  args: {
    title: 'Almost out of space',
    message: 'You have used 90% of your storage quota.',
    variant: 'warning',
  },
};
