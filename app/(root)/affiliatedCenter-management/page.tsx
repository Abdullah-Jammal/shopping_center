"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { columns } from "./components/columns";
import { AffiliatedCenterFilters } from "./components/AffiliatedCenterFilters";
import { AddAffiliatedCenter } from "./components/AddAffiliatedCenter";
import { useGetAffiliatedCenters } from "./hooks/useGetAffiliatedCenters";
import { DataTablePagination } from "@/components/tables/DataTablePagination";
import { useAffiliatedCentersPagination } from "@/store/affiliated-center-management/useAffiliatedCentersPagination";
import { useEffect } from "react";

export default function AffiliatedCenterManagementPage() {
  const {
    search,
    headquarterId,
    branchId,
    pageNumber,
    pageSize,
    totalPages,
    setSearch,
    setPageNumber,
    setTotalPages,
  } = useAffiliatedCentersPagination();

  const { data, isLoading, isError, refetch } = useGetAffiliatedCenters({
    search,
    headquarterId,
    branchId,
    pageNumber,
    pageSize,
  });

  const centers = data?.data ?? [];
  const metadata = data?.metadata;

  useEffect(() => {
    if (metadata?.totalPages) {
      setTotalPages(metadata.totalPages);
    }
  }, [metadata?.totalPages]);

  return (
    <DashboardLayout
      title="إدارة المراكز التابعة"
      subtitle="عرض وإدارة جميع المراكز التابعة للمقرات والفروع"
      userName="System Super Admin"
      role="SuperAdmin"
    >
      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
        <AffiliatedCenterFilters search={search} setSearch={setSearch} />
        <AddAffiliatedCenter />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <TableSkeleton rows={6} columns={columns.length} />
      ) : (
        <>
          <DataTable columns={columns} data={centers} metadata={metadata} />

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
