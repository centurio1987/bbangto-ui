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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

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
