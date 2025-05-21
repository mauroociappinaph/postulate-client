/**
 * Interface para el componente FilterSelects
 */

export interface SelectOption {
  value: string;
  label: string;
}

export interface FilterSelectsProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}
