"use client";

import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../api/getBranches";

export function useGetBranches({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: ["branches", search, page, pageSize],
    queryFn: () => getBranches({ search, page, pageSize }),
  });
}
