"use client";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <Lock className="h-8 w-8 text-purple-600" />
              <span className="text-2xl font-bold text-purple-600">Ikeep</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="hidden">
                <Button variant="ghost" className="font-semibold text-gray-500">
                  Dashboard
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-purple-600 font-medium hover:text-purple-700"
                >
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white font-medium">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
