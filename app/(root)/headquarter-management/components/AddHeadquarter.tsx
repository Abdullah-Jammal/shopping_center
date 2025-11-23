"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormField } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";

import { useAddHeadquarter } from "../hooks/useAddHeadquarter";
import { useState } from "react";
import {
  addHeadquarterSchema,
  AddHeadquarterSchema,
} from "../schema/AddHeadquarterSchema";

export const AddHeadquarter = () => {
  const [open, setOpen] = useState(false);

  const mutation = useAddHeadquarter();

  const form = useForm<AddHeadquarterSchema>({
    resolver: zodResolver(addHeadquarterSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: AddHeadquarterSchema) => {
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
        <Button className="flex items-center gap-2">
          <PlusCircle className="w-4 h-4" />
          إضافة مقر جديد
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            إضافة مقر جديد
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 mt-4"
          >
            {/* اسم المقر */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  field={field}
                  label="اسم المقر"
                  placeholder="أدخل اسم المقر"
                />
              )}
            />

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "جاري الحفظ..." : "حفظ المقر"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
