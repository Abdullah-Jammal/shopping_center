import { FormField } from "@/components/ui/form";
import FormInput from "@/components/form/FormInput";
import { UserBasicFieldsProps } from "../../types/users";

export function UserBasicFields({ form }: UserBasicFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
          <FormInput
            label="الاسم الكامل"
            field={field}
            placeholder="John Doe"
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
    </>
  );
}
