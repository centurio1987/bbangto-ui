import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, it, expect } from 'vitest';
import {
  parseColor,
  extractColors,
  compositeOver,
  contrastRatio,
  surfaceColors,
  focusContrast,
  flattenToCSSVars,
  FOCUS_CONTRAST_MIN,
} from '@centurio1987/bbangto-ui-tokens';
import { darkFoundation, highContrastFoundation, lightFoundation } from '@centurio1987/bbangto-ui-core';
import { styleGuideCatalog } from './index';
import { motifCssOf } from './_motif';
import {
  auditContrast,
  auditFocusContrast,
  auditMotifFocusContrast,
  motifFocusDecls,
  CONTRAST_THRESHOLDS,
  type AuditableEntry,
  type MotifAuditEntry,
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

// ── 없는 semantic 변수 (KAN-060 검토 항목 3 → KAN-065 에서 모든 줄로) ───────────

/**
 * style guide 소스가 읽는 `--bbangto-semantic-*` 변수 중 실제로 만들어지지 않는 것을 `파일:줄 변수` 로 모은다.
 * 없는 변수는 어느 색 스킴에서도 대체값(고정 색)으로만 그려져 색 스킴을 바꿔도 따라가지 않는다 — 포커스 테두리
 * 12곳(`--bbangto-semantic-focus`, KAN-060)과 태그 색·카드 배경 5줄(KAN-065)이 그랬다. 처음에는 포커스 테두리
 * (`outline`) 줄만 봤고, KAN-065 에서 모든 줄로 넓혔다.
 */
function undefinedSemanticVars(
  files: readonly { path: string; text: string }[],
  defined: ReadonlySet<string>,
): string[] {
  const out: string[] = [];
  for (const f of files) {
    f.text.split('\n').forEach((line, i) => {
      for (const m of line.matchAll(/var\(\s*(--bbangto-semantic-[a-z0-9-]+)/g)) {
        if (!defined.has(m[1])) out.push(`${f.path}:${i + 1} ${m[1]}`);
      }
    });
  }
  return out;
}

/** 모든 foundation 이 같은 semantic 구조라 변수 이름은 하나만 펼쳐도 같다. */
const definedVars = new Set(Object.keys(flattenToCSSVars(lightFoundation as unknown as Record<string, unknown>)));

describe('없는 semantic 변수 — fixture', () => {
  const run = (text: string) => undefinedSemanticVars([{ path: 'x.tsx', text }], definedVars);

  it('없는 변수(--bbangto-semantic-focus)를 읽는 outline 은 잡힌다', () => {
    expect(run('.b:focus-visible {\n  outline: 2px solid var(--bbangto-semantic-focus, #5BE1FF) !important;\n}')).toEqual([
      'x.tsx:2 --bbangto-semantic-focus',
    ]);
  });

  it('포커스 색 토큰(--bbangto-semantic-border-focus)은 통과한다', () => {
    expect(definedVars.has('--bbangto-semantic-border-focus')).toBe(true);
    expect(run('  outline: 3px solid var(--bbangto-semantic-border-focus, #000) !important;')).toEqual([]);
  });

  it('outline 이 아닌 줄(태그 color, 카드 background-color)의 없는 변수도 잡힌다', () => {
    expect(run("  color: 'var(--bbangto-semantic-focus, #5BE1FF)',")).toEqual(['x.tsx:1 --bbangto-semantic-focus']);
    expect(run('  background-color: var(--bbangto-semantic-bg-elevated, #103A86) !important;')).toEqual([
      'x.tsx:1 --bbangto-semantic-bg-elevated',
    ]);
  });

  it('한 줄짜리 규칙과 -focus-ring 도 잡힌다', () => {
    expect(run('.b:focus-visible { outline: 3px solid var(--bbangto-semantic-focus-ring, #123) !important; }')).toEqual([
      'x.tsx:1 --bbangto-semantic-focus-ring',
    ]);
  });
});

describe('없는 semantic 변수 — 실제 style guide 소스', () => {
  it('style guide 소스가 읽는 semantic 변수는 모두 실제로 만들어진다', () => {
    const dir = dirname(fileURLToPath(import.meta.url));
    const files = readdirSync(dir)
      .filter((name) => name.endsWith('.tsx'))
      .map((name) => ({ path: name, text: readFileSync(join(dir, name), 'utf8') }));
    const violations = undefinedSemanticVars(files, definedVars);
    expect(violations, violations.join('\n')).toEqual([]);
  });
});

// ── 모티프 포커스 테두리 대비 (KAN-065) ──────────────────────────────────────────

/** 모티프 감사 fixture — 색 스킴마다 표면 둘·포커스 토큰·확장 변수를 받는다. */
function motifEntry(
  name: string,
  css: string | undefined,
  presets: { key: string; base: string; elevated?: string; focus?: string; ext?: Record<string, string> }[],
): MotifAuditEntry {
  const found = (base: string, elevated: string, focus: string) =>
    ({ semantic: { background: { base, elevated }, border: { focus } } }) as unknown as AuditableEntry['foundations'];
  const ps = presets.map((p) => ({
    key: p.key,
    label: p.key,
    foundations: found(p.base, p.elevated ?? p.base, p.focus ?? '#000000'),
    extendedFoundations: p.ext,
  }));
  return { name, css, foundations: ps[0].foundations, foundationPresets: ps };
}

/** 위반 목록을 고칠 사람이 바로 읽는 한 줄씩으로. */
const describeMotif = (v: ReturnType<typeof auditMotifFocusContrast>) =>
  v
    .map((x) =>
      x.reason === 'no-css'
        ? `${x.name}: 모티프 CSS 를 못 찾음`
        : `${x.name}/${x.presetKey}: ${x.selector} ${x.prop}: ${x.resolved} — ${x.measured ?? '측정 불가'}:1 (${x.against ?? x.reason})`,
    )
    .join('\n');

describe('motifFocusDecls — 포커스 선언 꺼내기', () => {
  it(':focus 가 든 규칙의 outline·outline-color·box-shadow 만 꺼내고 !important 를 뗀다', () => {
    const d = motifFocusDecls(
      '.b { outline: 2px solid red; }\n.b:hover { box-shadow: 0 0 4px #000; }\n' +
        '.b:focus-visible { outline: 2px solid var(--x, #E9C766) !important; outline-offset: 2px; }\n' +
        '.c:focus { outline-color: #123456; box-shadow: 0 0 0 3px rgba(0,0,0,0.4); }',
    );
    expect(d).toEqual([
      { selector: '.b:focus-visible', prop: 'outline', value: '2px solid var(--x, #E9C766)' },
      { selector: '.c:focus', prop: 'outline-color', value: '#123456' },
      { selector: '.c:focus', prop: 'box-shadow', value: '0 0 0 3px rgba(0,0,0,0.4)' },
    ]);
  });

  it('outline: none 은 건너뛰고 같은 규칙의 box-shadow 고리는 잡는다', () => {
    const d = motifFocusDecls('.b:focus-visible { outline: none; box-shadow: 0 0 0 3px #4F46E5; }');
    expect(d.map((x) => x.prop)).toEqual(['box-shadow']);
  });

  it('@media 안에 든 포커스 규칙도 잡고, 주석 속 규칙은 안 잡는다', () => {
    const d = motifFocusDecls(
      '/* .z:focus { outline: 1px solid #fff; } */\n@media (forced-colors: none) {\n  .b:focus-visible { outline: 2px solid #000; }\n}',
    );
    expect(d).toEqual([{ selector: '.b:focus-visible', prop: 'outline', value: '2px solid #000' }]);
  });
});

describe('auditMotifFocusContrast — 미달 감지 (fixture)', () => {
  const css = '.b:focus-visible { outline: 2px solid var(--bbangto-ext-accent, #E9C766) !important; }';

  it('(a) 확장 변수를 색 스킴 값으로 풀어 잰다 — 한 색 스킴만 미달이어도 위반이고 그 키가 적힌다', () => {
    const v = auditMotifFocusContrast([
      motifEntry('x', css, [
        { key: 'light', base: '#FAF2DD', ext: { '--bbangto-ext-accent': '#E9C766' } },
        { key: 'dark', base: '#1C1B17', ext: { '--bbangto-ext-accent': '#E9C766' } },
      ]),
    ]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ name: 'x', presetKey: 'light', prop: 'outline', reason: 'below-threshold', against: 'base' });
    expect(v[0].resolved).toBe('2px solid #E9C766');
  });

  it('(b) 색 스킴에 없는 변수는 대체값으로 잰다', () => {
    const v = auditMotifFocusContrast([motifEntry('x', css, [{ key: 'light', base: '#FFFFFF' }])]);
    expect(v).toHaveLength(1);
    expect(v[0].resolved).toBe('2px solid #E9C766');
    // 대체값이 어두우면 통과한다.
    const dark = '.b:focus-visible { outline: 2px solid var(--bbangto-ext-accent, #1C1B17); }';
    expect(auditMotifFocusContrast([motifEntry('x', dark, [{ key: 'light', base: '#FFFFFF' }])])).toEqual([]);
  });

  it('(c) semantic 변수는 그 색 스킴의 토큰 값으로 푼다', () => {
    const tok = '.b:focus-visible { outline: 2px solid var(--bbangto-semantic-border-focus, #FAFF69); }';
    expect(auditMotifFocusContrast([motifEntry('x', tok, [{ key: 'light', base: '#FFFFFF', focus: '#1D4ED8' }])])).toEqual([]);
  });

  it('(d) box-shadow 반투명 고리는 표면 위에 합성해 잰다', () => {
    const ring = '.b:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(79,70,229,0.40); }';
    const v = auditMotifFocusContrast([motifEntry('x', ring, [{ key: 'light', base: '#FFFFFF' }])]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ prop: 'box-shadow', reason: 'below-threshold' });
    // 같은 색이 불투명이면 통과한다.
    const solid = '.b:focus-visible { outline: none; box-shadow: 0 0 0 3px #4F46E5; }';
    expect(auditMotifFocusContrast([motifEntry('x', solid, [{ key: 'light', base: '#FFFFFF' }])])).toEqual([]);
  });

  it('(e) elevated 만 미달이어도 위반이고 자리는 elevated', () => {
    const blue = '.b:focus-visible { outline: 2px solid #1D4ED8; }';
    const v = auditMotifFocusContrast([motifEntry('x', blue, [{ key: 'k', base: '#FFFFFF', elevated: '#2563EB' }])]);
    expect(v).toHaveLength(1);
    expect(v[0].against).toBe('elevated');
  });

  it('(f) 색을 못 풀면 조용히 통과하지 않고 unparseable', () => {
    const noFb = '.b:focus-visible { outline: 2px solid var(--bbangto-ext-missing); }';
    const named = '.b:focus-visible { outline: 2px solid currentColor; }';
    for (const c of [noFb, named]) {
      const v = auditMotifFocusContrast([motifEntry('x', c, [{ key: 'k', base: '#FFFFFF' }])]);
      expect(v).toHaveLength(1);
      expect(v[0]).toMatchObject({ reason: 'unparseable', measured: null });
    }
  });

  it('(g) CSS 를 못 찾으면 no-css — 그 style guide 가 검사에서 조용히 빠지지 않는다', () => {
    const v = auditMotifFocusContrast([motifEntry('x', undefined, [{ key: 'k', base: '#FFFFFF' }])]);
    expect(v).toEqual([expect.objectContaining({ name: 'x', reason: 'no-css', presetKey: null })]);
  });

  it('(h) 포커스 규칙이 없는 CSS 는 위반이 없다(core Button 의 포커스 테두리가 그대로 쓰인다)', () => {
    expect(auditMotifFocusContrast([motifEntry('x', '.b { border: 1px solid red; }', [{ key: 'k', base: '#FFFFFF' }])])).toEqual([]);
  });
});

describe('auditMotifFocusContrast — 실 카탈로그 게이트', () => {
  const entries: MotifAuditEntry[] = styleGuideCatalog.map((sg) => ({ ...sg, css: motifCssOf(sg.wrapperComponents) }));

  it('모든 style guide 에서 모티프 CSS 를 찾는다', () => {
    expect(entries.filter((e) => e.css == null).map((e) => e.name)).toEqual([]);
    expect(entries).toHaveLength(styleGuideCatalog.length);
  });

  it('모든 style guide 색 스킴에서 모티프 포커스 테두리가 표면과 3:1 이상이다', () => {
    const violations = auditMotifFocusContrast(entries);
    expect(violations, describeMotif(violations)).toEqual([]);
  });
});
