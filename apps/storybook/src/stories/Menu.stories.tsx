import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Menu,
  MenuItem,
  MenuGroup,
  MenuSeparator,
  DropdownMenu,
  Button,
} from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/Menu',
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
    // ↓ 가 실제로 다음 항목으로 포커스를 옮긴다(KAN-054 — 전에는 누르고 확인하지 않았다).
    await waitFor(() => expect(document.activeElement).toBe(items[1]));
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
    // ↓ 가 실제로 다음 항목으로 포커스를 옮긴다(KAN-054 — 전에는 누르고 확인하지 않았다).
    await waitFor(() => expect(document.activeElement).toBe(items[1]));
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
    // ↓ 가 실제로 다음 항목으로 포커스를 옮긴다(KAN-054 — 전에는 누르고 확인하지 않았다).
    await waitFor(() => expect(document.activeElement).toBe(items[1]));
  },
};

// ─── Menu variant: dock ───────────────────────────────────────────────────────

export const Dock: Story = {
  render: () => (
    <Menu variant="dock" style={{ minWidth: '320px' }}>
      <MenuItem leftIcon={<span>🏠</span>} onSelect={() => {}}>Home</MenuItem>
      <MenuItem leftIcon={<span>🔍</span>} onSelect={() => {}}>Search</MenuItem>
      <MenuItem leftIcon={<span>🔔</span>} onSelect={() => {}}>Alerts</MenuItem>
      <MenuItem leftIcon={<span>👤</span>} onSelect={() => {}}>Profile</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr on the menu root
    const menu = await canvas.findByRole('menu');
    await expect(menu).toHaveAttribute('data-bbangto-menu-variant', 'dock');

    // 2. load-bearing: container is a horizontal flex track and each item slot
    //    reflows to a stacked (column) cell — not the default horizontal row.
    await waitFor(() => {
      const menuStyle = getComputedStyle(menu);
      expect(menuStyle.display).toBe('flex');
      expect(menuStyle.flexDirection).toBe('row');
      expect(menuStyle.justifyContent).toBe('space-between');

      const firstItem = canvas.getAllByRole('menuitem')[0];
      const itemStyle = getComputedStyle(firstItem);
      expect(itemStyle.flexDirection).toBe('column');
    });

    // 3. content slot still renders
    await expect(canvas.getByText('Search')).toBeVisible();

    // keyboard model intact: menuitems are focusable, first item takes focus
    const items = canvas.getAllByRole('menuitem');
    items[0].focus();
    await waitFor(() => {
      expect(document.activeElement).toBe(items[0]);
    });
    await userEvent.keyboard('{ArrowRight}');
    // dock 은 가로 배치라 → 가 다음 항목으로 포커스를 옮긴다(KAN-054 — 전에는 ↓ 를 누르고 확인하지 않았다).
    await waitFor(() => expect(document.activeElement).toBe(items[1]));
  },
};

// ─── Menu variant: segmented ──────────────────────────────────────────────────

export const Segmented: Story = {
  render: () => (
    <Menu variant="segmented">
      <MenuItem onSelect={() => {}}>Day</MenuItem>
      <MenuItem onSelect={() => {}}>Week</MenuItem>
      <MenuItem onSelect={() => {}}>Month</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr on the menu root
    const menu = await canvas.findByRole('menu');
    await expect(menu).toHaveAttribute('data-bbangto-menu-variant', 'segmented');

    // 2. load-bearing: inset filled track with NO border outline; active-cell
    //    elevation is declared via the scoped style tag.
    await waitFor(() => {
      const style = getComputedStyle(menu);
      expect(style.borderTopStyle).toBe('none');
      expect(style.backgroundColor).not.toBe('rgba(0, 0, 0, 0)');
      expect(style.backgroundColor).not.toBe('transparent');
    });

    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    expect(styleText).toContain('box-shadow');
    expect(styleText).toContain(':hover');

    // 3. content slot still renders
    await expect(canvas.getByText('Week')).toBeVisible();

    // keyboard model intact: menuitems are focusable, first item takes focus
    const items = canvas.getAllByRole('menuitem');
    items[0].focus();
    await waitFor(() => {
      expect(document.activeElement).toBe(items[0]);
    });
    await userEvent.keyboard('{ArrowDown}');
    // ↓ 가 실제로 다음 항목으로 포커스를 옮긴다(KAN-054 — 전에는 누르고 확인하지 않았다).
    await waitFor(() => expect(document.activeElement).toBe(items[1]));
  },
};

