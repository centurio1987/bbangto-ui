import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@bbangto-ui/core';

// Filter out only the icons from the exports
const iconComponents = Object.entries(Icons).filter(([name]) => name.endsWith('Icon'));

const meta: Meta = {
  title: 'Atoms/Icon',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Catalog: StoryObj = {
  render: () => (
    <div>
      <h2 style={{ fontFamily: 'Pretendard', marginBottom: '24px' }}>Icon Catalog</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {iconComponents.map(([name, IconComponent]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            {/* @ts-ignore */}
            <IconComponent style={{ fontSize: '48px' }} />
            <span style={{ fontFamily: 'Pretendard', fontSize: '14px', color: '#6B665C' }}>
              {name.replace('Icon', '')}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CustomSizeAndColor: StoryObj = {
  render: () => {
    // @ts-ignore
    const { HomeIcon } = Icons;
    
    return (
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
        <HomeIcon style={{ fontSize: '24px' }} />
        <HomeIcon style={{ fontSize: '48px' }} />
        <HomeIcon style={{ fontSize: '72px' }} />
      </div>
    );
  }
};
