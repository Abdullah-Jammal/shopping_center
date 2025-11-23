"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddHeadquarterSchema } from "../schema/AddHeadquarterSchema";
import { AddHeadquarterApi } from "../api/addHeadquarter";

export function useAddHeadquarter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddHeadquarterSchema) => AddHeadquarterApi(payload),

    onSuccess: () => {
      toast.success("تم إضافة المقر بنجاح");
      queryClient.invalidateQueries({ queryKey: ["headquarters"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء الإضافة");
    },
  });
}
