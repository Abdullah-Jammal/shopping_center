import { axiosInstance } from "@/lib/axios";
import { AddHeadquarterSchema } from "../schema/AddHeadquarterSchema";

export const AddHeadquarterApi = async (payload: AddHeadquarterSchema) => {
  const res = await axiosInstance.post("/Headquarter", payload);
  return res.data;
};
