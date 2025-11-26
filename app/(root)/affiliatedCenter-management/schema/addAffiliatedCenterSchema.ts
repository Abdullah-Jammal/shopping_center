import { z } from "zod";

const UUIDorEmpty = z.string().uuid().or(z.literal("")).optional().nullable();

export const addAffiliatedCenterSchema = z.object({
  name: z.string().min(1, "اسم المركز مطلوب"),
  headquarterId: UUIDorEmpty,
  branchId: UUIDorEmpty,
});
export type AddAffiliatedCenterSchema = z.infer<
  typeof addAffiliatedCenterSchema
>;
