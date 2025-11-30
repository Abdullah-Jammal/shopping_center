import { ColumnDef } from "@tanstack/react-table";

interface AffiliatedProps {
  id: string;
  name: string;
  headquarterName: string;
  branchName: string;
}

export const columns: ColumnDef<AffiliatedProps>[] = [
  {
    accessorKey: "name",
    header: "اسم المركز",
    cell: ({ row }) => row.original.name || "—",
  },
  {
    accessorKey: "headquarterName",
    header: "أسم المقر الرئيسي",
    cell: ({ row }) => row.original.headquarterName || "—",
  },
  {
    accessorKey: "branchName",
    header: "أسم الفرع",
    cell: ({ row }) => row.original.branchName || "—",
  },
];
