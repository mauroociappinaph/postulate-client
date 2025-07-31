// Atoms
import { ButtonProps } from './atoms';

// Molecules
import { CardProps } from './molecules';

// Organisms
import { ApplicationCardProps } from '../../features/postulation/types/ApplicationCard.interface';

// Exportar todas las interfaces de componentes desde aquí
export type {
  // Atoms
  ButtonProps,

  // Molecules
  CardProps,

  // Organisms
  ApplicationCardProps,
};

export * from './atoms/ButtonProps.interface';
export * from './molecules/CardProps.interface';
export * from '@/features/postulation/types/ApplicationCard.interface';

export { type NavbarProps } from './organisms';
