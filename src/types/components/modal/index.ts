import { ReactNode } from 'react';

/**
 * Interfaces para componentes modales
 */

export * from './Modal.interface';
export * from './ActionModal.interface';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
}

export interface ActionModalProps extends ModalProps {
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  confirmButtonVariant?: 'primary' | 'danger' | 'success';
  footer?: ReactNode;
}
