import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';
import { Avatar } from './Avatar';
import { Text } from './Text';
import { Button } from './Button';

export interface FeedPostProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  authorName: string;
  authorAvatar?: string;
  timeAgo: string;
  content: React.ReactNode;
  likes?: number;
  comments?: number;
  isLiked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

export const FeedPost = React.forwardRef<HTMLDivElement, FeedPostProps>(
  ({ 
    authorName, 
    authorAvatar, 
    timeAgo, 
    content, 
    likes = 0, 
    comments = 0, 
    onLike, 
    onComment, 
    onShare, 
    style, 
    ...props 
  }, ref) => {
    
    const containerStyle: React.CSSProperties = {
      padding: cssVar('spacing', '16'),
      backgroundColor: cssVar('semantic', 'background', 'base'),
      border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      borderRadius: cssVar('radius', 'md'),
      marginBottom: cssVar('spacing', '16'),
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const headerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: cssVar('spacing', '12'),
      gap: cssVar('spacing', '12'),
    };

    const actionContainerStyle: React.CSSProperties = {
      display: 'flex',
      gap: cssVar('spacing', '16'),
      marginTop: cssVar('spacing', '16'),
      paddingTop: cssVar('spacing', '12'),
      borderTop: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
    };

    return (
      <div ref={ref} style={containerStyle} {...props}>
        <div style={headerStyle}>
          <Avatar src={authorAvatar} alt={authorName} size="md" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Text variant="body" style={{ fontWeight: 'bold' }}>
              {authorName}
            </Text>
            <Text variant="meta" color="muted">
              {timeAgo}
            </Text>
          </div>
        </div>
        
        <div style={{ color: cssVar('semantic', 'foreground', 'base'), fontSize: cssVar('typography', 'scale', 'body', 'fontSize'), lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight') }}>
          {content}
        </div>

        <div style={actionContainerStyle}>
          <Button variant="ghost" size="sm" color="neutral" onClick={onLike} style={{ gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {likes > 0 ? likes : 'Like'}
          </Button>
          <Button variant="ghost" size="sm" color="neutral" onClick={onComment} style={{ gap: '4px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {comments > 0 ? comments : 'Comment'}
          </Button>
          <Button variant="ghost" size="sm" color="neutral" onClick={onShare}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          </Button>
        </div>
      </div>
    );
  }
);
FeedPost.displayName = 'FeedPost';

export interface FeedProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Feed = React.forwardRef<HTMLDivElement, FeedProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', ...style }} {...props}>
        {children}
      </div>
    );
  }
);
Feed.displayName = 'Feed';
