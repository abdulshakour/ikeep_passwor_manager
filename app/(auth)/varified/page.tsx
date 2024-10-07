import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import Link from "next/link";

export default function Varified({ params }) {
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
