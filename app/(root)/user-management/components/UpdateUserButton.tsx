"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateUserSchema, UpdateUserSchema } from "../schema/updateUserSchema";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useState } from "react";

export function UpdateUserForm({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const mutation = useUpdateUser();

  const form = useForm<UpdateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      password: "",
      roles: user.roles || [],
    },
  });

  function onSubmit(values: UpdateUserSchema) {
    mutation.mutate(values, {
      onSuccess: () => setOpen(false),
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-blue-600 hover:bg-blue-200 bg-blue-100 hover:text-blue-700 rounded-md w-10 cursor-pointer"
        >
          <PencilLine className="h-3 w-3" />
        </Button>
      </DialogTrigger>

      <DialogContent dir="rtl" className="max-w-md">
        <DialogHeader>
          <DialogTitle>تحديث بيانات المستخدم</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label>الاسم الكامل</Label>
            <Input {...form.register("fullName")} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>البريد الإلكتروني</Label>
            <Input type="email" {...form.register("email")} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>رقم الهاتف</Label>
            <Input {...form.register("phoneNumber")} />
          </div>

          <div className="flex flex-col gap-2">
            <Label>كلمة المرور (اختياري)</Label>
            <Input
              type="password"
              placeholder="غير الزامي تغير كلمة المرور"
              {...form.register("password")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>الدور</Label>

            <Select
              value={form.watch("roles")[0]}
              onValueChange={(val) => form.setValue("roles", [val])}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الدور" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="SuperAdmin">مدير النظام</SelectItem>
                <SelectItem value="HeadquartersAdmin">مدير المقر</SelectItem>
                <SelectItem value="BranchAdmin">مدير الفرع</SelectItem>
                <SelectItem value="AffiliatedCenterAdmin">
                  مدير مركز تابع
                </SelectItem>
                <SelectItem value="Accountant">محاسب</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full mt-3"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "جارٍ التحديث..." : "تحديث المستخدم"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
