import React from 'react';
import { cssVar } from '@bbangto-ui/tokens';
import { Text } from './Text';

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  separator?: React.ReactNode;
  children: React.ReactNode;
}

export const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  ({ separator = '/', children, style, ...props }, ref) => {
    
    // Convert children to an array and filter out falsy values
    const validChildren = React.Children.toArray(children).filter(Boolean);

    const navStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: 0,
      margin: 0,
      listStyle: 'none',
      ...style,
    };

    const separatorStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      margin: `0 ${cssVar('spacing', '8')}`,
      color: cssVar('semantic', 'foreground', 'muted'),
      fontSize: cssVar('typography', 'scale', 'meta', 'fontSize'),
      userSelect: 'none',
    };

    return (
      <nav ref={ref} aria-label="breadcrumb" {...props}>
        <ol style={navStyle}>
          {validChildren.map((child, index) => {
            const isLast = index === validChildren.length - 1;

            return (
              <li key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }} aria-current={isLast ? 'page' : undefined}>
                  {child}
                </div>
                {!isLast && (
                  <span aria-hidden="true" style={separatorStyle}>
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumbs.displayName = 'Breadcrumbs';

// --- BreadcrumbItem ---
export interface BreadcrumbItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href?: string;
  isCurrentPage?: boolean;
}

export const BreadcrumbItem = React.forwardRef<HTMLAnchorElement, BreadcrumbItemProps>(
  ({ href, isCurrentPage, children, style, ...props }, ref) => {
    const itemStyle: React.CSSProperties = {
      textDecoration: 'none',
      color: isCurrentPage ? cssVar('semantic', 'foreground', 'base') : cssVar('semantic', 'foreground', 'muted'),
      fontWeight: isCurrentPage ? 'bold' : 'normal',
      transition: `color ${cssVar('motion', 'duration', 'fast')}`,
      cursor: href ? 'pointer' : 'default',
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href && !isCurrentPage) {
        e.currentTarget.style.color = cssVar('semantic', 'primary', 'base');
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isCurrentPage) {
        e.currentTarget.style.color = cssVar('semantic', 'foreground', 'muted');
      }
    };

    if (href) {
      return (
        <a 
          ref={ref} 
          href={href} 
          style={itemStyle} 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...props}
        >
          <Text variant="body" style={{ color: 'inherit', fontWeight: 'inherit' }}>
            {children}
          </Text>
        </a>
      );
    }

    return (
      <span ref={ref as any} style={itemStyle} {...(props as any)}>
        <Text variant="body" style={{ color: 'inherit', fontWeight: 'inherit' }}>
          {children}
        </Text>
      </span>
    );
  }
);
BreadcrumbItem.displayName = 'BreadcrumbItem';
