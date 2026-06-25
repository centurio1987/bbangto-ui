import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuSeparator,
  DropdownMenu,
  Button,
} from '@centurio1987/core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

const meta = {
  title: 'Molecules/Menu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── DropdownMenu: default ────────────────────────────────────────────────────

/** 트리거 클릭 → 메뉴 열림, item 클릭 → onSelect 호출 & 닫힘 */
export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minHeight: '200px' }}>
        <DropdownMenu trigger={<Button>Open Menu</Button>}>
          <MenuItem onSelect={() => setSelected('Profile')}>Profile</MenuItem>
          <MenuItem onSelect={() => setSelected('Settings')}>Settings</MenuItem>
          <MenuItem onSelect={() => setSelected('Help')}>Help</MenuItem>
        </DropdownMenu>
        {selected && <span data-testid="selected-value">Selected: {selected}</span>}
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 트리거 렌더링 확인
    const trigger = await canvas.findByRole('button', { name: /open menu/i });
    await expect(trigger).toBeVisible();

    // 2. 클릭 → 메뉴 열림
    await userEvent.click(trigger);
    await waitFor(() => {
      const menu = canvasElement.querySelector('[role="menu"]');
      expect(menu).not.toBeNull();
      const style = getComputedStyle(menu!.parentElement!);
      expect(style.visibility).toBe('visible');
    });

    // 3. aria-haspopup / aria-expanded 확인
    await expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // 4. item 클릭 → onSelect 호출 & 메뉴 닫힘
    const menuItem = await canvas.findByRole('menuitem', { name: /settings/i });
    await userEvent.click(menuItem);

    // 선택 결과 표시 확인
    await waitFor(() => {
      const selectedValue = canvasElement.querySelector('[data-testid="selected-value"]');
      expect(selectedValue?.textContent).toContain('Settings');
    });
  },
};

// ─── DropdownMenu: 키보드 네비게이션 ──────────────────────────────────────────

export const KeyboardNavigation: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ minHeight: '200px' }}>
        <DropdownMenu trigger={<Button>Keyboard Menu</Button>}>
          <MenuItem onSelect={() => setSelected('First')}>First Item</MenuItem>
          <MenuItem onSelect={() => setSelected('Second')}>Second Item</MenuItem>
          <MenuItem onSelect={() => setSelected('Third')}>Third Item</MenuItem>
        </DropdownMenu>
        {selected && <span data-testid="kb-selected">Selected: {selected}</span>}
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Enter로 열기
    const trigger = await canvas.findByRole('button', { name: /keyboard menu/i });
    trigger.focus();
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      const menu = canvasElement.querySelector('[role="menu"]');
      expect(menu).not.toBeNull();
    });

    // ArrowDown으로 두 번째 항목으로 이동 후 Enter로 선택
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');

    await waitFor(() => {
      const selected = canvasElement.querySelector('[data-testid="kb-selected"]');
      expect(selected?.textContent).toContain('Second');
    });
  },
};

// ─── DropdownMenu: Esc 닫기 ──────────────────────────────────────────────────

export const EscapeToClose: Story = {
  render: () => (
    <div style={{ minHeight: '200px' }}>
      <DropdownMenu trigger={<Button>Escape Menu</Button>}>
        <MenuItem>Item A</MenuItem>
        <MenuItem>Item B</MenuItem>
      </DropdownMenu>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = await canvas.findByRole('button', { name: /escape menu/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      const menu = canvasElement.querySelector('[role="menu"]');
      expect(menu).not.toBeNull();
      const style = getComputedStyle(menu!.parentElement!);
      expect(style.visibility).toBe('visible');
    });

    await userEvent.keyboard('{Escape}');

    await waitFor(() => {
      const menu = canvasElement.querySelector('[role="menu"]');
      const style = getComputedStyle(menu!.parentElement!);
      expect(style.visibility).toBe('hidden');
    });
  },
};

// ─── DropdownMenu: disabled item ─────────────────────────────────────────────

