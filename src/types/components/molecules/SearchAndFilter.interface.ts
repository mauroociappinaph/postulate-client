export interface FilterValues {
  [key: string]: string | number | boolean | null;
}

export interface SearchAndFilterProps {
  onSearch: (value: string) => void;
  onFilterChange: (filters: FilterValues) => void;
  placeholder?: string;
  className?: string;
  initialFilters?: FilterValues;
  debounceTime?: number;
}
