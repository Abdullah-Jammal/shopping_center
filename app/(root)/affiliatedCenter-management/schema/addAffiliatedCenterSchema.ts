import { z } from "zod";

export const addAffiliatedCenterSchema = z.object({
  name: z.string().min(1, "اسم المركز مطلوب"),
  headquarterId: z.string().nullable().optional(),
  branchId: z.string().nullable().optional(),
});
export type AddAffiliatedCenterSchema = z.infer<
  typeof addAffiliatedCenterSchema
>;
