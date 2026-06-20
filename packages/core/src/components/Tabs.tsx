import React, { createContext, useContext, useState } from 'react';
import { cssVar } from '@bbangto-ui/tokens';

// --- Context ---
interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
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
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, children, style, ...props }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : uncontrolledValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} style={{ display: 'flex', flexDirection: 'column', ...style }} {...props}>
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
    const listStyle: React.CSSProperties = {
      display: 'flex',
      borderBottom: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
      ...style,
    };

    return (
      <div ref={ref} role="tablist" style={listStyle} {...props}>
        {children}
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
  ({ value, children, style, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = useTabsContext();
    const isSelected = selectedValue === value;

    const triggerStyle: React.CSSProperties = {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: `${cssVar('spacing', '12')} ${cssVar('spacing', '16')}`,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      fontWeight: isSelected ? 'bold' : 'normal',
      color: isSelected ? cssVar('semantic', 'primary', 'base') : cssVar('semantic', 'foreground', 'muted'),
      borderBottom: isSelected ? `2px solid ${cssVar('semantic', 'primary', 'base')}` : '2px solid transparent',
      marginBottom: '-1px', // overlap the list's bottom border
      transition: 'color 0.2s, border-color 0.2s',
      ...style,
    };

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        onClick={() => onValueChange(value)}
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
      ...style,
    };

    return (
      <div ref={ref} role="tabpanel" style={contentStyle} {...props}>
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
