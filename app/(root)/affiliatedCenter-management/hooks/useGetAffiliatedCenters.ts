"use client";

import { useQuery } from "@tanstack/react-query";
import { getAffiliatedCenters } from "../api/getAffiliatedCenters";

export function useGetAffiliatedCenters({
  search = "",
  page = 1,
  pageSize = 10,
  headquarterId = "",
  branchId = "",
} = {}) {
  return useQuery({
    queryKey: [
      "affiliatedCenters",
      search,
      page,
      pageSize,
      headquarterId,
      branchId,
    ],
    queryFn: () =>
      getAffiliatedCenters({
        search,
        page,
        pageSize,
        headquarterId,
        branchId,
      }),
  });
}
