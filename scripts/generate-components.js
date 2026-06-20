import fs from 'fs';
import path from 'path';

const components = [
  // Controls
  'Checkbox', 'Radio', 'Select', 'Searchfield',
  // Data Display
  'Badge', 'Chip', 'Accordion', 'Table', 'Skeleton',
  // Feedback
  'Snackbar', 'Modal', 'SectionMessage', 'EmptyState', 'ProgressIndicator',
  // Navigation
  'Pagination', 'BottomNavigation', 'SectionHeader'
];

const CORE_DIR = path.join(process.cwd(), 'packages', 'core', 'src', 'components');
const CORE_INDEX = path.join(process.cwd(), 'packages', 'core', 'src', 'index.ts');
const STORIES_DIR = path.join(process.cwd(), 'apps', 'storybook', 'src', 'stories');

// Ensure directories exist
if (!fs.existsSync(CORE_DIR)) fs.mkdirSync(CORE_DIR, { recursive: true });
if (!fs.existsSync(STORIES_DIR)) fs.mkdirSync(STORIES_DIR, { recursive: true });

let indexExports = fs.readFileSync(CORE_INDEX, 'utf-8');

components.forEach(comp => {
  // 1. Create Component File
  const compPath = path.join(CORE_DIR, `${comp}.tsx`);
  if (!fs.existsSync(compPath)) {
    const compCode = `import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';

export interface ${comp}Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

/**
 * ${comp} Component
 * Generated from Figma Reference
 */
export function ${comp}({ children, style, ...props }: ${comp}Props) {
  const baseStyles: React.CSSProperties = {
    fontFamily: cssVar('typography', 'fontFamily', 'sans'),
    color: cssVar('semantic', 'foreground', 'base'),
    ...style,
  };

  return (
    <div style={baseStyles} {...props}>
      {children || '${comp} Placeholder'}
    </div>
  );
}
`;
    fs.writeFileSync(compPath, compCode);
  }

  // 2. Add to index.ts
  const exportLine = `export * from './components/${comp}';`;
  if (!indexExports.includes(exportLine)) {
    indexExports += `\n${exportLine}`;
  }

  // 3. Create Story File
  const storyPath = path.join(STORIES_DIR, `${comp}.stories.tsx`);
  if (!fs.existsSync(storyPath)) {
    const storyCode = `import type { Meta, StoryObj } from '@storybook/react';
import { ${comp} } from '@bbangto-ui/core';

const meta = {
  title: 'Components/${comp}',
  component: ${comp},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ${comp}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;
    fs.writeFileSync(storyPath, storyCode);
  }
});

fs.writeFileSync(CORE_INDEX, indexExports);
console.log('Successfully generated ' + components.length + ' components and stories.');
