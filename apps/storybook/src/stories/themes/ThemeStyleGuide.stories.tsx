import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'
import React from 'react'
import { ThemeProvider } from '@centurio1987/core'
import { themeMap } from '@centurio1987/themes-external'
import type { BbangtoTheme } from '@centurio1987/tokens'

// ──────────────────────────────────────────
// ColorSwatch helper
function ColorSwatch({ name, hex, role }: { name: string; hex: string; role: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
      <div style={{
        width: 36, height: 36, borderRadius: 6, flexShrink: 0,
        backgroundColor: hex,
        border: '1px solid rgba(0,0,0,0.1)',
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
// Main component
interface ThemeStyleGuideProps {
  theme: string
  section: 'Overview' | 'Colors' | 'Typography' | 'Spacing' | 'Components'
}

function ThemeStyleGuide({ theme: slug, section }: ThemeStyleGuideProps) {
  const theme = themeMap[slug] as BbangtoTheme | undefined

  if (!theme) {
    return <div style={{ padding: 32, color: 'red' }}>Theme not found: {slug}</div>
  }

  const bg = theme.semantic.background.base
  const fg = theme.semantic.foreground.base
  const containerStyle: React.CSSProperties = {
    backgroundColor: bg,
    color: fg,
    fontFamily: theme.typography.fontFamily.sans,
    padding: 32,
    minHeight: '100vh',
    boxSizing: 'border-box',
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={containerStyle} data-testid="style-guide-root">
        {section === 'Overview' && (
          <div>
            <h1 style={{ margin: '0 0 8px', fontSize: 40, fontWeight: 700 }}>{theme.name}</h1>
            <p style={{ margin: '0 0 32px', opacity: 0.7, fontSize: 16, maxWidth: 480 }}>
              {theme.description}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
              {[
                { label: 'Primary', hex: theme.semantic.primary.base },
                { label: 'Background', hex: theme.semantic.background.base },
                { label: 'Foreground', hex: theme.semantic.foreground.base },
                { label: 'Error', hex: theme.semantic.error.base },
                { label: 'Success', hex: theme.semantic.success.base },
              ].map(({ label, hex }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, backgroundColor: hex, border: '1px solid rgba(0,0,0,0.1)', marginBottom: 6 }} />
                  <div style={{ fontSize: 11, opacity: 0.6 }}>{label}</div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace' }}>{hex}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 13, opacity: 0.6 }}>
              <span>Sans: </span><code style={{ fontFamily: 'monospace' }}>{theme.typography.fontFamily.sans}</code>
              <span style={{ marginLeft: 16 }}>Mono: </span><code style={{ fontFamily: 'monospace' }}>{theme.typography.fontFamily.mono}</code>
            </div>
          </div>
        )}

        {section === 'Colors' && (
          <div>
            <h2 style={{ marginTop: 0 }}>Color Tokens</h2>
            {[
              { group: 'Primary', pairs: [
                ['primary.base', theme.semantic.primary.base],
                ['primary.hover', theme.semantic.primary.hover],
                ['primary.active', theme.semantic.primary.active],
                ['primary.subtle', theme.semantic.primary.subtle],
                ['primary.foreground', theme.semantic.primary.foreground],
              ]},
              { group: 'Background', pairs: [
                ['background.base', theme.semantic.background.base],
                ['background.elevated', theme.semantic.background.elevated],
                ['background.sunken', theme.semantic.background.sunken],
              ]},
              { group: 'Foreground', pairs: [
                ['foreground.base', theme.semantic.foreground.base],
                ['foreground.muted', theme.semantic.foreground.muted],
                ['foreground.subtle', theme.semantic.foreground.subtle],
                ['foreground.inverse', theme.semantic.foreground.inverse],
              ]},
              { group: 'Border', pairs: [
                ['border.base', theme.semantic.border.base],
                ['border.muted', theme.semantic.border.muted],
                ['border.strong', theme.semantic.border.strong],
                ['border.focus', theme.semantic.border.focus],
              ]},
              { group: 'Error', pairs: [
                ['error.base', theme.semantic.error.base],
                ['error.hover', theme.semantic.error.hover],
                ['error.subtle', theme.semantic.error.subtle],
              ]},
              { group: 'Success', pairs: [
                ['success.base', theme.semantic.success.base],
                ['success.hover', theme.semantic.success.hover],
                ['success.subtle', theme.semantic.success.subtle],
              ]},
              { group: 'Warning', pairs: [
                ['warning.base', theme.semantic.warning.base],
                ['warning.hover', theme.semantic.warning.hover],
                ['warning.subtle', theme.semantic.warning.subtle],
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
            {(Object.entries(theme.typography.scale) as [string, { fontSize: string; fontWeight: number; lineHeight: string; letterSpacing: string }][]).map(([level, spec]) => (
              <div key={level} style={{ marginBottom: 32, borderBottom: `1px solid ${theme.semantic.border.muted}`, paddingBottom: 24 }}>
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
            {(Object.entries(theme.spacing) as [string, string][]).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 48, fontSize: 12, opacity: 0.5, textAlign: 'right', fontFamily: 'monospace' }}>{val}</div>
                <div style={{ height: 20, width: val, backgroundColor: theme.semantic.primary.base, borderRadius: 2 }} />
                <div style={{ fontSize: 12, opacity: 0.7 }}>spacing.{key}</div>
              </div>
            ))}
            <h2 style={{ marginTop: 32 }}>Border Radius</h2>
            {(Object.entries(theme.radius) as [string, string][]).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ width: 64, height: 32, backgroundColor: theme.semantic.primary.base, borderRadius: val }} />
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
                <button style={{ padding: '8px 16px', backgroundColor: theme.semantic.primary.base, color: theme.semantic.primary.foreground, border: 'none', borderRadius: theme.radius.md, cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>Primary</button>
                <button style={{ padding: '8px 16px', backgroundColor: 'transparent', color: theme.semantic.primary.base, border: `1.5px solid ${theme.semantic.primary.base}`, borderRadius: theme.radius.md, cursor: 'pointer', fontSize: 14 }}>Outline</button>
                <button style={{ padding: '8px 16px', backgroundColor: theme.semantic.error.base, color: theme.semantic.error.foreground, border: 'none', borderRadius: theme.radius.md, cursor: 'pointer', fontSize: 14 }}>Error</button>
                <button disabled style={{ padding: '8px 16px', backgroundColor: theme.semantic.disabled.background, color: theme.semantic.disabled.foreground, border: 'none', borderRadius: theme.radius.md, cursor: 'not-allowed', fontSize: 14 }}>Disabled</button>
              </div>
            </div>
            <div>
              <h3 style={{ opacity: 0.5, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Card</h3>
              <div style={{ maxWidth: 320, backgroundColor: theme.semantic.background.elevated, borderRadius: theme.radius.lg, padding: 20, border: `1px solid ${theme.semantic.border.base}`, boxShadow: theme.shadow.sm }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>Card Title</div>
                <div style={{ opacity: 0.7, fontSize: 14, lineHeight: 1.6 }}>This card uses the elevated background, border, and radius tokens from the theme.</div>
              </div>
            </div>
            <div>
              <h3 style={{ opacity: 0.5, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Text scale</h3>
              {(['display', 'h1', 'h2', 'h3', 'body', 'meta'] as const).map(level => {
                const spec = theme.typography.scale[level]
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
    </ThemeProvider>
  )
}

// ──────────────────────────────────────────
const meta: Meta<typeof ThemeStyleGuide> = {
  title: 'Themes/Style Guide',
  component: ThemeStyleGuide,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ["acid-mint","arctic-white","aubergine","aurora-yellow","azure-clean","bavarian","blueprint","broadsheet","carbon-night","carbon","catalog-red","celluloid","charcoal-warm","cobalt","code-dark","code-ivory","commerce-noir","coral","cosmonaut","cream-bloom","dark-chrome","editorial-dark","electric-void","ember-cream","forest-cream","glacial","gold-rush","gradient-violet","grand-noir","graphite","honey-cream","indigo-night","iron","ivory-loft","jade-leaf","jungle-night","lime","magazine-light","midnight-indigo","midnight-ink","mint-code","moss-clean","motion-dark","navy-dark","neon-yellow","obsidian-gold","obsidian-violet","onyx","oxide-green","periwinkle-retro","pitch","precision","prism","race-night","raspberry","scarlet-noir","serenity","signal-red","social-blue","stark-white","sunflower","sunset","tangerine","terminal","terracotta","urban-mono","violet-depth","void","volt-emerald","warm-canvas","warm-ivory","warm-linen","warm-parchment","web-blue"],
      description: 'Theme to preview',
    },
    section: {
      control: 'select',
      options: ['Overview', 'Colors', 'Typography', 'Spacing', 'Components'],
    },
  },
  args: {
    theme: 'coral',
    section: 'Overview',
  },
}

export default meta
type Story = StoryObj<typeof ThemeStyleGuide>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const root = await canvas.findByTestId('style-guide-root')
    await expect(root).toBeTruthy()
  },
}

export const Colors: Story = {
  args: { section: 'Colors' },
}

export const Typography: Story = {
  args: { section: 'Typography' },
}

export const Components: Story = {
  args: { section: 'Components' },
}
