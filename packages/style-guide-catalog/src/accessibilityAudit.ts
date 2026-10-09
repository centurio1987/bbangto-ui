/**
 * accessibility over-claim 감사 — 팔레트 실측 WCAG 대비를 `meta.accessibility.contrastIntent`
 * 선언과 대조한다. 선언이 실측보다 높은 over-claim(예: 'aaa' 선언인데 실측 <7:1)을 CI에서 잡는다.
 *
 * `contrastIntent`는 설계상 advisory(저자 선언)라, 이 감사가 "선언이 과대주장으로 흐르는 것"을
 * 방지하는 유일한 기계 검증이다. 정직한 저대비 선언('low')은 통과한다. (KAN-024, METADATA_STRATEGY §3)
 *
 * 대상: UI style guide의 `semantic.foreground.base` vs `background.base`(본문 텍스트 쌍), 전 foundationPreset.
 * 배경이 그라디언트면 전 색 스톱 중 **최악(worst-case) 대비**로 판정한다(텍스트가 어느 스톱 위에서도
 * 읽혀야 함). viz(VisualizationFoundation)는 텍스트 쌍 스키마가 달라 후속 카드로 분리한다.
 */
import {
  parseColor,
  extractColors,
  contrastRatio,
  effectiveBgColors,
  CONTRAST_THRESHOLDS,
  FOCUS_CONTRAST_MIN,
  focusContrast,
  surfaceColors,
  flattenToCSSVars,
} from '@centurio1987/bbangto-ui-tokens';
import type { BbangtoFoundation, FoundationPreset, StyleGuideMeta } from '@centurio1987/bbangto-ui-tokens';

/** contrastIntent → 본문 텍스트 WCAG 대비 하한. tokens/contrast.ts로 승격(UI/viz 공유), 하위호환 re-export. */
export { CONTRAST_THRESHOLDS };

/** 감사 최소 입력(duck-typed). UI StyleGuide가 구조적으로 만족. */
export interface AuditableEntry {
  readonly name: string;
  readonly meta?: StyleGuideMeta;
  readonly foundations: BbangtoFoundation;
  readonly foundationPresets?: readonly FoundationPreset[];
}

/** over-claim 위반 1건. `measured:null`은 측정 불가(색 추출 실패)로 over-claim 취급. */
export interface ContrastViolation {
  readonly name: string;
  readonly presetKey: string;
  readonly intent: 'aa' | 'aaa';
  readonly required: number;
  /** 그라디언트는 worst-case(최소) 대비. 측정 불가 시 null. */
  readonly measured: number | null;
  readonly reason: 'below-threshold' | 'unparseable-foreground' | 'unparseable-background';
}

const round = (n: number): number => Math.round(n * 100) / 100;

/**
 * catalog를 순회하며 contrastIntent(aa/aaa) over-claim을 수집한다. 빈 배열 = 과대주장 없음.
 * low·미저작은 대상 아님(skip). aa/aaa 선언에서 fg 파싱 불가·bg 반투명은 silent skip이 아니라
 * violation으로 올린다(CI가 조용히 비지 않도록).
 */
export function auditContrast(catalog: readonly AuditableEntry[]): ContrastViolation[] {
  const out: ContrastViolation[] = [];

  for (const sg of catalog) {
    const intent = sg.meta?.accessibility?.contrastIntent;
    if (intent !== 'aa' && intent !== 'aaa') continue;
    const required = CONTRAST_THRESHOLDS[intent];

    const presets: readonly { key: string; foundations: BbangtoFoundation }[] =
      sg.foundationPresets?.length
        ? sg.foundationPresets
        : [{ key: 'default', foundations: sg.foundations }];

    for (const p of presets) {
      const base = { name: sg.name, presetKey: p.key, intent, required } as const;
      const fgc = parseColor(p.foundations.semantic.foreground.base);
      const bgStops = extractColors(p.foundations.semantic.background.base);

      if (!fgc) {
        out.push({ ...base, measured: null, reason: 'unparseable-foreground' });
        continue;
      }
      // 배경 색 추출 실패(그라디언트도 단색도 아님, 예: var()/none) → 측정 불가.
      if (bgStops.length === 0) {
        out.push({ ...base, measured: null, reason: 'unparseable-background' });
        continue;
      }

      // 그라디언트는 실효 배경색(반투명 스톱은 base 위 합성) 중 최악(최소) 대비로 판정.
      let worst = Infinity;
      for (const stop of effectiveBgColors(bgStops)) {
        const ratio = contrastRatio(fgc, stop);
        if (ratio != null) worst = Math.min(worst, ratio);
      }
      if (worst !== Infinity && worst + 1e-6 < required) {
        out.push({ ...base, measured: round(worst), reason: 'below-threshold' });
      }
    }
  }

  return out;
}

