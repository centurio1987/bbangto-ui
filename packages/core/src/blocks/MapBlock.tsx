import React from 'react';
import { cssVar, breakpoints } from '@centurio1987/tokens';
import { Text } from '../components/Text';
import { Button } from '../components/Button';

export interface MapMarker {
  /** Display label for the map pin. */
  label: string;
  /** Horizontal position as a percentage (0–100) of the map area width. */
  x: number;
  /** Vertical position as a percentage (0–100) of the map area height. */
  y: number;
}

/**
 * Visual arrangement of the map relative to its info content.
 * - `full`  (default): full-bleed map with info above (existing behavior).
 * - `split`: map beside an info panel; 2-col at >=lg via scoped style.
 * - `card`:  map inside a bordered, rounded, elevated card.
 * - `stacked`: 2-row vertical grid (`grid-template-rows: auto 1fr`). A centred
 *   text header band (title + muted description) sits on top, with a full-bleed
 *   map media region anchored below. The map carries NO card chrome — no border,
 *   no rounded corners, no elevation (distinct from `card`) — and is never placed
 *   side-by-side with the copy (distinct from `split`).
 */
export type MapBlockLayout = 'full' | 'split' | 'card' | 'stacked';

export interface MapBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** Section heading displayed above the map. */
  title?: string;
  /** Address or location description rendered below the title. */
  address?: string;
  /** Array of pin markers to overlay on the placeholder map. */
  markers?: MapMarker[];
  /**
   * URL for embedding a real map (e.g. Google Maps embed URL).
   * When provided, an <iframe> is rendered instead of the placeholder.
   */
  embedSrc?: string;
  /** Visual arrangement of the map relative to its info content. */
  layout?: MapBlockLayout;
  /**
   * Custom info panel rendered beside the map in the `split` layout.
   * Falls back to the default title/address/directions column when omitted.
   */
  infoPanel?: React.ReactNode;
}

const BLOCK_ID = 'map-block';
const MAP_PLACEHOLDER_MIN_HEIGHT = 320;

