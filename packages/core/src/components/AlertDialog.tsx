import React from 'react';
import { Modal, ModalProps } from './Modal';
import { Button } from './Button';
import { Text } from './Text';
import { cssVar } from '@centurio1987/tokens';

export type AlertDialogSize = 'sm' | 'md' | 'lg';
export type AlertDialogActionsAlign = 'left' | 'right';

export interface AlertDialogProps extends Omit<ModalProps, 'children' | 'title' | 'variant'> {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isDestructive?: boolean;
  /** Dialog panel width. 'sm'=280px, 'md'=400px (default), 'lg'=560px */
  size?: AlertDialogSize;
  /** Shows a spinner on the confirm button and disables interaction while true */
  loading?: boolean;
  /** Optional leading icon rendered above the title */
  icon?: React.ReactNode;
  /** Horizontal alignment of the action buttons row */
  actionsAlign?: AlertDialogActionsAlign;
}

const sizeToMaxWidth: Record<AlertDialogSize, string> = {
  sm: '280px',
  md: '400px',
  lg: '560px',
};

export const AlertDialog = React.forwardRef<HTMLDivElement, AlertDialogProps>(
  (
    {
      isOpen,
      onClose,
      title,
      description,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      onConfirm,
      isDestructive = false,
      size = 'md',
      loading = false,
      icon,
      actionsAlign = 'right',
      style,
      ...props
    },
    ref
  ) => {
    const handleConfirm = () => {
      if (loading) return;
      onConfirm();
      onClose();
    };

    const actionsStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: actionsAlign === 'left' ? 'flex-start' : 'flex-end',
      gap: cssVar('spacing', '8'),
      marginTop: cssVar('spacing', '24'),
    };

    const panelStyle: React.CSSProperties = {
      maxWidth: sizeToMaxWidth[size],
      ...style,
    };

    return (
      <Modal
        ref={ref}
        isOpen={isOpen}
        onClose={onClose}
        variant="popup"
        style={panelStyle}
        {...props}
      >
        <div style={{ padding: `${cssVar('spacing', '24')} ${cssVar('spacing', '24')} 0` }}>
          {icon && (
            <div
              style={{
                marginBottom: cssVar('spacing', '12'),
                color: isDestructive
                  ? cssVar('semantic', 'error', 'base')
                  : cssVar('semantic', 'foreground', 'muted'),
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {icon}
            </div>
          )}
          <Text variant="h3" style={{ fontWeight: 'bold', marginBottom: cssVar('spacing', '8') }}>
            {title}
          </Text>
          <Text variant="body" color="muted">
            {description}
          </Text>
        </div>

        <div style={actionsStyle} data-actions="">
          <Button variant="ghost" color="neutral" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            variant="solid"
            color={isDestructive ? 'error' : 'primary'}
            onClick={handleConfirm}
            loading={loading}
            disabled={loading}
          >
            {confirmText}
          </Button>
        </div>
      </Modal>
    );
  }
);

AlertDialog.displayName = 'AlertDialog';
