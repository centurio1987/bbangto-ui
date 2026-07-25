import { describe, it, expect } from 'vitest';
import { parseColor, extractColors, compositeOver, contrastRatio } from '@centurio1987/bbangto-ui-tokens';
import { styleGuideCatalog } from './index';
import {
  auditContrast,
  CONTRAST_THRESHOLDS,
  type AuditableEntry,
} from './accessibilityAudit';

// ── fixture: fg/bg + contrastIntent만 담은 최소 AuditableEntry(캐스팅). ──
function entry(
  name: string,
  intent: 'low' | 'aa' | 'aaa' | undefined,
  fg: string,
  bg: string,
  presets?: { key: string; fg: string; bg: string }[]
): AuditableEntry {
  const found = (f: string, b: string) => ({ semantic: { foreground: { base: f }, background: { base: b } } });
  return {
    name,
    meta: intent ? ({ accessibility: { contrastIntent: intent } } as AuditableEntry['meta']) : undefined,
    foundations: found(fg, bg) as unknown as AuditableEntry['foundations'],
    foundationPresets: presets?.map((p) => ({
      key: p.key,
      label: p.key,
      foundations: found(p.fg, p.bg),
    })) as unknown as AuditableEntry['foundationPresets'],
  };
}

describe('contrast 유틸 (tokens)', () => {
  it('흑백 대비 = 21, 동색 = 1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 6);
  });

  it('대비비는 대칭이다', () => {
    expect(contrastRatio('#123456', '#abcdef')).toBeCloseTo(
      contrastRatio('#abcdef', '#123456')!,
      10
    );
  });

  it('parseColor: hex(3/4/6/8)·rgb·rgba 포맷', () => {
    expect(parseColor('#fff')).toEqual({ r: 255, g: 255, b: 255, a: 1 });
    expect(parseColor('#ff0000')).toEqual({ r: 255, g: 0, b: 0, a: 1 });
    expect(parseColor('#00000080')!.a).toBeCloseTo(128 / 255, 4);
    expect(parseColor('rgb(10, 20, 30)')).toEqual({ r: 10, g: 20, b: 30, a: 1 });
    expect(parseColor('rgba(0,0,0,0.5)')).toEqual({ r: 0, g: 0, b: 0, a: 0.5 });
    expect(parseColor('linear-gradient(#000,#fff)')).toBeNull();
    expect(parseColor('tomato')).toBeNull();
  });

  it('compositeOver: 반투명 흑을 백 위에 → 중간 회색', () => {
    const mid = compositeOver(parseColor('rgba(0,0,0,0.5)')!, { r: 255, g: 255, b: 255, a: 1 });
    expect(mid.r).toBeCloseTo(127.5, 1);
    expect(mid.a).toBe(1);
  });

  it('알파 fg는 bg 위 합성 후 대비 계산(불투명 fg보다 낮은 대비)', () => {
    const solid = contrastRatio('#000000', '#ffffff')!;
    const translucent = contrastRatio('rgba(0,0,0,0.5)', '#ffffff')!;
    expect(translucent).toBeLessThan(solid);
    expect(translucent).toBeGreaterThan(1);
  });
});

describe('CONTRAST_THRESHOLDS', () => {
  it('aa=4.5, aaa=7, low=0', () => {
    expect(CONTRAST_THRESHOLDS).toEqual({ low: 0, aa: 4.5, aaa: 7 });
  });
});

