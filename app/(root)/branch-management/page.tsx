"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { columns } from "./components/columns";
import { BranchFilters } from "./components/BranchFilters";
import { AddBranch } from "./components/AddBranch";
import { useGetBranches } from "./hooks/useGetBranches";
import { DataTablePagination } from "@/components/tables/DataTablePagination";
import { useBranchesPagination } from "@/store/branch-management/useBranchesPagination";
import { useEffect } from "react";

export default function BranchManagementPage() {
  const {
    search,
    pageNumber,
    pageSize,
    totalPages,
    setSearch,
    setPageNumber,
    setTotalPages,
  } = useBranchesPagination();

  const { data, isLoading, isError, refetch } = useGetBranches({
    search,
    pageNumber,
    pageSize,
  });

  const branches = data?.data ?? [];
  const metadata = data?.metadata;

  useEffect(() => {
    if (metadata?.totalPages) {
      setTotalPages(metadata.totalPages);
    }
  }, [metadata?.totalPages]);

  return (
    <DashboardLayout title="إدارة الفروع">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <BranchFilters search={search} setSearch={setSearch} />
        <AddBranch />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <TableSkeleton rows={6} columns={columns.length} />
      ) : (
        <>
          <DataTable columns={columns} data={branches} metadata={metadata} />

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
