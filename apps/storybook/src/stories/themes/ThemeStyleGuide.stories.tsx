import type { Meta, StoryObj } from '@storybook/react'
import { within, expect } from 'storybook/test'
import React from 'react'
import { ThemeProvider } from '@centurio1987/core'
import { themeMap } from '@centurio1987/themes-external'
import type { BbangtoTheme } from '@centurio1987/tokens'

// ──────────────────────────────────────────
// Brand catalog (inline for Storybook — avoids JSON import issues)
const brandCatalog = [{"slug":"airbnb","name":"Airbnb","category":"E-commerce & Retail","description":"Warm coral accent, clean editorial layout. Airbnb marketplace with pill-shaped search bars and generous whitespace.","isLightTheme":true,"primaryBase":"#ff385c","backgroundBase":"#ffffff","foregroundBase":"#222222"},{"slug":"airtable","name":"Airtable","category":"Design & Creative Tools","description":"Editorial workflow software with warm white canvas and signature coral/green/navy cards.","isLightTheme":true,"primaryBase":"#181d26","backgroundBase":"#ffffff","foregroundBase":"#181d26"},{"slug":"apple","name":"Apple","category":"Media & Consumer Tech","description":"Premium white space, cinematic imagery, single Action Blue.","isLightTheme":true,"primaryBase":"#0066cc","backgroundBase":"#ffffff","foregroundBase":"#1d1d1f"},{"slug":"binance","name":"Binance","category":"Fintech & Crypto","description":"Bold Binance Yellow on dark monochrome, trading-floor urgency.","isLightTheme":false,"primaryBase":"#fcd535","backgroundBase":"#0b0e11","foregroundBase":"#181a20"},{"slug":"bmw-m","name":"BMW M","category":"Automotive","description":"Motorsport-inspired contrast, M color accents, precision-driven dark layout.","isLightTheme":false,"primaryBase":"#ffffff","backgroundBase":"#000000","foregroundBase":"#ffffff"},{"slug":"bmw","name":"BMW","category":"Automotive","description":"Dark premium surfaces, BMW corporate blue on warm white canvas.","isLightTheme":true,"primaryBase":"#1c69d4","backgroundBase":"#ffffff","foregroundBase":"#262626"},{"slug":"bugatti","name":"Bugatti","category":"Automotive","description":"Cinema-black canvas, monochrome austerity, monumental display type.","isLightTheme":false,"primaryBase":"#ffffff","backgroundBase":"#000000","foregroundBase":"#ffffff"},{"slug":"cal","name":"Cal.com","category":"Productivity & SaaS","description":"Clean neutral UI, open-source scheduling, developer-oriented simplicity.","isLightTheme":true,"primaryBase":"#111111","backgroundBase":"#ffffff","foregroundBase":"#111111"},{"slug":"claude","name":"Claude","category":"AI & LLM Platforms","description":"Warm terracotta accent, cream canvas, editorial humanist serif headlines.","isLightTheme":true,"primaryBase":"#cc785c","backgroundBase":"#faf9f5","foregroundBase":"#141413"},{"slug":"clay","name":"Clay","category":"Design & Creative Tools","description":"Vibrant claymation GTM data-orchestration platform with warm cream canvas.","isLightTheme":true,"primaryBase":"#0a0a0a","backgroundBase":"#fffaf0","foregroundBase":"#0a0a0a"},{"slug":"clickhouse","name":"ClickHouse","category":"Backend, Database & DevOps","description":"Electric yellow-black analytics database, technical documentation style.","isLightTheme":false,"primaryBase":"#faff69","backgroundBase":"#0a0a0a","foregroundBase":"#ffffff"},{"slug":"cohere","name":"Cohere","category":"AI & LLM Platforms","description":"Enterprise AI platform, stark white editorial space, deep green-black product bands.","isLightTheme":true,"primaryBase":"#17171c","backgroundBase":"#ffffff","foregroundBase":"#212121"},{"slug":"coinbase","name":"Coinbase","category":"Fintech & Crypto","description":"Clean blue identity, institutional trust-focused crypto exchange.","isLightTheme":true,"primaryBase":"#0052ff","backgroundBase":"#ffffff","foregroundBase":"#0a0b0d"},{"slug":"composio","name":"Composio","category":"Backend, Database & DevOps","description":"Deep electric-blue on near-black, terminal-style developer tooling.","isLightTheme":false,"primaryBase":"#0007cd","backgroundBase":"#0f0f0f","foregroundBase":"#ffffff"},{"slug":"cursor","name":"Cursor","category":"Developer Tools & IDEs","description":"Warm cream canvas, Cursor Orange CTA, AI-first code editor.","isLightTheme":true,"primaryBase":"#f54e00","backgroundBase":"#f7f7f4","foregroundBase":"#26251e"},{"slug":"dell-1996","name":"Dell (1996)","category":"Retro Web","description":"Catalog-era enterprise web, flat color ribbon cards, chunky Helvetica-Black.","isLightTheme":true,"primaryBase":"#e91d2a","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"elevenlabs","name":"ElevenLabs","category":"AI & LLM Platforms","description":"Voice AI platform, editorial print-magazine aesthetic, atmospheric gradients.","isLightTheme":true,"primaryBase":"#292524","backgroundBase":"#f5f5f5","foregroundBase":"#0c0a09"},{"slug":"expo","name":"Expo","category":"Developer Tools & IDEs","description":"React Native platform, dark theme, tight letter-spacing, code-centric.","isLightTheme":true,"primaryBase":"#000000","backgroundBase":"#ffffff","foregroundBase":"#171717"},{"slug":"ferrari","name":"Ferrari","category":"Automotive","description":"Chiaroscuro black-white editorial, Ferrari Red with extreme sparseness.","isLightTheme":false,"primaryBase":"#da291c","backgroundBase":"#181818","foregroundBase":"#ffffff"},{"slug":"figma","name":"Figma","category":"Design & Creative Tools","description":"Vibrant multi-color playful sticky-note blocks on monochrome editorial frame.","isLightTheme":true,"primaryBase":"#000000","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"framer","name":"Framer","category":"Design & Creative Tools","description":"Bold black and blue, motion-first, dark artboard website builder.","isLightTheme":false,"primaryBase":"#ffffff","backgroundBase":"#090909","foregroundBase":"#ffffff"},{"slug":"hashicorp","name":"HashiCorp","category":"Backend, Database & DevOps","description":"Enterprise infrastructure, black and white with per-product accent colors.","isLightTheme":false,"primaryBase":"#000000","backgroundBase":"#000000","foregroundBase":"#ffffff"},{"slug":"hp","name":"HP","category":"Media & Consumer Tech","description":"Pure white canvas, HP Electric Blue signal CTA, geometric Forma DJR Micro.","isLightTheme":true,"primaryBase":"#024ad8","backgroundBase":"#ffffff","foregroundBase":"#1a1a1a"},{"slug":"ibm","name":"IBM","category":"Media & Consumer Tech","description":"Carbon design system, structured blue palette, enterprise gravitas.","isLightTheme":true,"primaryBase":"#0f62fe","backgroundBase":"#ffffff","foregroundBase":"#161616"},{"slug":"intercom","name":"Intercom","category":"Productivity & SaaS","description":"Customer messaging, friendly cream UI, Fin Orange AI brand accent.","isLightTheme":true,"primaryBase":"#111111","backgroundBase":"#f5f1ec","foregroundBase":"#111111"},{"slug":"kraken","name":"Kraken","category":"Fintech & Crypto","description":"Purple-accented white UI, data-dense crypto dashboards.","isLightTheme":true,"primaryBase":"#7132f5","backgroundBase":"#ffffff","foregroundBase":"#101114"},{"slug":"lamborghini","name":"Lamborghini","category":"Automotive","description":"True black cathedral, gold accent, LamboType custom Neo-Grotesk.","isLightTheme":false,"primaryBase":"#FFC000","backgroundBase":"#000000","foregroundBase":"#FFFFFF"},{"slug":"linear.app","name":"Linear","category":"Productivity & SaaS","description":"Ultra-minimal, precise purple accent, project management for engineers.","isLightTheme":false,"primaryBase":"#5e6ad2","backgroundBase":"#010102","foregroundBase":"#f7f8f8"},{"slug":"lovable","name":"Lovable","category":"Developer Tools & IDEs","description":"Warm parchment canvas, humanist Camera Plain type, AI full-stack builder.","isLightTheme":true,"primaryBase":"#1c1c1c","backgroundBase":"#f7f4ed","foregroundBase":"#1c1c1c"},{"slug":"mastercard","name":"Mastercard","category":"Fintech & Crypto","description":"Warm cream canvas, orbital pill shapes, global payments editorial warmth.","isLightTheme":true,"primaryBase":"#141413","backgroundBase":"#F3F0EE","foregroundBase":"#141413"},{"slug":"meta","name":"Meta","category":"E-commerce & Retail","description":"Photography-first, binary light/dark surfaces, Meta Blue CTAs.","isLightTheme":true,"primaryBase":"#0064e0","backgroundBase":"#ffffff","foregroundBase":"#1c1e21"},{"slug":"minimax","name":"MiniMax","category":"AI & LLM Platforms","description":"Bold dark interface with gradient product cards, AI model provider.","isLightTheme":true,"primaryBase":"#0a0a0a","backgroundBase":"#ffffff","foregroundBase":"#0a0a0a"},{"slug":"mintlify","name":"Mintlify","category":"Productivity & SaaS","description":"Clean, green-accented documentation platform, reading-optimized.","isLightTheme":true,"primaryBase":"#0a0a0a","backgroundBase":"#ffffff","foregroundBase":"#0a0a0a"},{"slug":"miro","name":"Miro","category":"Design & Creative Tools","description":"Bright yellow accent, infinite canvas aesthetic, visual collaboration.","isLightTheme":true,"primaryBase":"#1c1e1e","backgroundBase":"#ffffff","foregroundBase":"#1c1c1e"},{"slug":"mistral.ai","name":"Mistral AI","category":"AI & LLM Platforms","description":"French-engineered minimalism, orange-sunset warmth, open-weight LLM.","isLightTheme":true,"primaryBase":"#fa520f","backgroundBase":"#ffffff","foregroundBase":"#1f1f1f"},{"slug":"mongodb","name":"MongoDB","category":"Backend, Database & DevOps","description":"Green leaf branding, developer documentation focus, dark teal hero bands.","isLightTheme":true,"primaryBase":"#00ed64","backgroundBase":"#ffffff","foregroundBase":"#001e2b"},{"slug":"nike","name":"Nike","category":"E-commerce & Retail","description":"Monochrome UI, massive uppercase Futura, full-bleed athletic photography.","isLightTheme":true,"primaryBase":"#111111","backgroundBase":"#ffffff","foregroundBase":"#111111"},{"slug":"nintendo-2001","name":"Nintendo.com (2001)","category":"Retro Web","description":"Y2K brushed-periwinkle beveled metal panels, halftone-dotted carbon nav.","isLightTheme":true,"primaryBase":"#e60012","backgroundBase":"#7a8aba","foregroundBase":"#21242e"},{"slug":"notion","name":"Notion","category":"Productivity & SaaS","description":"Warm minimalism, serif headings, soft surfaces, all-in-one workspace.","isLightTheme":true,"primaryBase":"#5645d4","backgroundBase":"#ffffff","foregroundBase":"#1a1a1a"},{"slug":"nvidia","name":"NVIDIA","category":"Media & Consumer Tech","description":"Green-black energy, technical power, angular 2px radius aesthetic.","isLightTheme":true,"primaryBase":"#76b900","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"ollama","name":"Ollama","category":"AI & LLM Platforms","description":"Terminal-first, monochrome simplicity, run LLMs locally.","isLightTheme":true,"primaryBase":"#000000","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"opencode.ai","name":"OpenCode AI","category":"AI & LLM Platforms","description":"Terminal-native monospace everything, AI coding platform.","isLightTheme":true,"primaryBase":"#201d1d","backgroundBase":"#fdfcfc","foregroundBase":"#201d1d"},{"slug":"pinterest","name":"Pinterest","category":"Media & Consumer Tech","description":"Red accent, masonry grid, image-first visual discovery platform.","isLightTheme":true,"primaryBase":"#e60023","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"playstation","name":"PlayStation","category":"Media & Consumer Tech","description":"Three-surface channel layout, PlayStation Blue CTAs, cyan hover-scale.","isLightTheme":false,"primaryBase":"#0070d1","backgroundBase":"#000000","foregroundBase":"#ffffff"},{"slug":"posthog","name":"PostHog","category":"Backend, Database & DevOps","description":"Playful hedgehog branding, developer-friendly warm cream UI.","isLightTheme":true,"primaryBase":"#f7a501","backgroundBase":"#eeefe9","foregroundBase":"#23251d"},{"slug":"raycast","name":"Raycast","category":"Developer Tools & IDEs","description":"Sleek dark chrome, vibrant gradient accents, productivity launcher.","isLightTheme":false,"primaryBase":"#ffffff","backgroundBase":"#07080a","foregroundBase":"#f4f4f6"},{"slug":"renault","name":"Renault","category":"Automotive","description":"Vivid aurora gradients, NouvelR proprietary typeface, zero-radius buttons.","isLightTheme":true,"primaryBase":"#ffed00","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"replicate","name":"Replicate","category":"AI & LLM Platforms","description":"Clean white canvas, warm cream surfaces, code-forward ML model API.","isLightTheme":true,"primaryBase":"#ea2804","backgroundBase":"#f9f7f3","foregroundBase":"#202020"},{"slug":"resend","name":"Resend","category":"Productivity & SaaS","description":"Minimal dark theme, monospace accents, email API for developers.","isLightTheme":false,"primaryBase":"#fcfdff","backgroundBase":"#000000","foregroundBase":"#fcfdff"},{"slug":"revolut","name":"Revolut","category":"Fintech & Crypto","description":"Sleek dark interface, gradient cards, cobalt-violet fintech precision.","isLightTheme":false,"primaryBase":"#494fdf","backgroundBase":"#000000","foregroundBase":"#191c1f"},{"slug":"runwayml","name":"Runway","category":"AI & LLM Platforms","description":"Cinematic AI creative tools, editorial film-festival aesthetic.","isLightTheme":false,"primaryBase":"#000000","backgroundBase":"#000000","foregroundBase":"#ffffff"},{"slug":"sanity","name":"Sanity","category":"Backend, Database & DevOps","description":"Dark-first editorial marketing, 112px display type, coral-red accent.","isLightTheme":false,"primaryBase":"#f36458","backgroundBase":"#0b0b0b","foregroundBase":"#ffffff"},{"slug":"sentry","name":"Sentry","category":"Backend, Database & DevOps","description":"Dark dashboard, data-dense, purple-violet midnight canvas.","isLightTheme":false,"primaryBase":"#150f23","backgroundBase":"#1f1633","foregroundBase":"#1f1633"},{"slug":"shopify","name":"Shopify","category":"E-commerce & Retail","description":"Dark-first cinematic, neon green accent, ultra-light display type.","isLightTheme":false,"primaryBase":"#000000","backgroundBase":"#000000","foregroundBase":"#000000"},{"slug":"slack","name":"Slack","category":"Productivity & SaaS","description":"Deep aubergine primary, cream-lavender hero gradients, workplace messaging.","isLightTheme":true,"primaryBase":"#4a154b","backgroundBase":"#ffffff","foregroundBase":"#1d1d1d"},{"slug":"spacex","name":"SpaceX","category":"Media & Consumer Tech","description":"Stark black and white, full-bleed imagery, futuristic space technology.","isLightTheme":false,"primaryBase":"#ffffff","backgroundBase":"#000000","foregroundBase":"#000000"},{"slug":"spotify","name":"Spotify","category":"Media & Consumer Tech","description":"Vibrant green on dark, bold type, album-art-driven music streaming.","isLightTheme":false,"primaryBase":"#1ed760","backgroundBase":"#121212","foregroundBase":"#ffffff"},{"slug":"starbucks","name":"Starbucks","category":"E-commerce & Retail","description":"Four-tier earth-green system, warm cream canvas, Starbucks flagship.","isLightTheme":true,"primaryBase":"#00754A","backgroundBase":"#f2f0eb","foregroundBase":"#1E3932"},{"slug":"stripe","name":"Stripe","category":"Fintech & Crypto","description":"Signature purple gradients, weight-300 elegance, payment infrastructure.","isLightTheme":true,"primaryBase":"#533afd","backgroundBase":"#ffffff","foregroundBase":"#0d253d"},{"slug":"supabase","name":"Supabase","category":"Backend, Database & DevOps","description":"Open-source Firebase alternative, dark emerald accent, code-first.","isLightTheme":true,"primaryBase":"#3ecf8e","backgroundBase":"#ffffff","foregroundBase":"#171717"},{"slug":"superhuman","name":"Superhuman","category":"Developer Tools & IDEs","description":"Premium dark UI, keyboard-first, deep indigo email productivity.","isLightTheme":true,"primaryBase":"#1b1938","backgroundBase":"#ffffff","foregroundBase":"#292827"},{"slug":"tesla","name":"Tesla","category":"Automotive","description":"Radical subtraction, cinematic full-viewport photography, Universal Sans.","isLightTheme":true,"primaryBase":"#3E6AE1","backgroundBase":"#FFFFFF","foregroundBase":"#171A20"},{"slug":"theverge","name":"The Verge","category":"Media & Consumer Tech","description":"Acid-mint and ultraviolet accents, Manuka display type, tech editorial.","isLightTheme":false,"primaryBase":"#3cffd0","backgroundBase":"#131313","foregroundBase":"#ffffff"},{"slug":"together.ai","name":"Together AI","category":"AI & LLM Platforms","description":"Open-source AI infrastructure, technical blueprint-style design.","isLightTheme":true,"primaryBase":"#000000","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"uber","name":"Uber","category":"Media & Consumer Tech","description":"Bold black and white, tight type, urban mobility energy.","isLightTheme":true,"primaryBase":"#000000","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"vercel","name":"Vercel","category":"Developer Tools & IDEs","description":"Black and white precision, Geist font, frontend deployment platform.","isLightTheme":true,"primaryBase":"#171717","backgroundBase":"#ffffff","foregroundBase":"#171717"},{"slug":"vodafone","name":"Vodafone","category":"Media & Consumer Tech","description":"Monumental uppercase display, Vodafone Red chapter bands, global telecom.","isLightTheme":true,"primaryBase":"#e60000","backgroundBase":"#ffffff","foregroundBase":"#25282b"},{"slug":"voltagent","name":"VoltAgent","category":"AI & LLM Platforms","description":"Void-black canvas, emerald accent, terminal-native AI agent framework.","isLightTheme":false,"primaryBase":"#00d992","backgroundBase":"#101010","foregroundBase":"#f2f2f2"},{"slug":"warp","name":"Warp","category":"Developer Tools & IDEs","description":"Modern terminal, warm near-charcoal canvas, block-based command UI.","isLightTheme":false,"primaryBase":"#f7f5f0","backgroundBase":"#2b2622","foregroundBase":"#f7f5f0"},{"slug":"webflow","name":"Webflow","category":"Design & Creative Tools","description":"Blue-accented, polished visual web builder.","isLightTheme":true,"primaryBase":"#080808","backgroundBase":"#ffffff","foregroundBase":"#080808"},{"slug":"wired","name":"WIRED","category":"Media & Consumer Tech","description":"Paper-white broadsheet density, custom serif, ink-blue links, tech magazine.","isLightTheme":true,"primaryBase":"#000000","backgroundBase":"#ffffff","foregroundBase":"#000000"},{"slug":"wise","name":"Wise","category":"Fintech & Crypto","description":"Bright lime-green accent, Scandinavian fintech magazine aesthetic.","isLightTheme":true,"primaryBase":"#9fe870","backgroundBase":"#ffffff","foregroundBase":"#0e0f0c"},{"slug":"x.ai","name":"xAI","category":"AI & LLM Platforms","description":"Stark monochrome, futuristic minimalism, xAI frontier AI company.","isLightTheme":false,"primaryBase":"#ffffff","backgroundBase":"#0a0a0a","foregroundBase":"#ffffff"},{"slug":"zapier","name":"Zapier","category":"Productivity & SaaS","description":"Warm orange, friendly warm-cream canvas, workflow automation.","isLightTheme":true,"primaryBase":"#ff4f00","backgroundBase":"#fffefb","foregroundBase":"#201515"}]

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
  const meta = brandCatalog.find(b => b.slug === slug)

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
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.5, marginBottom: 8 }}>
              {meta?.category}
            </div>
            <h1 style={{ margin: '0 0 8px', fontSize: 40, fontWeight: 700 }}>{theme.name}</h1>
            <p style={{ margin: '0 0 32px', opacity: 0.7, fontSize: 16, maxWidth: 480 }}>
              {meta?.description || 'External brand theme'}
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
      options: ["airbnb","airtable","apple","binance","bmw-m","bmw","bugatti","cal","claude","clay","clickhouse","cohere","coinbase","composio","cursor","dell-1996","elevenlabs","expo","ferrari","figma","framer","hashicorp","hp","ibm","intercom","kraken","lamborghini","linear.app","lovable","mastercard","meta","minimax","mintlify","miro","mistral.ai","mongodb","nike","nintendo-2001","notion","nvidia","ollama","opencode.ai","pinterest","playstation","posthog","raycast","renault","replicate","resend","revolut","runwayml","sanity","sentry","shopify","slack","spacex","spotify","starbucks","stripe","supabase","superhuman","tesla","theverge","together.ai","uber","vercel","vodafone","voltagent","warp","webflow","wired","wise","x.ai","zapier"],
      description: 'Brand theme to preview',
    },
    section: {
      control: 'select',
      options: ['Overview', 'Colors', 'Typography', 'Spacing', 'Components'],
    },
  },
  args: {
    theme: 'airbnb',
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
