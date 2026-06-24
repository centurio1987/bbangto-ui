import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Button } from '../components/Button';
import { Text } from '../components/Text';

export interface AnnouncementBarCta {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

export interface AnnouncementBarProps
  extends React.HTMLAttributes<HTMLElement> {
  /** The main message to display. Accepts a string or any React node. */
  message: React.ReactNode;
  /** Optional call-to-action link or button. */
  cta?: AnnouncementBarCta;
  /** When true, a close button is rendered. */
  dismissible?: boolean;
  /** Called when the close button is clicked. */
  onDismiss?: React.MouseEventHandler<HTMLButtonElement>;
}

/** Close icon rendered as an inline SVG — no external assets needed. */
const CloseIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <path
      d="M4 4L12 12M12 4L4 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const AnnouncementBar = React.forwardRef<
  HTMLElement,
  AnnouncementBarProps
>(
  (
    { message, cta, dismissible = false, onDismiss, style, children, ...props },
    ref
  ) => {
    const barStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '12'),
      flexWrap: 'wrap',
      width: '100%',
      padding: `${cssVar('spacing', '10')} ${cssVar('spacing', '24')}`,
      backgroundColor: cssVar('semantic', 'primary', 'base'),
      color: cssVar('semantic', 'primary', 'foreground'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      position: 'relative',
      boxSizing: 'border-box',
      ...style,
    };

    const innerStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: cssVar('spacing', '12'),
      flexWrap: 'wrap',
      flex: '1 1 0',
      minWidth: 0,
    };

    const ctaLinkStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: cssVar('spacing', '4'),
      color: cssVar('semantic', 'primary', 'foreground'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
      lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: 0,
      transition: `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      flexShrink: 0,
    };

    const dismissButtonStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      padding: cssVar('spacing', '4'),
      color: cssVar('semantic', 'primary', 'foreground'),
      borderRadius: cssVar('radius', 'sm'),
      transition: `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
      /* Position at the end of the bar without affecting the centered message. */
      position: 'absolute',
      insetInlineEnd: cssVar('spacing', '16'),
      top: '50%',
      transform: 'translateY(-50%)',
    };

    const renderCta = () => {
      if (!cta) return null;

      if (cta.href) {
        return (
          <a
            href={cta.href}
            style={ctaLinkStyles}
            // Treat external links safely by default when href looks absolute.
            {...(cta.href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            onClick={
              cta.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined
            }
          >
            {cta.label}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M2 6H10M10 6L7 3M10 6L7 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        );
      }

      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={cta.onClick as React.MouseEventHandler<HTMLButtonElement> | undefined}
          style={{
            color: cssVar('semantic', 'primary', 'foreground'),
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            padding: `0 ${cssVar('spacing', '4')}`,
          }}
        >
          {cta.label}
        </Button>
      );
    };

    return (
      <section
        ref={ref}
        role="region"
        aria-label="Announcement"
        style={barStyles}
        {...props}
      >
        <div style={innerStyles}>
          <Text
            as="span"
            variant="meta"
            style={{
              color: cssVar('semantic', 'primary', 'foreground'),
              flexShrink: 1,
            }}
          >
            {message}
          </Text>
          {renderCta()}
        </div>

        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss announcement"
            onClick={onDismiss}
            style={dismissButtonStyles}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.75';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            <CloseIcon />
          </button>
        )}
      </section>
    );
  }
);

AnnouncementBar.displayName = 'AnnouncementBar';
