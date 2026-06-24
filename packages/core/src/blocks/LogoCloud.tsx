import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from '../components/Text';

export interface LogoItem {
  /** Custom React node to render as the logo (takes priority over src/alt). */
  node?: React.ReactNode;
  /** Image URL for the logo. Used when node is not provided. */
  src?: string;
  /** Accessible alt text for the logo image. Required when src is set. */
  alt?: string;
}

export interface LogoCloudProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional heading displayed above the logo grid. */
  title?: string;
  /** Array of logo items to display. */
  logos: LogoItem[];
}

export const LogoCloud = React.forwardRef<HTMLElement, LogoCloudProps>(
  ({ title, logos, style, ...props }, ref) => {
    const sectionStyle: React.CSSProperties = {
      width: '100%',
      padding: `${cssVar('spacing', '48')} ${cssVar('spacing', '24')}`,
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: cssVar('spacing', '32'),
      ...style,
    };

    const gridStyle: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: cssVar('spacing', '24'),
      width: '100%',
      maxWidth: '960px',
      alignItems: 'center',
      justifyItems: 'center',
    };

    const logoItemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
      opacity: 0.55,
      filter: 'grayscale(100%)',
      transition: `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}, filter ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
    };

    const imgStyle: React.CSSProperties = {
      maxWidth: '120px',
      maxHeight: '40px',
      width: 'auto',
      height: 'auto',
      objectFit: 'contain',
    };

    return (
      <section
        ref={ref}
        aria-label={title ?? 'Trusted by clients'}
        style={sectionStyle}
        {...props}
      >
        {title && (
          <Text
            variant="meta"
            color="muted"
            as="p"
            style={{
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            {title}
          </Text>
        )}
        <div
          role="list"
          aria-label="Client logos"
          style={gridStyle}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              role="listitem"
              style={logoItemStyle}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = '1';
                (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(0%)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.opacity = '0.55';
                (e.currentTarget as HTMLDivElement).style.filter = 'grayscale(100%)';
              }}
            >
              {logo.node ?? (
                logo.src ? (
                  <img
                    src={logo.src}
                    alt={logo.alt ?? ''}
                    style={imgStyle}
                  />
                ) : null
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }
);

LogoCloud.displayName = 'LogoCloud';
