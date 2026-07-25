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
