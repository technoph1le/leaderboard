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

export default function Groups() {
  const addStudent = useMutation(api.students.add);

  const [group, setGroup] = useState("GA");
  const [name, setName] = useState("");

  const handleAdd = async () => {
    try {
      await addStudent({ group, name });
    } catch {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div>
        <div className="flex gap-4 items-center justify-between">
          <h1 className="text-2xl font-bold">List of students - {group}</h1>
          <div className="flex gap-2 items-center">
            <Select onValueChange={setGroup} defaultValue={group}>
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
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  <div className="grid gap-3">
                    <Label htmlFor="student">Full Name</Label>
                    <Input
                      type="text"
                      id="student"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <Button type="submit" onClick={handleAdd}>
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
          <StudentsTable group={group} />
        </div>
      </div>
    </>
  );
}
