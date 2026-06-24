import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Molecules/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pill', 'enclosed'],
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
