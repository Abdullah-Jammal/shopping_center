import { z } from "zod";

export const addBranchSchema = z.object({
  name: z.string().min(1, "اسم الفرع مطلوب"),
  address: z.string().min(1, "العنوان مطلوب"),
  headquarterId: z.string().min(1, "يجب اختيار المقر الرئيسي"),
});

export type AddBranchSchema = z.infer<typeof addBranchSchema>;
