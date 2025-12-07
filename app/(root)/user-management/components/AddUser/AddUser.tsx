"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useAddUserForm } from "./useAddUserForm";
import { UserBasicFields } from "./UserBasicFields";
import { UserTypeFields } from "./UserTypeFields";
import { Form } from "@/components/ui/form";
import { useAddUser } from "../../hooks/useAddUser";
import { useGetHeadquarters } from "@/app/(root)/headquarter-management/hooks/useGetHeadquarters";
import { useGetBranches } from "@/app/(root)/branch-management/hooks/useGetBranches";
import { useGetAffiliatedCenters } from "@/app/(root)/affiliatedCenter-management/hooks/useGetAffiliatedCenters";
import { AddUserSchema } from "../../schema/addUserSchema";
import { Branch, HQ, Center } from "../../types/add-user";

export const AddUser = () => {
  const [open, setOpen] = useState(false);

  const {
    form,
    showHQ,
    showBranch,
    showCenter,
    disableHQ,
    disableBranch,
    disableCenter,
  } = useAddUserForm();

  const mutation = useAddUser();

  const [hqSearch, setHqSearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");
  const [centerSearch, setCenterSearch] = useState("");

  const headquartersData =
    useGetHeadquarters({
      search: hqSearch,
      pageNumber: 1,
      pageSize: 5,
    }).data?.data ?? [];

  const branchesData =
    useGetBranches({ search: branchSearch, pageNumber: 1, pageSize: 5 }).data
      ?.data ?? [];

  const centersData =
    useGetAffiliatedCenters({
      search: centerSearch,
      pageNumber: 1,
      pageSize: 5,
    }).data?.data ?? [];

  const headquarters = headquartersData.map((hq: HQ) => ({
    value: hq.id,
    label: hq.name,
  }));

  const branches = branchesData.map((b: Branch) => ({
    value: b.id,
    label: b.name,
  }));

  const centers = centersData.map((c: Center) => ({
    value: c.id,
    label: c.name,
  }));

  const onSubmit = (data: AddUserSchema) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== "")
    );

    mutation.mutate(cleanedData as AddUserSchema, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="text-white px-6 py-2 flex items-center gap-2 cursor-pointer">
          <PlusCircle size={18} />
          إضافة مستخدم جديد
        </Button>
      </DialogTrigger>

      <DialogContent dir="rtl">
        <DialogTitle className="hidden"></DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-6 mt-6 px-4"
          >
            <UserBasicFields form={form} />

            <UserTypeFields
              form={form}
              showHQ={showHQ}
              showBranch={showBranch}
              showCenter={showCenter}
              disableHQ={disableHQ}
              disableBranch={disableBranch}
              disableCenter={disableCenter}
              headquarters={headquarters}
              branches={branches}
              centers={centers}
              setHqSearch={setHqSearch}
              setBranchSearch={setBranchSearch}
              setCenterSearch={setCenterSearch}
            />

            <div className="col-span-2 mt-4">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "جاري الحفظ..." : "حفظ المستخدم"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
