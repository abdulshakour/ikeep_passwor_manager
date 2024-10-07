import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";

export default function Varify() {
  return (
    <>
      <div className="min-h-screen h-screen flex items-center justify-center">
        <div
          className="max-w-sm mx-auto flex flex-col text-center items-center bg-white
          shadow-2xl py-6 px-4 rounded-md"
        >
          <MailIcon size="50px" className="text-indigo-600" />
          <h1 className="text-xl font-medium mb-2 text-gray-600">
            Varify your email address
          </h1>
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Please click on the link </span> in
            the email we just sent you to confirm your email addres
          </p>
          <Button variant="link" className="text-indigo-600">
            Resend Email
          </Button>
        </div>
      </div>
    </>
  );
}
