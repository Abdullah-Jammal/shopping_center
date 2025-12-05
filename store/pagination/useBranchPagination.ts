import { create } from "zustand";
import { PaginationState } from "./useUserPagination";

export const useBranchPagination = create<PaginationState>((set) => ({
  page: 1,
  pageSize: 5,
  totalPages: 1,
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setTotalPages: (totalPages) => set({ totalPages }),
  reset: () => set({ page: 1, pageSize: 5, totalPages: 1 }),
}));
