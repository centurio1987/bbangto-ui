import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Canvas } from '../atoms/Canvas';
import { ClassBox } from './ClassBox';

// KAN-082.4 S12 — 빈 칸 숨기기(바깥 보고서 P9). UML 은 칸 억제를 허용한다 — 멤버를 적지 않은 칸은 그리지 않고,
// 그만큼 이름 칸이 커진다. 예전처럼 빈 칸까지 그리려면 showEmptyCompartments 를 켠다.

function sections(html: string): string[] {
  return [...html.matchAll(/data-bbangto-viz-class-section="([^"]+)"/g)].map((m) => m[1]);
}

/** 칸 사이 구분선 수 — 상자 안 가로선(<line>). 마커 정의(<defs>) 안의 선은 뺀다 */
function dividers(html: string): number {
  return (html.replace(/<defs>[\s\S]*?<\/defs>/g, '').match(/<line\b/g) ?? []).length;
}

function render(props: Partial<Parameters<typeof ClassBox>[0]>): string {
  return renderToStaticMarkup(
    <Canvas viewBox="0 0 220 200" width={220} height={200}>
      <ClassBox id="c" x={10} y={10} width={180} height={160} name="Aa" {...props} />
    </Canvas>,
  );
}

describe('ClassBox — 빈 칸 숨기기 (KAN-082 S12)', () => {
  it('속성 · 연산이 다 있으면 세 칸 · 구분선 둘 (예전과 같다)', () => {
    const html = render({ attributes: ['+ a: int'], methods: ['+ m(): void'] });
    expect(sections(html)).toEqual(['name', 'attributes', 'methods']);
    expect(dividers(html)).toBe(2);
  });

  it('연산이 비면 연산 칸을 그리지 않는다', () => {
    const html = render({ attributes: ['+ a: int'], methods: [] });
    expect(sections(html)).toEqual(['name', 'attributes']);
    expect(dividers(html)).toBe(1);
  });

  it('속성이 비면 속성 칸을 그리지 않는다', () => {
    const html = render({ attributes: [], methods: ['+ m(): void'] });
    expect(sections(html)).toEqual(['name', 'methods']);
    expect(dividers(html)).toBe(1);
  });

  it('둘 다 비면 이름 칸 하나이고 이름이 상자 가운데에 온다', () => {
    const html = render({});
    expect(sections(html)).toEqual(['name']);
    expect(dividers(html)).toBe(0);
    const y = Number(html.match(/<text[^>]*\by="([\d.]+)"[^>]*>Aa<\/text>/)?.[1]);
    expect(y).toBeCloseTo(10 + 160 / 2);
  });

  it('showEmptyCompartments 면 예전처럼 빈 칸까지 세 칸', () => {
    const html = render({ attributes: [], methods: [], showEmptyCompartments: true });
    expect(sections(html)).toEqual(['name', 'attributes', 'methods']);
    expect(dividers(html)).toBe(2);
  });

  it('nameUnderline 이면 이름에 밑줄을 긋는다(객체 도식의 「이름 : 클래스」)', () => {
    const html = render({ name: 'order1 : Order', nameUnderline: true });
    expect(html).toMatch(/<text[^>]*text-decoration="underline"[^>]*>order1 : Order<\/text>/);
  });
});
