"use client";

import { create } from "zustand";

interface AffiliatedCentersPaginationState {
  search: string;
  headquarterId: string | null;
  branchId: string | null;

  pageNumber: number;
  pageSize: number;
  totalPages: number;

  setSearch: (value: string) => void;
  setHeadquarterId: (value: string | null) => void;
  setBranchId: (value: string | null) => void;

  setPageNumber: (value: number) => void;
  setPageSize: (value: number) => void;

  setTotalPages: (value: number) => void;

  reset: () => void;
}

export const useAffiliatedCentersPagination =
  create<AffiliatedCentersPaginationState>((set) => ({
    search: "",
    headquarterId: null,
    branchId: null,

    pageNumber: 1,
    pageSize: 5,
    totalPages: 1,

    setSearch: (value) =>
      set(() => ({
        search: value,
        pageNumber: 1,
      })),

    setHeadquarterId: (value) =>
      set(() => ({
        headquarterId: value,
        branchId: null, // reset branch when HQ changes
        pageNumber: 1,
      })),

    setBranchId: (value) =>
      set(() => ({
        branchId: value,
        headquarterId: null, // reset HQ when branch changes
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
        headquarterId: null,
        branchId: null,
        pageNumber: 1,
        pageSize: 5,
      })),
  }));
