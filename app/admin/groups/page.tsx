"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { GROUPS } from "@/lib/db";
import StudentsTable from "@/widgets/students-table";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import z from "zod";
import StudentForm, { StudentFormValues } from "@/widgets/student-form";

export default function Groups() {
  const addStudent = useMutation(api.students.add);

  const [selectedGroup, setSelectedGroup] = useState("GA");

  async function handleSubmit(formData: StudentFormValues) {
    await addStudent({
      name: formData.fullName,
      group: formData.group,
      score: formData.score,
    });
  }

  return (
    <>
      <div>
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">
            List of students - {selectedGroup}
          </h1>
          <div className="flex gap-2 items-center">
            <Select
              onValueChange={setSelectedGroup}
              defaultValue={selectedGroup}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {GROUPS.map((group) => (
                  <SelectItem key={group} value={group}>
                    {group}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Add new student</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Add a student</SheetTitle>
                  <SheetDescription>
                    Add new students to the group here. Click save when
                    you&apos;re done.
                  </SheetDescription>
                </SheetHeader>
                <StudentForm
                  formId="add-student-form"
                  defaultValues={{
                    fullName: "",
                    group: selectedGroup,
                    score: 0,
                  }}
                  onSubmit={handleSubmit}
                />
                <SheetFooter>
                  <Button type="submit" form="add-student-form">
                    Save changes
                  </Button>
                  <SheetClose asChild>
                    <Button variant="outline">Close</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="w-full my-8">
          <StudentsTable group={selectedGroup} />
        </div>
      </div>
    </>
  );
}
