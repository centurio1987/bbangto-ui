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
 */
export interface VizShowcaseConfig {
  displayName: string;
  wrappers?: VizWrapperComponents;
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

export function makeVizShowcase({ displayName }: VizShowcaseConfig): React.FC {
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
      </div>
    );
  }
  Showcase.displayName = displayName;
  return Showcase;
}
