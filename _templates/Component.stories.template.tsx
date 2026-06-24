// 템플릿: 컴포넌트 스토리 + play 테스트 (테스트 먼저!)
// 사용법: __Name__ 치환 후 apps/storybook/src/stories/<Name>.stories.tsx 로 복사.
//        title 의 'Layer' 는 Storybook 계층 규약(아래) 중 하나로 지정한다.
//        Atoms | Molecules | Blocks | Patterns | Motion | Motion/Shaders | Hooks
// 규칙(QUALITY_CHECKLIST.md A/E): 기본 렌더 story에 play 필수(요소 존재 + 인터랙션 1건),
//        주요 variant/state 별 story 존재, addon-a11y 위반 없음.
import type { Meta, StoryObj } from '@storybook/react';
import { __Name__ } from '@centurio1987/core';
import { expect, userEvent, within } from 'storybook/test';

const meta = {
  title: 'Atoms/__Name__',
  component: __Name__,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof __Name__>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: '__Name__', variant: 'solid', size: 'md' },
  play: async ({ canvasElement }: { canvasElement: HTMLElement }) => {
    const canvas = within(canvasElement);
    // 1. 렌더링 확인
    const el = await canvas.findByText('__Name__');
    await expect(el).toBeVisible();
    // 2. 인터랙션 (예: 클릭/호버/키보드) — 컴포넌트에 맞게 교체
    await userEvent.click(el);
    // 3. 토큰 적용 검증 (선택)
    const style = getComputedStyle(el.closest('[style]') ?? el);
    await expect(style.borderRadius).not.toBe('');
  },
};

export const Outline: Story = {
  args: { children: '__Name__', variant: 'outline' },
};
