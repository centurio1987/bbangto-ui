import { describe, it, expect } from 'vitest';
import {
  parseColor,
  extractColors,
  compositeOver,
  contrastRatio,
  surfaceColors,
  focusContrast,
  FOCUS_CONTRAST_MIN,
} from '@centurio1987/bbangto-ui-tokens';
import { darkFoundation, highContrastFoundation, lightFoundation } from '@centurio1987/bbangto-ui-core';
import { styleGuideCatalog } from './index';
import {
  auditContrast,
  auditFocusContrast,
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

// ── 포커스 테두리 대비 (KAN-060) ──────────────────────────────────────────────

/** border.focus · base · elevated 만 담은 최소 semantic. */
const focusSemantic = (focus: string, base: string, elevated: string) => ({
  border: { focus },
  background: { base, elevated },
});

/** 포커스 감사용 fixture — foundationPresets 없이 base foundations 하나. */
function focusEntry(name: string, focus: string, base: string, elevated = base): AuditableEntry {
  return {
    name,
    foundations: { semantic: focusSemantic(focus, base, elevated) } as unknown as AuditableEntry['foundations'],
  };
}

/** 위반 목록을 고칠 사람이 바로 읽는 한 줄씩으로. */
const describeFocus = (v: ReturnType<typeof auditFocusContrast>) =>
  v.map((x) => `${x.name}/${x.presetKey}: border.focus ${x.focus} — ${x.measured ?? '측정 불가'}:1 (${x.against ?? x.reason})`).join('\n');

describe('surfaceColors · focusContrast (tokens)', () => {
  it('하한은 WCAG 1.4.11 의 3:1', () => {
    expect(FOCUS_CONTRAST_MIN).toBe(3);
  });

  it('반투명 elevated 는 흰색이 아니라 base 위에 합성한다', () => {
    const s = surfaceColors({ base: '#0D0F24', elevated: 'rgba(255,255,255,0.08)' });
    expect(s.base).toHaveLength(1);
    expect(s.elevated).toHaveLength(1);
    // 어두운 base 위 8% 흰색 → 여전히 어둡다(흰색 위였다면 255 가 된다).
    expect(s.elevated[0].r).toBeLessThan(40);
    expect(s.elevated[0].a).toBe(1);
  });

  it('반투명 elevated 를 그라디언트 base 의 스톱마다 합성한다', () => {
    const s = surfaceColors({
      base: 'linear-gradient(180deg, #101010 0%, #303030 100%)',
      elevated: 'rgba(255,255,255,0.1)',
    });
    expect(s.base).toHaveLength(2);
    expect(s.elevated).toHaveLength(2);
  });

  it('노랑 포커스 + 흰 배경 → 3:1 미달, 자리는 base', () => {
    const fc = focusContrast(focusSemantic('#FAFF69', '#FFFFFF', '#FFFFFF'))!;
    expect(fc.ratio).toBeLessThan(1.1);
    expect(fc.against).toBe('base');
  });

  it('base 는 통과하고 elevated 만 미달이면 자리는 elevated', () => {
    // 진한 파랑 포커스: 흰 base 와는 높고, 같은 파랑 계열 elevated 와는 낮다.
    const fc = focusContrast(focusSemantic('#1D4ED8', '#FFFFFF', '#2563EB'))!;
    expect(fc.ratio).toBeLessThan(FOCUS_CONTRAST_MIN);
    expect(fc.against).toBe('elevated');
  });

  it('포커스 색이나 표면 색을 못 읽으면 null', () => {
    expect(focusContrast(focusSemantic('var(--x)', '#FFFFFF', '#FFFFFF'))).toBeNull();
    expect(focusContrast(focusSemantic('#000000', 'var(--page)', '#FFFFFF'))).toBeNull();
  });
});

describe('auditFocusContrast — 미달 감지 (fixture)', () => {
  it('(a) 노랑 포커스 + 흰 배경 → below-threshold', () => {
    const v = auditFocusContrast([focusEntry('x', '#FAFF69', '#FFFFFF')]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ name: 'x', presetKey: 'default', reason: 'below-threshold', against: 'base', required: 3 });
    expect(v[0].measured).toBeLessThan(1.1);
  });

  it('(b) 어두운 포커스 + 흰 배경 → 위반 없음', () => {
    expect(auditFocusContrast([focusEntry('x', '#1D4ED8', '#FFFFFF')])).toEqual([]);
  });

  it('(c) 반투명 elevated 를 어두운 base 위에 두면 base 위 합성으로 재서 통과한다', () => {
    // 흰색 위로 재면 #8AB4FF 대 거의 흰색 → 2:1 남짓의 거짓 미달이 난다.
    const glass = 'rgba(255,255,255,0.08)';
    expect(contrastRatio('#8AB4FF', glass)!).toBeLessThan(FOCUS_CONTRAST_MIN);
    const grad = 'radial-gradient(125% 125% at 8% 0%, #232861 0%, #0D0F24 58%)';
    expect(auditFocusContrast([focusEntry('glass', '#8AB4FF', grad, glass)])).toEqual([]);
  });

  it('(d) 그라디언트 base 는 가장 낮은 스톱으로 잰다 — 한 스톱만 미달이어도 위반', () => {
    const v = auditFocusContrast([
      focusEntry('mix', '#E9C766', 'linear-gradient(160deg, #1C1B17 0%, #FAF2DD 100%)', '#1C1B17'),
    ]);
    expect(v).toHaveLength(1);
    expect(v[0].against).toBe('base');
  });

  it('(e) 색을 못 읽으면 조용히 통과하지 않고 unparseable', () => {
    const v = auditFocusContrast([focusEntry('x', 'var(--focus)', '#FFFFFF')]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ reason: 'unparseable', measured: null, against: null });
  });

  it('(f) contrastIntent 선언과 무관하게 본다(low 도 감사 대상)', () => {
    const e = { ...focusEntry('x', '#FAFF69', '#FFFFFF'), meta: { accessibility: { contrastIntent: 'low' } } };
    expect(auditFocusContrast([e as AuditableEntry])).toHaveLength(1);
  });
});

describe('auditFocusContrast — 실 카탈로그 게이트', () => {
  it('모든 style guide 색 스킴에서 border.focus 가 표면과 3:1 이상이다', () => {
    const violations = auditFocusContrast(styleGuideCatalog);
    expect(violations, describeFocus(violations)).toEqual([]);
  });

  it('core base foundation 3종(light·dark·high-contrast)도 3:1 이상이다', () => {
    // foundations 패키지는 core 를 가져올 수 없어(rootDir·의존) core 에 의존하는 여기서 잰다.
    const base: AuditableEntry[] = [
      { name: 'core-light', foundations: lightFoundation },
      { name: 'core-dark', foundations: darkFoundation },
      { name: 'core-high-contrast', foundations: highContrastFoundation },
    ];
    const violations = auditFocusContrast(base);
    expect(violations, describeFocus(violations)).toEqual([]);
  });
});
