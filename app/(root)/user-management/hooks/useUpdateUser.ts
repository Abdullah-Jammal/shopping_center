import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateUserRequest } from "../api/updateUserRequest";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: any) => updateUserRequest(payload),

    onSuccess: () => {
      toast.success("تم تحديث المستخدم بنجاح");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },

    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء التحديث");
    },
  });
}