export const MapBlock = React.forwardRef<HTMLElement, MapBlockProps>(
  (
    {
      title,
      address,
      markers = [],
      embedSrc,
      layout = 'full',
      infoPanel,
      style,
      className,
      ...props
    },
    ref
  ) => {
    const scopeId = BLOCK_ID;
    const isSplit = layout === 'split';
    const isCard = layout === 'card';
    const isStacked = layout === 'stacked';

    const sectionStyles: React.CSSProperties = {
      width: '100%',
      backgroundColor: cssVar('semantic', 'background', 'base'),
      padding: `${cssVar('spacing', '64')} ${cssVar('spacing', '24')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      boxSizing: 'border-box',
      ...style,
    };

    const innerStyles: React.CSSProperties = {
      maxWidth: '1200px',
      margin: '0 auto',
      ...(isStacked
        ? {
            // Vertical 2-row grid: header band (auto) over a full-bleed map (1fr).
            // Single column — copy is never beside the map (unlike split).
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            gridTemplateColumns: '1fr',
            gap: cssVar('spacing', '40'),
            alignItems: 'stretch',
          }
        : isSplit
        ? {
            // Single column on mobile; scoped <style> upgrades to 2-col at >=lg.
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: cssVar('spacing', '40'),
            alignItems: 'start',
          }
        : {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: cssVar('spacing', '40'),
            alignItems: 'start',
          }),
    };

    const infoStyles: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: cssVar('spacing', '16'),
      // Stacked: centre the header band over the map media region.
      ...(isStacked ? { textAlign: 'center', alignItems: 'center' } : null),
    };

    const mapAreaStyles: React.CSSProperties = {
      position: 'relative',
      width: '100%',
      minHeight: `${MAP_PLACEHOLDER_MIN_HEIGHT}px`,
      overflow: 'hidden',
      ...(isStacked
        ? {
            // Full-bleed map media region: no card chrome — no border, no rounded
            // corners, no elevation (this is what distinguishes it from `card`).
            border: 'none',
            borderRadius: '0',
          }
        : {
            borderRadius: isCard ? cssVar('radius', 'xl') : cssVar('radius', 'lg'),
            border: `1px solid ${cssVar('semantic', 'border', isCard ? 'strong' : 'base')}`,
            ...(isCard
              ? {
                  borderStyle: 'solid',
                  backgroundColor: cssVar('semantic', 'background', 'elevated'),
                  boxShadow: cssVar('shadow', 'lg'),
                }
              : {}),
          }),
    };

    const placeholderStyles: React.CSSProperties = {
      width: '100%',
      height: '100%',
      minHeight: `${MAP_PLACEHOLDER_MIN_HEIGHT}px`,
      backgroundColor: cssVar('semantic', 'background', 'sunken'),
      backgroundImage: [
        `linear-gradient(${cssVar('semantic', 'border', 'base')} 1px, transparent 1px)`,
        `linear-gradient(90deg, ${cssVar('semantic', 'border', 'base')} 1px, transparent 1px)`,
      ].join(', '),
      backgroundSize: '40px 40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    const iframeStyles: React.CSSProperties = {
      width: '100%',
      minHeight: `${MAP_PLACEHOLDER_MIN_HEIGHT}px`,
      border: 'none',
      display: 'block',
    };

    return (
      <>
        {/* Scoped responsive style — only emitted once per component family */}
        <style>{`
          @media (max-width: ${breakpoints.md - 0.02}px) {
            [data-block="${scopeId}"] .map-block__inner {
              grid-template-columns: 1fr;
            }
          }
          ${
            isSplit
              ? `@media (min-width:${breakpoints.lg}px){.bbangto-mapblock-split{grid-template-columns:minmax(280px,360px) 1fr;}}`
              : ''
          }
        `}</style>

        <section
          ref={ref}
          aria-labelledby={title ? `${scopeId}-title` : undefined}
          data-block={scopeId}
          data-bbangto-mapblock-layout={layout}
          style={sectionStyles}
          className={className}
          {...props}
        >
          <div
            className={
              isSplit ? 'map-block__inner bbangto-mapblock-split' : 'map-block__inner'
            }
            style={innerStyles}
          >
            {/* Custom info panel (split layout): caller-supplied content beside the map */}
            {isSplit && infoPanel !== undefined && (
              <div style={infoStyles} data-testid="map-block-info-panel">
                {infoPanel}
              </div>
            )}

            {/* Info column: title + address */}
            {!(isSplit && infoPanel !== undefined) && (title || address) && (
              <div style={infoStyles}>
                {title && (
                  <Text
                    variant="h2"
                    id={`${scopeId}-title`}
                    data-testid="map-block-title"
                  >
                    {title}
                  </Text>
                )}
                {address && (
                  <address
                    style={{
                      fontStyle: 'normal',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: cssVar('spacing', '4'),
                    }}
                  >
                    <Text
                      variant="body"
                      color="muted"
                      data-testid="map-block-address"
                    >
                      {address}
                    </Text>
                  </address>
                )}
                {address && (
                  <Button
                    variant="outline"
                    color="primary"
                    size="md"
                    aria-label={`길 찾기: ${address}`}
                    data-testid="map-block-directions-btn"
                    style={{ alignSelf: 'flex-start', marginTop: cssVar('spacing', '8') }}
                  >
                    길 찾기
                  </Button>
                )}
              </div>
            )}

            {/* Map column: iframe or styled placeholder */}
            <div style={mapAreaStyles} aria-label={title ? `${title} 지도` : '위치 지도'}>
              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  title={title ? `${title} 지도` : '위치 지도'}
                  style={iframeStyles}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin"
                />
              ) : (
                <div
                  style={placeholderStyles}
                  role="img"
                  aria-label={title ? `${title} 지도 플레이스홀더` : '지도 플레이스홀더'}
                >
                  <Text variant="meta" color="subtle" aria-hidden="true">
                    지도
                  </Text>
                </div>
              )}

              {/* Marker pins overlay */}
              {markers.length > 0 && (
                <ol
                  aria-label="지도 마커 목록"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {markers.map((marker, idx) => (
                    <li
                      key={idx}
                      style={{
                        position: 'absolute',
                        left: `${marker.x}%`,
                        top: `${marker.y}%`,
                        transform: 'translate(-50%, -100%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 0,
                        pointerEvents: 'auto',
                      }}
                      title={marker.label}
                    >
                      {/* Pin head */}
                      <span
                        aria-hidden="true"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: cssVar('radius', 'full'),
                          backgroundColor: cssVar('semantic', 'primary', 'base'),
                          border: `2px solid ${cssVar('semantic', 'background', 'elevated')}`,
                          boxShadow: cssVar('shadow', 'md'),
                          display: 'block',
                          flexShrink: 0,
                        }}
                      />
                      {/* Pin tail */}
                      <span
                        aria-hidden="true"
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '5px solid transparent',
                          borderRight: '5px solid transparent',
                          borderTop: `8px solid ${cssVar('semantic', 'primary', 'base')}`,
                          display: 'block',
                        }}
                      />
                      {/* Label */}
                      <span
                        style={{
                          display: 'block',
                          marginTop: cssVar('spacing', '4'),
                          backgroundColor: cssVar('semantic', 'background', 'elevated'),
                          color: cssVar('semantic', 'foreground', 'base'),
                          fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
                          fontWeight: cssVar('typography', 'scale', 'meta', 'fontWeight'),
                          lineHeight: cssVar('typography', 'scale', 'meta', 'lineHeight'),
                          fontFamily: cssVar('typography', 'fontFamily', 'sans'),
                          padding: `${cssVar('spacing', '2')} ${cssVar('spacing', '6')}`,
                          borderRadius: cssVar('radius', 'sm'),
                          boxShadow: cssVar('shadow', 'sm'),
                          whiteSpace: 'nowrap',
                          border: `1px solid ${cssVar('semantic', 'border', 'base')}`,
                        }}
                      >
                        {marker.label}
                      </span>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </div>
        </section>
      </>
    );
  }
);

MapBlock.displayName = 'MapBlock';
