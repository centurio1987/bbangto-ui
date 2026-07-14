import { describe, it, expect } from 'vitest';
import { chordLayout } from './chord';

const TAU = Math.PI * 2;

describe('chordLayout', () => {
  it('symmetric 2×2 → 2 groups + 1 chord', () => {
    const r = chordLayout([
      [0, 1],
      [1, 0],
    ]);
    expect(r.groups.length).toBe(2);
    expect(r.chords.length).toBe(1);
    // 그룹은 원 둘레를 균등 분할(각 sum 1, total 2).
    expect(r.groups[0].startAngle).toBeCloseTo(0, 6);
    expect(r.groups[1].endAngle).toBeCloseTo(TAU, 6);
  });

  it('all-zero matrix → empty result (no divide-by-zero)', () => {
    expect(chordLayout([[0, 0], [0, 0]])).toEqual({ groups: [], chords: [] });
  });

  it('diagonal value → self-chord included', () => {
    const r = chordLayout([
      [2, 0],
      [0, 0],
    ]);
    expect(r.chords.length).toBe(1);
    const c = r.chords[0];
    expect(c.source.index).toBe(0);
    expect(c.target.index).toBe(0);
    expect(c.value).toBe(2);
  });

  it('non-square → clamps to smallest square, extra columns ignored', () => {
    const r = chordLayout([
      [0, 1, 9],
      [1, 0, 9],
    ]);
    expect(r.groups.length).toBe(2);
    // 무시된 9는 그룹 합에 반영되지 않는다(각 그룹 value=1).
    expect(r.groups[0].value).toBe(1);
    expect(r.groups[1].value).toBe(1);
  });

  it('negative / non-finite values clamp to 0', () => {
    const r = chordLayout([
      [0, -5],
      [-5, 0],
    ]);
    expect(r).toEqual({ groups: [], chords: [] });
  });

  it('padAngle × n ≥ 2π shrinks pad instead of overflowing', () => {
    const r = chordLayout(
      [
        [0, 1],
        [1, 0],
      ],
      { padAngle: 4 }, // 4×2 = 8 > 2π
    );
    expect(r.groups.length).toBe(2);
    // 마지막 그룹 끝 + pad가 2π를 넘지 않는다.
    const last = r.groups[r.groups.length - 1];
    expect(last.endAngle).toBeLessThanOrEqual(TAU + 1e-9);
  });

  it('asymmetric matrix → ribbon value follows matrix[i][j]', () => {
    const r = chordLayout([
      [0, 3],
      [1, 0],
    ]);
    // i>j 페어에서 source=행 i, target=열 j, value=matrix[i][j].
    const c = r.chords.find((ch) => ch.source.index === 1 && ch.target.index === 0)!;
    expect(c.value).toBe(1);
  });
});
