import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pill', 'enclosed', 'segmented'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Existing story (preserved exactly) ────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content uses the selected tab state.</TabsContent>
      <TabsContent value="analytics">Analytics content cross-fades into view.</TabsContent>
      <TabsContent value="settings">Settings content stays mounted only while selected.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const analytics = await canvas.findByRole('tab', { name: 'Analytics' });
    const indicator = canvasElement.querySelector('[data-bbangto-tabs-indicator]') as HTMLElement | null;

    await expect(indicator).not.toBeNull();
    await expect(getComputedStyle(indicator!).transitionProperty).toContain('transform');

    await userEvent.click(analytics);
    const panel = await canvas.findByRole('tabpanel');

    await expect(analytics).toHaveAttribute('aria-selected', 'true');
    await expect(panel).toHaveTextContent('Analytics content cross-fades into view.');
    await expect(getComputedStyle(panel).animationName).toBe('bbangto-fade-in');
    await expect(document.getElementById('bbangto-motion-keyframes')).not.toBeNull();
  },
};

// ─── New: Pill variant ──────────────────────────────────────────────────────

export const PillVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="pill" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content — pill style.</TabsContent>
      <TabsContent value="analytics">Analytics content — pill style.</TabsContent>
      <TabsContent value="settings">Settings content — pill style.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // Render check
    const overviewTab = await canvas.findByRole('tab', { name: 'Overview' });
    await expect(overviewTab).toBeVisible();
    await expect(overviewTab).toHaveAttribute('aria-selected', 'true');

    // Pill variant: no underline indicator present
    const indicator = canvasElement.querySelector('[data-bbangto-tabs-indicator]');
    await expect(indicator).toBeNull();

    // Pill list container has data attribute
    const list = canvasElement.querySelector('[role="tablist"]') as HTMLElement;
    await expect(list.dataset.bbangtoTabsVariant).toBe('pill');

    // Interaction: switch tabs
    const analyticsTab = await canvas.findByRole('tab', { name: 'Analytics' });
    await userEvent.click(analyticsTab);
    const panel = await canvas.findByRole('tabpanel');
    await expect(panel).toHaveTextContent('Analytics content — pill style.');
  },
};

// ─── New: Enclosed variant ──────────────────────────────────────────────────

export const EnclosedVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="enclosed" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content — enclosed style.</TabsContent>
      <TabsContent value="analytics">Analytics content — enclosed style.</TabsContent>
      <TabsContent value="settings">Settings content — enclosed style.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const overviewTab = await canvas.findByRole('tab', { name: 'Overview' });
    await expect(overviewTab).toBeVisible();

    // Enclosed list has the variant attribute
    const list = canvasElement.querySelector('[role="tablist"]') as HTMLElement;
    await expect(list.dataset.bbangtoTabsVariant).toBe('enclosed');

    // Interaction
    const settingsTab = await canvas.findByRole('tab', { name: 'Settings' });
    await userEvent.click(settingsTab);
    const panel = await canvas.findByRole('tabpanel');
    await expect(panel).toHaveTextContent('Settings content — enclosed style.');
  },
};

// ─── New: Segmented variant ─────────────────────────────────────────────────

export const SegmentedVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" variant="segmented" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content — segmented style.</TabsContent>
      <TabsContent value="analytics">Analytics content — segmented style.</TabsContent>
      <TabsContent value="settings">Settings content — segmented style.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr hook on the tablist
    const list = canvasElement.querySelector('[role="tablist"]') as HTMLElement;
    await expect(list.dataset.bbangtoTabsVariant).toBe('segmented');

    // ② load-bearing chrome: a single rounded outer border wraps the group
    //    (distinguishes segmented from pill's border-less bg + gap, and from
    //    underline's bottom-rule-only list).
    const listStyle = getComputedStyle(list);
    await expect(listStyle.borderTopStyle).toBe('solid');
    await expect(parseFloat(listStyle.borderTopLeftRadius)).toBeGreaterThan(0);
    // No underline sliding indicator for this variant.
    await expect(canvasElement.querySelector('[data-bbangto-tabs-indicator]')).toBeNull();

    // Between-cell divider: the non-first cell carries a leading border.
    const triggers = canvasElement.querySelectorAll('[data-bbangto-tab-trigger]');
    await expect(getComputedStyle(triggers[1] as HTMLElement).borderLeftStyle).toBe('solid');

    // Only the active cell paints a fill; the track/inactive cell is transparent.
    const overviewTab = await canvas.findByRole('tab', { name: 'Overview' });
    await expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    const activeBg = getComputedStyle(overviewTab).backgroundColor;
    await expect(activeBg).not.toBe('rgba(0, 0, 0, 0)');
    await expect(activeBg).not.toBe('transparent');
    const analyticsTab = await canvas.findByRole('tab', { name: 'Analytics' });
    await expect(['rgba(0, 0, 0, 0)', 'transparent']).toContain(
      getComputedStyle(analyticsTab).backgroundColor,
    );

    // a11y contract maintained: role=tab + aria-selected + keyboard activation.
    analyticsTab.focus();
    await expect(analyticsTab).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(analyticsTab).toHaveAttribute('aria-selected', 'true');
    await expect(overviewTab).toHaveAttribute('aria-selected', 'false');

    // ③ content slot renders for the now-active tab
    const panel = await canvas.findByRole('tabpanel');
    await expect(panel).toHaveTextContent('Analytics content — segmented style.');
  },
};

