import { z } from "zod";

export const addUserSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  fullName: z.string().min(2, "Full name is required"),
  userType: z.string(),

  headquarterId: z.string().uuid().nullable().optional(),
  branchId: z.string().uuid().nullable().optional(),
  affiliatedCenterId: z.string().uuid().nullable().optional(),

  address: z.string().nullable().optional(),
  phoneNumber: z.string().nullable().optional(),
});

export type AddUserSchema = z.infer<typeof addUserSchema>;
