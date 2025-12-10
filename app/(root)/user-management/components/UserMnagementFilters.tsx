"use client";

import { Input } from "@/components/ui/input";
import { useUsersPagination } from "@/store/user-management/useUsersPagination";

export const UserManagementFilters = () => {
  const { search, setSearch, setFilterType } = useUsersPagination();
  return (
    <div className="flex gap-3 flex-wrap mb-8">
      <Input
        placeholder="بحث بالاسم أو البريد الإلكتروني..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
      />
    </div>
  );
};