// ─── New: Size variants ─────────────────────────────────────────────────────

export const SmallSize: Story = {
  render: () => (
    <Tabs defaultValue="a" size="sm" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="a">Alpha</TabsTrigger>
        <TabsTrigger value="b">Beta</TabsTrigger>
        <TabsTrigger value="c">Gamma</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Alpha panel (sm).</TabsContent>
      <TabsContent value="b">Beta panel (sm).</TabsContent>
      <TabsContent value="c">Gamma panel (sm).</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const alphaTab = await canvas.findByRole('tab', { name: 'Alpha' });
    await expect(alphaTab).toBeVisible();

    // size attribute propagated to trigger
    await expect(alphaTab.dataset.bbangtoTabsSize).toBe('sm');

    await userEvent.click(await canvas.findByRole('tab', { name: 'Beta' }));
    const panel = await canvas.findByRole('tabpanel');
    await expect(panel).toHaveTextContent('Beta panel (sm).');
  },
};

export const LargeSize: Story = {
  render: () => (
    <Tabs defaultValue="a" size="lg" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="a">Alpha</TabsTrigger>
        <TabsTrigger value="b">Beta</TabsTrigger>
        <TabsTrigger value="c">Gamma</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Alpha panel (lg).</TabsContent>
      <TabsContent value="b">Beta panel (lg).</TabsContent>
      <TabsContent value="c">Gamma panel (lg).</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const alphaTab = await canvas.findByRole('tab', { name: 'Alpha' });
    await expect(alphaTab).toBeVisible();
    await expect(alphaTab.dataset.bbangtoTabsSize).toBe('lg');
  },
};

// ─── New: Disabled trigger ──────────────────────────────────────────────────

export const DisabledTrigger: Story = {
  render: () => (
    <Tabs defaultValue="overview" style={{ maxWidth: 520 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics" disabled>Analytics (disabled)</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content.</TabsContent>
      <TabsContent value="analytics">Analytics content — should not be reachable.</TabsContent>
      <TabsContent value="settings">Settings content.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const disabledTab = await canvas.findByRole('tab', { name: /Analytics \(disabled\)/i });
    await expect(disabledTab).toBeVisible();
    await expect(disabledTab).toBeDisabled();

    // Clicking a disabled trigger must not change the active panel
    await userEvent.click(disabledTab);
    const overview = await canvas.findByRole('tab', { name: 'Overview' });
    await expect(overview).toHaveAttribute('aria-selected', 'true');

    // Active panel should still be overview
    const panel = await canvas.findByRole('tabpanel');
    await expect(panel).toHaveTextContent('Overview content.');
  },
};

// ─── New: Vertical orientation ──────────────────────────────────────────────

export const VerticalOrientation: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical" style={{ maxWidth: 600 }}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content — vertical layout.</TabsContent>
      <TabsContent value="analytics">Analytics content — vertical layout.</TabsContent>
      <TabsContent value="settings">Settings content — vertical layout.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    const overviewTab = await canvas.findByRole('tab', { name: 'Overview' });
    await expect(overviewTab).toBeVisible();

    // Root container must have aria-orientation="vertical" on the tablist
    const list = canvasElement.querySelector('[role="tablist"]') as HTMLElement;
    await expect(list).toHaveAttribute('aria-orientation', 'vertical');

    // Switch tab
    await userEvent.click(await canvas.findByRole('tab', { name: 'Analytics' }));
    const panel = await canvas.findByRole('tabpanel');
    await expect(panel).toHaveTextContent('Analytics content — vertical layout.');
  },
};

// ─── 키보드 계약 (WAI-ARIA APG Tabs 패턴) ──────────────────────────────────
// 탭 묶음은 Tab 정지점이 하나이고(roving tabindex), 그 안의 이동은 화살표·Home/End 로
// 한다. 이동하면 선택도 함께 옮긴다(자동 활성화). 각 탭은 aria-controls 로 자기 패널을
// 가리키고, 비선택 패널은 숨긴 빈 껍데기로 남되 내용은 그리지 않는다.

