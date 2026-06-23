import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button } from '@centurio1987/core';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['popup', 'full', 'bottom-sheet'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Popup: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Popup Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Confirm Action" variant="popup">
          Are you sure you want to proceed? This action cannot be undone.
        </Modal>
      </>
    );
  },
};

export const Full: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Full Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Settings" variant="full">
          Here is a full screen modal commonly used for complex forms or detailed views on mobile.
        </Modal>
      </>
    );
  },
};

export const BottomSheet: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Sheet</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} title="Share" variant="bottom-sheet">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>Copy Link</li>
            <li style={{ padding: '16px 0', borderBottom: '1px solid #eee' }}>Share to X</li>
            <li style={{ padding: '16px 0' }}>Share to Facebook</li>
          </ul>
        </Modal>
      </>
    );
  },
};
