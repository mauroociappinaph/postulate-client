import { User, AuthState } from "./interface/auth/authStore.interface";
import { Postulation, PostulationState, PostulationStatus, STATUS_LABELS, STATUS_COLORS } from "./interface/postulations/postulation";
import { SimpleSelectProps } from "./interface/ui/simpleSelect.interface";
import { ModalProps } from "./interface/modal/modal.interface";
import { PasswordToggleProps } from "./interface/password-toggle";
import { NewPostulationFormProps, NewPostulationFormValues } from "./interface/form/NewPostulationForm.interface";

// Exportar tipos
export type {
  User,
  AuthState,
  Postulation,
  PostulationState,
  PostulationStatus,
  SimpleSelectProps,
  ModalProps,
  PasswordToggleProps,
  NewPostulationFormProps,
  NewPostulationFormValues
};

// Exportar valores
export { STATUS_LABELS, STATUS_COLORS };

// Auth
export * from './interface/auth/authStore.interface';

// Components
export * from './components/atoms';
export * from './components/molecules';
export * from './components/organisms';

// Postulations
export { ApplicationStatus } from './postulations/application-status';

// UI
export * from './interface/ui/simpleSelect.interface';
export * from './interface/modal/modal.interface';
export * from './interface/password-toggle';

// Form
export * from './interface/form/NewPostulationForm.interface';

// Language
export * from './lang';

/**
 * Punto de entrada para todas las interfaces
 * Centraliza las exportaciones de interfaces por dominio
 */

// UI Interfaces
export * from './ui';

// Modal Interfaces
export * from './components/modal';

// Form Interfaces
export * from './form';

// Auth Interfaces
export * from './auth';

// Component Interfaces
export * from './components';

// Postulation Interfaces
export * from './postulations/postulation';

// Password Toggle Interface
export * from './password-toggle.interface';
