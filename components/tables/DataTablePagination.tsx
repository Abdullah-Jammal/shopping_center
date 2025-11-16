"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTablePaginationProps } from "@/types/DataTablePaginationProps";

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const page = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (pageCount <= 7) {
      for (let i = 0; i < pageCount; i++) pages.push(i);
      return pages;
    }

    pages.push(0);
    pages.push(1);

    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(pageCount - 3, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (page < pageCount - 4) pages.push("...");

    pages.push(pageCount - 2);
    pages.push(pageCount - 1);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-start px-2 py-4" dir="ltr">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft />
        </Button>

        {pages.map((p, index) =>
          p === "..." ? (
            <span key={index} className="px-2 text-gray-400 select-none">
              ...
            </span>
          ) : (
            <Button
              key={index}
              variant={p === page ? "default" : "outline"}
              className={`size-8 ${
                p === page ? "bg-main-color text-white hover:bg-main-color" : ""
              }`}
              onClick={() => table.setPageIndex(p as number)}
            >
              {Number(p) + 1}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  );
}
