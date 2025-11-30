import { ColumnDef } from "@tanstack/react-table";
import { BranchProps, AffiliatedProps } from "../types/Branches";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<BranchProps>[] = [
  {
    accessorKey: "name",
    header: "اسم الفرع",
    cell: ({ row }) => row.original.name || "—",
  },
  {
    accessorKey: "address",
    header: "العنوان",
    cell: ({ row }) => row.original.address || "—",
  },
  {
    accessorKey: "headquarterName",
    header: "أسم المقر الرئيسي",
    cell: ({ row }) => row.original.headquarterName || "—",
  },
  {
    accessorKey: "affiliatedCenters",
    header: "المراكز التابعة",
    cell: ({ row }) => {
      const centers = row.original.affiliatedCenters;
      return (
        <div className="flex flex-wrap gap-2 max-w-[300px]">
          {centers?.length ? (
            centers.map((center: AffiliatedProps, idx: number) => (
              <Badge
                key={idx}
                className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md border border-blue-200"
              >
                {center.name}
              </Badge>
            ))
          ) : (
            <span className="text-gray-400">لا يوجد</span>
          )}
        </div>
      );
    },
  },
];
