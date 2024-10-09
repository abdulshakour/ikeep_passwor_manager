"use client";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Tost from "@/components/context/Toast";
import toast from "react-hot-toast";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

// Form schema with password confirmation
const formSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message:
          "Password must contain at least one uppercase letter, one number, and one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export default function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    /* console.log("Data::", values); */

    const { confirmPassword, ...formData } = values;
    /* console.log("DEc", formData); */

    try {
      const response = await fetch(`${URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const errorData = await response.json();

      if (!response.ok) {
        throw new Error(errorData?.detail || "Failed to create user");
      }
      const data = await response.json();
      console.log("DATA:::", data);
      form.reset();
      router.push("/varify");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong.",
      );
      console.log("Error>>>---__", error);
    }
  };

  return (
    <>
      <Tost />
      <div className="h-screen min-h-screen">
        <div className="max-w-5xl mx-auto h-full ">
          <div className="max-w-md mx-auto px-2 flex flex-col items-center pt-24 h-full">
            <div className="shadow-md w-full border p-4 rounded">
              <div className=" ">
                <h1 className="text-center font-semibold text-2xl text-indigo-600">
                  iKeep
                </h1>
                <div className="flex justify-between items-center mb-8 pt-4">
                  <h1 className="text-xl font-semibold">Sign up</h1>
                  <p className="text-md text-gray-500">
                    Already have an account?
                    <Link
                      className="text-gray-700 font-semibold underline"
                      href="/sign-in"
                    >
                      sign in
                    </Link>
                  </p>
                </div>
              </div>
              <div>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="mb-2">
                          <FormLabel className="text-gray-500 font-semibold">
                            Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="py-5"
                              placeholder="alex"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-500 font-semibold">
                            Email
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="py-5"
                              type="email"
                              placeholder="example@gmail.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormLabel className="text-gray-500 font-semibold">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="py-5"
                              type="password"
                              placeholder="*********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className="mt-2">
                          <FormLabel className="text-gray-500 font-semibold">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="py-5"
                              type="password"
                              placeholder="*********"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-4 w-full">
                      Sign up
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
