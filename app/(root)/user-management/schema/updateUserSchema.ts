import { z } from "zod";

export const updateUserSchema = z.object({
  id: z.string(),
  fullName: z.string().min(3, "الاسم الكامل مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phoneNumber: z.string().min(10, "رقم الهاتف غير صالح"),
  password: z.string().optional(),
  roles: z.array(z.string()).min(1, "يجب اختيار دور واحد على الأقل"),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
