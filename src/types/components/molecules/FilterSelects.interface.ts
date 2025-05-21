import { FilterValues } from './SearchAndFilter.interface';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface FilterSelectsProps {
  filters: {
    [key: string]: {
      options: SelectOption[];
      label: string;
      placeholder?: string;
    };
  };
  values: FilterValues;
  onChange: (name: string, value: string | number | null) => void;
  className?: string;
}
