import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

// --- Types ---
export type TabsVariant = 'underline' | 'pill' | 'enclosed' | 'segmented';
export type TabsSize = 'sm' | 'md' | 'lg';
export type TabsOrientation = 'horizontal' | 'vertical';

// --- Context ---
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
  variant: TabsVariant;
  size: TabsSize;
  orientation: TabsOrientation;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

// --- Tabs (Root) ---
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  /** Visual style for the tab list. @default 'underline' */
  variant?: TabsVariant;
  /** Density / size of tab triggers. @default 'md' */
  size?: TabsSize;
  /** Layout direction. @default 'horizontal' */
  orientation?: TabsOrientation;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue,
      value,
      onValueChange,
      variant = 'underline',
      size = 'md',
      orientation = 'horizontal',
      children,
      style,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    const rootStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: orientation === 'vertical' ? 'row' : 'column',
      ...style,
    };

    return (
      <TabsContext.Provider
        value={{ value: currentValue, onValueChange: handleValueChange, variant, size, orientation }}
      >
        <div ref={ref} style={rootStyle} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);
Tabs.displayName = 'Tabs';

// --- TabsList ---
export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, style, ...props }, ref) => {
    const { value, variant, orientation } = useTabsContext();
    const listRef = useRef<HTMLDivElement | null>(null);
    const [indicator, setIndicator] = useState({ left: 0, top: 0, width: 0, height: 0, visible: false });

    // Underline sliding indicator — only for the 'underline' variant.
    useEffect(() => {
      if (variant !== 'underline') return;
      const list = listRef.current;
      if (!list) return;

      const selected = Array.from(
        list.querySelectorAll<HTMLElement>('[data-bbangto-tab-trigger]'),
      ).find((trigger) => trigger.dataset.bbangtoTabTrigger === value);

      if (!selected) {
        setIndicator((current) => ({ ...current, visible: false }));
        return;
      }

      const updateIndicator = () => {
        setIndicator({
          left: selected.offsetLeft,
          top: selected.offsetTop,
          width: selected.offsetWidth,
          height: selected.offsetHeight,
          visible: true,
        });
      };

      updateIndicator();

      if (typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver(updateIndicator);
      observer.observe(list);
      observer.observe(selected);
      return () => observer.disconnect();
    }, [children, value, variant]);

    // ── variant-specific list styles ──
    let listStyle: React.CSSProperties;

    if (variant === 'underline') {
      listStyle = {
        position: 'relative',
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        borderBottom: orientation === 'horizontal'
          ? `1px solid ${cssVar('semantic', 'border', 'muted')}`
          : 'none',
        borderRight: orientation === 'vertical'
          ? `1px solid ${cssVar('semantic', 'border', 'muted')}`
          : 'none',
        ...style,
      };
    } else if (variant === 'pill') {
      listStyle = {
        display: 'inline-flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        gap: cssVar('spacing', '4'),
        padding: cssVar('spacing', '4'),
        borderRadius: cssVar('radius', 'full'),
        backgroundColor: cssVar('semantic', 'background', 'sunken'),
        ...style,
      };
    } else if (variant === 'segmented') {
      // segmented: one outer hairline border + radius wrapping the whole
      // group, a sunken track, and `overflow:hidden` so the equal-width
      // rectangular cells clip to the rounded chrome. Cell dividers are drawn
      // by each trigger's leading border (collapsed via a -1px margin), not by
      // a per-cell box — that keeps it distinct from pill (gapped pills on a
      // bare bg) and enclosed (per-tab open-bottom panels).
      listStyle = {
        display: 'inline-flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
        borderRadius: cssVar('radius', 'md'),
        backgroundColor: cssVar('semantic', 'background', 'sunken'),
        overflow: 'hidden',
        ...style,
      };
    } else {
      // enclosed
      listStyle = {
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'column' : 'row',
        borderBottom: orientation === 'horizontal'
          ? `1px solid ${cssVar('semantic', 'border', 'muted')}`
          : 'none',
        borderRight: orientation === 'vertical'
          ? `1px solid ${cssVar('semantic', 'border', 'muted')}`
          : 'none',
        ...style,
      };
    }

    const indicatorStyle: React.CSSProperties =
      variant === 'underline'
        ? {
            position: 'absolute',
            left: orientation === 'vertical' ? 'auto' : 0,
            right: orientation === 'vertical' ? '-1px' : 'auto',
            bottom: orientation === 'horizontal' ? '-1px' : 'auto',
            top: orientation === 'vertical' ? 0 : 'auto',
            width: orientation === 'vertical' ? '2px' : indicator.width,
            height: orientation === 'vertical' ? indicator.height : '2px',
            borderRadius: cssVar('radius', 'full'),
            backgroundColor: cssVar('semantic', 'primary', 'base'),
            opacity: indicator.visible ? 1 : 0,
            transform: orientation === 'vertical'
              ? `translateY(${indicator.top}px)`
              : `translateX(${indicator.left}px)`,
            transition: [
              `transform ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
              `width ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
              `height ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'inOut')}`,
              `opacity ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'out')}`,
            ].join(', '),
            pointerEvents: 'none',
          }
        : {};

    return (
      <div
        ref={(node) => {
          listRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        role="tablist"
        aria-orientation={orientation}
        data-bbangto-tabs-variant={variant}
        style={listStyle}
        {...props}
      >
        {children}
        {variant === 'underline' && (
          <div data-bbangto-tabs-indicator style={indicatorStyle} />
        )}
      </div>
    );
  }
);
TabsList.displayName = 'TabsList';

// --- TabsTrigger ---
export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, style, disabled, ...props }, ref) => {
    const { value: selectedValue, onValueChange, variant, size, orientation } = useTabsContext();
    const isSelected = selectedValue === value;
    const isDisabled = disabled === true;

    // ── padding by size ──
    const paddingY =
      size === 'sm'
        ? cssVar('spacing', '6')
        : size === 'lg'
        ? cssVar('spacing', '16')
        : cssVar('spacing', '12');
    const paddingX =
      size === 'sm'
        ? cssVar('spacing', '10')
        : size === 'lg'
        ? cssVar('spacing', '24')
        : cssVar('spacing', '16');
    const fontSize =
      size === 'sm'
        ? cssVar('typography', 'scale', 'meta', 'fontSize')
        : size === 'lg'
        ? cssVar('typography', 'scale', 'h3', 'fontSize')
        : cssVar('typography', 'scale', 'body', 'fontSize');

    // ── variant-specific trigger styles ──
    let triggerStyle: React.CSSProperties;

    if (variant === 'underline') {
      triggerStyle = {
        background: 'none',
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        padding: `${paddingY} ${paddingX}`,
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        fontSize,
        fontWeight: isSelected ? 'bold' : 'normal',
        color: isDisabled
          ? cssVar('semantic', 'disabled', 'foreground')
          : isSelected
          ? cssVar('semantic', 'primary', 'base')
          : cssVar('semantic', 'foreground', 'muted'),
        borderBottom: '2px solid transparent',
        marginBottom: '-1px',
        opacity: isDisabled ? 0.5 : 1,
        transition: `color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        ...style,
      };
    } else if (variant === 'pill') {
      triggerStyle = {
        background: isSelected ? cssVar('semantic', 'background', 'base') : 'none',
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        padding: `${paddingY} ${paddingX}`,
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        fontSize,
        fontWeight: isSelected ? 'bold' : 'normal',
        color: isDisabled
          ? cssVar('semantic', 'disabled', 'foreground')
          : isSelected
          ? cssVar('semantic', 'foreground', 'base')
          : cssVar('semantic', 'foreground', 'muted'),
        borderRadius: cssVar('radius', 'full'),
        boxShadow: isSelected ? `0 1px 4px 0 ${cssVar('semantic', 'border', 'muted')}` : 'none',
        opacity: isDisabled ? 0.5 : 1,
        transition: [
          `background ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
          `color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
          `box-shadow ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        ].join(', '),
        ...style,
      };
    } else if (variant === 'segmented') {
      // Equal-width rectangular cell. Only the active cell paints a `base`
      // fill (the track itself stays sunken/transparent). The leading
      // divider is a 1px border collapsed onto the previous cell with a -1px
      // margin; the first cell's divider slides under the container border and
      // is clipped by the list's `overflow:hidden`, so only between-cell
      // dividers remain visible.
      const divider = `1px solid ${cssVar('semantic', 'border', 'muted')}`;
      triggerStyle = {
        flex: '1 0 0%',
        background: isSelected ? cssVar('semantic', 'background', 'base') : 'transparent',
        border: 'none',
        borderLeft: orientation === 'vertical' ? 'none' : divider,
        borderTop: orientation === 'vertical' ? divider : 'none',
        marginLeft: orientation === 'vertical' ? '0' : '-1px',
        marginTop: orientation === 'vertical' ? '-1px' : '0',
        borderRadius: '0',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        padding: `${paddingY} ${paddingX}`,
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        fontSize,
        fontWeight: isSelected ? 'bold' : 'normal',
        textAlign: 'center',
        color: isDisabled
          ? cssVar('semantic', 'disabled', 'foreground')
          : isSelected
          ? cssVar('semantic', 'foreground', 'base')
          : cssVar('semantic', 'foreground', 'muted'),
        opacity: isDisabled ? 0.5 : 1,
        transition: [
          `background ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
          `color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        ].join(', '),
        ...style,
      };
    } else {
      // enclosed
      triggerStyle = {
        background: isSelected ? cssVar('semantic', 'background', 'base') : 'none',
        border: `1px solid ${isSelected ? cssVar('semantic', 'border', 'muted') : 'transparent'}`,
        borderBottom: isSelected ? `1px solid ${cssVar('semantic', 'background', 'base')}` : '1px solid transparent',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        padding: `${paddingY} ${paddingX}`,
        fontFamily: cssVar('typography', 'fontFamily', 'sans'),
        fontSize,
        fontWeight: isSelected ? 'bold' : 'normal',
        color: isDisabled
          ? cssVar('semantic', 'disabled', 'foreground')
          : isSelected
          ? cssVar('semantic', 'foreground', 'base')
          : cssVar('semantic', 'foreground', 'muted'),
        borderRadius: `${cssVar('radius', 'md')} ${cssVar('radius', 'md')} 0 0`,
        marginBottom: isSelected ? '-1px' : '0',
        opacity: isDisabled ? 0.5 : 1,
        transition: [
          `background ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
          `color ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'default')}`,
        ].join(', '),
        ...style,
      };
    }

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-disabled={isDisabled || undefined}
        disabled={isDisabled}
        data-bbangto-tab-trigger={value}
        data-bbangto-tabs-size={size}
        onClick={() => {
          if (!isDisabled) onValueChange(value);
        }}
        style={triggerStyle}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';

// --- TabsContent ---
export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, style, ...props }, ref) => {
    const { value: selectedValue } = useTabsContext();

    if (selectedValue !== value) return null;

    const contentStyle: React.CSSProperties = {
      padding: `${cssVar('spacing', '16')} 0`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      color: cssVar('semantic', 'foreground', 'base'),
      animation: `bbangto-fade-in ${cssVar('motion', 'duration', 'normal')} ${cssVar('motion', 'easing', 'out')} both`,
      ...style,
    };

    return (
      <div ref={ref} role="tabpanel" data-bbangto-tabs-content style={contentStyle} {...props}>
        {children}
      </div>
    );
  }
);
TabsContent.displayName = 'TabsContent';

// Export as a compound object as well for convenience
export const TabsComponent = Object.assign(Tabs, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});
