"use client";

import { useQuery } from "@tanstack/react-query";
import { getHeadquarters } from "../api/getHeadquarters";

export function useGetHeadquarters({
  search,
  pageNumber,
  pageSize,
}: {
  search: string;
  pageNumber: number;
  pageSize: number;
}) {
  return useQuery({
    queryKey: ["headquarters", search, pageNumber, pageSize],
    queryFn: () => getHeadquarters({ search, pageNumber, pageSize }),
    placeholderData: (prev) => prev,
  });
}
