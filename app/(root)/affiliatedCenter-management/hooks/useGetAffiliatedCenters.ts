"use client";

import { useQuery } from "@tanstack/react-query";
import { getAffiliatedCenters } from "../api/getAffiliatedCenters";

export function useGetAffiliatedCenters(params?: {
  search?: string;
  pageNumber?: number;
  pageSize?: number;
  headquarterId?: string | null;
  branchId?: string | null;
}) {
  const {
    search = "",
    pageNumber = 1,
    pageSize = 10,
    headquarterId = null,
    branchId = null,
  } = params ?? {}; // <-- IMPORTANT FIX

  return useQuery({
    queryKey: [
      "affiliatedCenters",
      search,
      pageNumber,
      pageSize,
      headquarterId,
      branchId,
    ],

    queryFn: () =>
      getAffiliatedCenters({
        search,
        pageNumber,
        pageSize,
        headquarterId,
        branchId,
      }),

    placeholderData: (prev) => prev,
  });
}
