"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { DataTable } from "@/components/tables/data-table";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { ErrorState } from "@/components/ErrorState";

import { columns } from "./components/columns";
import { AffiliatedCenterFilters } from "./components/AffiliatedCenterFilters";
import { AddAffiliatedCenter } from "./components/AddAffiliatedCenter";
import { useGetAffiliatedCenters } from "./hooks/useGetAffiliatedCenters";

export default function AffiliatedCenterManagementPage() {
  const { data, isLoading, isError, refetch } = useGetAffiliatedCenters();

  const centers = data?.data ?? [];
  const metadata = data?.metadata ?? {
    totalRecords: centers.length,
    totalPages: 1,
  };

  return (
    <DashboardLayout
      title="إدارة المراكز التابعة"
      subtitle="عرض وإدارة جميع المراكز التابعة للمقرات والفروع"
      userName="System Super Admin"
      role="SuperAdmin"
    >
      <div className="flex items-start justify-between flex-wrap gap-4">
        <AffiliatedCenterFilters />
        <AddAffiliatedCenter />
      </div>

      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <TableSkeleton rows={6} columns={columns.length} />
      ) : (
        <DataTable columns={columns} data={centers} metadata={metadata} />
      )}
    </DashboardLayout>
  );
}
