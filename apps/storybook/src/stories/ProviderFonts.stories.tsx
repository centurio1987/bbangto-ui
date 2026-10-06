import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'
import React from 'react'
import { FoundationProvider, StyleGuideProvider } from '@centurio1987/bbangto-ui-core'
import { VisualizationStyleGuideProvider } from '@centurio1987/bbangto-ui-visualization'
import { neobrutalismEditorialStyleGuide } from '@centurio1987/bbangto-ui-style-guide-catalog'
import { blueprintTechnical01VizStyleGuide } from '@centurio1987/bbangto-ui-visualization-style-guide-catalog'

// Provider가 외부 글꼴(CDN)을 몇 번 불러오는지 잰다. 전역 데코레이터의 Provider가 섞이면
// `fonts="none"` 의 0건을 확인할 수 없으므로 이 파일은 데코레이터를 끈다.
const FONT_SOURCES = {
  pretendard: 'cdn.jsdelivr.net/gh/orioncactus/pretendard',
  'jetbrains-mono': 'fonts.googleapis.com/css2?family=JetBrains+Mono',
} as const
type Font = keyof typeof FONT_SOURCES

/**
 * 글꼴 하나를 불러오는 노드를 `document` 전체에서 모은다.
 * 고치기 전 코드는 렌더 트리 안 `<style>@import …</style>` 을, 고친 코드는
 * `#bbangto-font-<글꼴>` 노드를 만든다. 둘 다 세야 전후를 같은 잣대로 본다(같은 노드는 한 번).
 */
function fontNodes(font: Font): Element[] {
  const src = FONT_SOURCES[font]
  const hits = new Set<Element>()
  document.querySelectorAll(`#bbangto-font-${font}`).forEach((el) => hits.add(el))
  document.querySelectorAll('style').forEach((el) => {
    const text = el.textContent ?? ''
    if (text.includes('@import') && text.includes(src)) hits.add(el)
  })
  document.querySelectorAll('link[rel="stylesheet"]').forEach((el) => {
    if ((el.getAttribute('href') ?? '').includes(src)) hits.add(el)
  })
  return [...hits]
}

// head 에 주입된 글꼴 노드는 언마운트해도 남는다(문서 전역에서 나눠 쓰므로). 앞 스토리가 남긴
// 노드를 지워야 스토리마다 독립적으로 센다. 렌더 트리 안 노드는 React 소유라 건드리지 않는다.
function clearInjectedFonts() {
  for (const font of Object.keys(FONT_SOURCES) as Font[]) {
    for (const el of fontNodes(font)) {
      if (el.parentElement === document.head) el.remove()
    }
  }
}

async function expectFontCount(canvasElement: HTMLElement, counts: Record<Font, number>) {
  await within(canvasElement).findByTestId('fonts-content')
  await expect(fontNodes('pretendard')).toHaveLength(counts.pretendard)
  await expect(fontNodes('jetbrains-mono')).toHaveLength(counts['jetbrains-mono'])
}

const Content = () => <div data-testid="fonts-content">글꼴 주입 확인</div>

const meta = {
  title: 'ARCHETYPE/Foundations/Provider Fonts',
  parameters: { layout: 'padded', bbangtoProviders: false },
  beforeEach: () => {
    clearInjectedFonts()
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FoundationFontsNone: Story = {
  render: () => (
    <FoundationProvider fonts="none">
      <Content />
    </FoundationProvider>
  ),
  play: async ({ canvasElement }) => {
    await expectFontCount(canvasElement, { pretendard: 0, 'jetbrains-mono': 0 })
  },
}

export const StyleGuideFontsNone: Story = {
  render: () => (
    <StyleGuideProvider styleGuide={neobrutalismEditorialStyleGuide} fonts="none">
      <Content />
    </StyleGuideProvider>
  ),
  play: async ({ canvasElement }) => {
    await expectFontCount(canvasElement, { pretendard: 0, 'jetbrains-mono': 0 })
  },
}

// 기본값은 지금과 같아야 한다 — 고치기 전에도 초록인 회귀 가드다.
export const FoundationFontsDefault: Story = {
  render: () => (
    <FoundationProvider>
      <Content />
    </FoundationProvider>
  ),
  play: async ({ canvasElement }) => {
    await expectFontCount(canvasElement, { pretendard: 1, 'jetbrains-mono': 1 })
  },
}

export const CoreProvidersNested: Story = {
  render: () => (
    <FoundationProvider>
      <StyleGuideProvider styleGuide={neobrutalismEditorialStyleGuide}>
        <Content />
      </StyleGuideProvider>
    </FoundationProvider>
  ),
  play: async ({ canvasElement }) => {
    await expectFontCount(canvasElement, { pretendard: 1, 'jetbrains-mono': 1 })
  },
}

// 전역 데코레이터와 같은 모양 — core 안 viz. 두 패키지는 코드를 나누지 않으므로
// 같은 DOM id 로만 중복이 막힌다.
export const VizInsideCore: Story = {
  render: () => (
    <FoundationProvider>
      <VisualizationStyleGuideProvider styleGuide={blueprintTechnical01VizStyleGuide}>
        <Content />
      </VisualizationStyleGuideProvider>
    </FoundationProvider>
  ),
  play: async ({ canvasElement }) => {
    await expectFontCount(canvasElement, { pretendard: 1, 'jetbrains-mono': 1 })
  },
}

export const VizInsideCoreFontsNone: Story = {
  render: () => (
    <FoundationProvider fonts="none">
      <VisualizationStyleGuideProvider styleGuide={blueprintTechnical01VizStyleGuide} fonts="none">
        <Content />
      </VisualizationStyleGuideProvider>
    </FoundationProvider>
  ),
  play: async ({ canvasElement }) => {
    await expectFontCount(canvasElement, { pretendard: 0, 'jetbrains-mono': 0 })
  },
}
