
import {axiosInstance} from "@/lib/axios";
import { UpdateUserSchema } from "../schema/updateUserSchema";

export async function updateUserRequest(payload: UpdateUserSchema) {
  const response = await axiosInstance.put("/users/update", payload);
  return response.data;
}
