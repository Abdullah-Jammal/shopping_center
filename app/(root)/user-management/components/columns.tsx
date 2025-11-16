import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "fullName",
    header: "الاسم الكامل",
    cell: ({ row }) => row.original.fullName || "—",
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "phoneNumber",
    header: "رقم الهاتف",
    cell: ({ row }) => row.original.phoneNumber || "—",
  },
  {
    accessorKey: "entityType",
    header: "نوع المستخدم",
  },
  {
    accessorKey: "roles",
    header: "الصلاحيات",
    cell: ({ row }) => (
      <div className="flex gap-2">
        {row.original.roles?.map((role: string) => (
          <Badge key={role} className="w-fit bg-orange-100/90 text-orange-500/90 px-3 py-1 shadow">
            {role}
          </Badge>
        ))}
      </div>
    ),
  },
];
