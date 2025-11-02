import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PenIcon, TrashIcon } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GROUPS } from "@/lib/db";

const formSchema = z.object({
  fullName: z.string(),
  group: z.string(),
  score: z.number(),
});

interface Props {
  data: {
    _id: Id<"students">;
    _creationTime: number;
    score: number;
    id: string;
    group: string;
    name: string;
  };
}

export default function TableActions({ data }: Props) {
  const editStudent = useMutation(api.students.edit);
  const delStudent = useMutation(api.students.remove);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: data.name,
      score: data.score,
      group: data.group,
    },
  });

  const handleDelete = async (id: Id<"students">) => {
    await delStudent({ id });
  };

  async function onSubmit(formData: z.infer<typeof formSchema>) {
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
          <form
            id="edit-student-info"
            className="grid flex-1 auto-rows-min gap-6 px-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="fullName">Full Name</FieldLabel>
                    <Input
                      {...field}
                      id="fullName"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="group"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="group">Group</FieldLabel>
                    <Select
                      {...field}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                        id="group"
                      >
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
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="score"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="score">Score</FieldLabel>
                    <Input
                      {...field}
                      id="score"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
          <SheetFooter>
            <Button type="submit" form="edit-student-info">
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
