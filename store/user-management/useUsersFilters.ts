import { UsersFiltersState } from "@/types/store-types/UsersFiltersState";
import { create } from "zustand";

export const useUsersFilters = create<UsersFiltersState>((set) => ({
  search: "",
  filterType: null,

  setSearch: (search) => set({ search }),
  setFilterType: (filterType) => set({ filterType }),
  resetFilters: () => set({ search: "", filterType: null }),
}));
