import { describe, it, expect } from 'vitest';
import { compositeOver, contrastRatio, parseColor } from '@centurio1987/bbangto-ui-tokens';
import type { RGBA, VisualizationFoundation } from '@centurio1987/bbangto-ui-tokens';
import { visualizationFoundationToStyleObject } from '@centurio1987/bbangto-ui-visualization';
import { vizStyleGuideCatalog } from './index';

// KAN-061 — 카탈로그 가이드 전부(preset 포함)에서, Provider 가 내는 --bbangto-viz-on-* 글자색이
// 짝이 되는 면과 4.5:1 이상인가. 템플릿이 면 위 글자에 이 변수를 쓰면 가이드가 바뀌어도 읽힌다.
// 면은 canvas.bg(흰색 위 합성) 위에 합성해서 잰다 — LabelContrastGate 가 재는 방식과 같다.

const MIN = 4.5;
const WHITE: RGBA = { r: 255, g: 255, b: 255, a: 1 };

function canvasOf(f: VisualizationFoundation): RGBA {
  const c = parseColor(f.canvas.bg);
  return c ? compositeOver(c, WHITE) : WHITE;
}

/** 면 토큰 값 → 불투명 면. 읽을 수 없는 값(transparent·none)은 canvas 다. */
function surface(f: VisualizationFoundation, value: string): RGBA {
  const c = parseColor(value);
  return c ? compositeOver(c, canvasOf(f)) : canvasOf(f);
}

/** [면 이름, 면 값, on 변수 이름] */
function pairs(f: VisualizationFoundation): Array<[string, string, string]> {
  const out: Array<[string, string, string]> = [];
  for (const [k, v] of Object.entries(f.palette)) out.push([`palette.${k}`, v, `--bbangto-viz-on-palette-${k}`]);
  out.push(['shape.fill', f.shape.fill, '--bbangto-viz-on-shape-fill']);
  out.push(['canvas.bg', f.canvas.bg, '--bbangto-viz-on-canvas-bg']);
  for (const l of ['l1', 'l2', 'l3'] as const) out.push([`c4.${l}.bgTint`, f.c4[l].bgTint, `--bbangto-viz-on-c4-${l}-bg-tint`]);
  for (const [kind, s] of Object.entries(f.node)) out.push([`node.${kind}.fill`, s.fill, `--bbangto-viz-on-node-${kind}-fill`]);
  return out;
}

const targets: Array<[string, VisualizationFoundation]> = vizStyleGuideCatalog.flatMap((sg) =>
  sg.foundationPresets?.length
    ? sg.foundationPresets.map((p) => [`${sg.name}/${p.key}`, p.foundations] as [string, VisualizationFoundation])
    : [[sg.name, sg.foundations] as [string, VisualizationFoundation]],
);

describe('--bbangto-viz-on-* — 카탈로그 가이드 전부', () => {
  it('가이드와 preset 을 빠짐없이 잰다', () => {
    expect(vizStyleGuideCatalog.length).toBeGreaterThanOrEqual(30);
    expect(targets.length).toBeGreaterThanOrEqual(vizStyleGuideCatalog.length);
  });

  it('면마다 on 글자색이 4.5:1 이상이다', () => {
    const failures: string[] = [];
    for (const [name, f] of targets) {
      const vars = visualizationFoundationToStyleObject(f);
      for (const [face, value, varName] of pairs(f)) {
        const ink = vars[varName];
        if (ink === undefined) {
          failures.push(`${name} ${face}: ${varName} 없음`);
          continue;
        }
        const r = contrastRatio(ink, surface(f, value));
        if (r === null || r < MIN) failures.push(`${name} ${face} ${value}: ${ink} = ${r?.toFixed(2)}`);
      }
    }
    expect(failures).toEqual([]);
  });
});
