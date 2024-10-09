"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const formScheme = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "your password should be 8 characters long" }),
});

const url = process.env.NEXT_PUBLIC_BASE_URL;

export default function Login() {
  const search = useSearchParams();
  const error = search.get("error");
  const errorCode = search.get("code");

  console.log("ERRRRRRRRRRRRk", errorCode);
  console.log("errrr", error);

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formScheme>) => {
    console.log("LOGIN", values);
    console.log("url", url);
    try {
      const result = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (result?.error) {
        // Display the error message to the user
        console.log("Login Error:", result);
      } else {
        // If login is successful, redirect or perform other actions
        console.log("Login successful", result);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
    // try {
    //   const result = await signIn("credentials", {
    //     ...values,
    //     redirect: false,
    //   });
    //   console.log("DDDDD___--__", result);
    // } catch (error) {
    //   console.log("EROR", error);
    // }
  };
  return (
    <>
      <div className="min-h-screen h-screen ">
        <div className=" h-full pt-24 max-w-2xl mx-auto flex flex-col items-center">
          <div className=" shadow-lg max-w-sm w-full py-2 px-4 rounded-md">
            <h1 className="text-xl text-center font-semibold my-6">
              Welcome back!
            </h1>
            <div className="flex justify-between">
              <h2 className="text-md font-semibold">sign in</h2>
              <p className="text-sm text-gray-600 font-medium">
                You don't have account?
                <span className="text-gray-700 font-semibold underline">
                  <Link href="/sign-up">sign up</Link>
                </span>
              </p>
            </div>
            <div className="mt-6">
              <Form {...form}>
                <form className="" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600">Email</FormLabel>
                        <FormControl>
                          <Input
                            className="py-5"
                            placeholder="example@gmail.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className=" mt-4">
                        <FormLabel className="text-gray-600">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="py-5"
                            type="password"
                            placeholder="*******"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full my-4">
                    Sign in
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
