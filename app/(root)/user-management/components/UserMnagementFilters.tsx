"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useUsersFilters } from "@/store/user-management/useUsersFilters";

export const UserManagementFilters = () => {
  const { search, setSearch, setFilterType } = useUsersFilters();
  return (
    <div className="flex gap-3 flex-wrap mb-8">
      <Input
        placeholder="بحث بالاسم أو البريد الإلكتروني..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
      />

      <Select onValueChange={setFilterType}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="تصفية حسب النوع" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Accountant">محاسب</SelectItem>
          <SelectItem value="SuperAdmin">مدير النظام</SelectItem>
          <SelectItem value="Inspector">مفتش</SelectItem>
          <SelectItem value="Owner">مالك مشروع</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
