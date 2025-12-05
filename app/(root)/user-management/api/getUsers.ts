import { axiosInstance } from "@/lib/axios";
import { GetAllUsersParams, UsersResponse } from "../types/users";

export async function GetAllUsers({
  page,
  pageSize,
  search,
  filterType,
}: GetAllUsersParams): Promise<UsersResponse> {
  const response = await axiosInstance.get<UsersResponse>("/Users/get-all", {
    params: {
      pageNumber: page,
      pageSize,
      search,
      userType: filterType,
    },
  });

  return response.data;
}
