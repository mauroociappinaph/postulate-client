/**
 * Interfaces para todos los componentes
 */

// Atoms
export * from './atoms';

// Molecules
export * from './molecules';

// Organisms
export * from './organisms';

// Exportar todas las interfaces de componentes desde aquí
export type {
  // Atoms
  ButtonProps,
  AvatarProps,
  BadgeProps
} from './atoms';

export type {
  // Molecules
  CardProps
} from './molecules';

export type {
  // Organisms
  ApplicationCardProps,
  NavbarProps
} from './organisms';
