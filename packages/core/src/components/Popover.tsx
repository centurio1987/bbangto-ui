import React, { useState, useRef, useEffect } from 'react';
import { cssVar } from '@centurio87/tokens';

export interface PopoverProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export function Popover({ 
  content, 
  children, 
  position = 'bottom', 
  isOpen: controlledIsOpen,
  onOpenChange,
  style, 
  ...props 
}: PopoverProps) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen;

  const handleOpenToggle = () => {
    const nextState = !isOpen;
    if (!isControlled) {
      setUncontrolledIsOpen(nextState);
    }
    onOpenChange?.(nextState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (isOpen) {
          if (!isControlled) setUncontrolledIsOpen(false);
          onOpenChange?.(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, isControlled, onOpenChange]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    ...style,
  };

  const getPositionStyles = (): React.CSSProperties => {
    switch (position) {
      case 'bottom':
        return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: cssVar('spacing', '4') };
      case 'left':
        return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: cssVar('spacing', '4') };
      case 'right':
        return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: cssVar('spacing', '4') };
      case 'top':
      default:
        return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: cssVar('spacing', '4') };
    }
  };

  const popoverStyle: React.CSSProperties = {
    position: 'absolute',
    ...getPositionStyles(),
    backgroundColor: cssVar('semantic', 'background', 'elevated'),
    border: `1px solid ${cssVar('semantic', 'border', 'muted')}`,
    borderRadius: cssVar('radius', 'md'),
    boxShadow: cssVar('shadow', 'lg'),
    zIndex: cssVar('zIndex', 'popover'),
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: `opacity ${cssVar('motion', 'duration', 'fast')}, visibility ${cssVar('motion', 'duration', 'fast')}`,
    minWidth: '200px',
  };

  return (
    <div ref={containerRef} style={containerStyle} {...props}>
      <div onClick={handleOpenToggle} style={{ display: 'inline-block' }}>
        {children}
      </div>
      <div style={popoverStyle} role="dialog">
        {content}
      </div>
    </div>
  );
}
