"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserSearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  group: string;
}

export default function Leaderboard({ group }: Props) {
  const students = useQuery(api.students.getByGroup, { group });

  if (!students) return null;

  return (
    <div className="max-w-xl mx-auto overflow-hidden rounded-md border bg-background">
      {students.length > 0 ? (
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
                <TableCell className="text-right p-4">
                  {student.score}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UserSearchIcon />
            </EmptyMedia>
            <EmptyTitle>No data</EmptyTitle>
            <EmptyDescription>No students found</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/admin">Add students</Link>
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
