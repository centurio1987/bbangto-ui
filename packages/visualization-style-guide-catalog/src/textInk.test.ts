import { describe, it, expect } from 'vitest';
import { compositeOver, contrastRatio, parseColor } from '@centurio1987/bbangto-ui-tokens';
import type { RGBA, VisualizationFoundation } from '@centurio1987/bbangto-ui-tokens';
import { visualizationFoundationToStyleObject } from '@centurio1987/bbangto-ui-visualization';
import { vizStyleGuideCatalog } from './index';

// KAN-075 — 지침 문장이 글자색을 이름으로 정한 가이드는 그 색이 칠해진다.
//
// 가이드는 `on.ink` 에 그 색을 적고, visualization 패키지가 면마다 4.5:1 을 넘으면 계산 후보보다 먼저 쓴다.
// 이 표는 문장과 그림을 잇는 자리다. 문장(낱말)이 바뀌거나 `on.ink`·팔레트가 바뀌어 둘이 갈라지면 여기서 빨개진다.
// 기계는 문장을 읽지 못하므로, 새 가이드가 문장에 글자색을 이름으로 적으면 이 표에도 넣는다.

const PROMISES: ReadonlyArray<{ guide: string; presets: readonly string[]; ink: string; word: string }> = [
  { guide: 'artdeco-luxe-01', presets: ['default', 'emerald'], ink: '#EFE6D0', word: '크림' },
  { guide: 'darkluxe-01', presets: ['default', 'oxblood'], ink: '#EDE3CE', word: '웜 크림' },
  { guide: 'synthwave-01', presets: ['default', 'sunset'], ink: '#F2ECFF', word: '니어화이트' },
  { guide: 'hud-telemetry-01', presets: ['default', 'amber'], ink: '#FFFFFF', word: '순백' },
  { guide: 'riso-print-01', presets: ['default', 'teal'], ink: '#182234', word: '다크 잉크' },
  { guide: 'colorful-flat-01', presets: ['bento-dark'], ink: '#241505', word: '#241505' },
  // bold 는 default 를 펼쳐 만들어 on.ink 를 물려받는다. 흰색이 넘는 면에는 이미 흰색이 칠해져 그림은 그대로다.
  { guide: 'bauhaus-geometric-01', presets: ['default', 'bold'], ink: '#FFFFFF', word: '흰' },
];

const MIN = 4.5;
/** visualization `tokens/onInk.ts` 의 ON_INK_SHADE 와 같은 값. 그쪽이 바뀌면 아래 ② 가 빨개진다. */
const SHADE = 0.05;
const WHITE: RGBA = { r: 255, g: 255, b: 255, a: 1 };
const BLACK: RGBA = { r: 0, g: 0, b: 0, a: 1 };

function canvasOf(f: VisualizationFoundation): RGBA {
  const c = parseColor(f.canvas.bg);
  return c ? compositeOver(c, WHITE) : WHITE;
}

/** 글자색을 잴 면들 — 불투명 면은 canvas 위 하나, 반투명·none 면은 canvas 위와 검정 음영을 얹은 canvas 위 둘. */
function surfaces(f: VisualizationFoundation, value: string): RGBA[] {
  const canvas = canvasOf(f);
  const c = parseColor(value);
  const plain = c ? compositeOver(c, canvas) : canvas;
  if (c && c.a >= 1) return [plain];
  const shadedCanvas = compositeOver({ ...BLACK, a: SHADE }, canvas);
  return [plain, c ? compositeOver(c, shadedCanvas) : shadedCanvas];
}

/** [면 이름, 면 값, on 변수 이름] — 템플릿이 글자를 얹는 면 전부. */
function faces(f: VisualizationFoundation): Array<[string, string, string]> {
  const out: Array<[string, string, string]> = [];
  for (const [k, v] of Object.entries(f.palette)) out.push([`palette.${k}`, v, `--bbangto-viz-on-palette-${k}`]);
  out.push(['shape.fill', f.shape.fill, '--bbangto-viz-on-shape-fill']);
  out.push(['canvas.bg', f.canvas.bg, '--bbangto-viz-on-canvas-bg']);
  for (const l of ['l1', 'l2', 'l3'] as const) out.push([`c4.${l}.bgTint`, f.c4[l].bgTint, `--bbangto-viz-on-c4-${l}-bg-tint`]);
  for (const [kind, s] of Object.entries(f.node)) out.push([`node.${kind}.fill`, s.fill, `--bbangto-viz-on-node-${kind}-fill`]);
  return out;
}

const guideOf = (name: string) => {
  const g = vizStyleGuideCatalog.find((sg) => sg.name === name);
  if (!g) throw new Error(`가이드 없음: ${name}`);
  return g;
};

const presetOf = (name: string, key: string): VisualizationFoundation => {
  const p = guideOf(name).foundationPresets?.find((x) => x.key === key);
  if (!p) throw new Error(`색 묶음 없음: ${name}#${key}`);
  return p.foundations;
};

const rows = PROMISES.flatMap((p) => p.presets.map((key) => ({ ...p, key })));

describe('지침 문장이 정한 글자색 (KAN-075)', () => {
  it.each(rows)('① $guide#$key — on.ink 가 문장의 색($ink)이다', ({ guide, key, ink }) => {
    expect(presetOf(guide, key).on?.ink).toBe(ink);
  });

  it.each(rows)('② $guide#$key — 그 색이 4.5:1 을 넘는 면은 전부 그 색으로 칠해진다', ({ guide, key, ink }) => {
    const f = presetOf(guide, key);
    const vars = visualizationFoundationToStyleObject(f);
    const wrong: string[] = [];
    let painted = 0;
    for (const [face, value, varName] of faces(f)) {
      const s = surfaces(f, value);
      if (Math.min(...s.map((x) => contrastRatio(ink, x) ?? 0)) < MIN) continue;
      if (vars[varName]?.toLowerCase() === ink.toLowerCase()) painted++;
      else wrong.push(`${face} ${value}: ${vars[varName]}`);
    }
    expect(wrong).toEqual([]);
    expect(painted).toBeGreaterThan(0);
  });

  it.each(PROMISES)('③ $guide — 지침 문장에 「$word」가 있다', ({ guide, word }) => {
    expect(JSON.stringify(guideOf(guide).guidelines)).toContain(word);
  });

  it('④ on.ink 를 적은 색 묶음은 전부 이 표에 있다', () => {
    const listed = new Set(rows.map((r) => `${r.guide}#${r.key}`));
    const extra = vizStyleGuideCatalog.flatMap((g) =>
      (g.foundationPresets ?? [])
        .filter((p) => p.foundations.on?.ink !== undefined && !listed.has(`${g.name}#${p.key}`))
        .map((p) => `${g.name}#${p.key}`),
    );
    expect(extra).toEqual([]);
  });
});
