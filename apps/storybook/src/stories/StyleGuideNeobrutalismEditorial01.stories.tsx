import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';
import { bakeryStyleGuide } from '@centurio1987/bbangto-ui-style-guide-catalog';
import { makeCatalogStories } from './_catalogStory';

/*
 * Neobrutalism_Editorial_01 — Style Guide Catalog의 첫 preset.
 *
 * 최초 손저작 플래그십을 공용 factory(makeCatalogStories)로 표준 편입했다. 6-leaf 카탈로그
 * 구성요소 + FoundationPresets(색 스킴 기호선택)를 다른 49종과 동일하게 생성한다.
 * 콘텐츠는 가상(fictional) placeholder다 — 개인/연락처/실제 제품명을 포함하지 않는다.
 */
const meta = {
  title: 'STYLE GUIDE CATALOG/Neobrutalism_Editorial_01',
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'todo' },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const s = makeCatalogStories(bakeryStyleGuide);

export const ReferencedFoundations = s.ReferencedFoundations;
export const ExtendedFoundations = s.ExtendedFoundations;
export const WrapperComponents = s.WrapperComponents;
export const Patterns = s.Patterns;
export const Guideline = s.Guideline;
export const FoundationPresets = s.FoundationPresets;

// 제네릭 Visual Motif에 네오브루탈리즘 정체성 회귀 검증을 덧붙인다(각진 모서리·하드 오프셋·잉크선).
export const VisualMotif: Story = {
  ...(s.VisualMotif as Story),
  play: async (ctx) => {
    await s.VisualMotif.play?.(ctx as never);
    const { canvasElement } = ctx;
    const canvas = within(canvasElement);

    // 래퍼 Button은 각진 모서리(radius 0) + 하드 오프셋 그림자.
    const btns = canvas.getAllByRole('button');
    const cta = btns[0];
    await expect(getComputedStyle(cta).borderRadius).toBe('0px');
    await expect(getComputedStyle(cta).boxShadow).not.toBe('none');

    // 확장 토큰 — 잉크 = border.base, 오프셋 그림자 정의됨.
    await expect(bakeryStyleGuide.extendedFoundations?.['--bbangto-ext-ink']).toBe(
      bakeryStyleGuide.foundations.semantic.border.base,
    );
    await expect(bakeryStyleGuide.extendedFoundations?.['--bbangto-ext-offset-shadow']).toBeTruthy();
    await expect(bakeryStyleGuide.foundations.radius.md).toBe('0px');
    await expect(bakeryStyleGuide.name).toBe('neobrutalism-editorial-01');
  },
};
