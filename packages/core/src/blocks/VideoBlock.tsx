import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Text } from '../components/Text';

/**
 * Layout axis for the VideoBlock.
 * - `centered`: centred player, single column (default — existing behaviour).
 * - `split`: text / content beside the video; 2-column at ≥ lg via scoped style.
 * - `background`: video fills the section as a background with an overlay scrim;
 *   text overlaid on top.
 * - `framed`: video wrapped in a device / browser frame (border + chrome bar).
 */
export type VideoBlockLayout = 'centered' | 'split' | 'background' | 'framed';

export interface VideoBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content'> {
  /** URL of the video source (e.g. mp4, webm). */
  src: string;
  /** URL of the poster image shown before playback. */
  poster?: string;
  /** Accessible title / heading displayed above the video. */
  title?: string;
  /** Caption text rendered below the video. */
  caption?: string;
  /** Layout variant. Defaults to `centered` (existing behaviour). */
  layout?: VideoBlockLayout;
  /**
   * Optional supporting content rendered beside the video in the `split`
   * layout (and overlaid in `background`). Defaults to undefined so existing
   * callers are unaffected.
   */
  content?: React.ReactNode;
}

/** Unique class prefix to scope media-query / frame styles without a CSS Module. */
const VIDEOBLOCK_ID = 'bbangto-videoblock';

/**
 * VideoBlock — organism / section block.
 *
 * Presents a 16:9 responsive video with an optional heading and caption.
 * Intrinsic aspect-ratio keeps the layout query-free. The `<section>` root
 * provides landmark semantics; `<video>` carries `controls` and a
 * `<track kind="captions">` placeholder for accessibility.
 *
 * The `layout` axis swaps between a centred player, a 2-column split (text
 * beside video at ≥ lg), a full-bleed background with a text scrim, and a
 * device / browser-framed presentation.
 */
export const VideoBlock = React.forwardRef<HTMLElement, VideoBlockProps>(
  (
    { src, poster, title, caption, layout = 'centered', content, style, ...props },
    ref
  ) => {
    const isSplit = layout === 'split';
    const isBackground = layout === 'background';
    const isFramed = layout === 'framed';

    const sectionStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '16'),
      width: '100%',
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: cssVar('semantic', 'foreground', 'base'),
      ...(isBackground
        ? { position: 'relative', overflow: 'hidden', minHeight: '320px' }
        : null),
      ...style,
    };

    // Shared video element — reused by every layout.
    const videoEl = (
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
          objectFit: isBackground ? 'cover' : 'contain',
          display: 'block',
        }}
      >
        {/* Captions track placeholder — consumers should supply a real src */}
        <track kind="captions" srcLang="en" label="English captions" />
        Your browser does not support the video tag.
      </video>
    );

    // ── Background layout ────────────────────────────────────────────────
    if (isBackground) {
      return (
        <section
          ref={ref}
          aria-label={title ?? 'Video section'}
          data-bbangto-videoblock-layout={layout}
          style={sectionStyles}
          {...props}
        >
          {/* Full-bleed video wrapper sits behind the content. */}
          <div
            className={`${VIDEOBLOCK_ID}-bg-media`}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 0,
              overflow: 'hidden',
            }}
          >
            {videoEl}
          </div>
          {/* Scrim so overlaid text remains legible. */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              backgroundColor: cssVar('semantic', 'background', 'overlay'),
            }}
          />
          {/* Overlaid content. */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: cssVar('spacing', '16'),
              padding: cssVar('spacing', '40'),
              color: cssVar('semantic', 'foreground', 'inverse'),
            }}
          >
            {title && (
              <Text variant="h2" as="h2" style={{ margin: 0, color: 'inherit' }}>
                {title}
              </Text>
            )}
            {content}
            {caption && (
              <Text variant="meta" as="figcaption" style={{ margin: 0, color: 'inherit' }}>
                {caption}
              </Text>
            )}
          </div>
        </section>
      );
    }

    // 16:9 intrinsic responsive video wrapper (centered / split / framed).
    const playerWrapper = (
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16 / 9',
          borderRadius: isFramed ? 0 : cssVar('radius', 'lg'),
          overflow: 'hidden',
          backgroundColor: cssVar('semantic', 'background', 'sunken'),
        }}
      >
        {videoEl}
      </div>
    );

    // For framed layout, wrap the player in a browser/device chrome frame.
    const framedPlayer = isFramed ? (
      <div
        className={`${VIDEOBLOCK_ID}-frame`}
        style={{
          border: `1px solid ${cssVar('semantic', 'border', 'strong')}`,
          borderRadius: cssVar('radius', 'lg'),
          overflow: 'hidden',
          backgroundColor: cssVar('semantic', 'background', 'sunken'),
        }}
      >
        {/* Chrome bar with traffic-light dots. */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: cssVar('spacing', '8'),
            padding: `${cssVar('spacing', '8')} ${cssVar('spacing', '12')}`,
            borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
            backgroundColor: cssVar('semantic', 'background', 'base'),
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: cssVar('radius', 'full'),
                backgroundColor: cssVar('semantic', 'border', 'strong'),
                display: 'inline-block',
              }}
            />
          ))}
        </div>
        {playerWrapper}
      </div>
    ) : (
      playerWrapper
    );

    const headingNode = title && (
      <Text variant="h2" as="h2" style={{ margin: 0 }}>
        {title}
      </Text>
    );

    const captionNode = caption && (
      <Text variant="meta" as="figcaption" color="muted" style={{ margin: 0 }}>
        {caption}
      </Text>
    );

    // ── Split layout ─────────────────────────────────────────────────────
    if (isSplit) {
      return (
        <section
          ref={ref}
          aria-label={title ?? 'Video section'}
          data-bbangto-videoblock-layout={layout}
          style={sectionStyles}
          {...props}
        >
          {/*
            Scoped responsive style: on desktop (≥ lg) switch the inner wrapper
            to a two-column split (text | video). @media cannot be expressed in
            React's style prop, so a scoped <style> tag is used.
          */}
          <style>{`
            @media (min-width: ${breakpoints.lg}px) {
              .${VIDEOBLOCK_ID}-split {
                grid-template-columns: 1fr 1fr !important;
                align-items: center !important;
              }
            }
          `}</style>
          <div
            className={`${VIDEOBLOCK_ID}-split`}
            style={{
              display: 'grid',
              gap: cssVar('spacing', '24'),
              gridTemplateColumns: '1fr',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: cssVar('spacing', '16'),
              }}
            >
              {headingNode}
              {content}
              {captionNode}
            </div>
            <div>{playerWrapper}</div>
          </div>
        </section>
      );
    }

    // ── Centered (default) + Framed layouts ──────────────────────────────
    return (
      <section
        ref={ref}
        aria-label={title ?? 'Video section'}
        data-bbangto-videoblock-layout={layout}
        style={sectionStyles}
        {...props}
      >
        {headingNode}
        {framedPlayer}
        {captionNode}
      </section>
    );
  }
);

VideoBlock.displayName = 'VideoBlock';
