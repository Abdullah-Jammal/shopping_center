import { axiosInstance } from "@/lib/axios";

export const GetStatistics = async () => {
  const res = await axiosInstance.get("Statistics/dashboard");
  return res.data;
};
