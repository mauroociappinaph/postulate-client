import { PostulationStatus } from '../../../features/postulation/types/postulation';

export interface BadgeProps {
  status: PostulationStatus;
  variant?: 'filled' | 'outline' | 'subtle';
  className?: string;
  size?: 'md' | 'sm' | 'lg';
  onClick?: () => void;
}
