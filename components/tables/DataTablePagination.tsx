"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataTablePaginationProps {
  pageNumber: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  pageNumber,
  totalPages,
  onPageChange,
}: DataTablePaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1, 2);

    if (pageNumber > 4) pages.push("...");

    const start = Math.max(3, pageNumber - 1);
    const end = Math.min(totalPages - 2, pageNumber + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (pageNumber < totalPages - 3) pages.push("...");

    pages.push(totalPages - 1, totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-end px-2 py-4" dir="rtl">
      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(1)}
          disabled={pageNumber === 1}
        >
          <ChevronsRight />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          <ChevronRight />
        </Button>

        {pages.map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <Button
              key={index}
              variant={p === pageNumber ? "default" : "secondary"}
              className={`size-8 ${
                p === pageNumber ? "bg-primary text-white" : ""
              }`}
              onClick={() => onPageChange(p as number)}
            >
              {p}
            </Button>
          )
        )}

        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          <ChevronLeft />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="size-8"
          onClick={() => onPageChange(totalPages)}
          disabled={pageNumber === totalPages}
        >
          <ChevronsLeft />
        </Button>
      </div>
    </div>
  );
}
