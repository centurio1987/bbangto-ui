import type { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';
import React from 'react';
import { styleGuideCatalog, SHOWCASE_COPY_EXT } from '@centurio1987/bbangto-ui-style-guide-catalog';

/*
 * Showcase 확장 카피 완비성 게이트.
 *
 * `SHOWCASE_COPY_EXT`(결정론적 데이터 레지스트리)의 각 엔트리가 계약을 지키는지 검증한다:
 *   philosophy 정확히 3장 · skills ≥3 · contact는 실제 이메일/URL 아님(가상 placeholder).
 *
 * Phase 3(콘텐츠 조립) 완료 시 REQUIRE_FULL_COVERAGE를 true로 올려 전 카탈로그 displayName
 * 커버를 강제한다. 그 전까지는 기본값 degrade로 빌드가 초록이므로 존재 엔트리만 검사한다.
 */
const REQUIRE_FULL_COVERAGE = false;

const REAL_EMAIL = /@(?!example\.invalid)[a-z0-9.-]+\.[a-z]{2,}/i;
const REAL_URL = /(https?:\/\/|www\.)/i;

const displayNames = styleGuideCatalog.map(
  (sg) => (sg.visualMotif?.example as { displayName?: string } | undefined)?.displayName ?? '',
);

const meta = {
  title: 'STYLE GUIDE CATALOG/_Showcase Copy Completeness',
  parameters: { layout: 'centered' },
} satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const Completeness: Story = {
  render: () => {
    const present = displayNames.filter((d) => SHOWCASE_COPY_EXT[d]).length;
    return (
      <div style={{ fontFamily: 'monospace', fontSize: 14 }}>
        Showcase copy coverage: {present} / {displayNames.length}
      </div>
    );
  },
  play: async () => {
    // 존재하는 엔트리는 계약을 만족해야 한다.
    for (const [, ext] of Object.entries(SHOWCASE_COPY_EXT)) {
      if (ext.philosophy) await expect(ext.philosophy.length).toBe(3);
      if (ext.skills) await expect(ext.skills.length).toBeGreaterThanOrEqual(3);
      if (ext.contact) {
        const vals = Object.values(ext.contact).filter(Boolean).join(' ');
        await expect(REAL_EMAIL.test(vals)).toBe(false);
        await expect(REAL_URL.test(vals)).toBe(false);
      }
    }
    // Phase 3 완료 시: 전 카탈로그 displayName이 레지스트리에 존재해야 한다.
    if (REQUIRE_FULL_COVERAGE) {
      for (const d of displayNames) {
        await expect(Boolean(SHOWCASE_COPY_EXT[d])).toBe(true);
      }
    }
  },
};
