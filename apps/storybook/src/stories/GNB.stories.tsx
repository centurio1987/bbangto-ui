import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GNB, Button, Avatar } from '@centurio1987/bbangto-ui-core';

const meta = {
  title: 'Organisms/GNB',
  component: GNB,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof GNB>;

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = () => (
  <div style={{ fontWeight: 'bold', fontSize: '20px', letterSpacing: '-0.5px' }}>
    BBANGTO
  </div>
);

const NavItems = () => (
  <div style={{ display: 'flex', gap: '24px', fontWeight: 500, color: '#333' }}>
    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Jobs</a>
    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Community</a>
    <a href="#" style={{ textDecoration: 'none', color: 'inherit' }}>Events</a>
  </div>
);

export const Default: Story = {
  render: () => (
    <div style={{ border: '1px solid #eee', position: 'relative', height: '200px', backgroundColor: '#fafafa' }}>
      <GNB 
        logo={<Logo />} 
        navItems={<NavItems />}
        userActions={
          <>
            <Button variant="outline" size="sm">For Employers</Button>
            <Avatar fallback="J" size="sm" />
          </>
        } 
      />
    </div>
  ),
};
