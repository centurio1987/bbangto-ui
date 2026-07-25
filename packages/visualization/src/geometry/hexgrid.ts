/**
 * Honeycomb(육각 셀) 오프셋 패킹 — 순수 함수. 정밀 검증은 hexgrid.test.ts.
 * pointy(뾰족 위): 홀수 행이 가로 절반 오프셋. flat(평평 위): 홀수 열이 세로 절반 오프셋.
 */

export interface HexCell {
  readonly index: number;
  readonly cx: number;
  readonly cy: number;
  readonly row: number;
  readonly col: number;
}

export interface HexLayoutOptions {
  columns: number;
  /** 육각 외접원 반지름(중심→꼭짓점). */
  size: number;
  orientation?: 'flat' | 'pointy';
}

export function hexLayout(count: number, opts: HexLayoutOptions): HexCell[] {
  const { columns, size } = opts;
  const orientation = opts.orientation ?? 'pointy';
  if (count <= 0 || columns <= 0) return [];

  const cells: HexCell[] = [];
  const sqrt3 = Math.sqrt(3);

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / columns);
    const col = i % columns;
    let cx: number;
    let cy: number;
    if (orientation === 'pointy') {
      const hspace = sqrt3 * size;
      const vspace = 1.5 * size;
      cx = col * hspace + (row % 2) * (hspace / 2) + size;
      cy = row * vspace + size;
    } else {
      const hspace = 1.5 * size;
      const vspace = sqrt3 * size;
      cx = col * hspace + size;
      cy = row * vspace + (col % 2) * (vspace / 2) + size;
    }
    cells.push({ index: i, cx, cy, row, col });
  }
  return cells;
}
