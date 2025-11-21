import { axiosInstance } from "@/lib/axios";
import { AddUserSchema } from "../schema/addUserSchema";

export async function addUserRequest(payload: AddUserSchema) {
  const res = await axiosInstance.post("/Users/create", payload);
  return res.data;
}
