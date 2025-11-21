import { axiosInstance } from "@/lib/axios";

export async function getAffiliatedCenters(): Promise<any> {
  const res = await axiosInstance.get("/AffiliatedCenters");
  return res.data;
}
