"use client";

import { generatePagination } from "@/utils/generatePagination";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { useUsersPagination } from "@/app/(root)/user-management/hooks/store/useUsersPagination";

export function ReusablePagination() {
  const { page, totalPages, setPage } = useUsersPagination();

  if (totalPages <= 1) return null;

  const pages: (number | string)[] = generatePagination(page, totalPages);

  return (
    <div
      dir="rtl"
      className="flex items-center justify-end gap-2 py-6 select-none"
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        <ChevronRight size={18} />
      </Button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i}>…</span>
        ) : (
          <Button
            key={i}
            onClick={() => {
              if (typeof p === "number") setPage(p);
            }}
            variant={p === page ? "default" : "outline"}
          >
            {p}
          </Button>
        )
      )}

      <Button
        variant="outline"
        size="icon"
        className="rounded-lg"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronLeft size={18} />
      </Button>
    </div>
  );
}
