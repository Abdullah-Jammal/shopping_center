/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../api/login";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: (data) => {
      Cookies.set("token", data.token);
      Cookies.set("refreshToken", data.refreshToken);
      Cookies.set("roles", JSON.stringify(data.roles));
      Cookies.set("expiresAt", data.expiresAt);
      Cookies.set("refreshTokenExpiresAt", data.refreshTokenExpiresAt);
      Cookies.set("sessionExpiresAt", data.sessionExpiresAt);

      toast.success("تم تسجيل الدخول بنجاح");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "حدث خطأ أثناء تسجيل الدخول، الرجاء التحقق من البيانات";

      toast.error(message);
    },
  });
}
