"use client";

import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../api/getBranches";

export function useGetBranches() {
  return useQuery({
    queryKey: ["branches"],
    queryFn: getBranches,
  });
}
