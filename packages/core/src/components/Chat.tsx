import React from 'react';
import { cssVar } from '@centurio1987/tokens';

// ── ChatBubble ─────────────────────────────────────────────────────────────────

export type ChatBubbleRole = 'user' | 'assistant' | 'system';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Who sent this message. Controls alignment and surface color. */
  role: ChatBubbleRole;
  /** Optional ISO timestamp string displayed below the message. */
  timestamp?: string;
  /** Optional avatar element rendered beside the bubble. */
  avatar?: React.ReactNode;
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ role, timestamp, avatar, children, style, ...props }, ref) => {
    const isUser = role === 'user';
    const isSystem = role === 'system';

    // Layout: user aligns right, assistant/system align left
    const wrapperStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: isUser ? 'row-reverse' : 'row',
      alignItems: 'flex-end',
      gap: cssVar('spacing', '8'),
      width: '100%',
    };

    // Surface color by role
    const bubbleBg = isUser
      ? cssVar('semantic', 'primary', 'subtle')
      : isSystem
      ? cssVar('semantic', 'background', 'sunken')
      : cssVar('semantic', 'background', 'elevated');

    const bubbleFg = isUser
      ? cssVar('semantic', 'primary', 'base')
      : cssVar('semantic', 'foreground', 'base');

    const bubbleBorderColor = isUser
      ? cssVar('semantic', 'primary', 'base')
      : cssVar('semantic', 'border', 'muted');

    const bubbleStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '4'),
      maxWidth: '75%',
      padding: `${cssVar('spacing', '10')} ${cssVar('spacing', '16')}`,
      backgroundColor: bubbleBg,
      color: bubbleFg,
      border: `1px solid ${bubbleBorderColor}`,
      borderRadius: isUser
        ? `${cssVar('radius', 'lg')} ${cssVar('radius', 'lg')} ${cssVar('radius', 'sm')} ${cssVar('radius', 'lg')}`
        : `${cssVar('radius', 'lg')} ${cssVar('radius', 'lg')} ${cssVar('radius', 'lg')} ${cssVar('radius', 'sm')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
      wordBreak: 'break-word',
      ...style,
    };

    // System messages get a centered pill style instead
    const systemStyles: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    };

    const systemBubbleStyles: React.CSSProperties = {
      padding: `${cssVar('spacing', '4')} ${cssVar('spacing', '12')}`,
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      color: cssVar('semantic', 'foreground', 'muted'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'full'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
      textAlign: 'center',
    };

    const timestampStyles: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
      textAlign: isUser ? 'right' : 'left',
    };

    const ariaLabel = `${role === 'user' ? 'You' : role === 'assistant' ? 'Assistant' : 'System'}: ${typeof children === 'string' ? children : ''}`;

    if (isSystem) {
      return (
        <div
          ref={ref}
          style={systemStyles}
          role="note"
          aria-label={ariaLabel}
          data-role={role}
          {...props}
        >
          <span style={systemBubbleStyles}>{children}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={wrapperStyles}
        data-role={role}
        {...props}
      >
        {avatar && (
          <span
            style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}
            aria-hidden="true"
          >
            {avatar}
          </span>
        )}
        <div
          style={bubbleStyles}
          role="article"
          aria-label={ariaLabel}
        >
          <span>{children}</span>
          {timestamp && (
            <time style={timestampStyles} aria-label={`Sent at ${timestamp}`}>
              {timestamp}
            </time>
          )}
        </div>
      </div>
    );
  }
);

ChatBubble.displayName = 'ChatBubble';

// ── MessageList ────────────────────────────────────────────────────────────────

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * When true, applies aria-live="polite" so screen readers announce new
   * messages as they are added.
   */
  live?: boolean;
}

export const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  ({ live = false, children, style, ...props }, ref) => {
    const listStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '12'),
      width: '100%',
      padding: `${cssVar('spacing', '16')} ${cssVar('spacing', '20')}`,
      overflowY: 'auto',
      boxSizing: 'border-box',
      ...style,
    };

    return (
      <div
        ref={ref}
        style={listStyles}
        role="log"
        aria-live={live ? 'polite' : undefined}
        aria-label="Message list"
        {...props}
      >
        {children}
      </div>
    );
  }
);

MessageList.displayName = 'MessageList';
