"use client";

import { create } from "zustand";

interface UsersPaginationState {
  search: string;
  filterType: string | null;

  pageNumber: number;
  pageSize: number;
  totalPages: number;

  setSearch: (value: string) => void;
  setFilterType: (value: string | null) => void;

  setPageNumber: (value: number) => void;
  setPageSize: (value: number) => void;

  setTotalPages: (value: number) => void;
  reset: () => void;
}

export const useUsersPagination = create<UsersPaginationState>((set) => ({
  search: "",
  filterType: null,

  pageNumber: 1,
  pageSize: 5,
  totalPages: 1,

  setSearch: (value) =>
    set(() => ({
      search: value,
      pageNumber: 1,
    })),

  setFilterType: (value) =>
    set(() => ({
      filterType: value,
      pageNumber: 1,
    })),

  setPageNumber: (value) => set(() => ({ pageNumber: value })),

  setPageSize: (value) =>
    set(() => ({
      pageSize: value,
      pageNumber: 1,
    })),

  setTotalPages: (value) => set(() => ({ totalPages: value })),

  reset: () =>
    set(() => ({
      search: "",
      filterType: null,
      pageNumber: 1,
      pageSize: 5,
    })),
}));
