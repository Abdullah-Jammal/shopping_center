import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../api/getUsers";
import { UsersResponse } from "../types/users";

export function useGetUsers({
  search,
  filterType,
  pageNumber,
  pageSize,
}: {
  search: string;
  filterType: string | null;
  pageNumber: number;
  pageSize: number;
}) {
  return useQuery<UsersResponse>({
    queryKey: ["users", search, filterType, pageNumber, pageSize],

    queryFn: async () => {
      const res = await GetAllUsers({
        search,
        filterType,
        pageNumber,
        pageSize,
      });
      return res;
    },

    placeholderData: (prev) => prev,
  });
}
