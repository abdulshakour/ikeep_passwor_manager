import { Button } from "@/components/ui/button";
import { Lock, Settings, User } from "lucide-react";

export default function Nav() {
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl flex items-center gap-x-1  font-semibold text-gray-900">
            <Lock className="h-5 w-5 font-bold" /> ikeep
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
