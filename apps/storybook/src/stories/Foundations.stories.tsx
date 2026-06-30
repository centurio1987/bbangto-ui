import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'
import React from 'react'
import {
  FoundationProvider,
  lightFoundation,
  darkFoundation,
  highContrastFoundation,
} from '@centurio1987/bbangto-ui-core'
import type { BbangtoFoundation } from '@centurio1987/bbangto-ui-tokens'

// 빌트인 base foundation 3종 — core 내장(light/dark/high-contrast). 전역 툴바로 전환되는
// 그 3종을 ARCHETYPE/Foundations에서 직접 들여다본다(확장 foundation은 FOUNDATION CATALOG).
const baseFoundations: Record<string, BbangtoFoundation> = {
  light: lightFoundation,
  dark: darkFoundation,
  'high-contrast': highContrastFoundation,
}

// ──────────────────────────────────────────
function ColorSwatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6, flexShrink: 0,
        backgroundColor: hex,
        border: '1px solid rgba(128,128,128,0.25)',
      }} />
      <div>
        <div style={{ fontSize: 11, opacity: 0.5 }}>{role}</div>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{name}</div>
        <div style={{ fontSize: 11, fontFamily: 'monospace', opacity: 0.7 }}>{hex}</div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────
interface BaseFoundationProps {
  foundation: string
  section: 'Overview' | 'Colors' | 'Typography' | 'Spacing' | 'Components'
}

