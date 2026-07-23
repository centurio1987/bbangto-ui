import { describe, it, expect } from 'vitest';
import { parseColor, extractColors } from '@centurio1987/bbangto-ui-tokens';
import type { StyleGuideMeta, VisualizationFoundation } from '@centurio1987/bbangto-ui-tokens';
import { vizStyleGuideCatalog } from './index';
import {
  auditVizContrast,
  formatVizViolations,
  type AuditableVizEntry,
  type VizContrastViolation,
} from './accessibilityAudit';

// ── fixture: 감사가 읽는 필드(canvas.bg, node[*].{tagColor,fill}, c4.l{1,2,3}.{labelColor,bgTint},
//    boundary.labelColor)만 담은 최소 VisualizationFoundation(캐스팅). 기본값은 전부 고대비(통과). ──
type C4Level = { labelColor: string; bgTint: string };
function makeFoundations(o: {
  canvasBg?: string;
  nodes?: Record<string, { tagColor: string; fill: string }>;
  c4?: [C4Level, C4Level, C4Level];
  boundaryLabel?: string;
}): VisualizationFoundation {
  const pass: C4Level = { labelColor: '#000000', bgTint: 'transparent' };
  return {
    name: 'fixture',
    canvas: { bg: o.canvasBg ?? '#ffffff' },
    node: o.nodes ?? { person: { tagColor: '#000000', fill: '#ffffff' } },
    c4: {
      l1: o.c4?.[0] ?? pass,
      l2: o.c4?.[1] ?? pass,
      l3: o.c4?.[2] ?? pass,
    },
    boundary: { labelColor: o.boundaryLabel ?? '#000000' },
  } as unknown as VisualizationFoundation;
}

function entry(
  name: string,
  intent: 'low' | 'aa' | 'aaa' | undefined,
  foundations: VisualizationFoundation,
  presets?: { key: string; foundations: VisualizationFoundation }[]
): AuditableVizEntry {
  return {
    name,
    meta: intent ? ({ accessibility: { contrastIntent: intent } } as StyleGuideMeta) : undefined,
    foundations,
    foundationPresets: presets,
  };
}

describe('auditVizContrast — over-claim 감지 (fixture)', () => {
  it('(a) aaa 선언·c4.l1 라벨 실측 ~4.5(<7) → below-threshold violation', () => {
    // #767676/white ≈ 4.54 < 7. l2/l3·node·boundary 는 21:1 통과.
    const f = makeFoundations({
      c4: [
        { labelColor: '#767676', bgTint: 'transparent' },
        { labelColor: '#000000', bgTint: 'transparent' },
        { labelColor: '#000000', bgTint: 'transparent' },
      ],
    });
    const v = auditVizContrast([entry('x', 'aaa', f)]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ name: 'x', locus: 'c4.l1', intent: 'aaa', reason: 'below-threshold' });
    expect(v[0].measured).toBeLessThan(7);
    expect(v[0].measured).toBeGreaterThan(4.5);
  });

  it('(b) aa 선언·전 쌍 ≥4.5 → 위반 없음', () => {
    expect(auditVizContrast([entry('x', 'aa', makeFoundations({}))])).toEqual([]);
  });

  it('(c) low 선언 → 위반 없음(무제약, skip)', () => {
    const f = makeFoundations({
      c4: [{ labelColor: '#aaaaaa', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }],
    });
    expect(auditVizContrast([entry('x', 'low', f)])).toEqual([]);
  });

  it('(d) intent 미저작 → skip(위반 없음)', () => {
    const f = makeFoundations({
      c4: [{ labelColor: '#aaaaaa', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }],
    });
    expect(auditVizContrast([entry('x', undefined, f)])).toEqual([]);
  });

  it('(e) aa 선언·node tagColor 파싱 불가 → unparseable-foreground violation', () => {
    const f = makeFoundations({ nodes: { person: { tagColor: 'var(--nope)', fill: '#ffffff' } } });
    const v = auditVizContrast([entry('x', 'aa', f)]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ locus: 'node.person', reason: 'unparseable-foreground', measured: null });
  });

  it('(f) aa 선언·canvas.bg 색 추출 불가(var()) → c4·boundary 전부 unparseable-background', () => {
    const v = auditVizContrast([entry('x', 'aa', makeFoundations({ canvasBg: 'var(--page)' }))]);
    expect(v.length).toBeGreaterThan(0);
    expect(v.every((x) => x.reason === 'unparseable-background')).toBe(true);
    expect(v.some((x) => x.locus === 'boundary')).toBe(true);
    // node(person)는 canvas와 무관(자기 fill 위)이라 위반 아님.
    expect(v.some((x) => x.locus === 'node.person')).toBe(false);
  });

  it('(g) bgTint:transparent 는 no-op(canvas 그대로) — 다크 canvas 위 다크 라벨은 위반', () => {
    // canvas 검정, c4.l1 검정 라벨 transparent → 실효 bg = 검정 → 대비 1 (위반).
    // transparent 를 흰색으로 오처리하면 통과되어 테스트가 실패한다(회귀 가드).
    const f = makeFoundations({
      canvasBg: '#000000',
      c4: [
        { labelColor: '#000000', bgTint: 'transparent' },
        { labelColor: '#ffffff', bgTint: 'transparent' },
        { labelColor: '#ffffff', bgTint: 'transparent' },
      ],
      boundaryLabel: '#ffffff',
      nodes: { person: { tagColor: '#000000', fill: '#ffffff' } },
    });
    const v = auditVizContrast([entry('x', 'aa', f)]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ locus: 'c4.l1', reason: 'below-threshold' });
    // 실효 배경이 검정(≈0)임을 확인.
    expect(parseColor(v[0].effectiveBackground!)!.r).toBeLessThan(10);
  });

  it('(h) 반투명 bgTint 는 canvas 위 합성된다 — 합성 결과 저대비면 위반', () => {
    // rgba(0,0,0,0.9) over white ≈ rgb(25,25,25). 검정 라벨/근검정 배경 → 저대비(위반).
    // 틴트를 무시하면 흰 배경으로 21:1 통과 → 실패(합성 회귀 가드).
    const f = makeFoundations({
      c4: [
        { labelColor: '#000000', bgTint: 'rgba(0,0,0,0.9)' },
        { labelColor: '#000000', bgTint: 'transparent' },
        { labelColor: '#000000', bgTint: 'transparent' },
      ],
    });
    const v = auditVizContrast([entry('x', 'aa', f)]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ locus: 'c4.l1', reason: 'below-threshold' });
    expect(parseColor(v[0].effectiveBackground!)!.r).toBeLessThan(40);
  });

  it('(h2) 비-transparent 파싱불가 bgTint(var()) → unparseable-background(canvas 로 은폐 안 함)', () => {
    const f = makeFoundations({
      c4: [
        { labelColor: '#000000', bgTint: 'var(--x)' },
        { labelColor: '#000000', bgTint: 'transparent' },
        { labelColor: '#000000', bgTint: 'transparent' },
      ],
    });
    const v = auditVizContrast([entry('x', 'aa', f)]);
    expect(v).toHaveLength(1);
    expect(v[0]).toMatchObject({ locus: 'c4.l1', reason: 'unparseable-background', measured: null });
  });

  it('(i) 여러 preset 중 미달 preset만 violation', () => {
    const ok = makeFoundations({});
    const bad = makeFoundations({
      c4: [{ labelColor: '#aaaaaa', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }],
    });
    const v = auditVizContrast([
      entry('x', 'aa', ok, [
        { key: 'ok', foundations: ok },
        { key: 'bad', foundations: bad },
      ]),
    ]);
    expect(v).toHaveLength(1);
    expect(v[0].presetKey).toBe('bad');
    expect(v[0].locus).toBe('c4.l1');
  });

  it('(j) 그라디언트 canvas.bg → worst-case 스톱으로 판정', () => {
    // 검정→흰색 그라디언트 위 흰 boundary 라벨 → 흰 스톱에서 대비 ~1 (worst-case 위반).
    const f = makeFoundations({
      canvasBg: 'linear-gradient(160deg, #000000 0%, #ffffff 100%)',
      c4: [{ labelColor: '#000000', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }],
      boundaryLabel: '#ffffff',
      nodes: { person: { tagColor: '#000000', fill: '#ffffff' } },
    });
    const v = auditVizContrast([entry('x', 'aa', f)]);
    const boundary = v.find((x) => x.locus === 'boundary');
    expect(boundary).toBeDefined();
    expect(boundary!.reason).toBe('below-threshold');
    expect(boundary!.measured).toBeLessThan(1.5);
  });

  it('(k) formatVizViolations 출력에 name·presetKey·locus·measured·required 포함', () => {
    const f = makeFoundations({
      c4: [{ labelColor: '#767676', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }, { labelColor: '#000', bgTint: 'transparent' }],
    });
    const v = auditVizContrast([entry('my-guide', 'aaa', f)]);
    const s = formatVizViolations(v);
    expect(s).toContain('my-guide');
    expect(s).toContain('c4.l1');
    expect(s).toContain(String(v[0].measured));
    expect(s).toContain(String(v[0].required));
  });

  it('빈 위반 목록 포맷', () => {
    expect(formatVizViolations([])).toMatch(/no violations|없음/);
  });
});

