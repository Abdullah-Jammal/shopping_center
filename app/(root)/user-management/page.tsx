"use client";

import { useEffect } from "react";
import { DataTable } from "@/components/tables/data-table";
import { useGetUsers } from "./hooks/useGetUsers";
import { columns } from "./components/columns";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AddUser } from "./components/AddUser/AddUser";
import { UserManagementFilters } from "./components/UserMnagementFilters";
import { ErrorState } from "@/components/ErrorState";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ReusablePagination } from "@/components/pagination/ReusablePagination";
import { useUsersFilters } from "@/store/user-management/useUsersFilters";
import { useUsersPagination } from "./hooks/store/useUsersPagination";

export default function UsersPage() {
  const { search, filterType } = useUsersFilters();
  const { setTotalPages } = useUsersPagination();

  const { data, isLoading, isError, refetch } = useGetUsers({
    search,
    filterType,
  });

  const users = data?.data ?? [];
  const metadata = data?.metadata;

  // FIXED: No infinite loop
  useEffect(() => {
    if (metadata?.totalPages != null) {
      setTotalPages(metadata.totalPages);
    }
  }, [metadata?.totalPages, setTotalPages]);

  return (
    <DashboardLayout title="إدارة المستخدمين">
      <div className="flex justify-between items-start gap-4">
        <UserManagementFilters />
        <AddUser />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <TableSkeleton rows={6} columns={columns.length} />
      ) : (
        <>
          <DataTable columns={columns} data={users} metadata={metadata} />
          <ReusablePagination />
        </>
      )}
    </DashboardLayout>
  );
}
