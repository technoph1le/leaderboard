"use client";

import { DataTable } from "@/components/ui/data-table";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { GROUPS } from "@/lib/db";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "convex/react";

import TableActions from "./table-actions";

interface Props {
  group: (typeof GROUPS)[number];
}

export default function StudentsTable({ group }: Props) {
  const students = useQuery(api.students.getByGroup, { group });

  const columns: ColumnDef<Doc<"students">>[] = [
    {
      accessorKey: "group",
      header: "Group",
    },
    {
      accessorKey: "name",
      header: "Full Name",
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "score",
      header: "Score",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const data = row.original;

        return <TableActions data={data} />;
      },
    },
  ];

  if (!students) return null;

  return <DataTable columns={columns} data={students as Doc<"students">[]} />;
}
