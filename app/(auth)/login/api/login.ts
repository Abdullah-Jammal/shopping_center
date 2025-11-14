import axiosInstance from "@/lib/axios";
import { LoginResponse, LoginRequest } from "../types/login-response";

export async function loginRequest(data: LoginRequest): Promise<LoginResponse> {
  const response = await axiosInstance.post<LoginResponse>("/Auth/login", data);
  return response.data;
}
