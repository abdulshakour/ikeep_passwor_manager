"use client";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Varified({ params }) {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log("PARAMS:", params);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  // console.log("DATTTT:::", token);
  // console.log("Email::", email);

  useEffect(() => {
    const varify = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users/verify", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            email,
          }),
        });
        const res = await response.json();
        console.log("response", res);
        setData(res.detail);
      } catch (error) {
        console.log("ERRor", error);
      } finally {
        setLoading(true);
      }
    };

    varify();
  }, []);

  if (!loading) {
    return (
      <div className="min-h-screen h-screen flex flex-col items-center justify-center">
        <p className="text-xl animate-pulse font-semibold text-indigo-600 flex gap-x-1 items-center">
          <span className="animate-bounce h-3 w-3 bg-indigo-600 block rounded-full"></span>
          <span className="animate-bounce h-3 w-3 bg-indigo-600 block rounded-full"></span>
          <span className="animate-bounce h-3 w-3 bg-indigo-600 block rounded-full"></span>
        </p>
      </div>
    );
  }

  if (data !== "Account is activated successfully") {
    return (
      <div className="min-h-screen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-xl font-medium underline text-indigo-400">
            {data}
          </p>
          <Button variant="ghost" asChild>
            <Link href="/sign-up">Go back</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen h-screen flex items-center justify-center">
        <div
          className="max-w-md w-full mx-auto flex flex-col text-center items-center bg-white
          shadow-2xl py-6 px-4rounded-md space-y-4"
        >
          <CircleCheck size="50px" className="text-green-600" />
          <h1 className="text-xl font-medium mb-2 text-gray-600">
            Email verification successfull
          </h1>
          <Button asChild>
            <Link
              href="/sign-in"
              className="bg-green-600 text-white hover:bg-green-700"
            >
              Continue
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}
