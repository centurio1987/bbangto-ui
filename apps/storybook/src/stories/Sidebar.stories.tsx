import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem, SidebarGroup } from '@centurio1987/core';
import { expect, userEvent, within, waitFor } from 'storybook/test';

// ─── Minimal icon components (no external deps) ──────────────────────────────

const IconHome = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 6.5L8 2L14 6.5V14H10V10H6V14H2V6.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M8 1.5V3M8 13V14.5M14.5 8H13M3 8H1.5M12.364 3.636L11.3 4.7M4.7 11.3L3.636 12.364M12.364 12.364L11.3 11.3M4.7 4.7L3.636 3.636"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const IconUser = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta = {
  title: 'Molecules/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    collapsed: { control: 'boolean' },
    defaultCollapsed: { control: 'boolean' },
    width: { control: 'number' },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ height: '500px', display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default expanded sidebar with nav items and a group. */
export const Default: Story = {
  args: {
    defaultCollapsed: false,
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarGroup label="Main">
        <SidebarItem icon={<IconHome />} label="Home" active />
        <SidebarItem icon={<IconSearch />} label="Search" />
      </SidebarGroup>
      <SidebarGroup label="Account">
        <SidebarItem icon={<IconUser />} label="Profile" />
        <SidebarItem icon={<IconSettings />} label="Settings" />
      </SidebarGroup>
    </Sidebar>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 렌더링 확인 — nav 시맨틱 존재
    const nav = canvasElement.querySelector('nav');
    await expect(nav).not.toBeNull();
    await expect(nav!).toBeVisible();

    // 2. 토글 버튼 존재 + aria-expanded="true" (기본 펼쳐진 상태)
    const toggleBtn = await canvas.findByRole('button', { name: /collapse sidebar/i });
    await expect(toggleBtn).toBeVisible();
    await expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');

    // 3. active 아이템 aria-current="page" 확인
    const homeBtn = await canvas.findByRole('button', { name: /home/i });
    await expect(homeBtn).toHaveAttribute('aria-current', 'page');

    // 4. 라벨 텍스트가 보임
    const searchBtn = await canvas.findByRole('button', { name: /search/i });
    await expect(searchBtn).toBeVisible();

    // 5. 토글 클릭 → collapsed
    await userEvent.click(toggleBtn);

    await waitFor(() => {
      const expandBtn = canvasElement.querySelector('[aria-label="Expand sidebar"]');
      expect(expandBtn).not.toBeNull();
      expect(expandBtn).toHaveAttribute('aria-expanded', 'false');
    });

    // 6. collapsed 상태: nav 폭이 좁아졌는지(56px rail) 확인
    await waitFor(() => {
      const navEl = canvasElement.querySelector('nav') as HTMLElement;
      expect(navEl.style.width).toBe('56px');
    });

    // 7. SidebarItem은 collapsed 시 aria-label로 label 제공
    await waitFor(() => {
      const homeBtnAfter = canvasElement.querySelector('[aria-label="Home"]');
      expect(homeBtnAfter).not.toBeNull();
    });

    // 8. 다시 토글 클릭 → expanded 복귀
    const expandBtn = canvasElement.querySelector('[aria-label="Expand sidebar"]') as HTMLElement;
    await userEvent.click(expandBtn);

    await waitFor(() => {
      const collapseBtn = canvasElement.querySelector('[aria-label="Collapse sidebar"]');
      expect(collapseBtn).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

/** 기본 접힘 상태로 시작하는 Rail 모드. */
export const DefaultCollapsed: Story = {
  args: {
    defaultCollapsed: true,
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarGroup label="Main">
        <SidebarItem icon={<IconHome />} label="Home" active />
        <SidebarItem icon={<IconSearch />} label="Search" />
        <SidebarItem icon={<IconSettings />} label="Settings" />
      </SidebarGroup>
    </Sidebar>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    // collapsed 상태에서 시작하므로 aria-expanded=false
    await waitFor(() => {
      const btn = canvasElement.querySelector('[aria-label="Expand sidebar"]');
      expect(btn).not.toBeNull();
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    });

    // nav 폭이 rail(56px)
    const navEl = canvasElement.querySelector('nav') as HTMLElement;
    await expect(navEl.style.width).toBe('56px');
  },
};

/** 제어 모드: 외부에서 collapsed 상태 제어. */
export const Controlled: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <Sidebar collapsed={collapsed} onCollapsedChange={setCollapsed}>
          <SidebarGroup label="Navigation">
            <SidebarItem icon={<IconHome />} label="Home" active />
            <SidebarItem icon={<IconSearch />} label="Search" />
          </SidebarGroup>
        </Sidebar>
        <div style={{ padding: 16 }}>
          <button
            type="button"
            data-testid="external-toggle"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? 'External: Expand' : 'External: Collapse'}
          </button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // 1. 확장 상태 확인
    const collapseBtn = await canvas.findByRole('button', { name: /collapse sidebar/i });
    await expect(collapseBtn).toHaveAttribute('aria-expanded', 'true');

    // 2. 외부 버튼으로 접기
    const externalBtn = canvasElement.querySelector('[data-testid="external-toggle"]') as HTMLElement;
    await userEvent.click(externalBtn);

    await waitFor(() => {
      const expandBtn = canvasElement.querySelector('[aria-label="Expand sidebar"]');
      expect(expandBtn).toHaveAttribute('aria-expanded', 'false');
    });

    // 3. 내부 토글로 다시 펼치기
    const expandBtn = canvasElement.querySelector('[aria-label="Expand sidebar"]') as HTMLElement;
    await userEvent.click(expandBtn);

    await waitFor(() => {
      const cb = canvasElement.querySelector('[aria-label="Collapse sidebar"]');
      expect(cb).toHaveAttribute('aria-expanded', 'true');
    });
  },
};

/** 커스텀 너비 (360px expanded). */
export const CustomWidth: Story = {
  args: {
    width: 360,
  },
  render: (args) => (
    <Sidebar {...args}>
      <SidebarGroup label="Nav">
        <SidebarItem icon={<IconHome />} label="Home" active />
        <SidebarItem icon={<IconSearch />} label="Search" />
      </SidebarGroup>
    </Sidebar>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const navEl = canvasElement.querySelector('nav') as HTMLElement;
    await expect(navEl.style.width).toBe('360px');
  },
};

/** 그룹 없이 단순 아이템 나열. */
export const NoGroups: Story = {
  render: () => (
    <Sidebar>
      <SidebarItem icon={<IconHome />} label="Home" active />
      <SidebarItem icon={<IconSearch />} label="Search" />
      <SidebarItem icon={<IconUser />} label="Profile" />
      <SidebarItem icon={<IconSettings />} label="Settings" />
    </Sidebar>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const homeBtn = await canvas.findByRole('button', { name: /home/i });
    await expect(homeBtn).toBeVisible();
    await expect(homeBtn).toHaveAttribute('aria-current', 'page');
  },
};

/** href를 가진 링크 아이템. */
export const WithHref: Story = {
  render: () => (
    <Sidebar>
      <SidebarItem icon={<IconHome />} label="Home" href="#home" active />
      <SidebarItem icon={<IconSearch />} label="Search" href="#search" />
      <SidebarItem icon={<IconSettings />} label="Settings" href="#settings" />
    </Sidebar>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // href 아이템은 link role
    const homeLink = await canvas.findByRole('link', { name: /home/i });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute('aria-current', 'page');
    await expect(homeLink).toHaveAttribute('href', '#home');
  },
};
