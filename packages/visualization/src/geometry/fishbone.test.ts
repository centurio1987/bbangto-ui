import { describe, it, expect } from 'vitest';
import { fishboneLayout } from './fishbone';

describe('fishboneLayout', () => {
  it('spine runs horizontally to the head at spineLength', () => {
    const r = fishboneLayout({ categories: 4, spineLength: 400, spineY: 60 });
    expect(r.spine).toMatchObject({ x1: 0, y1: 60, x2: 400, y2: 60 });
    expect(r.head).toMatchObject({ x: 400, y: 60 });
  });

  it('alternates bones top/bottom by index parity', () => {
    const r = fishboneLayout({ categories: 4, spineLength: 400, spineY: 60 });
    expect(r.bones.length).toBe(4);
    expect(r.bones[0].side).toBe('top');
    expect(r.bones[1].side).toBe('bottom');
    expect(r.bones[2].side).toBe('top');
    expect(r.bones[3].side).toBe('bottom');
  });

  it('top bones tail above the spine, bottom bones below', () => {
    const r = fishboneLayout({ categories: 2, spineLength: 300, spineY: 80, boneLength: 50, boneAngle: 40 });
    // bone x2/y2 anchor on spine, x1/y1 is the tail
    expect(r.bones[0].y2).toBeCloseTo(80, 6); // anchor on spine
    expect(r.bones[0].y1).toBeLessThan(80); // top tail above
    expect(r.bones[1].y1).toBeGreaterThan(80); // bottom tail below
  });

  it('zero categories → spine only, no bones', () => {
    const r = fishboneLayout({ categories: 0, spineLength: 200 });
    expect(r.bones).toEqual([]);
  });

  it('single category → one bone on top side', () => {
    const r = fishboneLayout({ categories: 1, spineLength: 200 });
    expect(r.bones.length).toBe(1);
    expect(r.bones[0].side).toBe('top');
  });
});
