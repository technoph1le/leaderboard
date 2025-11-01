"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { GROUPS } from "@/lib/db";
import { useAuth } from "@/providers/auth-provider";
import LogInScreen from "@/widgets/login-screen";
import StudentsTable from "@/widgets/students-table";
import { useMutation } from "convex/react";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";

export default function AdminPage() {
  const addStudent = useMutation(api.students.addStudent);
  const { isAdmin } = useAuth();

  const [group, setGroup] = useState("");
  const [name, setName] = useState("");

  const handleAdd = async () => {
    await addStudent({ group, name });
  };

  return (
    <>
      {isAdmin ? (
        <section>
          <div className="wrapper">
            <Select onValueChange={setGroup}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Groups</SelectLabel>
                  {GROUPS.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <div className="w-2xl my-8">
              <StudentsTable group={group} />
            </div>

            <Label htmlFor="student">Add new student</Label>
            <Input
              type="text"
              id="student"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>
        </section>
      ) : (
        <LogInScreen />
      )}
    </>
  );
}
