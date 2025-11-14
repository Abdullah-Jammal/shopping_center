/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";

export function StatsCard({
  title,
  value,
  icon: Icon,
  color = "blue",
}: {
  title: string;
  value: string | number;
  icon: any;
  color?: "blue" | "green" | "orange" | "purple";
}) {
  const colorClasses = {
    blue: "bg-blue-500/10 text-blue-600",
    green: "bg-green-500/10 text-green-600",
    orange: "bg-orange-500/10 text-orange-600",
    purple: "bg-purple-500/10 text-purple-600",
  };

  return (
    <div className="p-5 rounded-xl border bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="space-y-1 text-right">
          <p className="text-gray-600 text-sm">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>

        <div
          className={cn(
            "p-3 rounded-lg flex items-center justify-center",
            colorClasses[color]
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
