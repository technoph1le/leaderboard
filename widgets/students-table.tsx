"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { DataTable } from "@/components/ui/data-table";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { GROUPS } from "@/lib/db";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "convex/react";

interface Props {
  group: (typeof GROUPS)[number];
}

export default function StudentsTable({ group }: Props) {
  const students = useQuery(api.students.getByGroup, { group });

  const columns: ColumnDef<Doc<"students">>[] = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "group",
      header: "Group",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "score",
      header: "Score",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <ButtonGroup>
            <Button>Edit</Button>
            <Button variant="outline">Score</Button>
            <Button variant="destructive">Delete</Button>
          </ButtonGroup>
        );
      },
    },
  ];

  if (!students) return null;

  return <DataTable columns={columns} data={students as Doc<"students">[]} />;
}
