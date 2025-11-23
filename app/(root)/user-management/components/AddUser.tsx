"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { useAddUser } from "../hooks/useAddUser";
import { addUserSchema, AddUserSchema } from "../schema/addUserSchema";
import { useGetHeadquarters } from "../../headquarter-management/hooks/useGetHeadquarters";
import { useGetBranches } from "../../branch-management/hooks/useGetBranches";
import { useGetAffiliatedCenters } from "../../affiliatedCenter-management/hooks/useGetAffiliatedCenters";
import { PlusCircle } from "lucide-react";

export const AddUser = () => {
  const [open, setOpen] = useState(false);
  const mutation = useAddUser();
  const { data: headquartersRes } = useGetHeadquarters({
    search: "",
    pageNumber: 1,
    pageSize: 200,
  });
  const { data: branchesRes } = useGetBranches({
    search: "",
    pageNumber: 1,
    pageSize: 200,
  });
  const headquarters = headquartersRes?.data ?? [];
  const branches = branchesRes?.data ?? [];
  const { data: centersRes } = useGetAffiliatedCenters();
  const centers = centersRes?.data ?? [];
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

  const showHQ = userType === "HeadquartersAdmin";
  const showBranch = userType === "BranchAdmin";
  const showCenter = userType === "AffiliatedCenterAdmin";

  const onSubmit = (values: AddUserSchema) => {
    mutation.mutate(values, {
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
          <PlusCircle className="w-4 h-4 mt-0.5" />
          إضافة مستخدم جديد
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[90%] md:w-[80%] max-w-[50%]!" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            إضافة مستخدم جديد
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 mt-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormInput
                  label="الاسم الكامل"
                  field={field}
                  placeholder="john doe"
                />
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  label="البريد الإلكتروني"
                  field={field}
                  placeholder="example@gmail.com"
                />
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormInput type="password" label="كلمة المرور" field={field} />
              )}
            />

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormSelect
                  label="نوع المستخدم"
                  placeholder="اختر نوع المستخدم"
                  field={field}
                  options={[
                    { value: "SuperAdmin", label: "مدير النظام" },
                    { value: "HeadquartersAdmin", label: "مدير مقر رئيسي" },
                    { value: "BranchAdmin", label: "مدير فرع" },
                    {
                      value: "AffiliatedCenterAdmin",
                      label: "مدير مركز تابع",
                    },
                    { value: "Accountant", label: "محاسب" },
                  ]}
                />
              )}
            />

            {showHQ && (
              <FormField
                control={form.control}
                name="headquarterId"
                render={({ field }) => (
                  <FormSelect
                    label="المقر الرئيسي"
                    placeholder="اختر المقر"
                    field={field}
                    options={headquarters.map((hq: any) => ({
                      value: hq.id,
                      label: hq.name ?? "مقر بدون اسم",
                    }))}
                  />
                )}
              />
            )}

            {showBranch && (
              <FormField
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormSelect
                    label="الفرع"
                    placeholder="اختر الفرع"
                    field={field}
                    options={branches.map((b: any) => ({
                      value: b.id,
                      label: b.name,
                    }))}
                  />
                )}
              />
            )}

            {showCenter && (
              <FormField
                control={form.control}
                name="affiliatedCenterId"
                render={({ field }) => (
                  <FormSelect
                    label="المركز التابع"
                    placeholder="اختر المركز"
                    field={field}
                    options={centers.map((c: any) => ({
                      value: c.id,
                      label: c.name ?? "مركز بدون اسم",
                    }))}
                  />
                )}
              />
            )}

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormInput
                  label="رقم الهاتف"
                  field={field}
                  placeholder="07*********"
                />
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormInput label="العنوان" field={field} placeholder="BGW" />
              )}
            />

            <div className="col-span-2 mt-4">
              <Button
                type="submit"
                className="w-full"
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
