import { describe, it, expect } from 'vitest';
import { hexLayout } from './hexgrid';

describe('hexLayout', () => {
  it('count 0 → empty', () => {
    expect(hexLayout(0, { columns: 3, size: 20 })).toEqual([]);
  });

  it('pointy (default): row-major with √3·size horizontal spacing', () => {
    const cells = hexLayout(3, { columns: 3, size: 20 });
    expect(cells.length).toBe(3);
    expect(cells[0].row).toBe(0);
    expect(cells[0].col).toBe(0);
    const hspace = Math.sqrt(3) * 20;
    expect(cells[1].cx - cells[0].cx).toBeCloseTo(hspace, 6);
    // 같은 행이면 cy 동일.
    expect(cells[1].cy).toBeCloseTo(cells[0].cy, 6);
  });

  it('pointy: odd rows offset by half horizontal step', () => {
    const cells = hexLayout(4, { columns: 3, size: 20 });
    const row1 = cells.find((c) => c.row === 1 && c.col === 0)!;
    const row0 = cells.find((c) => c.row === 0 && c.col === 0)!;
    const hspace = Math.sqrt(3) * 20;
    expect(row1.cx - row0.cx).toBeCloseTo(hspace / 2, 6);
    expect(row1.cy).toBeGreaterThan(row0.cy);
  });

  it('flat: odd columns offset vertically', () => {
    const cells = hexLayout(2, { columns: 2, size: 20, orientation: 'flat' });
    expect(cells[1].cy - cells[0].cy).toBeCloseTo((Math.sqrt(3) * 20) / 2, 6);
    expect(cells[1].cx).toBeGreaterThan(cells[0].cx);
  });
});
