import { describe, it, expect } from 'vitest';
import { tidyTreeLayout, wbsNumbering, type TreeNodeInput } from './tree';

const tree: TreeNodeInput = {
  id: 'root',
  children: [
    { id: 'a', children: [{ id: 'a1' }, { id: 'a2' }] },
    { id: 'b', children: [{ id: 'b1' }] },
  ],
};

describe('tidyTreeLayout', () => {
  it('returns one node per tree node', () => {
    const nodes = tidyTreeLayout(tree, { width: 400, height: 300 });
    expect(nodes.length).toBe(6);
    expect(nodes.map((n) => n.id).sort()).toEqual(['a', 'a1', 'a2', 'b', 'b1', 'root']);
  });

  it('depth increases with level (y monotonic in depth)', () => {
    const nodes = tidyTreeLayout(tree, { width: 400, height: 300 });
    const byId = new Map(nodes.map((n) => [n.id, n]));
    expect(byId.get('root')!.depth).toBe(0);
    expect(byId.get('a')!.depth).toBe(1);
    expect(byId.get('a1')!.depth).toBe(2);
    expect(byId.get('root')!.y).toBeLessThan(byId.get('a')!.y);
    expect(byId.get('a')!.y).toBeLessThan(byId.get('a1')!.y);
  });

  it('parent x is centered between children', () => {
    const nodes = tidyTreeLayout(tree, { width: 400, height: 300 });
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const a = byId.get('a')!;
    expect(a.x).toBeCloseTo((byId.get('a1')!.x + byId.get('a2')!.x) / 2, 6);
  });

  it('leaves have distinct x', () => {
    const nodes = tidyTreeLayout(tree, { width: 400, height: 300 });
    const byId = new Map(nodes.map((n) => [n.id, n]));
    const leafXs = ['a1', 'a2', 'b1'].map((id) => byId.get(id)!.x);
    expect(new Set(leafXs).size).toBe(3);
  });

  it('parentId links back to parent', () => {
    const nodes = tidyTreeLayout(tree, { width: 400, height: 300 });
    const byId = new Map(nodes.map((n) => [n.id, n]));
    expect(byId.get('root')!.parentId).toBeNull();
    expect(byId.get('a1')!.parentId).toBe('a');
  });

  it('single node is centered', () => {
    const nodes = tidyTreeLayout({ id: 'solo' }, { width: 200, height: 100 });
    expect(nodes.length).toBe(1);
    expect(nodes[0].x).toBeCloseTo(100, 6);
  });
});

describe('wbsNumbering', () => {
  it('assigns dotted decimal codes down the tree', () => {
    const n = wbsNumbering(tree);
    expect(n.root).toBe('1');
    expect(n.a).toBe('1.1');
    expect(n.b).toBe('1.2');
    expect(n.a1).toBe('1.1.1');
    expect(n.a2).toBe('1.1.2');
    expect(n.b1).toBe('1.2.1');
  });

  it('supports multiple roots (array input)', () => {
    const n = wbsNumbering([{ id: 'p' }, { id: 'q', children: [{ id: 'q1' }] }]);
    expect(n.p).toBe('1');
    expect(n.q).toBe('2');
    expect(n.q1).toBe('2.1');
  });

  it('guards against cycles (revisited node skipped)', () => {
    const a: TreeNodeInput = { id: 'a' };
    const b: TreeNodeInput = { id: 'b', children: [a] };
    a.children = [b]; // a → b → a 순환
    const n = wbsNumbering(a);
    expect(n.a).toBe('1');
    expect(n.b).toBe('1.1');
    // 순환 재방문으로 무한 루프 없이 반환.
    expect(Object.keys(n).sort()).toEqual(['a', 'b']);
  });

  it('empty input → empty map', () => {
    expect(wbsNumbering([])).toEqual({});
  });
});
