"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";
import { useAddAffiliatedCenter } from "../hooks/useAddAffiliatedCenter";
import {
  addAffiliatedCenterSchema,
  AddAffiliatedCenterSchema,
} from "../schema/addAffiliatedCenterSchema";
import { useGetHeadquarters } from "../../headquarter-management/hooks/useGetHeadquarters";
import { useGetBranches } from "../../branch-management/hooks/useGetBranches";
import SearchableFormSelect from "@/components/form/SearchableFormSelect";

export const AddAffiliatedCenter = () => {
  const [open, setOpen] = useState(false);
  const mutation = useAddAffiliatedCenter();
  const [hqSearch, setHqsearch] = useState("");
  const [branchSearch, setBranchSearch] = useState("");

  const { data: headquartersRes } = useGetHeadquarters({
    pageNumber: 1,
    pageSize: 5,
    search: hqSearch,
  });
  const headquarters = headquartersRes?.data ?? [];

  const { data: branchesRes } = useGetBranches({
    pageNumber: 1,
    pageSize: 5,
    search: branchSearch,
  });
  const branches = branchesRes?.data ?? [];

  const form = useForm<AddAffiliatedCenterSchema>({
    resolver: zodResolver(addAffiliatedCenterSchema),
    defaultValues: {
      name: "",
      headquarterId: null,
      branchId: null,
    },
  });

  const selectedHQ = form.watch("headquarterId");
  const selectedBranch = form.watch("branchId");

  useEffect(() => {
    if (selectedHQ) {
      form.setValue("branchId", null);
    }
  }, [selectedHQ, form]);

  useEffect(() => {
    if (selectedBranch) {
      form.setValue("headquarterId", null);
    }
  }, [selectedBranch, form]);

  const onSubmit = (values: AddAffiliatedCenterSchema) => {
    const payload: AddAffiliatedCenterSchema = {
      name: values.name,
      headquarterId: values.headquarterId || undefined,
      branchId: values.branchId || undefined,
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        form.reset();
        setOpen(false);
      },
    });
  };

  const clearHQ = () => form.setValue("headquarterId", null);
  const clearBranch = () => form.setValue("branchId", null);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 cursor-pointer">
          <PlusCircle className="w-4 h-4 mt-0.5" />
          إضافة مركز تابع
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            إضافة مركز تابع
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  field={field}
                  label="اسم المركز"
                  placeholder="أدخل اسم المركز"
                />
              )}
            />

            <FormField
              control={form.control}
              name="headquarterId"
              render={({ field }) => (
                <SearchableFormSelect
                  field={field}
                  label="المقر"
                  placeholder="اختر المقر"
                  options={headquarters.map((hq: any) => ({
                    value: hq.id,
                    label: hq.name ?? "مقر بدون اسم",
                  }))}
                  disabled={!!selectedBranch}
                  onClear={clearHQ}
                  onSearch={(value) => setHqsearch(value)}
                />
              )}
            />

            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <SearchableFormSelect
                  field={field}
                  label="الفرع"
                  placeholder="اختر الفرع"
                  options={branches.map((b: any) => ({
                    value: b.id,
                    label: b.name,
                  }))}
                  disabled={!!selectedHQ}
                  onClear={clearBranch}
                  onSearch={(value) => setBranchSearch(value)}
                />
              )}
            />

            <div className="col-span-2">
              <Button
                type="submit"
                className="w-full cursor-pointer"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "جاري الحفظ..." : "حفظ المركز"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
