"use client";

import { Input } from "@/components/ui/input";

export function AffiliatedCenterFilters({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) {
  return (
    <div>
      <Input
        type="text"
        value={search}
        placeholder="بحث عن مركز تابع..."
        className="border rounded-md px-3 py-2 w-64 focus:outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
