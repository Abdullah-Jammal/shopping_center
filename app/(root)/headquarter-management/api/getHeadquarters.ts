import { axiosInstance } from "@/lib/axios";

export async function getHeadquarters(): Promise<any> {
  const res = await axiosInstance.get("/Headquarter");
  return res.data;
}
