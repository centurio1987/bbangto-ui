import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from '@centurio1987/core';

const iconComponents = Object.entries(Icons)
  .filter(([name]) => name.endsWith('Icon'))
  .sort(([a], [b]) => a.localeCompare(b));

const meta: Meta = {
  title: 'Atoms/Icon',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Catalog: StoryObj = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontFamily: 'Pretendard', marginBottom: '8px', fontSize: '24px' }}>Icon Catalog ({iconComponents.length})</h2>
      <p style={{ fontFamily: 'Pretendard', marginBottom: '32px', color: '#6B665C' }}>
        A collection of 100+ major core icons. Click or hover (if implemented) for more details.
      </p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
        gap: '32px',
        alignItems: 'start'
      }}>
        {iconComponents.map(([name, IconComponent]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '16px', background: '#F8F7F4', borderRadius: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* @ts-ignore */}
              <IconComponent style={{ fontSize: '32px' }} />
            </div>
            <span style={{ fontFamily: 'Pretendard', fontSize: '12px', color: '#4A463F', textAlign: 'center', wordBreak: 'break-all' }}>
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
