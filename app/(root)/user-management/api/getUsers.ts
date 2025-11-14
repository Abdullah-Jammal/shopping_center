import axiosInstance from "@/lib/axios";
import { UsersResponse } from "../types/users";

export async function GetAllUsers(page: number = 1, pageSize: number = 10) {
  const response = await axiosInstance.get<UsersResponse>(
    `/Users/get-all?pageNumber=${page}&pageSize=${pageSize}`
  );
  return response.data;
}
