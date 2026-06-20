import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { EmptyState, Button } from '@bbangto-ui/core';

const meta = {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

const InboxIcon = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>;

export const Default: Story = {
  args: {
    icon: <InboxIcon />,
    title: 'No messages',
    description: 'When you have messages, you will see them here.',
    action: <Button variant="primary">Send a message</Button>,
  },
};

export const Minimal: Story = {
  args: {
    title: 'No results found',
    description: 'Try adjusting your search filters.',
  },
};
