import { FormField } from "@/components/ui/form";
import FormSelect from "@/components/form/FormSelect";
import { UserTypeFieldsProps } from "../../types/add-user";
import SearchableFormSelect from "@/components/form/SearchableFormSelect";

export function UserTypeFields({
  form,
  showHQ,
  showBranch,
  showCenter,
  disableHQ,
  disableBranch,
  disableCenter,
  headquarters,
  branches,
  centers,
  setHqSearch,
}: UserTypeFieldsProps) {
  return (
    <>
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
              { value: "AffiliatedCenterAdmin", label: "مدير مركز تابع" },
              { value: "Accountant", label: "محاسب" },
            ]}
            onClear={() => field.onChange("")}
          />
        )}
      />

      {showHQ && (
        <FormField
          control={form.control}
          name="headquarterId"
          render={({ field }) => (
            <SearchableFormSelect
              label="المقر الرئيسي"
              placeholder="اختر المقر"
              field={field}
              disabled={disableHQ}
              onClear={() => field.onChange("")}
              options={headquarters}
              onSearch={(value) => setHqSearch(value)}
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
              disabled={disableBranch}
              onClear={() => field.onChange("")}
              options={branches}
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
              disabled={disableCenter}
              onClear={() => field.onChange("")}
              options={centers}
            />
          )}
        />
      )}
    </>
  );
}
