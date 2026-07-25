/** Treemap squarify 배치 — 순수 함수(렌더 무관). 정밀 검증은 treemap.test.ts. */

export interface TreemapItem {
  id: string;
  value: number;
}

export interface TreemapRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface TreemapCell extends TreemapRect {
  id: string;
  value: number;
}

interface WorkItem {
  id: string;
  value: number;
  area: number;
}

/** 한 행의 최악 종횡비(작을수록 정사각형에 가까움). */
function worst(row: WorkItem[], length: number, totalArea: number): number {
  if (row.length === 0 || length === 0) return Infinity;
  const sum = row.reduce((s, r) => s + r.area, 0);
  const scaledLen = length * length;
  const sum2 = sum * sum;
  let max = -Infinity;
  let min = Infinity;
  for (const r of row) {
    if (r.area > max) max = r.area;
    if (r.area < min) min = r.area;
  }
  void totalArea;
  return Math.max((scaledLen * max) / sum2, sum2 / (scaledLen * min));
}

/**
 * Squarified treemap (Bruls et al. 2000 근사). items 값에 비례한 면적으로 rect를 분할한다.
 * 종횡비가 1에 가까운 셀을 우선한다. 값은 큰 순 정렬 후 배치.
 */
export function squarifyLayout(
  items: readonly TreemapItem[],
  rect: TreemapRect,
  opts?: { gap?: number },
): TreemapCell[] {
  const gap = opts?.gap ?? 0;
  const positive = items.filter((it) => it.value > 0);
  if (positive.length === 0) return [];

  const totalValue = positive.reduce((s, it) => s + it.value, 0);
  const totalArea = rect.width * rect.height;
  const work: WorkItem[] = positive
    .map((it) => ({ id: it.id, value: it.value, area: (it.value / totalValue) * totalArea }))
    .sort((a, b) => b.area - a.area);

  const cells: TreemapCell[] = [];
  let free: TreemapRect = { ...rect };

  const layoutRow = (row: WorkItem[]) => {
    const rowArea = row.reduce((s, r) => s + r.area, 0);
    const vertical = free.width >= free.height; // 짧은 변을 따라 쌓는다
    if (vertical) {
      const rowW = rowArea / free.height;
      let y = free.y;
      for (const r of row) {
        const h = (r.area / rowArea) * free.height;
        cells.push({ id: r.id, value: r.value, x: free.x + gap / 2, y: y + gap / 2, width: Math.max(0, rowW - gap), height: Math.max(0, h - gap) });
        y += h;
      }
      free = { x: free.x + rowW, y: free.y, width: free.width - rowW, height: free.height };
    } else {
      const rowH = rowArea / free.width;
      let x = free.x;
      for (const r of row) {
        const w = (r.area / rowArea) * free.width;
        cells.push({ id: r.id, value: r.value, x: x + gap / 2, y: free.y + gap / 2, width: Math.max(0, w - gap), height: Math.max(0, rowH - gap) });
        x += w;
      }
      free = { x: free.x, y: free.y + rowH, width: free.width, height: free.height - rowH };
    }
  };

  let row: WorkItem[] = [];
  for (const item of work) {
    const shortSide = Math.min(free.width, free.height);
    const withItem = [...row, item];
    if (row.length === 0 || worst(withItem, shortSide, totalArea) <= worst(row, shortSide, totalArea)) {
      row = withItem;
    } else {
      layoutRow(row);
      row = [item];
    }
  }
  if (row.length) layoutRow(row);

  return cells;
}