/** 포커스 대비 미달 1건. `measured:null` 은 포커스 색이나 표면 색을 못 읽은 것이다. */
export interface FocusContrastViolation {
  readonly name: string;
  readonly presetKey: string;
  readonly focus: string;
  readonly required: number;
  readonly measured: number | null;
  /** 최저 대비가 나온 표면. 측정 불가면 null. */
  readonly against: 'base' | 'elevated' | null;
  readonly reason: 'below-threshold' | 'unparseable';
}

/**
 * 포커스 테두리 대비 감사 — 모든 색 스킴(foundationPreset)에서 `semantic.border.focus` 가 화면 표면
 * (`background.base`·`elevated`)과 3:1(WCAG 1.4.11) 이상인지 본다. `contrastIntent` 선언과 무관하게
 * 전부 본다 — 포커스 표시는 저대비를 고른 style guide 에서도 보여야 한다. 반투명 elevated 는 base 위에
 * 합성해 잰다(`surfaceColors`). 빈 배열 = 미달 없음. (KAN-060)
 */
export function auditFocusContrast(catalog: readonly AuditableEntry[]): FocusContrastViolation[] {
  const out: FocusContrastViolation[] = [];
  for (const sg of catalog) {
    const presets: readonly { key: string; foundations: BbangtoFoundation }[] =
      sg.foundationPresets?.length
        ? sg.foundationPresets
        : [{ key: 'default', foundations: sg.foundations }];
    for (const p of presets) {
      const semantic = p.foundations.semantic;
      const base = { name: sg.name, presetKey: p.key, focus: semantic.border.focus, required: FOCUS_CONTRAST_MIN };
      const fc = focusContrast(semantic);
      if (!fc) {
        out.push({ ...base, measured: null, against: null, reason: 'unparseable' });
      } else if (fc.ratio + 1e-6 < FOCUS_CONTRAST_MIN) {
        out.push({ ...base, measured: round(fc.ratio), against: fc.against, reason: 'below-threshold' });
      }
    }
  }
  return out;
}

// ── 모티프 포커스 테두리 (KAN-065) ──────────────────────────────────────────────

/** 모티프 CSS 에서 꺼낸 포커스 선언 하나 — 선택자에 `:focus` 가 든 규칙의 테두리·고리 선언. */
export interface MotifFocusDecl {
  readonly selector: string;
  readonly prop: 'outline' | 'outline-color' | 'box-shadow';
  readonly value: string;
}

const FOCUS_PROPS = new Set<MotifFocusDecl['prop']>(['outline', 'outline-color', 'box-shadow']);

/**
 * 모티프 CSS 에서 포커스 표시 선언을 꺼낸다. 규칙의 선택자에 `:focus`(`:focus-visible`·`:focus-within` 포함)가
 * 들어 있으면 그 규칙의 `outline`·`outline-color`·`box-shadow` 를 낸다. `@media` 안에 든 규칙도 잡는다 — 정규식이
 * 중괄호를 넘지 못하므로 가장 안쪽 규칙만 맞는다. `outline: none`·`0` 은 테두리가 없다는 뜻이라 뺀다(그 규칙이
 * `box-shadow` 고리를 대신 그리면 그쪽이 잡힌다). 주석은 먼저 지운다. `!important` 는 값에서 뗀다.
 */
