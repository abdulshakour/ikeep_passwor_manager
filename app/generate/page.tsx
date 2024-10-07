"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Copy } from "lucide-react";
import Link from "next/link";

export default function GeneratePassword() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [mode, setMode] = useState("medium");

  const generatePassword = () => {
    let charset = "";
    if (mode === "easy")
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (mode === "medium")
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    if (mode === "hard")
      charset =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let generatedPassword = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      generatedPassword += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(generatedPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Generate Password
          </h1>
          <Link href="/">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
          <div>
            <Label htmlFor="password">Generated Password</Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Input
                type="text"
                id="password"
                className="pr-10 font-mono"
                value={password}
                readOnly
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => navigator.clipboard.writeText(password)}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label>Password Strength</Label>
            <RadioGroup value={mode} onValueChange={setMode} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="easy" id="easy" />
                <Label htmlFor="easy">Easy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hard" id="hard" />
                <Label htmlFor="hard">Hard</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Password Length: {length}</Label>
            <Slider
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              min={8}
              max={32}
              step={1}
              className="mt-2"
            />
          </div>
          <Button onClick={generatePassword} className="w-full">
            Generate Password
          </Button>
        </div>
      </main>
    </div>
  );
}
