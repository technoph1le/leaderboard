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
import { Button } from "@/components/ui/button";
import { PenIcon, TrashIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { ButtonGroup } from "@/components/ui/button-group";

import StudentForm, { StudentFormValues } from "./student-form";

interface Props {
  data: Doc<"students">;
}

export default function TableActions({ data }: Props) {
  const editStudent = useMutation(api.students.edit);
  const delStudent = useMutation(api.students.remove);

  const handleDelete = async (id: Id<"students">) => {
    await delStudent({ id });
  };

  async function handleSubmit(formData: StudentFormValues) {
    await editStudent({
      _id: data._id,
      name: formData.fullName,
      score: formData.score,
      group: formData.group,
    });
  }

  return (
    <ButtonGroup>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <PenIcon />
            Edit
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit student info</SheetTitle>
            <SheetDescription>
              Edit existing student in the group here. Click save when
              you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <StudentForm
            formId="edit-student-form"
            defaultValues={{
              fullName: data.name,
              group: data.group,
              score: data.score,
            }}
            onSubmit={handleSubmit}
          />
          <SheetFooter>
            <Button type="submit" form="edit-student-form">
              Save changes
            </Button>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <Button variant="destructive" onClick={() => handleDelete(data._id)}>
        <TrashIcon />
        Delete
      </Button>
    </ButtonGroup>
  );
}
