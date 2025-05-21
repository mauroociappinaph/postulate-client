/**
 * Interface para el componente SearchAndFilter
 */

export interface FilterValues {
  search: string;
  status?: string;
  date?: string;
}

export interface SearchAndFilterProps {
  onFilter: (values: FilterValues) => void;
  className?: string;
}
