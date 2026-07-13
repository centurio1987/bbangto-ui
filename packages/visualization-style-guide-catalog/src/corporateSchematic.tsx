import type {
  VisualizationFoundation,
  VizFoundationPreset,
} from '@centurio1987/bbangto-ui-tokens';
import {
  Node,
  Tag,
  EdgeLabel,
  vvar,
  type NodeProps,
  type TagProps,
  type EdgeLabelProps,
  type VisualizationStyleGuide,
  type VizWrapperComponents,
} from '@centurio1987/bbangto-ui-visualization';
import { makeVizColorway } from './_foundation';
import { makeVizShowcase } from './_showcase';

/**
 * Corporate_Schematic_01 — 기업 도식 언어(클라우드 아키텍처/IA/UML 계열).
 * 근거: F2 Corporate_Schematic 배정 24장(style-classification.md — 최대 패밀리).
 * 흰 바탕 + 중립 헤어라인 1.25px + kind별 플랫 액센트 타일 + 대시 존 경계 +
 * orthogonal 소형 화살촉. 액센트 타일 hex는 브랜드 무관 중립 조정값
 * (AWS #ED7100 / Azure #0078D4 등 브랜드 hex·아이콘 사용 금지 — 카탈로그 규칙).
 */

const INK = '#4A4A4A';
const HAIRLINE = 1.25;

// kind별 tagColor 혼용이 핵심 — 오렌지·그린 타일은 다크 텍스트(흰색은 4.5:1 미달 실측),
// 블루·퍼플 타일은 흰 텍스트, 파스텔 컨테이너는 잉크 텍스트.
const node = (fill: string, tagColor: string, glyph: string, dashed?: boolean) => ({
  fill,
  keyline: INK,
  keylineWidth: HAIRLINE,
  tagColor,
  ...(dashed ? { dashed: true } : {}),
  glyph,
});

const foundations: VisualizationFoundation = {
  name: 'corporate-schematic-01',

  canvas: {
    bg: '#FFFFFF',
    grid: '#EEF1F5',
    gridUnit: 8,
  },

  // 중립 액센트 타일 팔레트 — 오렌지/블루/그린/퍼플 계열.
  palette: {
    p1: '#E07A1F',
    p2: '#2D6FD1',
    p3: '#2E9E4A',
    p4: '#6B3FD1',
    p5: '#1F5FBF',
    p6: '#B45309',
    p7: '#4A4A4A',
    p8: '#D7DEE8',
  },

  shape: {
    fill: '#FFFFFF',
    stroke: INK,
    strokeWidth: HAIRLINE,
  },

  node: {
    person: node('#2D6FD1', '#FFFFFF', 'user'),
    external: node('#6B3FD1', '#FFFFFF', 'arrowOut', true),
    container: node('#EAF1FB', '#333333', 'stackedRect'),
    database: node('#1F5FBF', '#FFFFFF', 'cylinder'),
    queue: node('#E07A1F', '#1F1F1F', 'bars'),
    decision: node('#6B3FD1', '#FFFFFF', 'diamond'),
    process: node('#2E9E4A', '#1F1F1F', 'process'),
  },

  // orthogonal-elbow + 소형 화살촉(size 6) — F2 커넥터 문법.
  edge: {
    stroke: INK,
    width: HAIRLINE,
    dashPattern: '',
    cornerRadius: 4,
    marker: {
      size: 6,
      arrow: INK,
      diamond: INK,
      circle: INK,
      cross: INK,
    },
  },

  c4: {
    l1: { borderWidth: 2, bgTint: 'rgba(45,111,209,0.06)', labelColor: INK },
    l2: { borderWidth: 1.5, bgTint: 'rgba(45,111,209,0.04)', labelColor: INK },
    l3: { borderWidth: 1, bgTint: 'transparent', labelColor: INK },
  },

  // 대시 존 경계(AZ/subnet/스윔레인 문법).
  boundary: {
    stroke: '#7A8699',
    width: 1,
    dashPattern: '6 4',
    radius: 4,
    labelColor: '#4A5568',
  },

  typography: {
    titleFont: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    monoFont: "'JetBrains Mono', 'Courier New', monospace",
    titleWeight: 600,
    sizes: {
      title: '14px',
      label: '12px',
      tag: '10px',
      mono: '11px',
    },
  },

  iconStyle: 'fill',

  spacing: {
    nodePad: 12,
    laneGap: 24,
  },

  motion: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

/**
 * slide-dark — 다크 슬라이드 colorway (관측: system_colorful_05 #1B1B3A 위 고채도 타일).
 * tagColor는 override하지 않는다(kind별 혼용 유지) — 다크-태그 kind(queue/process/container)의
 * fill만 밝혀 기존 다크 텍스트 대비를 키운다(#F2913D ≈7.6, #4FBF73 ≈7.7, #DDE4F5 9.9).
 */
const slideDarkFoundations = makeVizColorway(foundations, {
  name: 'corporate-schematic-01-slide-dark',
  canvas: { bg: '#1B1B3A', grid: '#26264B' },
  ink: '#E4E7F0',
  shape: { fill: '#26264B' },
  nodeFills: {
    queue: '#F2913D',
    process: '#4FBF73',
    container: '#DDE4F5',
  },
  palette: { p1: '#F2913D', p3: '#4FBF73', p7: '#E4E7F0', p8: '#3A3A5E' },
  boundaryLabelColor: '#C9CDE0',
  c4Tints: ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.04)', 'transparent'],
});

