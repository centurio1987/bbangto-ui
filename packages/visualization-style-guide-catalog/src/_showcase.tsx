import React from 'react';
import {
  Canvas,
  Edge,
  PersonNode,
  ContainerNode,
  DatabaseNode,
  ProcessSteps,
  Statistics,
  vvar,
  type VizWrapperComponents,
} from '@centurio1987/bbangto-ui-visualization';

/**
 * visualMotif.example용 합성 쇼케이스 — 미니 아키텍처 다이어그램 + ProcessSteps +
 * Statistics를 한 화면에 조립한다. 콘텐츠는 전부 가상(fictional)이며 개인정보/브랜드
 * 카피를 포함하지 않는다. wrapper가 정의된 컴포넌트(Node 등)는 wrapper로 렌더된다.
 *
 * **이것은 paint(스타일) 축 데모다.** 30종 가이드의 색·서체·선을 같은 그림으로 비교하려고 유형을 몇 종만 쓴다.
 * 그런데 이 쇼케이스가 소비자가 라이브러리를 **눈으로 만나는 유일한 표면**이라, 여기 그려진 것이
 * "이 라이브러리로 그릴 수 있는 것"의 전부로 읽히는 오독이 실제로 일어났다(상류 리포트 I7 — 어느 소비자는
 * 이 화면을 PDF로 구워 유형 카탈로그 정본으로 삼았고, 87종 중 4종만 쓰게 됐다).
 * 그래서 렌더 하단에 역할을 밝히는 캡션을 기본으로 붙인다(`note: false`로 끌 수 있다).
 */
export interface VizShowcaseConfig {
  displayName: string;
  wrappers?: VizWrapperComponents;
  /** 하단 역할 캡션. 기본 true — 끄면 유형 카탈로그로 오독될 여지가 그대로 남는다. */
  note?: boolean;
}

const SHOWCASE_STEPS = [
  { title: 'Ingest', description: 'Collect events' },
  { title: 'Process', description: 'Normalize + enrich' },
  { title: 'Serve', description: 'Query API' },
];

const SHOWCASE_STATS = [
  { label: 'Throughput', value: 42, unit: 'k/s', delta: 3.2 },
  { label: 'Latency', value: 18, unit: 'ms', delta: -2.4 },
  { label: 'Uptime', value: 99.9, unit: '%' },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        margin: '0 0 8px',
        fontFamily: vvar('typography', 'titleFont'),
        fontSize: 14,
        fontWeight: 700,
        color: vvar('shape', 'stroke'),
      }}
    >
      {children}
    </h3>
  );
}

function ScopeNote() {
  return (
    <p
      data-viz-showcase-note
      style={{
        margin: 0,
        // 한국어 문장이라 titleFont로 고정한다(labelFont는 optional 토큰이라 미정의일 수 있다).
        fontFamily: vvar('typography', 'titleFont'),
        fontSize: 11,
        lineHeight: 1.5,
        opacity: 0.7,
        color: vvar('shape', 'stroke'),
      }}
    >
      이 쇼케이스는 <strong>paint(스타일) 축 데모</strong>입니다 — 그릴 수 있는 그림의 목록이 아닙니다.
      유형은 87종이며 정본은 <code>@centurio1987/bbangto-ui-visualization</code>의{' '}
      <code>type.manifest.json</code> / <code>selectVizTypes()</code>입니다.
    </p>
  );
}

export function makeVizShowcase({ displayName, note = true }: VizShowcaseConfig): React.FC {
  function Showcase() {
    return (
      <div
        data-viz-showcase
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          padding: 24,
          background: vvar('canvas', 'bg'),
        }}
      >
        <section data-viz-showcase-section="architecture">
          <SectionTitle>Service Topology</SectionTitle>
          <Canvas viewBox="0 0 560 180" width={560} height={180} title="Sample service topology">
            <PersonNode id="user" x={16} y={40} width={120} height={100} title="Operator" tag="person" />
            <ContainerNode id="api" x={220} y={40} width={130} height={100} title="Query API" subtitle="REST" tag="container" />
            <DatabaseNode id="store" x={420} y={40} width={120} height={100} title="Event Store" tag="database" />
            <Edge from="user" to="api" markerEnd="arrow" />
            <Edge from="api" to="store" markerEnd="arrow" />
          </Canvas>
        </section>
        <section data-viz-showcase-section="process">
          <SectionTitle>Pipeline</SectionTitle>
          <ProcessSteps
            data={{ steps: SHOWCASE_STEPS }}
            viewBox="0 0 560 140"
            width={560}
            height={140}
            title="Sample pipeline steps"
          />
        </section>
        <section data-viz-showcase-section="statistics">
          <SectionTitle>Signals</SectionTitle>
          <Statistics
            data={{ items: SHOWCASE_STATS }}
            viewBox="0 0 560 170"
            width={560}
            height={170}
            title="Sample statistics"
          />
        </section>
        {note && <ScopeNote />}
      </div>
    );
  }
  Showcase.displayName = displayName;
  return Showcase;
}
