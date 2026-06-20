import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '@bbangto-ui/core';

const meta = {
  title: 'Molecules/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'What is Bbangto UI?',
    children: 'Bbangto UI is a modern, themeable component library built with React and CSS Custom Properties, fully aligned with the BBANGTO Design System.',
  },
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Accordion title="Section 1" defaultExpanded>
        Content for section 1. This one is expanded by default.
      </Accordion>
      <Accordion title="Section 2">
        Content for section 2.
      </Accordion>
      <Accordion title="Section 3">
        Content for section 3.
      </Accordion>
    </div>
  ),
};
