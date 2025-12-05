"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/main-page/StatsCard";
import { Building2, Users2, Building, Network } from "lucide-react";
import { UseGetStatistics } from "./main-page-folders/hooks/UseGetStatistics";
import { ErrorState } from "@/components/ErrorState";
import { TableSkeleton } from "@/components/tables/TableSkeleton";

export default function UsersPage() {
  const { data, isLoading, isError, refetch } = UseGetStatistics();

  return (
    <DashboardLayout title="لوحة التحكم الرئيسية">
      {isError ? (
        <ErrorState onRetry={refetch} />
      ) : isLoading ? (
        <TableSkeleton rows={6} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="عدد الفروع"
              value={data?.branchesCount}
              icon={Building2}
              color="blue"
            />

            <StatsCard
              title="عدد المراكز الملحقة"
              value={data?.affiliatedCentersCount}
              icon={Network}
              color="green"
            />

            <StatsCard
              title="عدد المقرات الرئيسية"
              value={data?.headquartersCount}
              icon={Building}
              color="orange"
            />

            <StatsCard
              title="عدد المستخدمين"
              value={data?.usersCount}
              icon={Users2}
              color="purple"
            />
          </div>

          <div className="mt-8">
            <div className="bg-white p-6 border rounded-xl shadow-sm">
              <h2 className="text-xl font-bold mb-4">نظرة عامة على النظام</h2>
              <p className="text-gray-600">
                سيتم إضافة مخططات أو آخر النشاطات هنا.
              </p>
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
