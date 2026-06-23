import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TopNavigation, Button } from '@centurio1987/core';

const meta = {
  title: 'Organisms/TopNavigation',
  component: TopNavigation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

const BackIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '375px', border: '1px solid #eee', position: 'relative', height: '200px', backgroundColor: '#fafafa' }}>
      <TopNavigation 
        leading={<button style={{background:'none',border:'none',cursor:'pointer'}}><BackIcon /></button>} 
        title="Settings" 
        trailing={<Button variant="text" size="sm">Save</Button>} 
      />
    </div>
  ),
};
