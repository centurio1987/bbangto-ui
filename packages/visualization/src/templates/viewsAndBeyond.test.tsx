import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as viz from '../index';

// KAN-082.5 S15 — SEI Views and Beyond 프레임. 원문 「모든 뷰를 세 가지로 나눕니다. Module(코드 구조),
// C&C(런타임 구조), Allocation(물리 배치·팀 배치)」. Kruchten4Plus1View · ViewpointFrame 처럼 다른 도식을 슬롯에
// 담는 조합 프레임이다 — 영역마다 슬롯을 먼저, 없으면 불릿을 그린다.

const F = (viz as unknown as Record<string, React.ComponentType<Record<string, unknown>> | undefined>).ViewsAndBeyondFrame;

describe('ViewsAndBeyondFrame (KAN-082 .5)', () => {
  it('패키지가 낸다', () => {
    expect(typeof F).toBe('function');
  });

  const html = F
    ? renderToStaticMarkup(
        <F
          slots={{ module: <rect data-test-slot="module" x={0} y={0} width={10} height={10} /> }}
          data={{ cc: ['api server', 'worker'], allocation: ['EC2', 'RDS'] }}
          viewBox="0 0 900 420"
        />,
      )
    : '';

  it('세 영역(Module · C&C · Allocation)을 그린다', () => {
    const keys = [...html.matchAll(/data-bbangto-viz-vab-region-key="([^"]+)"/g)].map((m) => m[1]);
    expect(keys).toEqual(['module', 'cc', 'allocation']);
    const t = html.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&');
    for (const s of ['Module views', 'Component-and-Connector views', 'Allocation views']) expect({ s, has: t.includes(s) }).toEqual({ s, has: true });
  });

  it('슬롯이 있는 영역은 슬롯을, 없으면 불릿을 그린다', () => {
    expect(html).toMatch(/data-bbangto-viz-vab-slot[\s\S]*data-test-slot="module"/);
    const items = [...html.matchAll(/data-bbangto-viz-vab-item[^>]*>([^<]*)</g)].map((m) => m[1]);
    expect(items).toEqual(['• api server', '• worker', '• EC2', '• RDS']);
  });

  it('세 영역은 가로로 나란하고 겹치지 않는다', () => {
    const rects = [...html.matchAll(/data-bbangto-viz-vab-region-key="[^"]+"[^>]*>\s*<rect[^>]*\bx="([\d.]+)"[^>]*\bwidth="([\d.]+)"/g)].map((m) => ({ x: Number(m[1]), w: Number(m[2]) }));
    expect(rects).toHaveLength(3);
    expect(rects[0].x + rects[0].w).toBeLessThanOrEqual(rects[1].x);
    expect(rects[1].x + rects[1].w).toBeLessThanOrEqual(rects[2].x);
  });
});
