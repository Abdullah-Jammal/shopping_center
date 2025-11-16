"use client";

import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../api/getUsers";
import { UsersResponse } from "../types/users";

interface UseGetUsersProps {
  page?: number;
  pageSize?: number;
  search?: string;
  filterType?: string | null;
}

export function useGetUsers({
  page = 1,
  pageSize = 10,
  search = "",
  filterType = null,
}: UseGetUsersProps) {
  return useQuery<UsersResponse>({
    queryKey: ["users", page, pageSize, search, filterType],
    queryFn: () => GetAllUsers({ page, pageSize, search, filterType }),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 3,
  });
}
