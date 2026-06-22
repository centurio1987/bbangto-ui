import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BottomNavigation, BottomNavigationItem } from '@centurio87/core';

const meta = {
  title: 'Organisms/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof BottomNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Placeholder icons
const HomeIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const SearchIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const UserIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState('home');
    return (
      <div style={{ width: '375px', border: '1px solid #eee', position: 'relative', height: '200px', backgroundColor: '#fafafa' }}>
        <BottomNavigation style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <BottomNavigationItem icon={<HomeIcon />} label="Home" selected={tab === 'home'} onClick={() => setTab('home')} />
          <BottomNavigationItem icon={<SearchIcon />} label="Search" selected={tab === 'search'} onClick={() => setTab('search')} />
          <BottomNavigationItem icon={<UserIcon />} label="Profile" selected={tab === 'profile'} onClick={() => setTab('profile')} />
        </BottomNavigation>
      </div>
    );
  },
};
