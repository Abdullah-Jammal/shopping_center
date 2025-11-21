"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";

import { columns } from "./components/columns";
import { HeadquarterFilters } from "./components/HeadquarterFilters";
import { AddHeadquarter } from "./components/AddHeadquarter";
import { useGetHeadquarters } from "./hooks/useGetHeadquarters";

export default function HeadquarterManagementPage() {
  const { data, isLoading, isError, refetch } = useGetHeadquarters();

  const headquarters = data?.data ?? [];
  const metadata = data?.metadata ?? {
    totalPages: 1,
    totalRecords: headquarters.length,
  };

  return (
    <DashboardLayout
      title="إدارة المقار"
      subtitle="عرض وإدارة جميع المقار الرئيسية"
      userName="System Super Admin"
      role="SuperAdmin"
    >
      <div className="flex items-start justify-between flex-wrap gap-4">
        <HeadquarterFilters />
        <AddHeadquarter />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <TableSkeleton rows={6} columns={columns.length} />
      ) : (
        <DataTable columns={columns} data={headquarters} metadata={metadata} />
      )}
    </DashboardLayout>
  );
}
