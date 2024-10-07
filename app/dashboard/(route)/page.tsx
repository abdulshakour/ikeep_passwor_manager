"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Settings,
  Search,
  Eye,
  EyeOff,
  Copy,
  User,
} from "lucide-react";
import Link from "next/link";

// Simulated encryption function (replace with actual encryption in production)
const encrypt = (text: string) => btoa(text);
const decrypt = (text: string) => atob(text);

export default function Dashboard() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      web_name: "Example",
      url: "https://example.com",
      email: encrypt("user@example.com"),
      password: encrypt("password123"),
    },
    {
      id: 2,
      web_name: "Sample",
      url: "https://sample.com",
      email: encrypt("user@sample.com"),
      password: encrypt("samplepass"),
    },
  ]);
  const [showPassword, setShowPassword] = useState<number | null>(null);
  const [newAccount, setNewAccount] = useState({
    web_name: "",
    url: "",
    email: "",
    password: "",
  });

  const handleAddAccount = () => {
    const newId = accounts.length + 1;
    setAccounts([
      ...accounts,
      {
        ...newAccount,
        id: newId,
        email: encrypt(newAccount.email),
        password: encrypt(newAccount.password),
      },
    ]);
    setNewAccount({ web_name: "", url: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <div className="relative w-full sm:w-64">
            <Input
              type="search"
              placeholder="Search accounts..."
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <PlusCircle className="h-5 w-5 mr-2" /> Add New Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Account</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="web_name" className="text-right">
                      Website Name
                    </Label>
                    <Input
                      id="web_name"
                      value={newAccount.web_name}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          web_name: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">
                      URL
                    </Label>
                    <Input
                      id="url"
                      value={newAccount.url}
                      onChange={(e) =>
                        setNewAccount({ ...newAccount, url: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      value={newAccount.email}
                      onChange={(e) =>
                        setNewAccount({ ...newAccount, email: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={newAccount.password}
                      onChange={(e) =>
                        setNewAccount({
                          ...newAccount,
                          password: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleAddAccount}>Add Account</Button>
              </DialogContent>
            </Dialog>
            <Link href="/generate-password">
              <Button variant="outline">Generate Password</Button>
            </Link>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => (
            <Card
              key={account.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{account.web_name}</h3>
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${account.url}&sz=32`}
                    alt={`${account.web_name} favicon`}
                    className="w-8 h-8"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <Label htmlFor={`email-${account.id}`}>Email</Label>
                    <div className="relative">
                      <Input
                        id={`email-${account.id}`}
                        value={decrypt(account.email)}
                        className="pr-10 font-mono"
                        readOnly
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() =>
                          navigator.clipboard.writeText(decrypt(account.email))
                        }
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`password-${account.id}`}>Password</Label>
                    <div className="relative">
                      <Input
                        id={`password-${account.id}`}
                        type={showPassword === account.id ? "text" : "password"}
                        value={decrypt(account.password)}
                        className="pr-20 font-mono"
                        readOnly
                      />
                      <div className="absolute right-0 top-0 flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setShowPassword(
                              showPassword === account.id ? null : account.id,
                            )
                          }
                        >
                          {showPassword === account.id ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              decrypt(account.password),
                            )
                          }
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <a
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline truncate"
                  >
                    {account.url}
                  </a>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
