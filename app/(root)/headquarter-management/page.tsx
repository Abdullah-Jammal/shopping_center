"use client";

import { useState, useEffect } from "react";
import { useGetHeadquarters } from "./hooks/useGetHeadquarters";
import { ReusablePagination } from "@/components/pagination/ReusablePagination";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { HeadquarterFilters } from "./components/HeadquarterFilters";
import { AddHeadquarter } from "./components/AddHeadquarter";
import { columns } from "./components/columns";
import { useHeadquarterPagination } from "@/store/pagination/useHeadquarterPagination";

export default function HeadquarterManagementPage() {
  const [search, setSearch] = useState("");

  const { page, pageSize, setTotalPages } = useHeadquarterPagination();

  const { data, isLoading, isError, refetch } = useGetHeadquarters({
    search,
    pageNumber: page,
    pageSize,
  });

  const headquarters = data?.data ?? [];
  const metadata = data?.metadata;

  useEffect(() => {
    if (metadata?.totalPages) {
      setTotalPages(metadata.totalPages);
    }
  }, [metadata, setTotalPages]);

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

            <ReusablePagination pagination={useHeadquarterPagination()} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
