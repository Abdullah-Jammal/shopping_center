"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormInput from "@/components/form/FormInput";
import { LoginSchema } from "./types/login-schema";
import { useLogin } from "./hooks/useLogin";

export default function LoginPage() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    loginMutation.mutate(values);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center from-white to-slate-100 p-6">
      <Card className="w-full max-w-md shadow-xl border border-slate-200">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            تسجيل الدخول
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            مرحباً بك، الرجاء إدخال بيانات الحساب للمتابعة
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormInput
                    label="البريد الإلكتروني"
                    placeholder="example@mail.com"
                    type="email"
                    field={field}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormInput
                    label="كلمة المرور"
                    placeholder="••••••••"
                    type="password"
                    field={field}
                  />
                )}
              />
              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full py-2 text-lg font-semibold cursor-pointer"
              >
                {loginMutation.isPending ? "جاري التسجيل..." : "تسجيل الدخول"}{" "}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
