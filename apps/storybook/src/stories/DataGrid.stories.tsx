import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DataGrid } from '@centurio1987/bbangto-ui-core';
import { expect, userEvent, within } from 'storybook/test';

interface Row {
  name: string;
  role: string;
  age: number;
}

const rows: Row[] = [
  { name: 'Mina', role: 'Designer', age: 31 },
  { name: 'Jae', role: 'Engineer', age: 27 },
  { name: 'Sora', role: 'Manager', age: 42 },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role' },
  { key: 'age', header: 'Age', sortable: true },
];

const meta = {
  title: 'ARCHETYPE/Components/Organisms/DataGrid',
  component: DataGrid,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof DataGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const firstNames = (root: HTMLElement) =>
  Array.from(root.querySelectorAll('tbody tr')).map((tr) => tr.querySelector('td')?.textContent);

/** 정렬 가능한 열 머리를 누르면 정렬된다 */
export const Default: Story = {
  args: { data: rows, columns },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await expect(firstNames(canvasElement)).toEqual(['Mina', 'Jae', 'Sora']);
    await userEvent.click(canvas.getByRole('button', { name: /Name/ }));
    await expect(firstNames(canvasElement)).toEqual(['Jae', 'Mina', 'Sora']);
    // 정렬할 수 없는 열에는 버튼이 없다.
    await expect(canvas.queryByRole('button', { name: /Role/ })).toBeNull();
  },
};

// ─── 키보드 (KAN-054) ──────────────────────────────────────────────────────────

/** 정렬 가능한 열 머리에 Tab 으로 닿고 Enter/Space 로 정렬하며, aria-sort 가 상태를 말한다 */
export const Keyboard: Story = {
  args: { data: rows, columns },
  render: (args) => (
    <div>
      <button type="button">Before</button>
      <DataGrid {...args} />
    </div>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const nameHeader = canvas.getByRole('columnheader', { name: /Name/ });
    await expect(nameHeader).toHaveAttribute('aria-sort', 'none');

    canvas.getByRole('button', { name: 'Before' }).focus();
    await userEvent.tab();
    const sortName = canvas.getByRole('button', { name: /Name/ });
    await expect(sortName).toHaveFocus();

    await userEvent.keyboard('{Enter}');
    await expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    await expect(firstNames(canvasElement)).toEqual(['Jae', 'Mina', 'Sora']);
    await userEvent.keyboard(' ');
    await expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    await expect(firstNames(canvasElement)).toEqual(['Sora', 'Mina', 'Jae']);

    // 다음 정렬 머리(Age)로 Tab — 정렬할 수 없는 Role 은 건너뛴다.
    await userEvent.tab();
    await expect(canvas.getByRole('button', { name: /Age/ })).toHaveFocus();
  },
};
