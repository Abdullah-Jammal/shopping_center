"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { columns } from "./components/columns";
import { BranchFilters } from "./components/BranchFilters";
import { AddBranch } from "./components/AddBranch";
import { useGetBranches } from "./hooks/useGetBranches";
import { ReusablePagination } from "@/components/pagination/ReusablePagination";
import { useBranchPagination } from "@/store/pagination/useBranchPagination";

export default function BranchManagementPage() {
  const [search, setSearch] = useState("");
  const { page, pageSize, setTotalPages } = useBranchPagination();

  const { data, isLoading, isError, refetch } = useGetBranches({
    search,
    page,
    pageSize,
  });

  const branches = data?.data ?? [];
  const metadata = data?.metadata ?? {
    totalPages: 1,
    totalRecords: branches.length,
  };

  return (
    <DashboardLayout
      title="إدارة الفروع"
      subtitle="عرض وإدارة جميع الفروع التابعة للمقرات"
      userName="System Super Admin"
      role="SuperAdmin"
    >
      <div className="flex items-start justify-between flex-wrap gap-4">
        <BranchFilters search={search} setSearch={setSearch} />
        <AddBranch />
      </div>

      <div className="mt-5">
        {isError ? (
          <ErrorState onRetry={refetch} />
        ) : isLoading ? (
          <TableSkeleton rows={6} columns={columns.length} />
        ) : (
          <>
            <DataTable columns={columns} data={branches} metadata={metadata} />
            <ReusablePagination pagination={useBranchPagination()} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
