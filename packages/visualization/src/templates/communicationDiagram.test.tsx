import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as viz from '../index';
import { vizTypeRegistry } from '../typeMeta';

// KAN-082.4 S14 — 커뮤니케이션 도식(UML Communication Diagram). 원문 「동작을 나타내는 개념도 — 시퀀스 다이어그램,
// 상태 머신 다이어그램, 커뮤니케이션 다이어그램」. 시퀀스가 시간축으로 메시지를 세운다면, 커뮤니케이션은 객체 사이
// 링크 위에 번호 붙인 메시지와 방향 화살표를 단다. 유형 목록은 VT-108(시퀀스 도식)의 별칭 communication 으로 둔다.

const Cm = (viz as unknown as Record<string, React.ComponentType<{ data: unknown }> | undefined>).CommunicationDiagram;

function textOf(html: string): string {
  return html.replace(/<[^>]*>/g, ' ');
}

const A = { x: 20, y: 40, width: 140, height: 50 };
const B = { x: 320, y: 40, width: 140, height: 50 };

describe('CommunicationDiagram (KAN-082 .4)', () => {
  it('패키지가 낸다', () => {
    expect(typeof Cm).toBe('function');
  });

  const html = Cm
    ? renderToStaticMarkup(
        <Cm
          data={{
            objects: [
              { id: 'ui', ...A, name: 'ui', classifier: 'CheckoutPage' },
              { id: 'svc', ...B, classifier: 'OrderService' },
            ],
            links: [
              {
                id: 'l1',
                from: 'ui',
                to: 'svc',
                messages: [
                  { order: '1', label: 'placeOrder()' },
                  { order: '1.1', label: 'orderId', direction: 'backward' },
                ],
              },
            ],
          }}
        />,
      )
    : '';

  it('객체 이름은 「이름 : 클래스」 · 이름이 없으면 「: 클래스」', () => {
    const t = textOf(html);
    expect(t).toContain('ui : CheckoutPage');
    expect(t).toContain(': OrderService');
  });

  it('메시지는 「번호: 글」 로 링크 옆에 그린다', () => {
    const t = textOf(html);
    expect(t).toContain('1: placeOrder()');
    expect(t).toContain('1.1: orderId');
  });

  it('메시지마다 방향 화살표가 하나 — forward 는 from → to, backward 는 to → from', () => {
    const arrows = [...html.matchAll(/<g[^>]*data-bbangto-viz-message="([^"]+)"[^>]*>([\s\S]*?)<\/g>/g)];
    expect(arrows.map((m) => m[1])).toEqual(['1', '1.1']);
    const xs = (g: string) => {
      const d = g.match(/<path[^>]*\bd="([^"]+)"/)![1].match(/-?[\d.]+/g)!.map(Number);
      return { start: d[0], end: d[d.length - 2], marker: /marker-end=/.test(g) };
    };
    const fwd = xs(arrows[0][2]);
    const back = xs(arrows[1][2]);
    expect(fwd.marker && back.marker).toBe(true);
    expect(fwd.end).toBeGreaterThan(fwd.start); // ui(왼쪽) → svc(오른쪽)
    expect(back.end).toBeLessThan(back.start); // svc → ui
  });

  it('링크 자체는 화살촉 없는 선이다', () => {
    const link = html.match(/<path[^>]*data-bbangto-viz-communication-link[^>]*>/)?.[0] ?? '';
    expect(link).not.toBe('');
    expect(link).not.toMatch(/marker-end=/);
  });

  it('유형 축에서 VT-108(시퀀스 도식 — 별칭 communication)로 찾힌다', () => {
    expect(vizTypeRegistry.find((e) => e.id === 'VT-108')?.exportNames).toContain('CommunicationDiagram');
  });
});
