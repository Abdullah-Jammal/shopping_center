import { axiosInstance } from "@/lib/axios";

export const GetStatistics = async () => {
  try {
    const req = await axiosInstance.get("Statistics/dashboard");
    return req;
  } catch (e) {
    console.log(e);
  }
};