// ─── Menu variant: glow ───────────────────────────────────────────────────────

export const Glow: Story = {
  render: () => (
    <Menu variant="glow">
      <MenuItem onSelect={() => {}}>Spark</MenuItem>
      <MenuItem onSelect={() => {}}>Pulse</MenuItem>
      <MenuItem onSelect={() => {}}>Beam</MenuItem>
    </Menu>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. data-attr on the menu root
    const menu = await canvas.findByRole('menu');
    await expect(menu).toHaveAttribute('data-bbangto-menu-variant', 'glow');

    // 2. load-bearing: base container is borderless; the active/hover chrome is
    //    a radial-gradient halo + box-shadow glow declared in the scoped style.
    await waitFor(() => {
      const style = getComputedStyle(menu);
      expect(style.borderTopStyle).toBe('none');
    });

    const styleText = Array.from(canvasElement.querySelectorAll('style'))
      .map((s) => s.textContent ?? '')
      .join('\n');
    expect(styleText).toContain('radial-gradient');
    expect(styleText).toContain('box-shadow');

    // 3. content slot still renders
    await expect(canvas.getByText('Pulse')).toBeVisible();

    // keyboard model intact: menuitems are focusable, first item takes focus
    const items = canvas.getAllByRole('menuitem');
    items[0].focus();
    await waitFor(() => {
      expect(document.activeElement).toBe(items[0]);
    });
    await userEvent.keyboard('{ArrowDown}');
    // ↓ 가 실제로 다음 항목으로 포커스를 옮긴다(KAN-054 — 전에는 누르고 확인하지 않았다).
    await waitFor(() => expect(document.activeElement).toBe(items[1]));
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

// ─── 키보드 (KAN-054) ──────────────────────────────────────────────────────────

/** 단독 Menu: Tab 정지점 하나(roving) · ↑/↓ 순환 · Home/End · 글자 검색 · 비활성 건너뜀 · Enter 실행 */
export const KeyboardMenu: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
        <button type="button">Before</button>
        <Menu aria-label="Actions">
          <MenuItem onSelect={() => setSelected('Copy')}>Copy</MenuItem>
          <MenuItem onSelect={() => setSelected('Cut')}>Cut</MenuItem>
          <MenuItem disabled>Paste</MenuItem>
          <MenuItem onSelect={() => setSelected('Rename')}>Rename</MenuItem>
          <MenuItem onSelect={() => setSelected('Delete')}>Delete</MenuItem>
        </Menu>
        <output data-testid="menu-selected">{selected}</output>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const before = await canvas.findByRole('button', { name: 'Before' });
    const items = canvas.getAllByRole('menuitem');
    const [copy, cut, , rename, del] = items;

    // Tab 정지점은 하나 — Tab 으로 들어오면 첫 항목.
    await waitFor(() => expect(items.filter((i) => i.tabIndex === 0)).toHaveLength(1));
    before.focus();
    await userEvent.tab();
    await expect(copy).toHaveFocus();

    // ↓ 이동, 비활성(Paste) 건너뜀, 끝에서 처음으로.
    await userEvent.keyboard('{ArrowDown}');
    await expect(cut).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(rename).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(del).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(copy).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(del).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(copy).toHaveFocus();

    // 글자 검색 — r 로 시작하는 항목.
    await userEvent.keyboard('r');
    await expect(rename).toHaveFocus();

    // 옮긴 자리가 Tab 정지점이 된다 — 나갔다 들어오면 같은 자리.
    await waitFor(() => expect(rename.tabIndex).toBe(0));
    await expect(items.filter((i) => i.tabIndex === 0)).toHaveLength(1);

    // Enter 로 실행.
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByTestId('menu-selected')).toHaveTextContent('Rename');

    // Shift+Tab 은 다른 항목이 아니라 메뉴 밖으로 나간다.
    await userEvent.tab({ shift: true });
    await expect(before).toHaveFocus();
  },
};

