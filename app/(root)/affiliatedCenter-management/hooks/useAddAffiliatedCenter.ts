"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addAffiliatedCenterApi } from "../api/addAffiliatedCenter";
import { AddAffiliatedCenterSchema } from "../schema/addAffiliatedCenterSchema";

export function useAddAffiliatedCenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddAffiliatedCenterSchema) =>
      addAffiliatedCenterApi(payload),

    onSuccess: () => {
      toast.success("تم إضافة المركز التابع بنجاح");
      queryClient.invalidateQueries({ queryKey: ["affiliatedCenters"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء الإضافة");
    },
  });
}
