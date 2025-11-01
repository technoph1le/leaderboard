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
import { useAuth } from "@/providers/auth-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  password: z.string(),
});

export default function LogInScreen() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const { setIsAdmin } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, setIsPending] = useState(false);

  async function onSubmit({ password }: z.infer<typeof formSchema>) {
    try {
      setIsPending(true);
      setErrorMessage("");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) throw new Error("Access denied!");

      localStorage.setItem("saved", "true");
      setIsAdmin(true);
    } catch (error: any) {
      localStorage.removeItem("saved");
      setIsAdmin(false);
      setErrorMessage(error.message || "Access denied!");
    } finally {
      setIsPending(false);
    }
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
