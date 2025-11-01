"use client";

import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  group: string;
}

export default function Leaderboard({ group }: Props) {
  const students = useQuery(api.students.getByGroup, { group });

  if (!students) return null;

  return (
    <div className="max-w-xl mx-auto overflow-hidden rounded-md border bg-background">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-16 p-4">No.</TableHead>
            <TableHead className="p-4">Full Name</TableHead>
            <TableHead className="p-4">Student ID</TableHead>
            <TableHead className="text-right p-4">Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow key={student._id}>
              <TableCell className="p-4 font-bold bg-accent">
                {index + 1}
              </TableCell>
              <TableCell className="p-4 ">{student.name}</TableCell>
              <TableCell className="p-4">{student.id}</TableCell>
              <TableCell className="text-right p-4">{student.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
