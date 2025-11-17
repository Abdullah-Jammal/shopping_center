"use client";

import { DataTable } from "@/components/tables/data-table";
import { useGetUsers } from "./hooks/useGetUsers";
import { columns } from "./components/columns";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AddUser } from "./components/AddUser";
import { UserManagementFilters } from "./components/UserMnagementFilters";
import { ErrorState } from "@/components/ErrorState";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { useUsersFilters } from "@/store/user-management/useUsersFilters";

export default function UsersPage() {
  const { search, filterType } = useUsersFilters();
  const { data, isLoading, isError, refetch } = useGetUsers({
    search,
    filterType,
  });

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
        <UserManagementFilters />
        <AddUser />
      </div>
      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <TableSkeleton rows={6} columns={columns.length} />
      ) : (
        <DataTable columns={columns} data={users} metadata={metadata} />
      )}
    </DashboardLayout>
  );
}