describe('auditVizContrast — 실 viz 카탈로그 게이트 (over-claim 방지)', () => {
  it('vizStyleGuideCatalog에 over-claim이 없다(전 6종 선언이 실측을 만족)', () => {
    const violations: VizContrastViolation[] = auditVizContrast(vizStyleGuideCatalog);
    expect(violations, formatVizViolations(violations)).toEqual([]);
  });

  it('null-skip 은폐 방지: 전 preset의 모든 감사 대상 색이 파싱된다', () => {
    for (const sg of vizStyleGuideCatalog) {
      const presets = sg.foundationPresets?.length
        ? sg.foundationPresets
        : [{ key: 'default', foundations: sg.foundations }];
      for (const p of presets) {
        const f = p.foundations;
        const kinds = Object.keys(f.node);
        expect(kinds.length, `${sg.name}/${p.key} node kinds`).toBeGreaterThan(0);
        for (const [kind, style] of Object.entries(f.node)) {
          expect(parseColor(style.tagColor), `${sg.name}/${p.key} node.${kind} tagColor`).not.toBeNull();
          // fill:'none'(라인 전용) 또는 'transparent' 는 캔버스 위로 처리됨 → 리터럴이거나 none/transparent 여야 함.
          expect(
            style.fill === 'none' || style.fill === 'transparent' || parseColor(style.fill) !== null,
            `${sg.name}/${p.key} node.${kind} fill`
          ).toBe(true);
        }
        for (const level of ['l1', 'l2', 'l3'] as const) {
          const c4 = f.c4[level];
          expect(parseColor(c4.labelColor), `${sg.name}/${p.key} c4.${level} labelColor`).not.toBeNull();
          expect(
            c4.bgTint === 'transparent' || parseColor(c4.bgTint) !== null,
            `${sg.name}/${p.key} c4.${level} bgTint`
          ).toBe(true);
        }
        expect(parseColor(f.boundary.labelColor), `${sg.name}/${p.key} boundary`).not.toBeNull();
        expect(
          extractColors(f.canvas.bg).length,
          `${sg.name}/${p.key} canvas.bg`
        ).toBeGreaterThan(0);
      }
    }
  });
});
