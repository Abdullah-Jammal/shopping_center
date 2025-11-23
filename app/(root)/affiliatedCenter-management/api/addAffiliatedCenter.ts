import { axiosInstance } from "@/lib/axios";
import { AddAffiliatedCenterSchema } from "../schema/addAffiliatedCenterSchema";

export const addAffiliatedCenterApi = async (
  payload: AddAffiliatedCenterSchema
) => {
  const res = await axiosInstance.post("/AffiliatedCenters", payload);
  return res.data;
};
