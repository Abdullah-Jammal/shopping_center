import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("الرجاء إدخال بريد إلكتروني صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});
