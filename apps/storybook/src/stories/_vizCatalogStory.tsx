import React, { type ReactNode } from 'react';
import type { StoryObj } from '@storybook/react';
import {
  Canvas,
  Node,
  Tag,
  EdgeLabel,
  VisualizationStyleGuideProvider,
  resolveVizFoundationPreset,
  type VisualizationStyleGuide,
} from '@centurio1987/bbangto-ui-visualization';
import { vizStyleGuideMap } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog';
import { contrastRatio } from '@centurio1987/bbangto-ui-tokens';
import { expect } from 'storybook/test';

/**
 * VISUALIZATION STYLE GUIDE CATALOG 공용 스토리 팩토리.
 * ORDER 요구 5-leaf: Foundations / Wrapper Components / Guideline / Visual Motif /
 * Foundation Presets. 각 preset 스토리 파일은 이 팩토리를 호출해 named export를 펼친다.
 * play 게이트는 core 카탈로그 `_catalogStory.tsx`의 규칙을 viz 토큰으로 포팅했다.
 */

// 개인정보/레거시 브랜드 회귀 가드 — core 카탈로그와 동일 목록.
const FORBIDDEN_PRIVACY = [
  'centurio', 'ghkdldjwls', 'gmail.com', 'naver.com', 'github.io',
  '+82', '1026411626', 'lync', '크로노', '풀무간',
];
const FORBIDDEN_LEGACY = ['빵토', 'bbangto bakery', 'est. 2019'];
const FORBIDDEN = [...FORBIDDEN_PRIVACY, ...FORBIDDEN_LEGACY];

type Story = StoryObj<{ foundationKey?: string }>;

function DocShell({
  sg,
  foundationKey,
  children,
}: {
  sg: VisualizationStyleGuide;
  foundationKey?: string;
  children: ReactNode;
}) {
  return (
    <VisualizationStyleGuideProvider
      styleGuide={sg}
      foundationKey={foundationKey}
      style={{ padding: 24, minHeight: '60vh' }}
    >
      {children}
    </VisualizationStyleGuideProvider>
  );
}

function Swatch({ label, color }: { label: string; color: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontFamily: 'monospace' }}>
      <span
        data-viz-doc-swatch={label}
        style={{ width: 28, height: 28, borderRadius: 6, background: color, border: '1px solid rgba(0,0,0,0.25)', display: 'inline-block' }}
      />
      <span>{label}</span>
      <code>{color}</code>
    </div>
  );
}

function SectionH({ children }: { children: ReactNode }) {
  return <h3 style={{ margin: '20px 0 8px', fontSize: 15 }}>{children}</h3>;
}

