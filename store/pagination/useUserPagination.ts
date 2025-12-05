import { create } from "zustand";

export interface PaginationState {
  page: number;
  pageSize: number;
  totalPages: number;

  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalPages: (total: number) => void;
  reset: () => void;
}

export const useUserPagination = create<PaginationState>((set) => ({
  page: 1,
  pageSize: 5,
  totalPages: 1,

  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setTotalPages: (totalPages) => set({ totalPages }),

  reset: () =>
    set({
      page: 1,
      pageSize: 5,
      totalPages: 1,
    }),
}));