function BaseFoundation({ foundation: slug, section }: BaseFoundationProps) {
  const foundation = baseFoundations[slug]

  if (!foundation) {
    return <div style={{ padding: 32, color: 'red' }}>Foundation not found: {slug}</div>
  }

  const bg = foundation.semantic.background.base
  const fg = foundation.semantic.foreground.base
  const containerStyle: React.CSSProperties = {
    backgroundColor: bg,
    color: fg,
    fontFamily: foundation.typography.fontFamily.sans,
    padding: 32,
    minHeight: '100vh',
    boxSizing: 'border-box',
  }

  return (
    <FoundationProvider foundation={foundation}>
      <div style={containerStyle} data-testid="foundation-root">
        {section === 'Overview' && (
          <div>
            <h1 style={{ margin: '0 0 8px', fontSize: 40, fontWeight: 700 }}>{foundation.name}</h1>
            <p style={{ margin: '0 0 32px', opacity: 0.7, fontSize: 16, maxWidth: 480 }}>
              {foundation.description}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              {[
                { label: 'Primary', hex: foundation.semantic.primary.base },
                { label: 'Background', hex: foundation.semantic.background.base },
                { label: 'Foreground', hex: foundation.semantic.foreground.base },
                { label: 'Error', hex: foundation.semantic.error.base },
                { label: 'Success', hex: foundation.semantic.success.base },
              ].map(({ label, hex }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: hex, border: '1px solid rgba(128,128,128,0.25)', marginBottom: 6 }} />
                  <div style={{ fontSize: 11, opacity: 0.6 }}>{label}</div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace' }}>{hex}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, opacity: 0.6 }}>
              <span>Sans: </span><code style={{ fontFamily: 'monospace' }}>{foundation.typography.fontFamily.sans}</code>
              <span style={{ marginLeft: 16 }}>Mono: </span><code style={{ fontFamily: 'monospace' }}>{foundation.typography.fontFamily.mono}</code>
            </div>
          </div>
        )}

        {section === 'Colors' && (
          <div>
            <h2 style={{ marginTop: 0 }}>Color Tokens</h2>
            {[
              { group: 'Primary', pairs: [
                ['primary.base', foundation.semantic.primary.base],
                ['primary.hover', foundation.semantic.primary.hover],
                ['primary.active', foundation.semantic.primary.active],
                ['primary.subtle', foundation.semantic.primary.subtle],
                ['primary.foreground', foundation.semantic.primary.foreground],
              ]},
              { group: 'Background', pairs: [
                ['background.base', foundation.semantic.background.base],
                ['background.elevated', foundation.semantic.background.elevated],
                ['background.sunken', foundation.semantic.background.sunken],
              ]},
              { group: 'Foreground', pairs: [
                ['foreground.base', foundation.semantic.foreground.base],
                ['foreground.muted', foundation.semantic.foreground.muted],
                ['foreground.subtle', foundation.semantic.foreground.subtle],
                ['foreground.inverse', foundation.semantic.foreground.inverse],
              ]},
              { group: 'Border', pairs: [
                ['border.base', foundation.semantic.border.base],
                ['border.muted', foundation.semantic.border.muted],
                ['border.strong', foundation.semantic.border.strong],
                ['border.focus', foundation.semantic.border.focus],
              ]},
              { group: 'Error', pairs: [
                ['error.base', foundation.semantic.error.base],
                ['error.hover', foundation.semantic.error.hover],
                ['error.subtle', foundation.semantic.error.subtle],
              ]},
              { group: 'Success', pairs: [
                ['success.base', foundation.semantic.success.base],
                ['success.hover', foundation.semantic.success.hover],
                ['success.subtle', foundation.semantic.success.subtle],
              ]},
              { group: 'Warning', pairs: [
                ['warning.base', foundation.semantic.warning.base],
                ['warning.hover', foundation.semantic.warning.hover],
                ['warning.subtle', foundation.semantic.warning.subtle],
              ]},
            ].map(({ group, pairs }) => (
              <div key={group} style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, opacity: 0.5, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 12px' }}>{group}</h3>
                {pairs.map(([name, hex]) => (
                  <ColorSwatch key={name} name={name} hex={hex || '#cccccc'} role={name} />
                ))}
              </div>
            ))}
          </div>
        )}

        {section === 'Typography' && (
          <div>
            <h2 style={{ marginTop: 0 }}>Typography Scale</h2>
            {(Object.entries(foundation.typography.scale) as [string, { fontSize: string; fontWeight: number; lineHeight: string; letterSpacing: string }][]).map(([level, spec]) => (
              <div key={level} style={{ marginBottom: 32, borderBottom: `1px solid ${foundation.semantic.border.muted}`, paddingBottom: 24 }}>
                <div style={{ fontSize: 11, opacity: 0.5, marginBottom: 8, fontFamily: 'monospace' }}>
                  {level} — {spec.fontSize} / {spec.fontWeight} / lh {spec.lineHeight}
                </div>
                <div style={{ fontSize: spec.fontSize, fontWeight: spec.fontWeight, lineHeight: spec.lineHeight, letterSpacing: spec.letterSpacing }}>
                  The quick brown fox
                </div>
              </div>
            ))}
          </div>
        )}

        {section === 'Spacing' && (
          <div>
            <h2 style={{ marginTop: 0 }}>Spacing Scale</h2>
            {(Object.entries(foundation.spacing) as [string, string][]).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 48, fontSize: 12, opacity: 0.5, textAlign: 'right', fontFamily: 'monospace' }}>{val}</div>
                <div style={{ height: 20, width: val, backgroundColor: foundation.semantic.primary.base, borderRadius: 2 }} />
                <div style={{ fontSize: 12, opacity: 0.7 }}>spacing.{key}</div>
              </div>
            ))}
            <h2 style={{ marginTop: 32 }}>Border Radius</h2>
            {(Object.entries(foundation.radius) as [string, string][]).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ width: 64, height: 32, backgroundColor: foundation.semantic.primary.base, borderRadius: val }} />
                <div style={{ fontSize: 13 }}>radius.{key} <code style={{ fontFamily: 'monospace', opacity: 0.7 }}>{val}</code></div>
              </div>
            ))}
          </div>
        )}

        {section === 'Components' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2 style={{ margin: 0 }}>Components</h2>
            <div>
              <h3 style={{ opacity: 0.5, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Button variants</h3>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <button style={{ padding: '8px 16px', backgroundColor: foundation.semantic.primary.base, color: foundation.semantic.primary.foreground, border: 'none', borderRadius: foundation.radius.md, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Primary</button>
                <button style={{ padding: '8px 16px', backgroundColor: 'transparent', color: foundation.semantic.primary.base, border: `1.5px solid ${foundation.semantic.primary.base}`, borderRadius: foundation.radius.md, cursor: 'pointer', fontSize: 14 }}>Outline</button>
                <button style={{ padding: '8px 16px', backgroundColor: foundation.semantic.error.base, color: foundation.semantic.error.foreground, border: 'none', borderRadius: foundation.radius.md, cursor: 'pointer', fontSize: 14 }}>Error</button>
                <button disabled style={{ padding: '8px 16px', backgroundColor: foundation.semantic.disabled.background, color: foundation.semantic.disabled.foreground, border: 'none', borderRadius: foundation.radius.md, cursor: 'not-allowed', fontSize: 14 }}>Disabled</button>
              </div>
            </div>
            <div>
              <h3 style={{ opacity: 0.5, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Card</h3>
              <div style={{ maxWidth: 320, backgroundColor: foundation.semantic.background.elevated, borderRadius: foundation.radius.lg, padding: 20, border: `1px solid ${foundation.semantic.border.base}`, boxShadow: foundation.shadow.sm }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Card Title</div>
                <div style={{ opacity: 0.7, fontSize: 14, lineHeight: 1.6 }}>This card uses the elevated background, border, and radius tokens from the foundation.</div>
              </div>
            </div>
            <div>
              <h3 style={{ opacity: 0.5, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Text scale</h3>
              {(['display', 'h1', 'h2', 'h3', 'body', 'meta'] as const).map(level => {
                const spec = foundation.typography.scale[level]
                return spec ? (
                  <div key={level} style={{ fontSize: spec.fontSize, fontWeight: spec.fontWeight, lineHeight: spec.lineHeight, marginBottom: 4 }}>
                    {level}: Sample text
                  </div>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </FoundationProvider>
  )
}

// ──────────────────────────────────────────
const meta: Meta<typeof BaseFoundation> = {
  title: 'ARCHETYPE/Foundations/Base',
  component: BaseFoundation,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    foundation: {
      control: 'select',
      options: ['light', 'dark', 'high-contrast'],
      description: 'Built-in base foundation (core 내장)',
    },
    section: {
      control: 'select',
      options: ['Overview', 'Colors', 'Typography', 'Spacing', 'Components'],
    },
  },
  args: {
    foundation: 'light',
    section: 'Overview',
  },
}

export default meta
type Story = StoryObj<typeof BaseFoundation>

export const Light: Story = {
  args: { foundation: 'light' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = await canvas.findByTestId('foundation-root')
    await expect(root).toBeTruthy()
    // FoundationProvider가 base foundation을 적용했는지(DOM attr) 검증.
    const fp = canvasElement.querySelector('[data-bbangto-foundation]')
    await expect(fp).not.toBeNull()
    await expect(fp!.getAttribute('data-bbangto-foundation')).toBeTruthy()
  },
}

export const Dark: Story = {
  args: { foundation: 'dark' },
}

export const HighContrast: Story = {
  name: 'High Contrast',
  args: { foundation: 'high-contrast' },
}

export const Colors: Story = {
  args: { foundation: 'light', section: 'Colors' },
}

export const Typography: Story = {
  args: { foundation: 'light', section: 'Typography' },
}

export const Spacing: Story = {
  args: { foundation: 'light', section: 'Spacing' },
}

export const Components: Story = {
  args: { foundation: 'light', section: 'Components' },
}
