"use client";

import { useQuery } from "@tanstack/react-query";
import { getAffiliatedCenters } from "../api/getAffiliatedCenters";

export function useGetAffiliatedCenters({
  search = "",
  pageNumber = 1,
  pageSize = 10,
  headquarterId = "",
  branchId = "",
} = {}) {
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
  });
}
