"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { useGetUsers } from "./hooks/useGetUsers";
import { DataTable } from "@/components/tables/data-table";
import { columns } from "./components/columns";

export default function UsersPage() {
  const { data, isLoading } = useGetUsers();

  return (
    <DashboardLayout title="إدارة المستخدمين">
      {isLoading ? (
        <p className="text-center py-10">جاري تحميل البيانات...</p>
      ) : (
        <DataTable
          columns={columns}
          data={data?.data ?? []}
          metadata={data?.metadata}
        />
      )}
    </DashboardLayout>
  );
}