export const DisabledItem: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ minHeight: '200px' }}>
        <DropdownMenu trigger={<Button>Menu with disabled</Button>}>
          <MenuItem onSelect={() => setSelected('Active')}>Active Item</MenuItem>
          <MenuItem disabled onSelect={() => setSelected('Disabled')}>Disabled Item</MenuItem>
          <MenuItem onSelect={() => setSelected('Another')}>Another Item</MenuItem>
        </DropdownMenu>
        {selected && <span data-testid="disabled-selected">Selected: {selected}</span>}
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = await canvas.findByRole('button', { name: /menu with disabled/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      const menu = canvasElement.querySelector('[role="menu"]');
      expect(menu).not.toBeNull();
    });

    // disabled item should have aria-disabled
    const disabledItem = await canvas.findByRole('menuitem', { name: /disabled item/i });
    await expect(disabledItem).toHaveAttribute('aria-disabled', 'true');

    // clicking disabled item should not trigger onSelect
    await userEvent.click(disabledItem);
    const selectedEl = canvasElement.querySelector('[data-testid="disabled-selected"]');
    expect(selectedEl).toBeNull();
  },
};

// ─── DropdownMenu: with Group and Separator ───────────────────────────────────

export const WithGroupsAndSeparator: Story = {
  render: () => (
    <div style={{ minHeight: '300px' }}>
      <DropdownMenu trigger={<Button>Grouped Menu</Button>}>
        <MenuGroup label="Account">
          <MenuItem>Profile</MenuItem>
          <MenuItem>Billing</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup label="Support">
          <MenuItem>Documentation</MenuItem>
          <MenuItem>Help Center</MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuItem>Sign Out</MenuItem>
      </DropdownMenu>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const trigger = await canvas.findByRole('button', { name: /grouped menu/i });
    await userEvent.click(trigger);

    await waitFor(() => {
      const menu = canvasElement.querySelector('[role="menu"]');
      expect(menu).not.toBeNull();
      const style = getComputedStyle(menu!.parentElement!);
      expect(style.visibility).toBe('visible');
    });

    // group roles
    const groups = canvasElement.querySelectorAll('[role="group"]');
    await expect(groups.length).toBe(2);

    // separators
    const separators = canvasElement.querySelectorAll('[role="separator"]');
    await expect(separators.length).toBeGreaterThanOrEqual(2);
  },
};

// ─── Standalone Menu (uncontrolled) ──────────────────────────────────────────

export const StandaloneMenu: Story = {
  render: () => (
    <Menu>
      <MenuItem leftIcon={<span>★</span>}>Starred</MenuItem>
      <MenuItem leftIcon={<span>📁</span>}>New Folder</MenuItem>
      <MenuSeparator />
      <MenuItem disabled>Delete (disabled)</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // menu role exists
    const menu = await canvas.findByRole('menu');
    await expect(menu).toBeVisible();

    // items exist
    const items = canvas.getAllByRole('menuitem');
    await expect(items.length).toBe(3);
  },
};

// ─── Menu variant: compact ───────────────────────────────────────────────────

export const VariantCompact: Story = {
  render: () => (
    <Menu variant="compact">
      <MenuItem onSelect={() => {}}>Cut</MenuItem>
      <MenuItem onSelect={() => {}}>Copy</MenuItem>
      <MenuItem onSelect={() => {}}>Paste</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr on the menu root
    const menu = await canvas.findByRole('menu');
    await expect(menu).toHaveAttribute('data-bbangto-menu-variant', 'compact');

    // 2. load-bearing: item vertical padding is reduced vs the default 8px
    const firstItem = canvas.getAllByRole('menuitem')[0];
    await waitFor(() => {
      const padTop = parseFloat(getComputedStyle(firstItem).paddingTop);
      expect(padTop).toBeLessThan(8);
    });

    // 3. content still renders
    await expect(canvas.getByText('Copy')).toBeVisible();

    // keyboard model intact: menuitems are focusable, first item takes focus
    const items = canvas.getAllByRole('menuitem');
    items[0].focus();
    await waitFor(() => {
      expect(document.activeElement).toBe(items[0]);
    });
    await userEvent.keyboard('{ArrowDown}');
  },
};

