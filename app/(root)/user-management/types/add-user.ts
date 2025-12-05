import { UseFormReturn } from "react-hook-form";
import { AddUserSchema } from "../schema/addUserSchema";

export interface HQ {
  id: string;
  name: string;
}

export interface Branch {
  id: string;
  name: string;
}

export interface Center {
  id: string;
  name: string;
}

export interface OptionItem {
  value: string;
  label: string;
}

export interface UserTypeFieldsProps {
  form: UseFormReturn<AddUserSchema>;
  showHQ: boolean;
  showBranch: boolean;
  showCenter: boolean;
  disableHQ: boolean;
  disableBranch: boolean;
  disableCenter: boolean;
  headquarters: OptionItem[];
  branches: OptionItem[];
  centers: OptionItem[];
}
