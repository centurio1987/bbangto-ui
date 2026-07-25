/**
 * Chord diagram 레이아웃 — 순수 함수(라디안). 원 둘레 그룹 arc + 그룹 간 리본 앵커.
 * 반환 규약(정밀 검증은 chord.test.ts):
 *  - 비정방 → 최소 정방(n=행 수)으로 clamp, 열 index ≥ n 무시.
 *  - 음수/비유한 값 → 0 clamp.
 *  - 전체 합 0 → { groups:[], chords:[] }.
 *  - 대각선 matrix[i][i] → self-chord 포함.
 *  - 리본 value = matrix[i][j](비대칭이면 source=행 i, target=열 j).
 *  - padAngle × n ≥ 2π → pad 균등 축소(둘레 최대 절반).
 */

const TAU = Math.PI * 2;

export interface ChordEnd {
  readonly index: number;
  readonly startAngle: number;
  readonly endAngle: number;
}

export interface ChordGroup extends ChordEnd {
  /** 그룹 총합(둘레 arc 크기). */
  readonly value: number;
}

export interface Chord {
  readonly source: ChordEnd;
  readonly target: ChordEnd;
  /** matrix[i][j] — source(i) 관점 흐름량. */
  readonly value: number;
}

export interface ChordResult {
  readonly groups: ChordGroup[];
  readonly chords: Chord[];
}

export interface ChordOptions {
  /** 그룹 간 여백(라디안). 기본 0. */
  padAngle?: number;
}

export function chordLayout(matrix: number[][], opts: ChordOptions = {}): ChordResult {
  const n = matrix.length;
  if (n === 0) return { groups: [], chords: [] };

  // 음수/비유한/누락은 0으로 clamp, 열 index ≥ n 무시(비정방 clamp).
  const val = (i: number, j: number): number => {
    const row = matrix[i];
    if (!row) return 0;
    const v = row[j];
    return Number.isFinite(v) && v > 0 ? v : 0;
  };

  const groupSums = Array.from({ length: n }, (_, i) => {
    let s = 0;
    for (let j = 0; j < n; j++) s += val(i, j);
    return s;
  });
  const total = groupSums.reduce((a, b) => a + b, 0);
  if (total <= 0) return { groups: [], chords: [] };

  let pad = Math.max(0, opts.padAngle ?? 0);
  if (pad * n >= TAU) pad = (TAU * 0.5) / n; // 균등 축소: pad는 둘레 절반 이하.
  const k = (TAU - pad * n) / total;

  // 그룹 arc + 그룹 내 서브 arc(대상별) 계산.
  const groups: ChordGroup[] = [];
  const sub: Array<Array<{ startAngle: number; endAngle: number }>> = [];
  let cursor = 0;
  for (let i = 0; i < n; i++) {
    const start = cursor;
    const arc = groupSums[i] * k;
    const end = start + arc;
    groups.push({ index: i, startAngle: start, endAngle: end, value: groupSums[i] });

    const row: Array<{ startAngle: number; endAngle: number }> = [];
    let subCursor = start;
    for (let j = 0; j < n; j++) {
      const a = val(i, j) * k;
      row.push({ startAngle: subCursor, endAngle: subCursor + a });
      subCursor += a;
    }
    sub.push(row);
    cursor = end + pad;
  }

  // 리본: i ≥ j 페어(대각 self 포함), val(i,j) 또는 val(j,i) > 0일 때.
  const chords: Chord[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= i; j++) {
      if (val(i, j) <= 0 && val(j, i) <= 0) continue;
      chords.push({
        source: { index: i, startAngle: sub[i][j].startAngle, endAngle: sub[i][j].endAngle },
        target: { index: j, startAngle: sub[j][i].startAngle, endAngle: sub[j][i].endAngle },
        value: val(i, j),
      });
    }
  }

  return { groups, chords };
}
