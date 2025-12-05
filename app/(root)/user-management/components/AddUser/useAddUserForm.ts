import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUserSchema, AddUserSchema } from "../../schema/addUserSchema";

export function useAddUserForm() {
  const form = useForm<AddUserSchema>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      userType: "",
      headquarterId: "",
      branchId: "",
      affiliatedCenterId: "",
      phoneNumber: "",
      address: "",
    },
  });

  const userType = form.watch("userType");
  const selectedHQ = form.watch("headquarterId");
  const selectedBranch = form.watch("branchId");
  const selectedCenter = form.watch("affiliatedCenterId");

  const showHQ = ["HeadquartersAdmin", "Accountant"].includes(userType);
  const showBranch = ["BranchAdmin", "Accountant"].includes(userType);
  const showCenter = ["AffiliatedCenterAdmin", "Accountant"].includes(userType);

  const disableHQ =
    userType === "Accountant" && Boolean(selectedBranch || selectedCenter);
  const disableBranch =
    userType === "Accountant" && Boolean(selectedHQ || selectedCenter);
  const disableCenter =
    userType === "Accountant" && Boolean(selectedHQ || selectedBranch);

  useEffect(() => {
    if (userType !== "Accountant") return;

    if (selectedHQ) {
      form.setValue("branchId", "");
      form.setValue("affiliatedCenterId", "");
    }

    if (selectedBranch) {
      form.setValue("headquarterId", "");
      form.setValue("affiliatedCenterId", "");
    }

    if (selectedCenter) {
      form.setValue("headquarterId", "");
      form.setValue("branchId", "");
    }
  }, [userType, selectedHQ, selectedBranch, selectedCenter]);

  return {
    form,
    showHQ,
    showBranch,
    showCenter,
    disableHQ,
    disableBranch,
    disableCenter,
  };
}
