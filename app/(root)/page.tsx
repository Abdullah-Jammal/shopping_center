"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/main-page/StatsCard";

import { Building2, Users2, Building, Network } from "lucide-react";

export default function UsersPage() {
  return (
    <DashboardLayout title="لوحة التحكم الرئيسية">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="عدد الفروع"
          value="24"
          icon={Building2}
          color="blue"
        />

        <StatsCard
          title="عدد المراكز الملحقة"
          value="18"
          icon={Network}
          color="green"
        />

        <StatsCard
          title="عدد المقرات الرئيسية"
          value="7"
          icon={Building}
          color="orange"
        />

        <StatsCard
          title="عدد المستخدمين"
          value="152"
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
    </DashboardLayout>
  );
}
