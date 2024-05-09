"use client";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../../../components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  email: z.string().min(5, { message: "Email is required" }).email({
    message: "Invalid email",
  }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function LogInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setLoading(true);
    form.reset();

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });
    console.log(res);
    if (res!.error) {
      if (res?.error.includes("password"))
        form.setError("password", { type: "custom", message: res?.error });
      else form.setError("email", { type: "custom", message: res?.error });
      setLoading(false);
    } else {
      router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="e-mail adress" {...field}></Input>
              </FormControl>
              <FormMessage className="float-right text-xs"></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="password"
                  type="password"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage className="float-right text-xs"></FormMessage>
            </FormItem>
          )}
        ></FormField>
        <Separator
          className={`my-2 ${form.formState.errors.password && "mt-0"}`}
        ></Separator>
        <Button disabled={loading}>Log in!</Button>
        <Separator className="mt-2"></Separator>
      </form>
    </Form>
  );
}
