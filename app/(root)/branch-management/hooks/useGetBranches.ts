"use client";

import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../api/getBranches";

export function useGetBranches({
  search,
  pageNumber,
  pageSize,
}: {
  search: string;
  pageNumber: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: ["branches", search, pageNumber, pageSize],
    queryFn: () => getBranches({ search, pageNumber, pageSize }),
  });
}