const foundationPresets: readonly VizFoundationPreset[] = [
  {
    key: 'default',
    label: 'White Schematic',
    foundations,
    extendedFoundations: { '--bbangto-viz-ext-tile': '#E07A1F' },
  },
  {
    key: 'slide-dark',
    label: 'Slide Dark (Navy Ground)',
    foundations: slideDarkFoundations,
    extendedFoundations: { '--bbangto-viz-ext-tile': '#F2913D' },
  },
];

/** 흰 카드 + 좌상단 액센트 타일 배지 — "아이콘 타일 + 카드" F2 문법 (브랜드 아이콘 없이 중립 슬롯만). */
function CorporateNode(props: NodeProps) {
  return (
    <>
      <Node {...props} fill={props.fill ?? vvar('shape', 'fill')} strokeWidth={props.strokeWidth ?? HAIRLINE} />
      <rect
        x={props.x + 8}
        y={props.y + 8}
        width={14}
        height={14}
        rx={3}
        style={{ fill: vvar('ext', 'tile') }}
        data-viz-corporate-tile=""
      />
    </>
  );
}
CorporateNode.displayName = 'CorporateNode';

/** 소형 회색 태그 — 콘솔 문서의 리소스 타입 캡션 문법. */
function CorporateTag(props: TagProps) {
  return <Tag {...props} fontSize={9} fill={vvar('boundary', 'labelColor')} />;
}
CorporateTag.displayName = 'CorporateTag';

/** 캔버스 톤 칩 인라인 캡션 — 선 위에 얹히는 프로토콜/관계 라벨. */
function CorporateEdgeLabel(props: EdgeLabelProps) {
  return <EdgeLabel {...props} bgFill={vvar('canvas', 'bg')} padding={4} fontSize={10} />;
}
CorporateEdgeLabel.displayName = 'CorporateEdgeLabel';

const wrapperComponents: VizWrapperComponents = {
  Node: CorporateNode,
  Tag: CorporateTag,
  EdgeLabel: CorporateEdgeLabel,
};

const Showcase = makeVizShowcase({ displayName: 'CorporateSchematicShowcase' });

const guidelines: Record<string, Record<string, unknown>> = {
  surface: {
    summary: '흰/라이트 그라운드 위 1.25px 중립 헤어라인. 존 구획은 대시 경계 + 옅은 파스텔 틴트.',
    dos: ['orthogonal-elbow 라우팅 + 소형 화살촉', '존 경계는 대시(6 4) + 코너 라벨', '컨테이너 틴트는 6% 이하'],
    donts: ['그림자/그라디언트 금지', '헤어라인 1.5px 초과 금지'],
  },
  color: {
    summary: '시맨틱은 플랫 액센트 타일(오렌지/블루/그린/퍼플) — 브랜드 무관 중립 조정값만.',
    dos: ['kind별 타일 색을 일관 유지', '강조는 타일 색, 구조는 중립 잉크'],
    donts: ['AWS/Azure 등 브랜드 hex(#ED7100/#0078D4)·브랜드 아이콘 사용 금지', '타일 색을 텍스트 색으로 전용 금지'],
  },
  typography: {
    summary: '균일 휴머니스트 산스 — 라벨 12px/태그 10px, 위계는 굵기(600)로만.',
    dos: ['라벨은 균일 크기', '리소스 타입은 소형 회색 태그로'],
    donts: ['장식 서체 금지', '과대 제목(20px+) 금지 — 슬라이드가 아니라 도식'],
  },
  accessibility: {
    summary: '타일 위 텍스트는 kind별 혼용 — 오렌지·그린 타일은 다크 텍스트(흰색 4.5:1 미달 실측), 블루·퍼플은 흰 텍스트.',
    dos: ['오렌지(#E07A1F)·그린(#2E9E4A) 타일 위는 #1F1F1F 텍스트', '대시 경계선도 캔버스 대비 3:1 확보'],
    donts: ['오렌지/그린 타일 위 흰 텍스트 금지(3.01/3.44 실측 미달)', '색 단독으로 존 구분 금지 — 대시 패턴 병행'],
  },
};

export const corporateSchematic01VizStyleGuide: VisualizationStyleGuide = {
  name: 'corporate-schematic-01',
  description:
    'Corporate cloud-schematic language — white ground, neutral hairlines, flat vendor-neutral accent tiles, dashed zone boundaries.',
  foundations,
  extendedFoundations: { '--bbangto-viz-ext-tile': '#E07A1F' },
  foundationPresets,
  defaultFoundationKey: 'default',
  wrapperComponents,
  patterns: { CorporateSchematicShowcase: Showcase },
  guidelines,
  visualMotif: {
    summary:
      '기업 도식 모티프 — 흰 카드 + 좌상단 액센트 타일 배지, 중립 헤어라인, 대시 존 경계, 소형 화살촉 orthogonal 커넥터.',
    components: {
      Node: {
        description: '본체는 카드(캔버스 계열 fill + 헤어라인), 좌상단 14×14 액센트 타일이 시맨틱을 표시한다 — 브랜드 아이콘 없는 중립 슬롯.',
        specs: ['카드 fill = shape.fill', '타일 14×14 rx3 = ext-tile', 'keyline 1.25px'],
      },
      Tag: {
        description: '리소스 타입 캡션은 소형 회색 태그 — 본문보다 한 단계 낮은 위계.',
        specs: ['9px', 'boundary.labelColor 상속', '소문자 유지'],
      },
      EdgeLabel: {
        description: '커넥터 라벨은 캔버스 톤 칩으로 선을 끊고 얹힌다 — 프로토콜/관계 표기.',
        specs: ['bg = canvas.bg', '패딩 4px', '10px'],
      },
    },
    example: Showcase,
  },
};
