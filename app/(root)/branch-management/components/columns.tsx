import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
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
    accessorKey: "headquarterId",
    header: "معرّف المقر",
    cell: ({ row }) => row.original.headquarterId || "—",
  },
];
