import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor } from 'storybook/test';
import { coreStaticStyles, StyleGuideProvider, type StaticStyle } from '@centurio1987/bbangto-ui-core';
import { motifStylesOf, styleGuideCatalog } from '@centurio1987/bbangto-ui-style-guide-catalog';
import {
  Canvas,
  Node,
  VisualizationStyleGuideProvider,
  useVizWrapperComponent,
  vizStaticStyles,
  type NodeProps,
} from '@centurio1987/bbangto-ui-visualization';
import { vizMotifStylesOf, vizStyleGuideCatalog, vizStyleGuideMap } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';

/**
 * KAN-081 — 정적 렌더용 스타일 목록이 런타임 주입과 같은가.
 *
 * 서버 렌더(`renderToStaticMarkup`)는 insertion effect · effect 를 안 돌려 `<head>` 에 시트가 안 들어간다. 그래서 네 패키지가
 * 그 시트를 `{ id, css }` 목록으로 낸다(`coreStaticStyles` · `vizStaticStyles` · `motifStylesOf` · `vizMotifStylesOf`).
 * 여기서는 ① 카탈로그 전 preset 을 실제로 그려 런타임이 넣은 bbangto `<style>` 마다 목록에 같은 id · 같은 css 가 있는지,
 * ② 목록의 시트가 전부 실제로 들어갔는지, ③ 서버 렌더 마크업에 목록만 깔면 도형이 칠해지는지를 본다.
 */
const meta: Meta = { title: 'Infra/Static Styles' };
export default meta;

function VizNode() {
  const W = useVizWrapperComponent<NodeProps>('Node', Node);
  return <W x={4} y={4} width={40} height={24} />;
}

function AllPresets() {
  return (
    <div>
      {styleGuideCatalog.map((sg) => {
        const Card = sg.wrapperComponents?.Card;
        const Button = sg.wrapperComponents?.Button;
        return (
          <StyleGuideProvider key={sg.name} styleGuide={sg} fonts="none">
            {Card && <Card padding="sm">{sg.name}</Card>}
            {Button && <Button size="sm">{sg.name}</Button>}
          </StyleGuideProvider>
        );
      })}
      {vizStyleGuideCatalog.map((g) => (
        <VisualizationStyleGuideProvider key={g.name} styleGuide={g} fonts="none">
          <Canvas width={48} height={32}>
            <VizNode />
          </Canvas>
        </VisualizationStyleGuideProvider>
      ))}
    </div>
  );
}

const expected = (): StaticStyle[] => [
  ...coreStaticStyles(),
  ...vizStaticStyles(),
  ...styleGuideCatalog.flatMap((sg) => motifStylesOf(sg)),
  ...vizStyleGuideCatalog.flatMap((g) => vizMotifStylesOf(g)),
];

export const RuntimeMatchesExport: StoryObj = {
  render: () => <AllPresets />,
  play: async () => {
    const want = new Map(expected().map((s) => [s.id, s.css]));
    // 모티프 시트는 useEffect 로 들어간다 — 목록의 시트가 다 들어올 때까지 기다린다.
    await waitFor(() => {
      for (const id of want.keys()) expect(document.getElementById(id), id).not.toBeNull();
    });
    const injected = Array.from(document.head.querySelectorAll<HTMLStyleElement>('style[id^="bbangto-"]'))
      // 바깥 글꼴(@import)은 fonts="none" 으로 끄지만 다른 스토리가 켰을 수 있다 — 정적 렌더 대상이 아니다.
      .filter((el) => !el.id.startsWith('bbangto-font-'));
    for (const el of injected) {
      expect(want.has(el.id), `런타임이 넣었는데 목록에 없다: ${el.id}`).toBe(true);
      expect(el.textContent, el.id).toBe(want.get(el.id));
    }
  },
};

export const ServerMarkupPaintsWithExport: StoryObj = {
  render: () => <p>서버 렌더 + 목록 → iframe 에서 칠해지는지 본다</p>,
  play: async ({ canvasElement }) => {
    const guide = vizStyleGuideMap['editorial-data-01'];
    const markup = renderToStaticMarkup(
      <VisualizationStyleGuideProvider styleGuide={guide} fonts="none">
        <Canvas width={48} height={32}>
          <Node x={4} y={4} width={40} height={24} />
        </Canvas>
      </VisualizationStyleGuideProvider>,
    );
    const fillIn = (styles: StaticStyle[]) => {
      const frame = document.createElement('iframe');
      canvasElement.appendChild(frame);
      const doc = frame.contentDocument!;
      doc.open();
      doc.write(`<!doctype html><html><head>${styles.map((s) => `<style id="${s.id}">${s.css}</style>`).join('')}</head><body>${markup}</body></html>`);
      doc.close();
      const shape = doc.querySelector('[data-viz-part="shape"]')!;
      return frame.contentWindow!.getComputedStyle(shape).fill;
    };
    // 목록 없이는 브라우저 기본값(검정)이고, 목록을 깔면 가이드의 shape.fill(#FFFFFF)이 칠해진다.
    expect(fillIn([])).toBe('rgb(0, 0, 0)');
    expect(fillIn([...vizStaticStyles(), ...vizMotifStylesOf(guide)])).toBe('rgb(255, 255, 255)');
  },
};
