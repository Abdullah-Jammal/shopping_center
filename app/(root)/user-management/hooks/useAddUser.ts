/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AddUserSchema } from "../schema/addUserSchema";
import { addUserRequest } from "../api/addUser";

export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddUserSchema) => addUserRequest(payload),

    onSuccess: () => {
      toast.success("تم إضافة المستخدم بنجاح");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء الإضافة");
    },
  });
}
