import { describe, it, expect } from 'vitest';
import { sankeyLayout } from './sankey';

describe('sankeyLayout', () => {
  const nodes = [
    { id: 'A', x: 0, y: 0 },
    { id: 'B', x: 200, y: 0 },
    { id: 'C', x: 200, y: 80 },
  ];
  const links = [
    { source: 'A', target: 'B', value: 3 },
    { source: 'A', target: 'C', value: 2 },
  ];

  it('produces one layout link per input link', () => {
    const { links: out } = sankeyLayout(nodes, links, { scale: 10 });
    expect(out.length).toBe(2);
  });

  it('link width is proportional to value', () => {
    const { links: out } = sankeyLayout(nodes, links, { scale: 10 });
    expect(out[0].width).toBe(30);
    expect(out[1].width).toBe(20);
  });

  it('node height = sum of outgoing link widths (source-dominant node)', () => {
    const { nodes: out, links: ls } = sankeyLayout(nodes, links, { scale: 10 });
    const a = out.find((n) => n.id === 'A')!;
    const outgoing = ls.filter((l) => l.source === 'A');
    const widthSum = outgoing.reduce((s, l) => s + l.width, 0);
    expect(a.height).toBeCloseTo(widthSum, 6);
  });

  it('outgoing link anchors do not overlap (cumulative offset)', () => {
    const { links: out } = sankeyLayout(nodes, links, { scale: 10 });
    const a0 = out[0];
    const a1 = out[1];
    // 두 유출 링크의 중심 y 간격 = (w0+w1)/2
    expect(Math.abs(a1.sy - a0.sy)).toBeCloseTo((a0.width + a1.width) / 2, 6);
  });

  it('source anchor is right of node, target anchor at target x', () => {
    const { links: out } = sankeyLayout(nodes, links, { scale: 10, nodeWidth: 16 });
    expect(out[0].sx).toBe(16);
    expect(out[0].tx).toBe(200);
  });
});
