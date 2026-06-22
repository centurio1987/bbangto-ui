import React from 'react';
import { Modal, ModalProps } from './Modal';
import { Button } from './Button';
import { Text } from './Text';
import { cssVar } from '@centurio87/tokens';

export interface AlertDialogProps extends Omit<ModalProps, 'children' | 'title' | 'variant'> {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isDestructive?: boolean;
}

export function AlertDialog({
  isOpen,
  onClose,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  isDestructive = false,
  ...props
}: AlertDialogProps) {
  
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: cssVar('spacing', '8'),
    marginTop: cssVar('spacing', '24'),
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      variant="popup" 
      {...props}
    >
      <div style={{ padding: `${cssVar('spacing', '24')} ${cssVar('spacing', '24')} 0` }}>
        <Text variant="h3" style={{ fontWeight: 'bold', marginBottom: cssVar('spacing', '8') }}>
          {title}
        </Text>
        <Text variant="body" color="muted">
          {description}
        </Text>
      </div>

      <div style={actionsStyle}>
        <Button variant="ghost" color="neutral" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="solid" color={isDestructive ? 'error' : 'primary'} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
