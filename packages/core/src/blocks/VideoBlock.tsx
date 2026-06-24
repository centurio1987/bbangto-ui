import React from 'react';
import { cssVar } from '@centurio1987/tokens';
import { Text } from '../components/Text';

export interface VideoBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** URL of the video source (e.g. mp4, webm). */
  src: string;
  /** URL of the poster image shown before playback. */
  poster?: string;
  /** Accessible title / heading displayed above the video. */
  title?: string;
  /** Caption text rendered below the video. */
  caption?: string;
}

/**
 * VideoBlock — organism / section block.
 *
 * Presents a 16:9 responsive video with an optional heading and caption.
 * Intrinsic aspect-ratio keeps the layout query-free. The `<section>` root
 * provides landmark semantics; `<video>` carries `controls` and a
 * `<track kind="captions">` placeholder for accessibility.
 */
export const VideoBlock = React.forwardRef<HTMLElement, VideoBlockProps>(
  ({ src, poster, title, caption, style, ...props }, ref) => {
    return (
      <section
        ref={ref}
        aria-label={title ?? 'Video section'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: cssVar('spacing', '16'),
          width: '100%',
          fontFamily: cssVar('typography', 'fontFamily', 'sans'),
          color: cssVar('semantic', 'foreground', 'base'),
          ...style,
        }}
        {...props}
      >
        {title && (
          <Text
            variant="h2"
            as="h2"
            style={{ margin: 0 }}
          >
            {title}
          </Text>
        )}

        {/* 16:9 intrinsic responsive wrapper */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: cssVar('radius', 'lg'),
            overflow: 'hidden',
            backgroundColor: cssVar('semantic', 'background', 'sunken'),
          }}
        >
          <video
            src={src}
            poster={poster}
            controls
            playsInline
            aria-label={title ?? 'Video player'}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          >
            {/* Captions track placeholder — consumers should supply a real src */}
            <track kind="captions" srcLang="en" label="English captions" />
            Your browser does not support the video tag.
          </video>
        </div>

        {caption && (
          <Text
            variant="meta"
            as="figcaption"
            color="muted"
            style={{ margin: 0 }}
          >
            {caption}
          </Text>
        )}
      </section>
    );
  }
);

VideoBlock.displayName = 'VideoBlock';
