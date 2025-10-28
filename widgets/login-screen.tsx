"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  password: z.string(),
});

interface Props {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}

export default function LogInScreen({ setIsLoggedIn }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    if (values.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem("saved", "true");
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("saved");
      setIsLoggedIn(false);
      setErrorMessage("Access denied!");
    }

    setIsPending(false);
  }

  return (
    <section>
      <div className="wrapper-xs">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="max-w-lg mx-auto">
              <CardHeader>
                <h2 className="text-3xl font-bold text-center">Log in</h2>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="*****" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage>{errorMessage}</FormMessage>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isPending}>
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </section>
  );
}
