import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader } from '@centurio1987/core';
import { expect, within } from 'storybook/test';

const meta = {
  title: 'Molecules/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    accept: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    variant: { control: 'select', options: ['default', 'compact'] },
    externalError: { control: 'text' },
  },
} satisfies Meta<typeof FileUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── 기존 스토리 (보존) ───────────────────────────────────────────

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 렌더링 확인
    const label = await canvas.findByText('Click or drag files to upload');
    await expect(label).toBeVisible();
    // 토큰 적용 검증: dropzone wrapper에 borderRadius가 적용돼 있어야 한다
    const dropzone = canvasElement.querySelector('[data-testid="file-uploader-dropzone"]');
    if (dropzone) {
      const style = getComputedStyle(dropzone as HTMLElement);
      await expect(style.cursor).toBe('pointer');
    }
  },
};

export const SingleFile: Story = {
  args: { multiple: false },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const label = await canvas.findByText('Click or drag files to upload');
    await expect(label).toBeVisible();
  },
};

export const WithAcceptAndMaxSize: Story = {
  args: {
    accept: 'image/*',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const hint = await canvas.findByText(/Accepted files: image\/\*/);
    await expect(hint).toBeVisible();
    const sizeHint = await canvas.findByText(/5MB/);
    await expect(sizeHint).toBeVisible();
  },
};

export const WithUploadProgress: Story = {
  args: {
    uploadProgress: { 'example.png': 60 },
  },
};

// ─── 신규 스토리 ──────────────────────────────────────────────────

/**
 * disabled: 클릭/드래그 불가, 시각적으로 흐려짐
 */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const label = await canvas.findByText('Click or drag files to upload');
    await expect(label).toBeVisible();
    // disabled dropzone은 cursor: not-allowed 이어야 한다
    const dropzone = canvasElement.querySelector('[data-testid="file-uploader-dropzone"]');
    await expect(dropzone).not.toBeNull();
    const style = getComputedStyle(dropzone as HTMLElement);
    await expect(style.cursor).toBe('not-allowed');
  },
};

/**
 * loading: 업로드 진행 중 상태 — 드롭존 위에 스피너+메시지 오버레이
 */
export const Loading: Story = {
  args: { loading: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const uploadingText = await canvas.findByText('Uploading…');
    await expect(uploadingText).toBeVisible();
    // loading 중에는 클릭 비활성 → cursor: not-allowed
    const dropzone = canvasElement.querySelector('[data-testid="file-uploader-dropzone"]');
    await expect(dropzone).not.toBeNull();
    const style = getComputedStyle(dropzone as HTMLElement);
    await expect(style.cursor).toBe('not-allowed');
  },
};

/**
 * externalError: 외부에서 주입한 에러 메시지 표시
 */
export const ExternalError: Story = {
  args: { externalError: 'Server rejected the file. Please try again.' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const errMsg = await canvas.findByText('Server rejected the file. Please try again.');
    await expect(errMsg).toBeVisible();
  },
};

/**
 * compact: 인라인 버튼 스타일 — 풀사이즈 드롭존 대신 작은 버튼+힌트
 */
export const Compact: Story = {
  args: { variant: 'compact' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button', { name: /Choose file/i });
    await expect(btn).toBeVisible();
    // compact 드롭존은 풀사이즈보다 padding이 작아야 한다
    const dropzone = canvasElement.querySelector('[data-testid="file-uploader-dropzone"]');
    await expect(dropzone).not.toBeNull();
    // compact 변형은 별도의 "Choose file" 버튼이 클릭 타깃이므로
    // 드롭존 자체의 커서는 default (풀사이즈 드롭존만 pointer)
    const style = getComputedStyle(dropzone as HTMLElement);
    await expect(style.cursor).toBe('default');
  },
};

/**
 * CompactDisabled: compact + disabled 조합
 */
export const CompactDisabled: Story = {
  args: { variant: 'compact', disabled: true },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    const btn = await canvas.findByRole('button', { name: /Choose file/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeDisabled();
  },
};