const tabbable = (tabs: HTMLElement[]) =>
  tabs.filter((t) => !(t as HTMLButtonElement).disabled && t.tabIndex === 0);

export const Keyboard: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 520 }}>
      <button type="button">Before</button>
      <Tabs defaultValue="overview">
        <TabsList aria-label="Report sections">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="billing" disabled>Billing</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview panel body.</TabsContent>
        <TabsContent value="analytics">Analytics panel body.</TabsContent>
        <TabsContent value="billing">Billing panel body.</TabsContent>
        <TabsContent value="settings">Settings panel body.</TabsContent>
      </Tabs>
      <button type="button">After</button>
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const overview = await canvas.findByRole('tab', { name: 'Overview' });
    const analytics = canvas.getByRole('tab', { name: 'Analytics' });
    const settings = canvas.getByRole('tab', { name: 'Settings' });
    const tabs = canvas.getAllByRole('tab');

    // ① Tab 정지점은 선택된 탭 하나다.
    await expect(tabbable(tabs)).toEqual([overview]);
    canvas.getByRole('button', { name: 'Before' }).focus();
    await userEvent.tab();
    await expect(overview).toHaveFocus();
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: 'After' })).toHaveFocus();

    // ② → 로 다음 탭에 포커스와 선택이 함께 간다.
    overview.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(analytics).toHaveFocus();
    await expect(analytics).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Analytics panel body.');
    await expect(tabbable(tabs)).toEqual([analytics]);

    // ③ 비활성 탭은 건너뛰고, 끝에서는 처음으로 돈다.
    await userEvent.keyboard('{ArrowRight}');
    await expect(settings).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(overview).toHaveFocus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(settings).toHaveFocus();

    // ④ Home / End.
    await userEvent.keyboard('{Home}');
    await expect(overview).toHaveFocus();
    await expect(overview).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{End}');
    await expect(settings).toHaveFocus();
    await expect(settings).toHaveAttribute('aria-selected', 'true');

    // ⑤ 탭 ↔ 패널 연결. 모든 탭의 aria-controls 대상이 DOM 에 있다.
    for (const tab of tabs) {
      const panelId = tab.getAttribute('aria-controls');
      await expect(panelId).toBeTruthy();
      const panel = document.getElementById(panelId!);
      await expect(panel).not.toBeNull();
      await expect(panel).toHaveAttribute('role', 'tabpanel');
    }
    const selectedPanel = canvas.getByRole('tabpanel');
    await expect(selectedPanel).toHaveAttribute('aria-labelledby', settings.id);
    await expect(selectedPanel).toHaveAccessibleName('Settings');

    // ⑥ 비선택 패널은 숨긴 껍데기이고 내용은 그리지 않는다(마운트 동작 유지).
    const overviewPanel = document.getElementById(overview.getAttribute('aria-controls')!)!;
    await expect(overviewPanel).not.toBeVisible();
    await expect(canvas.queryByText('Overview panel body.')).toBeNull();
  },
};

export const KeyboardVertical: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical" style={{ maxWidth: 600 }}>
      <TabsList aria-label="Report sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview — vertical.</TabsContent>
      <TabsContent value="analytics">Analytics — vertical.</TabsContent>
      <TabsContent value="settings">Settings — vertical.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const overview = await canvas.findByRole('tab', { name: 'Overview' });
    const analytics = canvas.getByRole('tab', { name: 'Analytics' });

    // 세로 방향은 ↓/↑ 로 움직인다.
    overview.focus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(analytics).toHaveFocus();
    await expect(analytics).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowUp}');
    await expect(overview).toHaveFocus();
    await expect(overview).toHaveAttribute('aria-selected', 'true');

    // 가로 화살표는 세로 탭 묶음을 움직이지 않는다.
    await userEvent.keyboard('{ArrowRight}');
    await expect(overview).toHaveFocus();
  },
};

export const TriggerOnClick: Story = {
  render: () => {
    const [clicks, setClicks] = useState(0);
    return (
      <Tabs defaultValue="overview" style={{ maxWidth: 520 }}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" onClick={() => setClicks((n) => n + 1)}>
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content.</TabsContent>
        <TabsContent value="analytics">Analytics content.</TabsContent>
        <output data-testid="clicks">{clicks}</output>
      </Tabs>
    );
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const analytics = await canvas.findByRole('tab', { name: 'Analytics' });

    // 사용자 onClick 을 넘겨도 선택이 일어나고, onClick 도 불린다.
    await userEvent.click(analytics);
    await expect(analytics).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getByTestId('clicks')).toHaveTextContent('1');
  },
};