describe('auditContrast — over-claim 감지 (fixture)', () => {
  it('(a) aaa 선언·실측 ~4.5:1(<7) → below-threshold violation', () => {
    const v = auditContrast([entry('x', 'aaa', '#767676', '#ffffff')]); // #767676/white ≈ 4.54 < 7
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ name: 'x', intent: 'aaa', reason: 'below-threshold' });
    expect(v[0].measured).toBeLessThan(7);
    expect(v[0].measured).toBeGreaterThan(4.5);
  });

  it('(b) aa 선언·실측 ≥4.5 → 위반 없음', () => {
    expect(auditContrast([entry('x', 'aa', '#595959', '#ffffff')])).toEqual([]); // ≈7 ≥ 4.5
  });

  it('(c) low 선언·실측 ~2:1 → 위반 없음(무제약)', () => {
    expect(auditContrast([entry('x', 'low', '#aaaaaa', '#ffffff')])).toEqual([]);
  });

  it('(d) intent 미저작 → skip(위반 없음)', () => {
    expect(auditContrast([entry('x', undefined, '#aaaaaa', '#ffffff')])).toEqual([]);
  });

  it('(e) aa 선언·fg 파싱 불가 → unparseable-foreground violation', () => {
    const v = auditContrast([entry('x', 'aa', 'var(--nope)', '#ffffff')]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ reason: 'unparseable-foreground', measured: null });
  });

  it('(f) aa 선언·bg 색 추출 불가(var()) → unparseable-background violation', () => {
    const v = auditContrast([entry('x', 'aa', '#000000', 'var(--page)')]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ reason: 'unparseable-background', measured: null });
  });

  it('(i) 그라디언트 배경: 동일 톤 스톱은 통과, 밝은 스톱 섞이면 worst-case로 violation', () => {
    // 다크→다크 그라디언트 + 밝은 fg → 전 스톱 고대비 → 통과.
    const okGrad = 'radial-gradient(125% 125% at 8% 0%, #232861 0%, #0D0F24 58%)';
    expect(auditContrast([entry('ok', 'aa', '#F4F6FF', okGrad)])).toEqual([]);
    // 밝은 스톱이 섞인 그라디언트 + 밝은 fg → 그 스톱에서 저대비 → worst-case violation.
    const mixGrad = 'linear-gradient(160deg, #0D0F24 0%, #EEEEEE 100%)';
    const v = auditContrast([entry('mix', 'aa', '#F4F6FF', mixGrad)]);
    expect(v).toHaveLength(1);
    expect(v[0].reason).toBe('below-threshold');
  });

  it('(g) foundationPresets 없으면 base foundations 1개 감사', () => {
    const v = auditContrast([entry('x', 'aaa', '#767676', '#ffffff')]);
    expect(v).toHaveLength(1);
    expect(v[0].presetKey).toBe('default');
  });

  it('(h) 여러 preset 중 미달 preset만 violation', () => {
    const v = auditContrast([
      entry('x', 'aaa', '#000', '#fff', [
        { key: 'ok', fg: '#000000', bg: '#ffffff' }, // 21 ≥ 7
        { key: 'bad', fg: '#777777', bg: '#888888' }, // ~1.x < 7
      ]),
    ]);
    expect(v).toHaveLength(1);
    expect(v[0].presetKey).toBe('bad');
  });
});

describe('auditContrast — 실 카탈로그 게이트 (over-claim 방지)', () => {
  it('styleGuideCatalog에 over-claim이 없다(전 항목 선언이 실측을 만족)', () => {
    const violations = auditContrast(styleGuideCatalog);
    // 위반 시 진단을 메시지로 노출.
    expect(violations, JSON.stringify(violations, null, 2)).toEqual([]);
  });

  it('모든 preset의 base fg는 단색·bg는 색 추출 가능(그라디언트 포함, null-skip 은폐 방지)', () => {
    for (const sg of styleGuideCatalog) {
      const presets = sg.foundationPresets?.length
        ? sg.foundationPresets
        : [{ key: 'default', foundations: sg.foundations }];
      for (const p of presets) {
        expect(parseColor(p.foundations.semantic.foreground.base), `${sg.name}/${p.key} fg`).not.toBeNull();
        expect(
          extractColors(p.foundations.semantic.background.base).length,
          `${sg.name}/${p.key} bg`
        ).toBeGreaterThan(0);
      }
    }
  });
});
