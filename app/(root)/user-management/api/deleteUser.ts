import { axiosInstance } from "@/lib/axios";

export async function deleteUserRequest(userId: string) {
  const res = await axiosInstance.delete(`/Users/${userId}`);
  return res.data;
}
