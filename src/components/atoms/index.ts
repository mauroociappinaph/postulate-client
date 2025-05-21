/**
 * Componentes atómicos
 * Componentes básicos y reutilizables que forman la base de la interfaz
 */

// Types
export type { BadgeProps } from '../../types/components/atoms/Badge.interface';

// Components
export { default as StatusBadge } from './StatusBadge';
export { default as LoadingIndicator } from './LoadingIndicator';
export { default as LoadingSpinner } from './LoadingSpinner';
export { default as ThemeToggle } from './ThemeToggle';

// Sub-components
export * from './Avatar';
export * from './Button';
