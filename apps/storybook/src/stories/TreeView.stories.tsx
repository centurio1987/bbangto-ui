import type { Meta, StoryObj } from '@storybook/react';
import { TreeView } from '@centurio1987/core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

const sampleNodes = [
  {
    id: 'src',
    label: 'src',
    children: [
      {
        id: 'components',
        label: 'components',
        children: [
          { id: 'button', label: 'Button.tsx' },
          { id: 'input', label: 'Input.tsx' },
        ],
      },
      {
        id: 'utils',
        label: 'utils',
        children: [
          { id: 'format', label: 'format.ts' },
          { id: 'validate', label: 'validate.ts' },
        ],
      },
    ],
  },
  {
    id: 'public',
    label: 'public',
    children: [
      { id: 'index-html', label: 'index.html' },
      { id: 'favicon', label: 'favicon.ico' },
    ],
  },
  {
    id: 'readme',
    label: 'README.md',
  },
];

const meta = {
  title: 'Molecules/TreeView',
  component: TreeView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TreeView>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default — collapsed root nodes ────────────────────────────────────────

export const Default: Story = {
  args: {
    nodes: sampleNodes,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Root tree container is present
    const tree = canvasElement.querySelector('[role="tree"]') as HTMLElement;
    await expect(tree).not.toBeNull();

    // 2. Root-level items are visible
    const srcItem = await canvas.findByText('src');
    await expect(srcItem).toBeVisible();

    // 3. Children are NOT visible before expanding (aria-expanded=false on parent)
    const srcTreeitem = canvasElement.querySelector('[data-node-id="src"]') as HTMLElement;
    await expect(srcTreeitem).toHaveAttribute('aria-expanded', 'false');

    // Children should be hidden (display:none on group)
    const childGroup = srcTreeitem.querySelector('[role="group"]') as HTMLElement;
    await expect(childGroup.style.display).toBe('none');

    // 4. Click to expand src
    await userEvent.click(srcItem);
    await waitFor(async () => {
      await expect(srcTreeitem).toHaveAttribute('aria-expanded', 'true');
    });

    // 5. Children are now visible
    const componentsItem = await canvas.findByText('components');
    await expect(componentsItem).toBeVisible();

    // 6. Collapse by clicking again
    await userEvent.click(srcItem);
    await waitFor(async () => {
      await expect(srcTreeitem).toHaveAttribute('aria-expanded', 'false');
    });
  },
};

// ── Pre-expanded — shows expand/collapse and selection ────────────────────

export const WithExpandedNodes: Story = {
  args: {
    nodes: sampleNodes,
    defaultExpandedIds: ['src', 'components'],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. Leaf nodes under the pre-expanded path are visible
    const buttonItem = await canvas.findByText('Button.tsx');
    await expect(buttonItem).toBeVisible();

    // 2. Click a leaf node to select it
    const buttonTreeitem = canvasElement.querySelector('[data-node-id="button"]') as HTMLElement;
    await expect(buttonTreeitem).not.toHaveAttribute('aria-selected', 'true');

    await userEvent.click(buttonItem);
    await waitFor(async () => {
      await expect(buttonTreeitem).toHaveAttribute('aria-selected', 'true');
    });

    // 3. aria-level on leaf is correct (level 3: src > components > button)
    await expect(buttonTreeitem).toHaveAttribute('aria-level', '3');
  },
};

// ── Selection state ───────────────────────────────────────────────────────

export const WithDefaultSelection: Story = {
  args: {
    nodes: sampleNodes,
    defaultExpandedIds: ['src', 'components'],
    defaultSelectedId: 'input',
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // The pre-selected node should have aria-selected=true
    const inputItem = canvasElement.querySelector('[data-node-id="input"]') as HTMLElement;
    await expect(inputItem).toHaveAttribute('aria-selected', 'true');
    await expect(inputItem).toBeVisible();

    // Clicking another node should move selection
    const buttonText = await canvas.findByText('Button.tsx');
    await userEvent.click(buttonText);

    const buttonItem = canvasElement.querySelector('[data-node-id="button"]') as HTMLElement;
    await waitFor(async () => {
      await expect(buttonItem).toHaveAttribute('aria-selected', 'true');
      await expect(inputItem).toHaveAttribute('aria-selected', 'false');
    });
  },
};

// ── ARIA structure verification ────────────────────────────────────────────

export const ARIAStructure: Story = {
  name: 'ARIA — role and level attributes',
  args: {
    nodes: sampleNodes,
    defaultExpandedIds: ['src'],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // role="tree" on the root ul
    const tree = canvasElement.querySelector('[role="tree"]');
    await expect(tree).not.toBeNull();

    // Root items: aria-level=1
    const srcItem = canvasElement.querySelector('[data-node-id="src"]') as HTMLElement;
    await expect(srcItem).toHaveAttribute('aria-level', '1');
    await expect(srcItem).toHaveAttribute('aria-expanded');

    // role="treeitem" on each item
    const treeitems = canvasElement.querySelectorAll('[role="treeitem"]');
    for (const item of Array.from(treeitems)) {
      await expect(item).toHaveAttribute('aria-level');
      await expect(item).toHaveAttribute('aria-selected');
    }

    // Children group: role="group"
    const group = canvasElement.querySelector('[role="group"]');
    await expect(group).not.toBeNull();

    // Leaf node (readme) should NOT have aria-expanded
    const readmeItem = canvasElement.querySelector('[data-node-id="readme"]') as HTMLElement;
    await expect(readmeItem).not.toHaveAttribute('aria-expanded');
  },
};

// ── Keyboard navigation ────────────────────────────────────────────────────

export const KeyboardNavigation: Story = {
  name: 'Keyboard — ArrowRight expands, ArrowLeft collapses',
  args: {
    nodes: sampleNodes,
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const srcItem = canvasElement.querySelector('[data-node-id="src"]') as HTMLElement;
    srcItem.focus();

    // ArrowRight should expand
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(async () => {
      await expect(srcItem).toHaveAttribute('aria-expanded', 'true');
    });

    // ArrowLeft should collapse
    await userEvent.keyboard('{ArrowLeft}');
    await waitFor(async () => {
      await expect(srcItem).toHaveAttribute('aria-expanded', 'false');
    });

    // Enter should select
    await userEvent.keyboard('{Enter}');
    await waitFor(async () => {
      await expect(srcItem).toHaveAttribute('aria-selected', 'true');
    });
  },
};

// ── Variant: connected — vertical guide lines ──────────────────────────────

export const VariantConnected: Story = {
  args: {
    nodes: sampleNodes,
    variant: 'connected',
    defaultExpandedIds: ['src', 'components'],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present with correct value on root
    const tree = canvasElement.querySelector('[role="tree"]') as HTMLElement;
    await expect(tree).toHaveAttribute('data-bbangto-treeview-variant', 'connected');

    // 2. load-bearing: guide-line class on root + scoped <style> block emitted
    await expect(tree.classList.contains('bbangto-treeview-connected')).toBe(true);
    // Aggregate ALL <style> tags — the scoped style is not necessarily the first.
    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    await expect(styleText).toContain('bbangto-treeview-connected');
    await expect(styleText).toContain('::before');

    // 3. content still renders
    const buttonItem = await canvas.findByText('Button.tsx');
    await expect(buttonItem).toBeVisible();

    // aria roles intact
    const srcItem = canvasElement.querySelector('[data-node-id="src"]') as HTMLElement;
    await expect(srcItem).toHaveAttribute('aria-level', '1');
    await expect(srcItem).toHaveAttribute('aria-expanded', 'true');

    // keyboard nav still selects (ArrowDown then Enter)
    srcItem.focus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await waitFor(async () => {
      const selected = canvasElement.querySelector('[aria-selected="true"]');
      await expect(selected).not.toBeNull();
    });
  },
};

// ── Variant: compact — reduced row height ──────────────────────────────────

export const VariantCompact: Story = {
  args: {
    nodes: sampleNodes,
    variant: 'compact',
    defaultExpandedIds: ['src', 'components'],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present with correct value on root
    const tree = canvasElement.querySelector('[role="tree"]') as HTMLElement;
    await expect(tree).toHaveAttribute('data-bbangto-treeview-variant', 'compact');

    // 2. load-bearing: compact collapses the row's vertical padding to the
    //    smallest spacing token (spacing-1) vs the default spacing-4. Assert the
    //    computed padding directly — total row height is dominated by the label
    //    line-height (~24px) so an absolute height threshold is not meaningful.
    const srcItem = canvasElement.querySelector('[data-node-id="src"]') as HTMLElement;
    const row = srcItem.querySelector('div') as HTMLElement;
    await expect(row.style.paddingTop).toBe('var(--bbangto-spacing-1)');
    await expect(row.style.paddingBottom).toBe('var(--bbangto-spacing-1)');
    // Resolved padding is genuinely small (spacing-1 ≈ 4px, well under spacing-4).
    const padTop = parseFloat(getComputedStyle(row).paddingTop);
    await expect(padTop).toBeLessThan(8);

    // 3. content still renders
    const buttonItem = await canvas.findByText('Button.tsx');
    await expect(buttonItem).toBeVisible();

    // aria roles intact
    await expect(srcItem).toHaveAttribute('aria-level', '1');
    await expect(srcItem).toHaveAttribute('aria-expanded', 'true');

    // keyboard nav still selects (ArrowDown then Enter)
    srcItem.focus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await waitFor(async () => {
      const selected = canvasElement.querySelector('[aria-selected="true"]');
      await expect(selected).not.toBeNull();
    });
  },
};

// ── Variant: bordered — boxed container ────────────────────────────────────

export const VariantBordered: Story = {
  args: {
    nodes: sampleNodes,
    variant: 'bordered',
    defaultExpandedIds: ['src', 'components'],
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr present with correct value on root
    const tree = canvasElement.querySelector('[role="tree"]') as HTMLElement;
    await expect(tree).toHaveAttribute('data-bbangto-treeview-variant', 'bordered');

    // 2. load-bearing: container has a solid border
    const computed = getComputedStyle(tree);
    await expect(computed.borderStyle).toBe('solid');

    // 3. content still renders
    const buttonItem = await canvas.findByText('Button.tsx');
    await expect(buttonItem).toBeVisible();

    // aria roles intact
    const srcItem = canvasElement.querySelector('[data-node-id="src"]') as HTMLElement;
    await expect(srcItem).toHaveAttribute('aria-level', '1');
    await expect(srcItem).toHaveAttribute('aria-expanded', 'true');

    // keyboard nav still selects (ArrowDown then Enter)
    srcItem.focus();
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
    await waitFor(async () => {
      const selected = canvasElement.querySelector('[aria-selected="true"]');
      await expect(selected).not.toBeNull();
    });
  },
};

// ── File tree demo ─────────────────────────────────────────────────────────

export const FileTree: Story = {
  render: () => (
    <div
      style={{
        width: '280px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '8px',
        fontFamily: 'monospace',
      }}
    >
      <TreeView
        nodes={sampleNodes}
        defaultExpandedIds={['src', 'components']}
        defaultSelectedId="button"
      />
    </div>
  ),
};
