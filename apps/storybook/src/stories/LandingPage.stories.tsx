import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  GNB, 
  Button, 
  Text, 
  Card, 
  Footer, 
  GlobalBanner,
  SectionHeader,
  Chip
} from '@centurio1987/bbangto-ui-core';

const meta = {
  title: 'Templates/LandingPage',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Logo = () => (
  <div style={{ fontWeight: 'bold', fontSize: '24px', letterSpacing: '-0.5px', color: 'var(--bbangto-semantic-primary-base, #0052cc)' }}>
    BBANGTO
  </div>
);

const NavItems = () => (
  <div style={{ display: 'flex', gap: '32px', fontWeight: 500 }}>
    <a href="#features" style={{ textDecoration: 'none', color: 'inherit' }}>Features</a>
    <a href="#pricing" style={{ textDecoration: 'none', color: 'inherit' }}>Pricing</a>
    <a href="#about" style={{ textDecoration: 'none', color: 'inherit' }}>About Us</a>
  </div>
);

const LandingPageTemplate = () => {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: 'var(--bbangto-semantic-background-base, #ffffff)',
      color: 'var(--bbangto-semantic-foreground-base, #111827)'
    }}>
      <GlobalBanner
        isOpen={isBannerOpen}
        onClose={() => setIsBannerOpen(false)}
        color="primary"
      >
        🚀 Introducing the new Design System! Check out the features below.
      </GlobalBanner>
      
      <GNB 
        logo={<Logo />} 
        navItems={<NavItems />}
        userActions={
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button variant="ghost">Log in</Button>
            <Button variant="solid" color="primary">Sign up</Button>
          </div>
        } 
      />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Hero Section */}
        <section style={{ 
          width: '100%', 
          padding: '120px 24px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
          background: 'linear-gradient(180deg, var(--bbangto-semantic-background-base, #ffffff) 0%, var(--bbangto-semantic-background-sunken, #f9fafb) 100%)'
        }}>
          <Chip color="primary" variant="filled">v1.0 is out</Chip>
          <Text as="h1" variant="h1" style={{ maxWidth: '800px', fontSize: '4rem', lineHeight: 1.2 }}>
            Build Faster with Our Modern Design System
          </Text>
          <Text variant="body1" style={{ color: 'var(--bbangto-semantic-foreground-muted, #6b7280)', maxWidth: '600px', fontSize: '1.25rem' }}>
            A comprehensive, accessible, and themeable UI library for React. 
            Deliver beautiful experiences across all devices.
          </Text>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <Button size="lg" color="primary">Get Started</Button>
            <Button size="lg" variant="outline">View Components</Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ width: '100%', maxWidth: '1200px', padding: '80px 24px' }}>
          <SectionHeader 
            title="Why Choose Us" 
            description="Everything you need to build stunning web applications."
            style={{ marginBottom: '48px', textAlign: 'center' }}
          />
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px' 
          }}>
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '32px' }}>🎨</div>
              <Text variant="h3">Theming Included</Text>
              <Text variant="body2" style={{ color: 'var(--bbangto-semantic-foreground-muted, #6b7280)' }}>
                Built-in light and dark modes with a robust design token system.
              </Text>
            </Card>
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '32px' }}>⚡️</div>
              <Text variant="h3">Performant</Text>
              <Text variant="body2" style={{ color: 'var(--bbangto-semantic-foreground-muted, #6b7280)' }}>
                Optimized components that ensure your application runs smoothly.
              </Text>
            </Card>
            <Card style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '32px' }}>♿️</div>
              <Text variant="h3">Accessible</Text>
              <Text variant="body2" style={{ color: 'var(--bbangto-semantic-foreground-muted, #6b7280)' }}>
                Follows WAI-ARIA guidelines to provide a great experience for everyone.
              </Text>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ 
          width: '100%', 
          padding: '80px 24px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          gap: '24px',
          backgroundColor: 'var(--bbangto-semantic-primary-base, #0052cc)',
          color: 'var(--bbangto-semantic-primary-foreground, #ffffff)'
        }}>
          <Text as="h2" variant="h2" style={{ color: 'inherit' }}>Ready to Dive In?</Text>
          <Text variant="body1" style={{ color: 'inherit', opacity: 0.9 }}>
            Join thousands of developers building the future.
          </Text>
          <Button size="lg" variant="solid" style={{ backgroundColor: '#ffffff', color: 'var(--bbangto-semantic-primary-base, #0052cc)', border: 'none' }}>
            Start Building Free
          </Button>
        </section>
      </main>

      <Footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text variant="meta" style={{ color: 'inherit' }}>© 2026 BBANGTO Inc. All rights reserved.</Text>
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}><Text variant="meta">Privacy</Text></a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}><Text variant="meta">Terms</Text></a>
        </div>
      </Footer>
    </div>
  );
};

export const Default: Story = {
  render: () => <LandingPageTemplate />,
};