/** DropdownMenu: ↑ 로 열면 끝 항목 · Home/End · 글자 검색 · Tab 은 고르지 않고 닫기 · Space 로 열기 · 항목은 Tab 정지점이 아님 */
export const KeyboardHomeEndTypeahead: Story = {
  render: () => {
    const [selected, setSelected] = useState<string | null>(null);
    return (
      <div style={{ minHeight: '240px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <DropdownMenu trigger={<Button>Edit</Button>}>
          <MenuItem onSelect={() => setSelected('Undo')}>Undo</MenuItem>
          <MenuItem onSelect={() => setSelected('Redo')}>Redo</MenuItem>
          <MenuItem onSelect={() => setSelected('Find')}>Find</MenuItem>
          <MenuItem onSelect={() => setSelected('Replace')}>Replace</MenuItem>
        </DropdownMenu>
        <button type="button">After</button>
        <output data-testid="dd-selected">{selected}</output>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Edit' });
    const items = canvas.getAllByRole('menuitem', { hidden: true });
    const [undo, redo, , replace] = items;

    // ↑ 로 열면 끝 항목에 포커스.
    trigger.focus();
    await userEvent.keyboard('{ArrowUp}');
    await waitFor(() => expect(replace).toHaveFocus());
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // Home / End.
    await userEvent.keyboard('{Home}');
    await expect(undo).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(replace).toHaveFocus();

    // 글자 검색 — 다음 r 항목(끝에서 처음으로 돈다), 같은 글자를 거듭 치면 r 항목들을 돈다.
    await userEvent.keyboard('r');
    await expect(redo).toHaveFocus();
    await userEvent.keyboard('r');
    await expect(replace).toHaveFocus();

    // Tab 은 고르지 않고 닫기만 한다.
    await userEvent.tab();
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    await expect(canvas.getByTestId('dd-selected')).toHaveTextContent('');

    // Space 로 열면 첫 항목, Enter 로 고르면 닫히고 트리거로 돌아온다.
    trigger.focus();
    await userEvent.keyboard(' ');
    await waitFor(() => expect(undo).toHaveFocus());
    await userEvent.keyboard('{ArrowDown}');
    await expect(redo).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByTestId('dd-selected')).toHaveTextContent('Redo');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    await waitFor(() => expect(trigger).toHaveFocus());

    // 항목은 Tab 정지점이 아니다(트리거가 정지점).
    await expect(items.filter((i) => i.tabIndex === 0).length).toBeLessThanOrEqual(1);
  },
};

/** 합성 규칙: 항목 처리기에서 preventDefault 하면 항목 실행도 닫힘도 없다(외부가 직접 처리하고 메뉴를 열어 둔다). 막지 않은 항목은 고르면 닫힌다 */
export const SelectPreventDefault: Story = {
  render: () => {
    const [bold, setBold] = useState(false);
    const [picked, setPicked] = useState<string | null>(null);
    return (
      <div style={{ minHeight: '220px' }}>
        <DropdownMenu trigger={<Button>Format</Button>}>
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              setBold((b) => !b);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setBold((b) => !b);
              }
            }}
          >
            Bold
          </MenuItem>
          <MenuItem onSelect={() => setPicked('Clear')}>Clear</MenuItem>
        </DropdownMenu>
        <output data-testid="bold">{bold ? 'on' : 'off'}</output>
        <output data-testid="picked">{picked}</output>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const trigger = await canvas.findByRole('button', { name: 'Format' });
    const [bold, clear] = canvas.getAllByRole('menuitem', { hidden: true });

    // 마우스: 막은 항목은 열린 채로.
    await userEvent.click(trigger);
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    await userEvent.click(bold);
    await expect(canvas.getByTestId('bold')).toHaveTextContent('on');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // 키보드: 막은 항목은 열린 채로, 막지 않은 항목은 고르면 닫히고 트리거로.
    bold.focus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByTestId('bold')).toHaveTextContent('off');
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{ArrowDown}');
    await expect(clear).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(canvas.getByTestId('picked')).toHaveTextContent('Clear');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'));
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};
