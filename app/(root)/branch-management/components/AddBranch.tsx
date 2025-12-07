"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddBranch } from "../hooks/useAddBranch";
import { AddBranchSchema, addBranchSchema } from "../schema/addBranchSchema";

import { PlusCircle } from "lucide-react";
import { useGetHeadquarters } from "../../headquarter-management/hooks/useGetHeadquarters";
import SearchableFormSelect from "@/components/form/SearchableFormSelect";

export const AddBranch = () => {
  const [open, setOpen] = useState(false);
  const [hqSearch, setHqSearch] = useState("");

  const mutation = useAddBranch();
  const { data: hqRes } = useGetHeadquarters({
    search: hqSearch,
    pageNumber: 1,
    pageSize: 5,
  });

  const headquarters = hqRes?.data ?? [];

  const form = useForm<AddBranchSchema>({
    resolver: zodResolver(addBranchSchema),
    defaultValues: {
      name: "",
      address: "",
      headquarterId: "",
    },
  });

  const onSubmit = (values: AddBranchSchema) => {
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
        <Button className="flex items-center gap-2 cursor-pointer">
          <PlusCircle className="w-4 h-4 mt-0.5" />
          إضافة فرع جديد
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            إضافة فرع جديد
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
                <FormInput label="اسم الفرع" field={field} />
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormInput label="العنوان" field={field} />
              )}
            />

            <FormField
              control={form.control}
              name="headquarterId"
              render={({ field }) => (
                <SearchableFormSelect
                  label="المقر الرئيسي"
                  placeholder="اختر المقر"
                  field={field}
                  onClear={() => field.onChange("")}
                  options={headquarters.map((hq: any) => ({
                    value: hq.id,
                    label: hq.name ?? "مقر بدون اسم",
                  }))}
                  onSearch={(value) => setHqSearch(value)}
                />
              )}
            />

            <div className="col-span-2 mt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "جاري الحفظ..." : "حفظ الفرع"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
