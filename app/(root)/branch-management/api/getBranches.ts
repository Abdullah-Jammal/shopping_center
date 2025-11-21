import { axiosInstance } from "@/lib/axios";

export async function getBranches(): Promise<any> {
  const res = await axiosInstance.get("/Branches");
  return res.data;
}
