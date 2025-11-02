import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
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

export type StudentFormValues = z.infer<typeof formSchema>;

interface StudentFormProps {
  formId: string;
  defaultValues: Partial<StudentFormValues>;
  onSubmit: (data: StudentFormValues) => Promise<void> | void;
}

export default function StudentForm({
  formId,
  defaultValues,
  onSubmit,
}: StudentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      group: "",
      score: 0,
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: StudentFormValues) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <form
      id={formId}
      className="grid flex-1 auto-rows-min gap-6 px-4"
      onSubmit={form.handleSubmit(handleSubmit)}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                autoComplete="off"
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
}
