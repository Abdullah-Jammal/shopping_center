"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { HeadquarterFilters } from "./components/HeadquarterFilters";
import { AddHeadquarter } from "./components/AddHeadquarter";
import { columns } from "./components/columns";
import { useGetHeadquarters } from "./hooks/useGetHeadquarters";
import { DataTablePagination } from "@/components/tables/DataTablePagination";
import { useHeadquarterPagination } from "@/store/headquarter-management/useHeadquarterPagination";
import { useEffect } from "react";

export default function HeadquarterManagementPage() {
  const {
    search,
    pageNumber,
    pageSize,
    totalPages,
    setSearch,
    setPageNumber,
    setTotalPages,
  } = useHeadquarterPagination();

  const { data, isLoading, isError, refetch } = useGetHeadquarters({
    search,
    pageNumber,
    pageSize,
  });

  const headquarters = data?.data ?? [];
  const metadata = data?.metadata;

  useEffect(() => {
    if (metadata?.totalPages) {
      setTotalPages(metadata.totalPages);
    }
  }, [metadata?.totalPages]);

  return (
    <DashboardLayout
      title="إدارة المقرات الرئيسية"
      subtitle="عرض وإدارة جميع المقرات"
      userName="System Super Admin"
      role="SuperAdmin"
    >
      <div className="flex items-start justify-between flex-wrap gap-4">
        <HeadquarterFilters search={search} setSearch={setSearch} />
        <AddHeadquarter />
      </div>

      <div className="mt-5">
        {isLoading ? (
          <TableSkeleton />
        ) : isError ? (
          <ErrorState onRetry={refetch} />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={headquarters}
              metadata={metadata}
            />

            <DataTablePagination
              pageNumber={pageNumber}
              totalPages={totalPages}
              onPageChange={(p) => setPageNumber(p)}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
