import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  AffiliatedCenter,
  HeadquarterProps,
  Branches,
} from "../types/Headquarter";

export const columns: ColumnDef<HeadquarterProps>[] = [
  {
    accessorKey: "name",
    header: "اسم المقر",
    cell: ({ row }) => row.original.name ?? "—",
  },
  {
    accessorKey: "branches",
    header: "الفروع",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.branches?.length ? (
          row.original.branches.map((branch: Branches, key) => (
            <Badge
              key={key}
              className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md shadow"
            >
              {branch.name}
            </Badge>
          ))
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "affiliatedCenters",
    header: "المراكز التابعة",
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-2">
        {row.original.affiliatedCenters?.length ? (
          row.original.affiliatedCenters.map(
            (center: AffiliatedCenter, index: number) => (
              <Badge
                key={index}
                className="bg-purple-100 text-purple-600 px-3 py-1 rounded-md shadow"
              >
                {center.name ?? "مركز بدون اسم"}
              </Badge>
            )
          )
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </div>
    ),
  },
];
