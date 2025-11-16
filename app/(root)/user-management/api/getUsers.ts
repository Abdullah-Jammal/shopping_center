import { axiosInstance } from "@/lib/axios";
import { GetAllUsersParams, UsersResponse } from "../types/users";

export async function GetAllUsers({
  page = 1,
  pageSize = 10,
  search = "",
  filterType = null,
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
