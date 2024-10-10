"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Shield, Zap, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission (e.g., newsletter signup or early access)
    console.log("Email submitted:", email);
    // Reset the email input
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center">
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Secure Your Digital Life with SecurePass
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Manage all your passwords with ease and security. SecurePass keeps
            your digital life safe and organized.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/sign-up">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6">
                Get Started <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/features">
              <Button
                variant="outline"
                className="border-purple-600 text-purple-600 hover:bg-purple-50 text-lg px-8 py-6"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Shield className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Bank-Level Encryption
            </h2>
            <p className="text-gray-600">
              Your data is protected with AES-256 encryption, ensuring maximum
              security.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Zap className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Lightning Fast Access
            </h2>
            <p className="text-gray-600">
              Quickly access your passwords across all your devices with our
              cloud sync.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <Lock className="h-12 w-12 text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Password Generator</h2>
            <p className="text-gray-600">
              Create strong, unique passwords with our built-in password
              generator.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            Why Choose SecurePass?
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <p>Store unlimited passwords securely</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <p>Sync across all your devices</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <p>Auto-fill passwords in your browser</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <p>Two-factor authentication support</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <p>Secure password sharing</p>
            </div>
            <div className="flex items-start">
              <Check className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
              <p>24/7 customer support</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="bg-purple-600 rounded-lg shadow-md p-8 text-white text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <h2 className="text-2xl font-bold mb-4">
            Ready to secure your passwords?
          </h2>
          <p className="mb-6">
            Sign up for our newsletter to get early access and exclusive offers.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-gray-900 w-full sm:w-64"
              required
            />
            <Button
              type="submit"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Get Early Access
            </Button>
          </form>
        </motion.div>
      </main>

      <footer className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-gray-200 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; 2024 SecurePass. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
