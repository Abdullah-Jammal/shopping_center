import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "اسم المركز",
    cell: ({ row }) => row.original.name || "—",
  },
  {
    accessorKey: "headquarterId",
    header: "معرّف المقر",
    cell: ({ row }) => row.original.headquarterId || "—",
  },
  {
    accessorKey: "branchId",
    header: "معرّف الفرع",
    cell: ({ row }) => row.original.branchId || "—",
  },
];
