"use client";

import { DataTable } from "@/components/tables/data-table";
import { useGetUsers } from "./hooks/useGetUsers";
import { columns } from "./components/columns";
import { DashboardLayout } from "@/components/DashboardLayout";
import { AddUser } from "./components/AddUser/AddUser";
import { UserManagementFilters } from "./components/UserMnagementFilters";
import { ErrorState } from "@/components/ErrorState";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { useUsersPagination } from "@/store/user-management/useUsersPagination";
import { DataTablePagination } from "@/components/tables/DataTablePagination";
import { useEffect } from "react";
export default function UsersPage() {
  const {
    pageNumber,
    totalPages,
    setPageNumber,
    search,
    filterType,
    pageSize,
    setTotalPages,
  } = useUsersPagination();
  const { data, isLoading, isError, refetch } = useGetUsers({
    search,
    filterType,
    pageNumber,
    pageSize,
  });

  const users = data?.data ?? [];
  const metadata = data?.metadata;
  useEffect(() => {
    if (data?.metadata?.totalPages) {
      setTotalPages(data.metadata.totalPages);
    }
  }, [data?.metadata?.totalPages]);

  return (
    <DashboardLayout title="User Management">
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
          <DataTablePagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            onPageChange={(p) => setPageNumber(p)}
          />
        </>
      )}
    </DashboardLayout>
  );
}
