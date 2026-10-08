/**
 * focusContrast.test.ts — **포커스 테두리 대비 게이트** (KAN-060).
 *
 * core 의 키보드 포커스 테두리는 모든 상호작용 컴포넌트에서 `semantic.border.focus` 로 그려진다(KAN-059).
 * 그 색이 화면 표면(`background.base`·`elevated`)과 3:1(WCAG 1.4.11 비텍스트 대비)이 안 되면 그 foundation 을
 * 고른 사용자는 Tab 을 눌러도 포커스가 어디 있는지 못 본다. 이 게이트가 확장 foundation 76개 전부를 잰다.
 *
 * 잴 규칙은 tokens 의 `focusContrast` 하나다 — style guide 색 스킴과 core base 3종은 같은 함수로
 * `packages/style-guide-catalog/src/accessibility.test.ts` 가 잰다(이 패키지는 core 를 가져올 수 없다).
 */
import { describe, it, expect } from 'vitest';
import { focusContrast, FOCUS_CONTRAST_MIN } from '@centurio1987/bbangto-ui-tokens';
import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens';
import { foundationCatalog } from './index';

/** 미달(또는 측정 불가) foundation 을 고칠 사람이 바로 읽는 한 줄씩으로 모은다. */
function auditFoundations(catalog: Record<string, BbangtoFoundation>): string[] {
  const out: string[] = [];
  for (const [slug, f] of Object.entries(catalog)) {
    const fc = focusContrast(f.semantic);
    const focus = f.semantic.border.focus;
    if (!fc) out.push(`${slug}: border.focus ${focus} — 측정 불가(색을 못 읽음)`);
    else if (fc.ratio + 1e-6 < FOCUS_CONTRAST_MIN) {
      out.push(`${slug}: border.focus ${focus} — ${Math.round(fc.ratio * 100) / 100}:1 (${fc.against})`);
    }
  }
  return out;
}

/** fixture — 실제 foundation 하나를 복사해 포커스·표면 색만 바꾼다. */
const withColors = (focus: string, base: string, elevated = base): BbangtoFoundation => {
  const src = foundationCatalog['amber-light'];
  return {
    ...src,
    semantic: {
      ...src.semantic,
      border: { ...src.semantic.border, focus },
      background: { ...src.semantic.background, base, elevated },
    },
  };
};

describe('포커스 테두리 대비 — fixture 실패 주입', () => {
  it('노랑 포커스 + 흰 배경은 미달로 잡힌다', () => {
    expect(auditFoundations({ yellow: withColors('#FAFF69', '#FFFFFF') })).toEqual([
      'yellow: border.focus #FAFF69 — 1.07:1 (base)',
    ]);
  });

  it('elevated 만 미달이어도 잡히고 자리가 elevated 로 적힌다', () => {
    const v = auditFoundations({ card: withColors('#1D4ED8', '#FFFFFF', '#2563EB') });
    expect(v).toHaveLength(1);
    expect(v[0]).toMatch(/\(elevated\)$/);
  });

  it('색을 못 읽으면 통과가 아니라 측정 불가로 잡힌다', () => {
    expect(auditFoundations({ v: withColors('var(--focus)', '#FFFFFF') })).toEqual([
      'v: border.focus var(--focus) — 측정 불가(색을 못 읽음)',
    ]);
  });

  it('충분히 어두운 포커스는 통과한다', () => {
    expect(auditFoundations({ ok: withColors('#1D4ED8', '#FFFFFF') })).toEqual([]);
  });
});

describe('포커스 테두리 대비 — 실제 foundation 카탈로그', () => {
  it('확장 foundation 76개 전부 border.focus 가 표면과 3:1 이상이다', () => {
    expect(Object.keys(foundationCatalog)).toHaveLength(76);
    const violations = auditFoundations(foundationCatalog);
    expect(violations, violations.join('\n')).toEqual([]);
  });
});
