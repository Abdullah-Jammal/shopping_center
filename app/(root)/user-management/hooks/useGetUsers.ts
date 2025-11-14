"use client";

import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../api/getUsers";

export function useGetUsers(page: number = 1, pageSize: number = 10) {
  return useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => GetAllUsers(page, pageSize),
  });
}
