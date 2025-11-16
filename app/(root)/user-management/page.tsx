"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DataTable } from "@/components/tables/data-table";
import { useGetUsers } from "./hooks/useGetUsers";
import { columns } from "./components/columns";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AddUser } from "./components/AddUser";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  const { data, isLoading } = useGetUsers({ search, filterType });

  const users = data?.data ?? [];
  const metadata = data?.metadata ?? {
    totalPages: 1,
    totalRecords: users.length,
  };

  return (
    <DashboardLayout
      title="إدارة المستخدمين"
      subtitle="عرض وإدارة جميع المستخدمين في النظام"
      userName="System Super Admin"
      role="SuperAdmin"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
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

        <AddUser />
      </div>

      <DataTable columns={columns} data={users} metadata={metadata} />
    </DashboardLayout>
  );
}
