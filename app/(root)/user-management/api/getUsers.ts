import { axiosInstance } from "@/lib/axios";
import { GetAllUsersParams, UsersResponse } from "../types/users";

export async function GetAllUsers({
  pageNumber,
  pageSize,
  search,
  filterType,
}: GetAllUsersParams): Promise<UsersResponse> {
  const response = await axiosInstance.get<UsersResponse>("/Users/get-all", {
    params: {
      pageNumber: pageNumber,
      pageSize,
      search,
      userType: filterType,
    },
  });

  return response.data;
}
