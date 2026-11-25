import { describe, it, expect } from 'vitest';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as viz from '../index';
import { vizTypeRegistry } from '../typeMeta';

// KAN-082.4 S13 — 객체 도식(UML Object Diagram). 원문 「코드베이스 내 인스턴스들의 역할 — 클래스 다이어그램(타입 수준),
// 객체 다이어그램(인스턴스 스냅샷)」. 인스턴스는 밑줄 친 「이름 : 클래스」 머리와 「속성 = 값」 슬롯 칸으로 그리고,
// 객체 사이 링크는 방향 없는 선이다. 유형 목록은 VT-101(클래스 도식)의 별칭 object diagram 으로 둔다.

const O = (viz as unknown as Record<string, React.ComponentType<{ data: unknown }> | undefined>).ObjectDiagram;

function textOf(html: string): string {
  return html.replace(/<[^>]*>/g, ' ');
}

describe('ObjectDiagram (KAN-082 .4)', () => {
  it('패키지가 낸다', () => {
    expect(typeof O).toBe('function');
  });

  const html = O
    ? renderToStaticMarkup(
        <O
          data={{
            objects: [
              { id: 'o1', x: 20, y: 20, width: 180, height: 90, name: 'order1', classifier: 'Order', slots: [{ name: 'status', value: 'PAID' }] },
              { id: 'c1', x: 320, y: 20, width: 180, height: 70, classifier: 'Customer' },
            ],
            links: [{ id: 'l1', from: 'c1', to: 'o1', label: 'places', fromLabel: 'buyer', toLabel: 'order' }],
          }}
        />,
      )
    : '';

  it('인스턴스 이름은 밑줄 친 「이름 : 클래스」, 이름이 없으면 「: 클래스」', () => {
    expect(html).toMatch(/text-decoration="underline"[^>]*>order1 : Order<\/text>/);
    expect(html).toMatch(/text-decoration="underline"[^>]*>: Customer<\/text>/);
  });

  it('슬롯은 「속성 = 값」 이고 연산 칸은 없다', () => {
    expect(textOf(html)).toContain('status = PAID');
    expect(html).not.toContain('data-bbangto-viz-class-section="methods"');
  });

  it('링크는 화살촉 없는 선이고 이름 · 역할 이름을 그린다', () => {
    const link = html.match(/<path[^>]*data-viz-part="connector"[^>]*>/)?.[0] ?? '';
    expect(link).not.toMatch(/marker-end=/);
    const t = textOf(html);
    for (const s of ['places', 'buyer', 'order']) expect({ s, has: t.includes(s) }).toEqual({ s, has: true });
  });

  it('유형 축에서 VT-101(클래스 도식 — 별칭 object diagram)로 찾힌다', () => {
    expect(vizTypeRegistry.find((e) => e.id === 'VT-101')?.exportNames).toContain('ObjectDiagram');
  });
});
