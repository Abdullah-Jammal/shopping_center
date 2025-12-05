import { UseFormReturn } from "react-hook-form";
import { AddUserSchema } from "../schema/addUserSchema";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface UsersResponse {
  data: User[];
  metadata: {
    totalPages: number;
    totalRecords: number;
  };
}

export interface GetAllUsersParams {
  page?: number;
  pageSize?: number;
  search?: string;
  filterType?: string | null;
}

export interface UserBasicFieldsProps {
  form: UseFormReturn<AddUserSchema>;
}

export interface UserManagementProps {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}
