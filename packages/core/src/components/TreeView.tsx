import React, { useState, useCallback, useRef } from 'react';
import { cssVar } from '@centurio1987/bbangto-ui-tokens';

// ── Types ──────────────────────────────────────────────────────────────────

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  icon?: React.ReactNode;
}

/** Visual variant axis for the TreeView. */
export type TreeViewVariant = 'default' | 'connected' | 'compact' | 'bordered';

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  nodes: TreeNode[];
  /** IDs expanded by default (uncontrolled). */
  defaultExpandedIds?: string[];
  /** Controlled selected ID. */
  selectedId?: string;
  /** Default selected ID (uncontrolled). */
  defaultSelectedId?: string;
  /** Called when a node is selected. */
  onSelect?: (id: string) => void;
  /** Called when the expanded set changes. */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** Visual variant. Defaults to 'default' (indentation only). */
  variant?: TreeViewVariant;
}

// ── Internal flat-item helper ──────────────────────────────────────────────

interface FlatItem {
  id: string;
  level: number;
  /** Parent node id, or null for root. */
  parentId: string | null;
}

function flattenVisible(
  nodes: TreeNode[],
  expandedIds: Set<string>,
  level = 1,
  parentId: string | null = null,
): FlatItem[] {
  const result: FlatItem[] = [];
  for (const node of nodes) {
    result.push({ id: node.id, level, parentId });
    if (node.children && node.children.length > 0 && expandedIds.has(node.id)) {
      result.push(...flattenVisible(node.children, expandedIds, level + 1, node.id));
    }
  }
  return result;
}

