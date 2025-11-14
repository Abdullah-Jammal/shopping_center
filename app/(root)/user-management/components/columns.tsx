"use client";

import { Badge } from "@/components/ui/badge";
import { User } from "../types/users";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "الاسم الكامل",
  },
  {
    accessorKey: "email",
    header: "البريد الإلكتروني",
  },
  {
    accessorKey: "phoneNumber",
    header: "رقم الهاتف",
    cell: ({ row }) =>
      row.original.phoneNumber ? row.original.phoneNumber : "—",
  },
  {
    accessorKey: "entityType",
    header: "نوع المستخدم",
    cell: ({ row }) => (
      <Badge variant="secondary" className="px-3 py-1">
        {row.original.entityType}
      </Badge>
    ),
  },
  {
    accessorKey: "roles",
    header: "الصلاحيات",
    cell: ({ row }) => (
      <div className="flex gap-1 flex-wrap">
        {row.original.roles.map((role) => (
          <Badge key={role} className="px-2 py-1">
            {role}
          </Badge>
        ))}
      </div>
    ),
  },
];
