import { describe, it, expect } from 'vitest';
import { styleGuideCatalog, styleGuideMap } from './index';

/**
 * meta.displayName canonical 명명 게이트 (KAN-027).
 *
 * 명명 규칙(style-guide-catalog.md §명명 규칙): 표시명 = `<PrimaryTrend>_<SecondaryModifier>_NN`
 * (PascalCase 단어를 `_`로 구분, 트렌드 변주 인덱스 접미사). 현재 전 스타일이 유일하므로 접미사는 `_01`.
 *
 * #29–50 이미지 마이닝 도출분은 한때 도출 시퀀스명(`GrainyBlurDreamy_03`처럼 단어 경계 없는 CamelCase +
 * 마이닝 순번 접미사)을 meta.displayName에 유지해 canonical 규칙과 어긋났다. 이 게이트가 재발을 막는다.
 * (산문 `#### NN.` 헤더의 마이닝명은 provenance 기록으로 의도적 보존 — 명칭 SSOT는 트렌드 표/meta.)
 */

/** kebab slug(…-NN)를 canonical 표시명(Pascal 단어를 `_`로, 접미사 보존)으로 기계 변환. */
function canonicalDisplayNameFromSlug(slug: string): string {
  const segs = slug.split('-');
  const idx = segs.pop()!; // 인덱스 접미사('01' 등)
  return segs.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('_') + '_' + idx;
}

/** canonical 형식: PascalCase 토큰을 `_`로 구분, `_01`로 종료. 마이닝 순번 접미사(_03 등)를 배제. */
const CANONICAL_DISPLAY_NAME = /^[A-Z][A-Za-z0-9]*(?:_[A-Za-z0-9]+)*_01$/;

/**
 * KAN-027 정정 대상 16종(슬러그). 기대 표시명은 슬러그에서 기계 도출하므로 별도 하드코딩하지 않는다
 * (Storybook 스토리 타이틀이 이미 이 canonical 형태로 확립됨 — 예: `Ai_Surreal_Gradient3d_01`).
 */
const NORMALIZED_SLUGS = [
  'grainy-blur-dreamy-01',
  'gothic-medieval-digital-01',
  'glitch-distortion-01',
  'radiant-glow-dark-01',
  'ukiyoe-woodblock-01',
  'punk-grunge-graffiti-01',
  'ai-surreal-gradient3d-01',
  'shattered-glass-cinematic-01',
  'pixel-art-retro-01',
  'mixed-media-collage-01',
  'photo-type-editorial-01',
  'op-art-kinetic-01',
  'warped-checkerboard-01',
  'iridescent-chrome-01',
  'romantic-botanical-01',
  'heritage-folk-ornament-01',
] as const;

describe('canonicalDisplayNameFromSlug — 변환 규칙 sanity', () => {
  it('2~4단어 슬러그를 Pascal_Underscore_인덱스로 변환', () => {
    expect(canonicalDisplayNameFromSlug('iridescent-chrome-01')).toBe('Iridescent_Chrome_01');
    expect(canonicalDisplayNameFromSlug('op-art-kinetic-01')).toBe('Op_Art_Kinetic_01');
    expect(canonicalDisplayNameFromSlug('heritage-folk-ornament-01')).toBe('Heritage_Folk_Ornament_01');
    // 숫자 붙은 세그먼트는 그대로(단어 내부): gradient3d → Gradient3d.
    expect(canonicalDisplayNameFromSlug('ai-surreal-gradient3d-01')).toBe('Ai_Surreal_Gradient3d_01');
  });
});

describe('meta.displayName canonical 명명 게이트 (KAN-027)', () => {
  it('전 카탈로그 표시명이 canonical 형식(`…_01`, `_` 단어 경계)을 만족한다', () => {
    for (const sg of styleGuideCatalog) {
      const dn = sg.meta?.displayName;
      expect(dn, sg.name).toBeTruthy();
      expect(dn, `${sg.name}: "${dn}"는 canonical 형식 위반(마이닝 순번 접미사 잔존?)`).toMatch(
        CANONICAL_DISPLAY_NAME
      );
    }
  });

  it('정정 대상 16종 표시명 === 슬러그 기계 변환(단어 경계 + _01)', () => {
    for (const slug of NORMALIZED_SLUGS) {
      const sg = styleGuideMap[slug];
      expect(sg, slug).toBeTruthy();
      expect(sg.meta?.displayName, slug).toBe(canonicalDisplayNameFromSlug(slug));
    }
  });

  it('표시명은 카탈로그 전체에서 유일하다', () => {
    const names = styleGuideCatalog.map((sg) => sg.meta?.displayName);
    expect(new Set(names).size).toBe(names.length);
  });
});
