import { z } from "zod";

export const addHeadquarterSchema = z.object({
  name: z.string().min(1, "اسم المقر مطلوب"),
});

export type AddHeadquarterSchema = z.infer<typeof addHeadquarterSchema>;