function GuidelineSection({ name, data }: { name: string; data: Record<string, unknown> }) {
  return (
    <section data-viz-doc-guideline={name} style={{ marginBottom: 16 }}>
      <SectionH>{name}</SectionH>
      {typeof data.summary === 'string' && <p style={{ margin: '4px 0', fontSize: 13 }}>{data.summary}</p>}
      {Array.isArray(data.dos) && (
        <ul style={{ fontSize: 13 }}>
          {data.dos.map((d, i) => (
            <li key={i}>✅ {String(d)}</li>
          ))}
        </ul>
      )}
      {Array.isArray(data.donts) && (
        <ul style={{ fontSize: 13 }}>
          {data.donts.map((d, i) => (
            <li key={i}>🚫 {String(d)}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

async function expectNoForbiddenTokens(root: HTMLElement): Promise<void> {
  const text = (root.textContent ?? '').toLowerCase();
  for (const token of FORBIDDEN) {
    await expect(text.includes(token.toLowerCase())).toBe(false);
  }
  for (const a of Array.from(root.querySelectorAll('a[href]'))) {
    const href = (a.getAttribute('href') ?? '').toLowerCase();
    for (const token of FORBIDDEN) {
      await expect(href.includes(token.toLowerCase())).toBe(false);
    }
  }
}

const SNAPSHOT_PATHS = (f: VisualizationStyleGuide['foundations']) => [
  f.canvas.bg,
  f.node.person.fill,
  f.edge.stroke,
  f.palette.p1,
  f.boundary.stroke,
];

export interface VizCatalogStoryOptions {
  /** WrapperComponents play 말미에 실행되는 가이드 전용 추가 게이트 (예: Neon 그라디언트 defs 검증). */
  wrapperExtraPlay?: (canvasElement: HTMLElement) => Promise<void>;
}

export function makeVizCatalogStories(
  sg: VisualizationStyleGuide,
  opts?: VizCatalogStoryOptions,
): Record<string, Story> {
  const kinds = Object.keys(sg.foundations.node) as Array<keyof typeof sg.foundations.node>;

  const Foundations: Story = {
    render: () => (
      <DocShell sg={sg}>
        <h2 style={{ margin: 0 }}>{sg.name} — Foundations</h2>
        <SectionH>Canvas</SectionH>
        <Swatch label="canvas.bg" color={sg.foundations.canvas.bg} />
        <Swatch label="canvas.grid" color={sg.foundations.canvas.grid} />
        <SectionH>Palette</SectionH>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))', gap: 8 }}>
          {Object.entries(sg.foundations.palette).map(([k, v]) => (
            <Swatch key={k} label={`palette.${k}`} color={v} />
          ))}
        </div>
        <SectionH>Node semantics</SectionH>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(160px, 1fr))', gap: 8 }}>
          {kinds.map((k) => (
            <Swatch key={String(k)} label={`node.${String(k)}.fill`} color={sg.foundations.node[k].fill} />
          ))}
        </div>
        <SectionH>Edge / Boundary</SectionH>
        <Swatch label="edge.stroke" color={sg.foundations.edge.stroke} />
        <Swatch label="boundary.stroke" color={sg.foundations.boundary.stroke} />
        <p style={{ fontSize: 12, fontFamily: 'monospace' }}>
          edge.width={sg.foundations.edge.width} / shape.strokeWidth={sg.foundations.shape.strokeWidth} /
          titleFont={sg.foundations.typography.titleFont}
        </p>
      </DocShell>
    ),
    play: async ({ canvasElement }) => {
      // 1. Provider 루트 + viz var 주입
      const root = canvasElement.querySelector<HTMLElement>(`[data-bbangto-viz-style-guide="${sg.name}"]`);
      await expect(root).not.toBeNull();
      const style = getComputedStyle(root!);
      await expect(style.getPropertyValue('--bbangto-viz-canvas-bg').trim()).not.toBe('');
      await expect(style.getPropertyValue('--bbangto-viz-shape-stroke').trim()).not.toBe('');

      // 2. 카탈로그 맵 정합 — 단일 출처
      await expect(vizStyleGuideMap[sg.name]).toBe(sg);

      // 3. 잉크-캔버스 대비: 텍스트 4.5:1, 비텍스트(엣지) 3:1
      const inkVsBg = contrastRatio(sg.foundations.shape.stroke, sg.foundations.canvas.bg);
      await expect(inkVsBg).not.toBeNull();
      await expect(inkVsBg!).toBeGreaterThanOrEqual(4.5);
      const edgeVsBg = contrastRatio(sg.foundations.edge.stroke, sg.foundations.canvas.bg);
      await expect(edgeVsBg!).toBeGreaterThanOrEqual(3.0);

      // 4. 채운 시맨틱 fill 위 tagColor 대비 4.5:1 (fill이 hex인 kind만)
      for (const k of kinds) {
        const { fill, tagColor } = sg.foundations.node[k];
        const ratio = contrastRatio(tagColor, fill);
        if (ratio != null) {
          await expect(ratio).toBeGreaterThanOrEqual(4.5);
        }
      }

      await expectNoForbiddenTokens(canvasElement);
    },
  };

  const WrapperComponents: Story = {
    render: () => {
      const W = sg.wrapperComponents ?? {};
      const WNode = (W.Node ?? Node) as typeof Node;
      const WTag = (W.Tag ?? Tag) as typeof Tag;
      const WEdgeLabel = (W.EdgeLabel ?? EdgeLabel) as typeof EdgeLabel;
      return (
        <DocShell sg={sg}>
          <h2 style={{ margin: 0 }}>{sg.name} — Wrapper Components</h2>
          <Canvas viewBox="0 0 560 180" width={560} height={180} title="Wrapper components demo">
            <WNode id="w1" x={24} y={40} width={140} height={80} shape="rounded" />
            <WNode id="w2" x={220} y={40} width={140} height={80} shape="stadium" fill={sg.foundations.node.person.fill} />
            <WTag x={94} y={140} label="person" />
            <WEdgeLabel x={290} y={150} label="wraps()" />
          </Canvas>
        </DocShell>
      );
    },
    play: async ({ canvasElement }) => {
      // wrapper 키와 visualMotif.components 키 패리티
      const wrapperKeys = Object.keys(sg.wrapperComponents ?? {}).sort();
      const motifKeys = Object.keys(sg.visualMotif?.components ?? {}).sort();
      await expect(wrapperKeys.length).toBeGreaterThan(0);
      await expect(wrapperKeys).toEqual(motifKeys);
      // 렌더 확인
      await expect(canvasElement.querySelectorAll('[data-bbangto-viz-node]').length).toBeGreaterThanOrEqual(2);
      if (opts?.wrapperExtraPlay) {
        await opts.wrapperExtraPlay(canvasElement);
      }
      await expectNoForbiddenTokens(canvasElement);
    },
  };

  const Guideline: Story = {
    render: () => (
      <DocShell sg={sg}>
        <h2 style={{ margin: 0 }}>{sg.name} — Guideline</h2>
        {Object.entries(sg.guidelines ?? {}).map(([name, data]) => (
          <GuidelineSection key={name} name={name} data={data} />
        ))}
      </DocShell>
    ),
    play: async ({ canvasElement }) => {
      const sections = canvasElement.querySelectorAll('[data-viz-doc-guideline]');
      await expect(sections.length).toBeGreaterThanOrEqual(3);
      // accessibility 가이드는 필수
      await expect(canvasElement.querySelector('[data-viz-doc-guideline="accessibility"]')).not.toBeNull();
      await expectNoForbiddenTokens(canvasElement);
    },
  };

  const VisualMotif: Story = {
    render: () => {
      const Example = sg.visualMotif?.example;
      return (
        <DocShell sg={sg}>
          <h2 style={{ margin: 0 }}>{sg.name} — Visual Motif</h2>
          <p style={{ fontSize: 13 }}>{sg.visualMotif?.summary}</p>
          {Object.entries(sg.visualMotif?.components ?? {}).map(([name, spec]) => (
            <section key={name} data-viz-doc-motif-spec={name} style={{ marginBottom: 12 }}>
              <SectionH>{name}</SectionH>
              <p style={{ fontSize: 13 }}>{spec.description}</p>
              <ul style={{ fontSize: 12, fontFamily: 'monospace' }}>
                {spec.specs.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          ))}
          <SectionH>Example</SectionH>
          {Example && <Example />}
        </DocShell>
      );
    },
    play: async ({ canvasElement }) => {
      // motif 문서 완결성
      await expect(sg.visualMotif?.summary?.length ?? 0).toBeGreaterThan(0);
      const specs = canvasElement.querySelectorAll('[data-viz-doc-motif-spec]');
      await expect(specs.length).toBe(Object.keys(sg.visualMotif?.components ?? {}).length);

      // example 쇼케이스: 접근 가능한 svg 다이어그램 3섹션
      const showcase = canvasElement.querySelector('[data-viz-showcase]');
      await expect(showcase).not.toBeNull();
      const svgs = showcase!.querySelectorAll('svg[role="img"]');
      await expect(svgs.length).toBeGreaterThanOrEqual(3);
      await expect(showcase!.querySelector('[data-viz-showcase-section="architecture"]')).not.toBeNull();
      await expect(showcase!.querySelector('[data-bbangto-viz-pattern="process-steps"]')).not.toBeNull();
      await expect(showcase!.querySelector('[data-bbangto-viz-pattern="statistics"]')).not.toBeNull();

      // patterns 등록 + extendedFoundations 존재
      await expect(Object.keys(sg.patterns ?? {}).length).toBeGreaterThan(0);
      await expect(Object.keys(sg.extendedFoundations ?? {}).length).toBeGreaterThan(0);

      await expectNoForbiddenTokens(canvasElement);
    },
  };

  const FoundationPresets: Story = {
    render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {(sg.foundationPresets ?? []).map((p) => (
          <DocShell key={p.key} sg={sg} foundationKey={p.key}>
            <h3 style={{ margin: 0 }}>
              {p.key} — {p.label}
            </h3>
            <Canvas viewBox="0 0 480 120" width={480} height={120} title={`Preset ${p.key}`}>
              <Node id={`p-${p.key}-1`} x={16} y={24} width={130} height={70} shape="rounded" />
              <Node
                id={`p-${p.key}-2`}
                x={320}
                y={24}
                width={130}
                height={70}
                shape="stadium"
                fill={p.foundations.node.person.fill}
              />
            </Canvas>
          </DocShell>
        ))}
      </div>
    ),
    play: async ({ canvasElement }) => {
      const presets = sg.foundationPresets ?? [];
      // ≥2 preset + key 유일성
      await expect(presets.length).toBeGreaterThanOrEqual(2);
      const keys = presets.map((p) => p.key);
      await expect(new Set(keys).size).toBe(keys.length);

      // 첫 preset foundations는 base와 동일 객체 참조(드리프트 가드)
      await expect(presets[0].foundations).toBe(sg.foundations);

      // 스냅샷 유니크: 5개 색 조합이 preset 간 서로 달라야 함
      const snapshots = presets.map((p) => SNAPSHOT_PATHS(p.foundations).join('|'));
      await expect(new Set(snapshots).size).toBe(snapshots.length);

      // 색 스킴 전용 불변식: 비색상 토큰은 base와 동일
      for (const p of presets) {
        await expect(p.foundations.typography).toEqual(sg.foundations.typography);
        await expect(p.foundations.spacing).toEqual(sg.foundations.spacing);
        await expect(p.foundations.canvas.gridUnit).toBe(sg.foundations.canvas.gridUnit);
        await expect(p.foundations.edge.width).toBe(sg.foundations.edge.width);
        await expect(p.foundations.shape.strokeWidth).toBe(sg.foundations.shape.strokeWidth);
        await expect(p.foundations.boundary.radius).toBe(sg.foundations.boundary.radius);

        // preset별 잉크-캔버스 대비 4.5:1
        const ratio = contrastRatio(p.foundations.shape.stroke, p.foundations.canvas.bg);
        await expect(ratio).not.toBeNull();
        await expect(ratio!).toBeGreaterThanOrEqual(4.5);
      }

      // 해석 규칙: 미지정 → 기본, 잘못된 키 → 기본 폴백
      const def = resolveVizFoundationPreset(sg);
      await expect(def.foundations).toBe(sg.foundations);
      const bad = resolveVizFoundationPreset(sg, '__nonexistent__');
      await expect(bad.activeKey).toBe(sg.defaultFoundationKey ?? presets[0].key);

      // DOM: preset 수만큼 provider 루트가 각자 foundation 속성으로 렌더
      for (const p of presets) {
        await expect(
          canvasElement.querySelector(`[data-bbangto-viz-foundation="${p.key}"]`),
        ).not.toBeNull();
      }

      await expectNoForbiddenTokens(canvasElement);
    },
  };

  return { Foundations, WrapperComponents, Guideline, VisualMotif, FoundationPresets };
}
