import { Postulation } from '../../postulations/postulation';

export interface ApplicationCardProps {
  postulation: Postulation;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export interface ApplicationCardGlassProps {
  application: Postulation;
  onViewDetail: () => void;
  onEdit: () => void;
}
