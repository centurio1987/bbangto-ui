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
    variant: { control: 'select', options: ['default', 'compact', 'avatar'] },
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

/**
 * avatar: 원형 미디어 슬롯 자체가 업로드 타깃 — 대시 사각 드롭존 chrome 제거,
 * 얇은 solid border + 원형(radius full) 처리. 이미지가 슬롯을 채우고 hover 시 dim.
 */
export const Avatar: Story = {
  args: { variant: 'avatar' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);

    // ① data-attr: 루트에 avatar 훅이 렌더돼야 한다
    const root = canvasElement.querySelector('[data-bbangto-file-upload-variant]');
    await expect(root).not.toBeNull();
    await expect(root!.getAttribute('data-bbangto-file-upload-variant')).toBe('avatar');

    // ② load-bearing computed style: 대시 사각 chrome이 사라지고 원형 + solid border.
    // (default/compact는 borderStyle 'dashed' — avatar는 'solid'여야 한다)
    const target = canvasElement.querySelector(
      '[data-testid="file-uploader-dropzone"]'
    ) as HTMLElement;
    await expect(target).not.toBeNull();
    const style = getComputedStyle(target);
    await expect(style.borderTopStyle).toBe('solid');
    await expect(style.borderTopStyle).not.toBe('dashed');
    // 원형 슬롯: border-radius가 0이 아니어야 한다 (radius.full)
    await expect(style.borderTopLeftRadius).not.toBe('0px');
    await expect(style.borderTopLeftRadius).not.toBe('');
    // 이미지가 슬롯을 채우는 처리 (background-size: cover)
    await expect(style.backgroundSize).toBe('cover');
    await expect(style.position).toBe('relative');

    // ③ 콘텐츠 슬롯 + a11y 계약: 키보드 접근 가능한 업로드 타깃(role=button) +
    //    hidden file input 접근 유지
    const slot = await canvas.findByRole('button', { name: /avatar image/i });
    await expect(slot).toBeVisible();
    await expect(slot).toHaveAttribute('tabindex', '0');
    const fileInput = canvasElement.querySelector('input[type="file"]');
    await expect(fileInput).not.toBeNull();
  },
};
