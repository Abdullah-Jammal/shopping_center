export interface UsersFiltersState {
  search: string;
  filterType: string | null;

  setSearch: (value: string) => void;
  setFilterType: (value: string | null) => void;
  resetFilters: () => void;
}