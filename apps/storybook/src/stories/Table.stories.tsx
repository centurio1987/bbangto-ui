import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '@centurio1987/bbangto-ui-core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'ARCHETYPE/Components/Organisms/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 기존 스토리 (보존) ───────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Wilson</TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Away</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// ─── 신규 스토리: Striped ────────────────────────────────────────────────────

export const Striped: Story = {
  render: () => (
    <Table striped>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Wilson</TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Away</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Alex Kim</TableCell>
          <TableCell>QA Engineer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // striped 테이블이 렌더링되는지 확인
    const cells = await canvas.findAllByRole('cell');
    await expect(cells.length).toBeGreaterThan(0);
    // 짝수/홀수 행의 배경이 다른지는 data-stripe 속성으로 확인
    const rows = canvasElement.querySelectorAll('tbody tr');
    await expect(rows.length).toBe(4);
    // 홀수 행(0-based index 1, 3)은 data-stripe="even" 속성을 가짐
    const evenRow = rows[1] as HTMLElement;
    await expect(evenRow.getAttribute('data-stripe')).toBe('even');
    const oddRow = rows[0] as HTMLElement;
    await expect(oddRow.getAttribute('data-stripe')).toBe('odd');
  },
};

// ─── 신규 스토리: Selected Row ───────────────────────────────────────────────

export const SelectedRow: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow selected>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Wilson</TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Away</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await canvas.findAllByRole('cell');
    // selected 행에 aria-selected 속성이 있는지 확인
    const rows = canvasElement.querySelectorAll('tbody tr');
    const selectedRow = rows[1] as HTMLElement;
    await expect(selectedRow.getAttribute('aria-selected')).toBe('true');
    // 선택되지 않은 행은 aria-selected가 없음
    const normalRow = rows[0] as HTMLElement;
    await expect(normalRow.getAttribute('aria-selected')).toBeNull();
  },
};

// ─── 신규 스토리: Size (Density) ─────────────────────────────────────────────

export const SizeSmall: Story = {
  render: () => (
    <Table size="sm">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await canvas.findAllByRole('cell');
    // size="sm"이 data-size 속성으로 전달되는지 확인
    const table = canvasElement.querySelector('table') as HTMLElement;
    await expect(table.getAttribute('data-size')).toBe('sm');
  },
};

export const SizeLarge: Story = {
  render: () => (
    <Table size="lg">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await canvas.findAllByRole('cell');
    const table = canvasElement.querySelector('table') as HTMLElement;
    await expect(table.getAttribute('data-size')).toBe('lg');
  },
};

// ─── 신규 스토리: Sortable Headers ──────────────────────────────────────────

export const SortableHeaders: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader sortable sortDirection="asc">Name</TableHeader>
          <TableHeader sortable sortDirection="none">Role</TableHeader>
          <TableHeader sortable sortDirection="desc">Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Alex Kim</TableCell>
          <TableCell>QA Engineer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Wilson</TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Away</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await canvas.findAllByRole('columnheader');
    // sortable 헤더에 aria-sort 속성이 있는지 확인
    const headers = canvasElement.querySelectorAll('th');
    const ascHeader = headers[0] as HTMLElement;
    await expect(ascHeader.getAttribute('aria-sort')).toBe('ascending');
    const noneHeader = headers[1] as HTMLElement;
    await expect(noneHeader.getAttribute('aria-sort')).toBe('none');
    const descHeader = headers[2] as HTMLElement;
    await expect(descHeader.getAttribute('aria-sort')).toBe('descending');
    // 정렬 아이콘이 렌더링되는지 확인
    const sortIcon = ascHeader.querySelector('[data-sort-icon]') as HTMLElement;
    await expect(sortIcon).not.toBeNull();
  },
};

// ─── 신규 스토리: 복합 (Striped + Selected + Sortable) ──────────────────────

export const Combined: Story = {
  render: () => (
    <Table striped size="sm">
      <TableHead>
        <TableRow>
          <TableHeader sortable sortDirection="asc">Name</TableHeader>
          <TableHeader sortable sortDirection="none">Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Alex Kim</TableCell>
          <TableCell>QA Engineer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow selected>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sam Wilson</TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Away</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    await canvas.findAllByRole('cell');
    // selected 행 확인
    const rows = canvasElement.querySelectorAll('tbody tr');
    await expect((rows[1] as HTMLElement).getAttribute('aria-selected')).toBe('true');
    // striped 확인
    await expect((rows[0] as HTMLElement).getAttribute('data-stripe')).toBe('odd');
    // size 확인
    const table = canvasElement.querySelector('table') as HTMLElement;
    await expect(table.getAttribute('data-size')).toBe('sm');
  },
};

// ─── 신규 스토리: Divided variant ────────────────────────────────────────────

export const Divided: Story = {
  render: () => (
    <Table variant="divided">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ③ 콘텐츠 슬롯 렌더
    await canvas.findAllByRole('cell');
    const table = canvasElement.querySelector('table') as HTMLElement;
    // ① data-attr 확인
    await expect(table.getAttribute('data-bbangto-table-variant')).toBe('divided');
    // ② load-bearing: 외곽 frame 없음 (container 4면 border-style none)
    const container = table.parentElement as HTMLElement;
    const cStyle = getComputedStyle(container);
    await expect(cStyle.borderTopStyle).toBe('none');
    await expect(cStyle.borderBottomStyle).toBe('none');
    await expect(cStyle.borderLeftStyle).toBe('none');
    await expect(cStyle.borderRightStyle).toBe('none');
    // header underline rule 은 유지 (가로줄 chrome)
    const thead = canvasElement.querySelector('thead') as HTMLElement;
    await expect(getComputedStyle(thead).borderBottomStyle).toBe('solid');
  },
};

// ─── 신규 스토리: Outlined variant ───────────────────────────────────────────

export const Outlined: Story = {
  render: () => (
    <Table variant="outlined">
      <TableHead>
        <TableRow>
          <TableHeader>Name</TableHeader>
          <TableHeader>Role</TableHeader>
          <TableHeader>Status</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Offline</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // ③ 콘텐츠 슬롯 렌더
    await canvas.findAllByRole('cell');
    const table = canvasElement.querySelector('table') as HTMLElement;
    // ① data-attr 확인
    await expect(table.getAttribute('data-bbangto-table-variant')).toBe('outlined');
    // ② load-bearing: 4면 border frame 으로 카드처럼 enclose
    const container = table.parentElement as HTMLElement;
    const cStyle = getComputedStyle(container);
    await expect(cStyle.borderTopStyle).toBe('solid');
    await expect(cStyle.borderBottomStyle).toBe('solid');
    await expect(cStyle.borderLeftStyle).toBe('solid');
    await expect(cStyle.borderRightStyle).toBe('solid');
    // overflow-auto 컨테이너
    await expect(cStyle.overflowX).toBe('auto');
  },
};
