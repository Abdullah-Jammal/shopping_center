import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../api/getUsers";
import { UsersResponse } from "../types/users";
import { useUserPagination } from "@/store/pagination/useUserPagination";

export function useGetUsers({
  search,
  filterType,
}: {
  search: string;
  filterType: string | null;
}) {
  const { page, pageSize, setTotalPages } = useUserPagination();

  return useQuery<UsersResponse>({
    queryKey: ["users", page, pageSize, search, filterType],

    queryFn: async () => {
      const res = await GetAllUsers({
        page,
        pageSize,
        search,
        filterType,
      });

      setTotalPages(res.metadata.totalPages);

      return res;
    },

    placeholderData: (prev) => prev,
  });
}
