import type { Meta, StoryObj } from '@storybook/react';
import { Snackbar } from '@centurio1987/core';

const meta = {
  title: 'Molecules/Feedback',
  component: Snackbar,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultSnackbar: Story = {
  args: {
    message: 'Item has been deleted',
    actionText: 'Undo',
    duration: 0, // disable auto-hide for story
  },
  render: (args) => (
    <div style={{ position: 'relative', height: '100px' }}>
      <Snackbar {...args} style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)' }} />
    </div>
  ),
};
