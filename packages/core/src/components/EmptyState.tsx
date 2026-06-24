import React from 'react';
import { cssVar } from '@centurio1987/tokens';

export type EmptyStateSize = 'sm' | 'md' | 'lg';
export type EmptyStateAlign = 'center' | 'start';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** Controls padding and font sizes. Defaults to 'md'. */
  size?: EmptyStateSize;
  /** Text and icon alignment. Defaults to 'center'. */
  align?: EmptyStateAlign;
  /** When true, renders a loading skeleton instead of content. */
  loading?: boolean;
}

const PADDING_Y: Record<EmptyStateSize, string> = {
  sm: cssVar('spacing', '20'),
  md: cssVar('spacing', '40'),
  lg: cssVar('spacing', '64'),
};

const PADDING_X: Record<EmptyStateSize, string> = {
  sm: cssVar('spacing', '12'),
  md: cssVar('spacing', '20'),
  lg: cssVar('spacing', '32'),
};

const TITLE_FONT_SIZE: Record<EmptyStateSize, string> = {
  sm: cssVar('typography', 'scale', 'body', 'fontSize'),
  md: cssVar('typography', 'scale', 'h3', 'fontSize'),
  lg: cssVar('typography', 'scale', 'h2', 'fontSize'),
};

const ICON_SIZE: Record<EmptyStateSize, string> = {
  sm: cssVar('spacing', '12'),
  md: cssVar('spacing', '16'),
  lg: cssVar('spacing', '20'),
};

const SKELETON_LINE_HEIGHT = '12px';

const SkeletonBlock = ({
  width,
  height,
  style,
}: {
  width: string;
  height: string;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      width,
      height,
      borderRadius: cssVar('radius', 'sm'),
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      ...style,
    }}
  />
);

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title,
      description,
      action,
      size = 'md',
      align = 'center',
      loading = false,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const isStart = align === 'start';

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: isStart ? 'flex-start' : 'center',
      justifyContent: 'center',
      padding: `${PADDING_Y[size]} ${PADDING_X[size]}`,
      textAlign: isStart ? 'start' : 'center',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      ...style,
    };

    const iconContainerStyle: React.CSSProperties = {
      marginBottom: ICON_SIZE[size],
      color: cssVar('semantic', 'foreground', 'muted'),
    };

    const titleStyle: React.CSSProperties = {
      fontSize: TITLE_FONT_SIZE[size],
      fontWeight: 'bold',
      color: cssVar('semantic', 'foreground', 'base'),
      marginBottom: cssVar('spacing', '8'),
    };

    const descriptionStyle: React.CSSProperties = {
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'muted'),
      marginBottom: action ? cssVar('spacing', '24') : 0,
      maxWidth: '400px',
    };

    if (loading) {
      return (
        <div
          ref={ref}
          style={containerStyle}
          className={className}
          data-empty-state
          {...props}
        >
          <div
            role="status"
            aria-label="Loading"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isStart ? 'flex-start' : 'center',
              gap: cssVar('spacing', '12'),
              width: '100%',
              maxWidth: '320px',
            }}
          >
            {/* Icon placeholder */}
            <SkeletonBlock
              width={size === 'sm' ? '32px' : size === 'lg' ? '64px' : '48px'}
              height={size === 'sm' ? '32px' : size === 'lg' ? '64px' : '48px'}
              style={{ borderRadius: cssVar('radius', 'md') }}
            />
            {/* Title placeholder */}
            <SkeletonBlock width="60%" height={SKELETON_LINE_HEIGHT} />
            {/* Description placeholders */}
            <SkeletonBlock width="80%" height={SKELETON_LINE_HEIGHT} />
            <SkeletonBlock width="50%" height={SKELETON_LINE_HEIGHT} />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        style={containerStyle}
        className={className}
        data-empty-state
        {...props}
      >
        {icon && <div style={iconContainerStyle}>{icon}</div>}
        <div style={titleStyle}>{title}</div>
        {description && <div style={descriptionStyle}>{description}</div>}
        {action && <div>{action}</div>}
      </div>
    );
  }
);

EmptyState.displayName = 'EmptyState';
