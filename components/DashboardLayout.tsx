"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { logoutAndRedirect } from "@/app/(auth)/login/api/logout";
import { DashboardLayoutProps } from "@/types/DashboardLayoutProps";

export function DashboardLayout({ title, children }: DashboardLayoutProps) {
  return (
    <main className="flex-1 w-full px-8 py-10 overflow-x-hidden" dir="rtl">
      <div className="flex items-center justify-between mb-6 border-gray-200 dark:border-gray-800 pb-3">
        {title && (
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h1>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            logoutAndRedirect(Cookies.get("refreshToken") ?? undefined)
          }
          className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-white hover:bg-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </Button>
      </div>

      <div className="w-full bg-white dark:bg-gray-950 rounded-sm shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        {children}
      </div>
    </main>
  );
}
