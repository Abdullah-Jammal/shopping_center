"use client";

import { create } from "zustand";

interface HeadquarterPaginationState {
  search: string;

  pageNumber: number;
  pageSize: number;
  totalPages: number;

  setSearch: (value: string) => void;
  setPageNumber: (value: number) => void;
  setPageSize: (value: number) => void;

  setTotalPages: (value: number) => void;

  reset: () => void;
}

export const useHeadquarterPagination = create<HeadquarterPaginationState>(
  (set) => ({
    search: "",

    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,

    setSearch: (value) =>
      set(() => ({
        search: value,
        pageNumber: 1,
      })),

    setPageNumber: (value) =>
      set(() => ({
        pageNumber: value,
      })),

    setPageSize: (value) =>
      set(() => ({
        pageSize: value,
        pageNumber: 1,
      })),

    setTotalPages: (value) =>
      set(() => ({
        totalPages: value,
      })),

    reset: () =>
      set(() => ({
        search: "",
        pageNumber: 1,
        pageSize: 5,
      })),
  })
);