// ─── Menu variant: bordered ───────────────────────────────────────────────────

export const VariantBordered: Story = {
  render: () => (
    <Menu variant="bordered">
      <MenuItem onSelect={() => {}}>Rename</MenuItem>
      <MenuItem onSelect={() => {}}>Duplicate</MenuItem>
      <MenuItem onSelect={() => {}}>Archive</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr on the menu root
    const menu = await canvas.findByRole('menu');
    await expect(menu).toHaveAttribute('data-bbangto-menu-variant', 'bordered');

    // 2. load-bearing: a solid outer border is present
    await waitFor(() => {
      const style = getComputedStyle(menu);
      expect(style.borderTopStyle).toBe('solid');
      expect(parseFloat(style.borderTopWidth)).toBeGreaterThan(0);
    });

    // 3. content still renders
    await expect(canvas.getByText('Duplicate')).toBeVisible();

    // keyboard model intact: menuitems are focusable, first item takes focus
    const items = canvas.getAllByRole('menuitem');
    items[0].focus();
    await waitFor(() => {
      expect(document.activeElement).toBe(items[0]);
    });
    await userEvent.keyboard('{ArrowDown}');
  },
};

// ─── Menu variant: floating ───────────────────────────────────────────────────

export const VariantFloating: Story = {
  render: () => (
    <Menu variant="floating">
      <MenuItem onSelect={() => {}}>Share</MenuItem>
      <MenuItem onSelect={() => {}}>Export</MenuItem>
      <MenuItem onSelect={() => {}}>Print</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr on the menu root
    const menu = await canvas.findByRole('menu');
    await expect(menu).toHaveAttribute('data-bbangto-menu-variant', 'floating');

    // 2. load-bearing: elevation shadow present + larger radius than default (12px)
    await waitFor(() => {
      const style = getComputedStyle(menu);
      expect(style.boxShadow).not.toBe('none');
      expect(style.boxShadow).not.toBe('');
      expect(parseFloat(style.borderTopLeftRadius)).toBeGreaterThan(12);
    });

    // 3. content still renders
    await expect(canvas.getByText('Export')).toBeVisible();

    // keyboard model intact: menuitems are focusable, first item takes focus
    const items = canvas.getAllByRole('menuitem');
    items[0].focus();
    await waitFor(() => {
      expect(document.activeElement).toBe(items[0]);
    });
    await userEvent.keyboard('{ArrowDown}');
  },
};

// ─── Controlled DropdownMenu ─────────────────────────────────────────────────

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', minHeight: '220px' }}>
        <DropdownMenu
          trigger={<Button>Controlled Menu</Button>}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <MenuItem onSelect={() => { setSelected('Option 1'); setIsOpen(false); }}>Option 1</MenuItem>
          <MenuItem onSelect={() => { setSelected('Option 2'); setIsOpen(false); }}>Option 2</MenuItem>
        </DropdownMenu>
        <Button variant="outline" onClick={() => setIsOpen((v) => !v)}>
          Toggle externally
        </Button>
        {selected && <span data-testid="controlled-selected">Selected: {selected}</span>}
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // external toggle opens the menu
    const toggle = await canvas.findByRole('button', { name: /toggle externally/i });
    await userEvent.click(toggle);

    await waitFor(() => {
      const menu = canvasElement.querySelector('[role="menu"]');
      expect(menu).not.toBeNull();
      const style = getComputedStyle(menu!.parentElement!);
      expect(style.visibility).toBe('visible');
    });

    // click an item
    const opt = await canvas.findByRole('menuitem', { name: /option 1/i });
    await userEvent.click(opt);

    await waitFor(() => {
      const sel = canvasElement.querySelector('[data-testid="controlled-selected"]');
      expect(sel?.textContent).toContain('Option 1');
    });
  },
};
