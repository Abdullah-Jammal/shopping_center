// useUsersPagination.ts
import { create } from "zustand";

export interface UsersPaginationState {
  page: number;
  pageSize: number;
  totalPages: number;

  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalPages: (total: number) => void;
}

export const useUsersPagination = create<UsersPaginationState>((set) => ({
  page: 1,
  pageSize: 5,
  totalPages: 1,

  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setTotalPages: (totalPages) => set({ totalPages }),
}));
