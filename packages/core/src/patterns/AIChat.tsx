import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { ChatBubble, MessageList } from '../components/Chat';
import { Textarea } from '../components/Textarea';
import { Button } from '../components/Button';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AIChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: React.ReactNode;
  timestamp?: string;
}

export interface AIChatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of chat messages to display. */
  messages: AIChatMessage[];
  /** Called with the trimmed text when the user submits a message. */
  onSend: (text: string) => void;
  /** When true, shows a typing indicator and disables the composer. */
  loading?: boolean;
  /** Placeholder for the composer textarea. */
  placeholder?: string;
  /** Rendered when messages array is empty. */
  emptyState?: React.ReactNode;
}

// ── TypingIndicator ───────────────────────────────────────────────────────────

const TypingIndicator: React.FC = () => {
  const dotStyle = (delay: string): React.CSSProperties => ({
    display: 'inline-block',
    width: 6,
    height: 6,
    borderRadius: cssVar('radius', 'full'),
    backgroundColor: cssVar('semantic', 'foreground', 'muted'),
    animation: 'bbangto-typing-bounce 1.2s ease-in-out infinite',
    animationDelay: delay,
  });

  return (
    <div
      role="status"
      aria-label="Assistant is typing"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: cssVar('spacing', '4'),
        padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '12')}`,
      }}
    >
      <style>{`
        @keyframes bbangto-typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
      <span style={dotStyle('0s')} aria-hidden="true" />
      <span style={dotStyle('0.2s')} aria-hidden="true" />
      <span style={dotStyle('0.4s')} aria-hidden="true" />
    </div>
  );
};

// ── AIChat ────────────────────────────────────────────────────────────────────

export const AIChat = React.forwardRef<HTMLDivElement, AIChatProps>(
  (
    {
      messages,
      onSend,
      loading = false,
      placeholder = 'Type a message…',
      emptyState,
      style,
      ...props
    },
    ref
  ) => {
    const [text, setText] = React.useState('');
    const textareaId = React.useId();
    const messageListRef = React.useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change or loading state changes.
    React.useEffect(() => {
      const el = messageListRef.current;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    }, [messages, loading]);

    const handleSend = () => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;
      onSend(trimmed);
      setText('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSend();
    };

    // ── Layout styles ──────────────────────────────────────────────────────────

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      minHeight: 400,
      backgroundColor: cssVar('semantic', 'background', 'base'),
      borderRadius: cssVar('radius', 'lg'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      overflow: 'hidden',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const messageAreaStyle: React.CSSProperties = {
      flex: 1,
      overflowY: 'auto',
      minHeight: 0,
    };

    const emptyStateStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: cssVar('spacing', '32'),
      color: cssVar('semantic', 'foreground', 'muted'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
    };

    const composerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'flex-end',
      gap: cssVar('spacing', '8'),
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      backgroundColor: cssVar('semantic', 'background', 'elevated'),
    };

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
      <div ref={ref} style={containerStyle} {...props}>
        {/* Message area */}
        <div style={messageAreaStyle}>
          {messages.length === 0 && !loading ? (
            <div style={emptyStateStyle}>
              {emptyState ?? 'No messages yet. Start the conversation!'}
            </div>
          ) : (
            <MessageList ref={messageListRef} live style={{ height: '100%' }}>
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  role={msg.role}
                  timestamp={msg.timestamp}
                >
                  {msg.content}
                </ChatBubble>
              ))}
              {loading && (
                <ChatBubble role="assistant">
                  <TypingIndicator />
                </ChatBubble>
              )}
            </MessageList>
          )}
        </div>

        {/* Composer */}
        <form onSubmit={handleSubmit} style={composerStyle} noValidate>
          <Textarea
            id={textareaId}
            aria-label="Message input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={loading}
            resize="none"
            size="sm"
            fullWidth
            style={{ flex: 1 }}
          />
          <Button
            type="submit"
            variant="solid"
            color="primary"
            size="md"
            disabled={loading || !text.trim()}
            loading={loading}
            aria-label="Send message"
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
);

AIChat.displayName = 'AIChat';
