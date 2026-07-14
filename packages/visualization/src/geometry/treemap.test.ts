import { describe, it, expect } from 'vitest';
import { squarifyLayout } from './treemap';

describe('squarifyLayout', () => {
  const rect = { x: 0, y: 0, width: 400, height: 300 };

  it('returns one cell per item', () => {
    const cells = squarifyLayout([
      { id: 'a', value: 6 },
      { id: 'b', value: 3 },
      { id: 'c', value: 1 },
    ], rect);
    expect(cells.length).toBe(3);
    expect(cells.map((c) => c.id).sort()).toEqual(['a', 'b', 'c']);
  });

  it('cell areas are proportional to values', () => {
    const cells = squarifyLayout([
      { id: 'a', value: 6 },
      { id: 'b', value: 3 },
      { id: 'c', value: 1 },
    ], rect);
    const area = (id: string) => {
      const c = cells.find((x) => x.id === id)!;
      return c.width * c.height;
    };
    const total = rect.width * rect.height;
    expect(area('a') / total).toBeCloseTo(0.6, 1);
    expect(area('b') / total).toBeCloseTo(0.3, 1);
  });

  it('cells stay within the container rect', () => {
    const cells = squarifyLayout([
      { id: 'a', value: 5 },
      { id: 'b', value: 4 },
      { id: 'c', value: 3 },
      { id: 'd', value: 2 },
    ], rect);
    for (const c of cells) {
      expect(c.x).toBeGreaterThanOrEqual(rect.x - 1e-6);
      expect(c.y).toBeGreaterThanOrEqual(rect.y - 1e-6);
      expect(c.x + c.width).toBeLessThanOrEqual(rect.x + rect.width + 1e-6);
      expect(c.y + c.height).toBeLessThanOrEqual(rect.y + rect.height + 1e-6);
    }
  });

  it('single item fills the rect', () => {
    const cells = squarifyLayout([{ id: 'a', value: 1 }], rect);
    expect(cells[0].width).toBeCloseTo(400, 5);
    expect(cells[0].height).toBeCloseTo(300, 5);
  });

  it('empty input yields no cells', () => {
    expect(squarifyLayout([], rect)).toEqual([]);
  });
});