// ── Component ──────────────────────────────────────────────────────────────

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (
    {
      nodes,
      defaultExpandedIds = [],
      selectedId: controlledSelectedId,
      defaultSelectedId,
      onSelect,
      onExpandedChange,
      variant = 'default',
      style,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState<string | undefined>(
      defaultSelectedId,
    );
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
      () => new Set(defaultExpandedIds),
    );

    const isControlledSelection = controlledSelectedId !== undefined;
    const selectedId = isControlledSelection ? controlledSelectedId : uncontrolledSelectedId;

    const treeRef = useRef<HTMLUListElement | null>(null);

    // Merge forwarded ref with internal ref
    const setRefs = useCallback(
      (node: HTMLUListElement | null) => {
        (treeRef as React.MutableRefObject<HTMLUListElement | null>).current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLUListElement | null>).current = node;
        }
      },
      [ref],
    );

    const handleToggle = useCallback(
      (id: string) => {
        setExpandedIds((prev) => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          onExpandedChange?.(Array.from(next));
          return next;
        });
      },
      [onExpandedChange],
    );

    const handleSelect = useCallback(
      (id: string) => {
        if (!isControlledSelection) {
          setUncontrolledSelectedId(id);
        }
        onSelect?.(id);
      },
      [isControlledSelection, onSelect],
    );

    // Keyboard navigation: collect flat visible items to navigate between
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLUListElement>) => {
        e.stopPropagation();
        const flat = flattenVisible(nodes, expandedIds);
        const itemElements = treeRef.current
          ? Array.from(
              treeRef.current.querySelectorAll<HTMLElement>('[role="treeitem"]'),
            )
          : [];

        const focusedEl = treeRef.current?.ownerDocument?.activeElement as HTMLElement | null;
        const focusedIndex = itemElements.indexOf(focusedEl as HTMLElement);
        const focusedId = focusedEl?.getAttribute('data-node-id') ?? null;
        const focusedFlatIndex = flat.findIndex((f) => f.id === focusedId);

        switch (e.key) {
          case 'ArrowDown': {
            e.preventDefault();
            if (focusedIndex < itemElements.length - 1) {
              itemElements[focusedIndex + 1]?.focus();
            }
            break;
          }
          case 'ArrowUp': {
            e.preventDefault();
            if (focusedIndex > 0) {
              itemElements[focusedIndex - 1]?.focus();
            }
            break;
          }
          case 'ArrowRight': {
            e.preventDefault();
            if (focusedId !== null) {
              // Find node with children
              const hasChildren = hasNodeChildren(nodes, focusedId);
              if (hasChildren && !expandedIds.has(focusedId)) {
                handleToggle(focusedId);
              } else if (hasChildren && expandedIds.has(focusedId)) {
                // Move to first child
                if (focusedFlatIndex < flat.length - 1) {
                  itemElements[focusedIndex + 1]?.focus();
                }
              }
            }
            break;
          }
          case 'ArrowLeft': {
            e.preventDefault();
            if (focusedId !== null) {
              if (expandedIds.has(focusedId)) {
                handleToggle(focusedId);
              } else {
                // Move to parent
                const parentId = flat[focusedFlatIndex]?.parentId;
                if (parentId !== null && parentId !== undefined) {
                  const parentIndex = itemElements.findIndex(
                    (el) => el.getAttribute('data-node-id') === parentId,
                  );
                  if (parentIndex !== -1) {
                    itemElements[parentIndex]?.focus();
                  }
                }
              }
            }
            break;
          }
          case 'Enter':
          case ' ': {
            e.preventDefault();
            if (focusedId !== null) {
              handleSelect(focusedId);
            }
            break;
          }
          default:
            break;
        }
      },
      [nodes, expandedIds, handleToggle, handleSelect],
    );

    const isBordered = variant === 'bordered';
    const isConnected = variant === 'connected';

    const treeStyles: React.CSSProperties = {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontFamily: cssVar('typography', 'fontFamily', 'sans'),
      fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
      color: cssVar('semantic', 'foreground', 'base'),
      ...(isBordered
        ? {
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: cssVar('semantic', 'border', 'base'),
            borderRadius: cssVar('radius', 'md'),
            padding: cssVar('spacing', '4'),
          }
        : null),
      ...style,
    };

    const connectedClass = isConnected ? 'bbangto-treeview-connected' : undefined;

    return (
      <>
        {isConnected && (
          <style>
            {`
.bbangto-treeview-connected [role="group"] {
  position: relative;
}
.bbangto-treeview-connected [role="group"]::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--bbangto-treeview-guide-left, 16px);
  width: 1px;
  background-color: ${cssVar('semantic', 'border', 'base')};
}
`}
          </style>
        )}
        <ul
          ref={setRefs}
          role="tree"
          className={connectedClass}
          data-bbangto-treeview-variant={variant}
          style={treeStyles}
          onKeyDown={handleKeyDown}
          {...props}
        >
          {nodes.map((node) => (
            <TreeItem
              key={node.id}
              node={node}
              level={1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              variant={variant}
              onToggle={handleToggle}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      </>
    );
  },
);

TreeView.displayName = 'TreeView';

// ── TreeItem (internal) ────────────────────────────────────────────────────

interface TreeItemProps {
  node: TreeNode;
  level: number;
  expandedIds: Set<string>;
  selectedId: string | undefined;
  variant: TreeViewVariant;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}

function hasNodeChildren(nodes: TreeNode[], id: string): boolean {
  for (const node of nodes) {
    if (node.id === id) {
      return Boolean(node.children && node.children.length > 0);
    }
    if (node.children) {
      const found = hasNodeChildren(node.children, id);
      if (found) return found;
    }
  }
  return false;
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  expandedIds,
  selectedId,
  variant,
  onToggle,
  onSelect,
}) => {
  const hasChildren = Boolean(node.children && node.children.length > 0);
  const isExpanded = hasChildren && expandedIds.has(node.id);
  const isSelected = selectedId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggle(node.id);
    }
    onSelect(node.id);
  };

  const indent = (level - 1) * 20; // px, layout-only — no spacing token for this depth offset
  const isCompact = variant === 'compact';

  const itemRowStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: cssVar('spacing', '6'),
    paddingTop: isCompact ? cssVar('spacing', '1') : cssVar('spacing', '4'),
    paddingBottom: isCompact ? cssVar('spacing', '1') : cssVar('spacing', '4'),
    paddingLeft: `${indent + 8}px`,
    paddingRight: cssVar('spacing', '8'),
    cursor: 'pointer',
    borderRadius: cssVar('radius', 'sm'),
    backgroundColor: isSelected
      ? cssVar('semantic', 'primary', 'subtle')
      : 'transparent',
    color: isSelected
      ? cssVar('semantic', 'primary', 'base')
      : cssVar('semantic', 'foreground', 'base'),
    outline: 'none',
    userSelect: 'none',
    transition: `background-color ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
  };

  const chevronStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    width: '16px',
    height: '16px',
    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: `transform ${cssVar('motion', 'duration', 'fast')} ${cssVar('motion', 'easing', 'default')}`,
    color: cssVar('semantic', 'foreground', 'muted'),
  };

  const spacerStyles: React.CSSProperties = {
    display: 'inline-flex',
    width: '16px',
    flexShrink: 0,
  };

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      aria-level={level}
      data-node-id={node.id}
      tabIndex={0}
      style={{ listStyle: 'none' }}
      onClick={handleClick}
    >
      <div style={itemRowStyles}>
        {/* Expand/collapse chevron or spacer */}
        {hasChildren ? (
          <span
            aria-hidden="true"
            style={chevronStyles}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        ) : (
          <span aria-hidden="true" style={spacerStyles} />
        )}
        {/* Optional icon */}
        {node.icon && (
          <span
            aria-hidden="true"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              flexShrink: 0,
              color: cssVar('semantic', 'foreground', 'muted'),
            }}
          >
            {node.icon}
          </span>
        )}
        {/* Label */}
        <span
          style={{
            flex: 1,
            fontSize: cssVar('typography', 'scale', 'body', 'fontSize'),
            lineHeight: cssVar('typography', 'scale', 'body', 'lineHeight'),
            fontWeight: isSelected
              ? cssVar('typography', 'scale', 'meta', 'fontWeight')
              : cssVar('typography', 'scale', 'body', 'fontWeight'),
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {node.label}
        </span>
      </div>

      {/* Children group */}
      {hasChildren && (
        <ul
          role="group"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: isExpanded ? 'block' : 'none',
          }}
        >
          {node.children!.map((child) => (
            <TreeItem
              key={child.id}
              node={child}
              level={level + 1}
              expandedIds={expandedIds}
              selectedId={selectedId}
              variant={variant}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

TreeItem.displayName = 'TreeItem';
