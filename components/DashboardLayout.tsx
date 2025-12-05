"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import { logoutAndRedirect } from "@/app/(auth)/login/api/logout";
import { DashboardLayoutProps } from "@/types/DashboardLayoutProps";

export function DashboardLayout({
  title,
  subtitle,
  userName = "System Super Admin",
  role = "SuperAdmin",
  children,
}: DashboardLayoutProps) {
  return (
    <main className="flex-1 w-full px-4 py-4 overflow-x-hidden" dir="rtl">
      <div className="rounded-sm border bg-white p-6 shadow-xs flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1">
          {title && (
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
              {title}
            </h1>
          )}
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-12 p-4 rounded-xs bg-white">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 text-sm">
                {userName}
              </span>
              <Badge className="w-fit mt-1 bg-orange-100/90 text-orange-500/90 px-3 py-1 shadow">
                {role}
              </Badge>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              logoutAndRedirect(Cookies.get("refreshToken") ?? undefined)
            }
            className="flex items-center gap-2 text-red-600 border-red-300 hover:text-white hover:bg-red-600
             transition-all duration-200 rounded-xs px-4 py-2 shadow-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </Button>
        </div>
      </div>

      <div className="w-full bg-white dark:bg-gray-950 rounded-sm shadow-sm border border-gray-200 dark:border-gray-800 p-6">
        {children}
      </div>
    </main>
  );
}
