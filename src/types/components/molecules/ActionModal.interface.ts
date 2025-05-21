import { ReactNode } from 'react';
import { ModalProps } from './Modal.interface';

export interface ActionModalProps extends ModalProps {
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  confirmButtonVariant?: 'primary' | 'danger' | 'success';
  footer?: ReactNode;
}