export function motifFocusDecls(css: string): MotifFocusDecl[] {
  const out: MotifFocusDecl[] = [];
  const text = css.replace(/\/\*[\s\S]*?\*\//g, '');
  for (const m of text.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = m[1].trim().replace(/\s+/g, ' ');
    if (!/:focus/.test(selector)) continue;
    for (const raw of m[2].split(';')) {
      const i = raw.indexOf(':');
      if (i < 0) continue;
      const prop = raw.slice(0, i).trim().toLowerCase() as MotifFocusDecl['prop'];
      if (!FOCUS_PROPS.has(prop)) continue;
      const value = raw.slice(i + 1).replace(/!important/i, '').trim();
      if (prop === 'outline' && /^(none|0)\b/.test(value)) continue;
      out.push({ selector, prop, value });
    }
  }
  return out;
}

/** `var(--x, 대체값)` 를 그 색 스킴의 변수로 푼다. 없으면 대체값, 대체값도 없으면 빈 문자열 — 브라우저와 같다. */
function resolveVars(value: string, vars: Readonly<Record<string, string>>): string {
  let v = value;
  // 대체값 안에 var() 가 또 있을 수 있어 몇 번 되풀이한다. 대체값은 rgba(…) 같은 괄호 한 겹까지 받는다.
  for (let i = 0; i < 8 && v.includes('var('); i++) {
    v = v.replace(/var\(\s*(--[\w-]+)\s*(?:,\s*((?:[^()]|\([^()]*\))*))?\)/g, (_m, name: string, fb?: string) =>
      vars[name] ?? (fb ?? '').trim(),
    );
  }
  return v;
}

/** 모티프 감사 입력 — 감사 입력에 모티프 CSS 와 확장 변수를 더한 것. UI StyleGuide 에 `css` 를 붙이면 만족한다. */
export interface MotifAuditEntry extends AuditableEntry {
  /** 화면에 들어갈 모티프 CSS. 못 찾았으면 undefined — 조용히 빠지지 않고 위반이 된다. */
  readonly css: string | undefined;
  /** foundationPresets 가 없을 때 쓰는 확장 변수(`--bbangto-ext-*`). */
  readonly extendedFoundations?: Record<string, string>;
}

/** 모티프 포커스 대비 미달 1건. */
export interface MotifFocusViolation {
  readonly name: string;
  /** 색 스킴 키. CSS 를 못 찾았으면 null. */
  readonly presetKey: string | null;
  readonly selector: string | null;
  readonly prop: MotifFocusDecl['prop'] | null;
  /** 변수를 푼 값. */
  readonly resolved: string | null;
  readonly required: number;
  readonly measured: number | null;
  readonly against: 'base' | 'elevated' | null;
  readonly reason: 'below-threshold' | 'unparseable' | 'no-css';
}

/**
 * 모티프 포커스 테두리 대비 감사 — style guide 가 자기 CSS 로 그리는 포커스 테두리가 색 스킴마다 화면 표면과
 * 3:1(WCAG 1.4.11) 이상인지 본다. `auditFocusContrast` 는 토큰 값(`border.focus`)만 재므로, 모티프 CSS 가 토큰
 * 대신 강조색 변수나 고정 색을 쓰면 그 테두리는 아무도 안 쟀다(18곳이 그랬다).
 *
 * 값은 활성 색 스킴이 실제로 까는 변수(semantic + 그 색 스킴의 확장 변수, `resolveFoundationPreset` 과 같이 base
 * 확장 변수와 섞지 않는다)로 풀고, 표면은 `surfaceColors`(반투명 elevated 는 base 위 합성), 대비는 `contrastRatio`
 * (반투명 테두리 색은 표면 위 합성)다. 한 선언에 색이 여럿이면(겹 고리) 가장 잘 보이는 색으로 잰다. 색을 못 풀면
 * 통과로 두지 않고 `unparseable`, CSS 를 못 찾으면 `no-css` 다. 빈 배열 = 미달 없음.
 */
export function auditMotifFocusContrast(entries: readonly MotifAuditEntry[]): MotifFocusViolation[] {
  const out: MotifFocusViolation[] = [];
  for (const sg of entries) {
    const required = FOCUS_CONTRAST_MIN;
    if (sg.css == null) {
      out.push({
        name: sg.name, presetKey: null, selector: null, prop: null, resolved: null,
        required, measured: null, against: null, reason: 'no-css',
      });
      continue;
    }
    const decls = motifFocusDecls(sg.css);
    if (!decls.length) continue;
    const presets: readonly { key: string; foundations: BbangtoFoundation; extendedFoundations?: Record<string, string> }[] =
      sg.foundationPresets?.length
        ? sg.foundationPresets
        : [{ key: 'default', foundations: sg.foundations, extendedFoundations: sg.extendedFoundations }];
    for (const p of presets) {
      const vars = {
        ...flattenToCSSVars(p.foundations as unknown as Record<string, unknown>),
        ...(p.extendedFoundations ?? {}),
      };
      const surfaces = surfaceColors(p.foundations.semantic.background);
      for (const d of decls) {
        const resolved = resolveVars(d.value, vars);
        const base = { name: sg.name, presetKey: p.key, selector: d.selector, prop: d.prop, resolved, required };
        const colors = resolved.includes('var(') ? [] : extractColors(resolved);
        if (!colors.length || !surfaces.base.length || !surfaces.elevated.length) {
          out.push({ ...base, measured: null, against: null, reason: 'unparseable' });
          continue;
        }
        // 색마다 표면 중 최저 대비를 내고, 그중 가장 높은 색을 그 선언의 값으로 쓴다.
        let best: { ratio: number; against: 'base' | 'elevated' } | null = null;
        for (const c of colors) {
          let worst: { ratio: number; against: 'base' | 'elevated' } | null = null;
          for (const against of ['base', 'elevated'] as const) {
            for (const bg of surfaces[against]) {
              const ratio = contrastRatio(c, bg);
              if (ratio != null && (worst == null || ratio < worst.ratio)) worst = { ratio, against };
            }
          }
          if (worst && (best == null || worst.ratio > best.ratio)) best = worst;
        }
        if (!best) {
          out.push({ ...base, measured: null, against: null, reason: 'unparseable' });
        } else if (best.ratio + 1e-6 < required) {
          out.push({ ...base, measured: round(best.ratio), against: best.against, reason: 'below-threshold' });
        }
      }
    }
  }
  return out;
}
