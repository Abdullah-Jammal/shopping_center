"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";
import { columns } from "./components/columns";
import { HeadquarterFilters } from "./components/HeadquarterFilters";
import { AddHeadquarter } from "./components/AddHeadquarter";
import { useGetHeadquarters } from "./hooks/useGetHeadquarters";

export default function HeadquarterManagementPage() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 10;

  const { data, isLoading, isError, refetch } = useGetHeadquarters({
    search,
    pageNumber,
    pageSize,
  });

  const headquarters = data?.data ?? [];
  const metadata = data?.metadata ?? {
    totalPages: 1,
    totalRecords: headquarters.length,
  };

  return (
    <DashboardLayout
      title="إدارة المقرات الرئيسية"
      subtitle="عرض وإدارة جميع المقرات الرئيسية"
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
          <DataTable
            columns={columns}
            data={headquarters}
            metadata={metadata}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
