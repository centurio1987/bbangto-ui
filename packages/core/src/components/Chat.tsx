import React from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

// ── ChatBubble ─────────────────────────────────────────────────────────────────

export type ChatBubbleRole = 'user' | 'assistant' | 'system';

/**
 * Visual presentation of a chat message.
 * - `bubble` (default): rounded bubble aligned by role (user right / assistant left).
 * - `flat`: list/Slack style — left-aligned for every role, no bubble fill, full-width rows.
 * - `compact`: bubble layout with reduced gap + padding.
 * - `card`: each message rendered inside a bordered box card.
 */
export type ChatBubbleVariant = 'bubble' | 'flat' | 'compact' | 'card';

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Who sent this message. Controls alignment and surface color. */
  role: ChatBubbleRole;
  /** Visual presentation. Defaults to `bubble` (existing behavior). */
  variant?: ChatBubbleVariant;
  /** Optional ISO timestamp string displayed below the message. */
  timestamp?: string;
  /** Optional avatar element rendered beside the bubble. */
  avatar?: React.ReactNode;
}

export const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ role, variant = 'bubble', timestamp, avatar, children, style, ...props }, ref) => {
    const isUser = role === 'user';
    const isSystem = role === 'system';

    const isFlat = variant === 'flat';
    const isCompact = variant === 'compact';
    const isCard = variant === 'card';

    // Flat variant aligns every role to the left (Slack/list style).
    const alignRight = isUser && !isFlat;

    // Layout: user aligns right, assistant/system align left.
    // Flat forces left alignment for all roles and stretches rows full-width.
    const wrapperStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: alignRight ? 'row-reverse' : 'row',
      alignItems: isFlat ? 'flex-start' : 'flex-end',
      gap: isCompact ? cssVar('spacing', '4') : cssVar('spacing', '8'),
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

    // Padding by variant: compact tightens it, others keep the roomy default.
    const bubblePadding = isCompact
      ? `${cssVar('spacing', '4')} ${cssVar('spacing', '8')}`
      : `${cssVar('spacing', '10')} ${cssVar('spacing', '16')}`;

    // Bubble corner radius. Flat/card use a uniform small radius (no chat-tail shape).
    const bubbleRadius =
      isFlat || isCard
        ? cssVar('radius', 'sm')
        : alignRight
        ? `${cssVar('radius', 'lg')} ${cssVar('radius', 'lg')} ${cssVar('radius', 'sm')} ${cssVar('radius', 'lg')}`
        : `${cssVar('radius', 'lg')} ${cssVar('radius', 'lg')} ${cssVar('radius', 'lg')} ${cssVar('radius', 'sm')}`;

    const bubbleStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: isCompact ? cssVar('spacing', '2') : cssVar('spacing', '4'),
      // Flat rows span the available width; card is roomy; bubble keeps the 75% cap.
      maxWidth: isFlat ? '100%' : isCard ? '90%' : '75%',
      width: isFlat ? '100%' : undefined,
      padding: bubblePadding,
      // Flat drops the surface fill entirely; card keeps a neutral elevated surface.
      backgroundColor: isFlat
        ? 'transparent'
        : isCard
        ? cssVar('semantic', 'background', 'elevated')
        : bubbleBg,
      color: isFlat ? cssVar('semantic', 'foreground', 'base') : bubbleFg,
      // Flat has no border; card always shows a solid box; bubble keeps its role border.
      border: isFlat
        ? 'none'
        : isCard
        ? `1px solid ${cssVar('semantic', 'border', 'base')}`
        : `1px solid ${bubbleBorderColor}`,
      borderRadius: bubbleRadius,
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
      textAlign: alignRight ? 'right' : 'left',
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
          data-bbangto-chat-variant={variant}
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
        data-bbangto-chat-variant={variant}
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
