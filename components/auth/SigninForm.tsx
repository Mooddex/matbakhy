
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import GoogleAuth from "../../lib/firebase/auth/GoogleAuth";
import { Input } from "../ui/input";
import signIn from "@/lib/firebase/auth/signin";
import { toast } from "react-toastify";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const { result, error } = await signIn(email, password);

    if (error) {
      toast.error("Sign In failed!");
      return console.log(error);
    }

    toast.success("Sign In successful!");
    console.log(result);
    return router.push("/");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Glassmorphism Header */}
          <div className="relative bg-linear-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm px-8 py-8 text-center">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-white/80 text-lg">
                Sign in to continue your journey
              </p>
            </div>
          </div>

          {/* Form Body - Moved Outside Header */}
          <div className="p-8">
            <form onSubmit={handleForm}>
              <div className="text-start flex flex-col gap-6 text-white/70">
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    className="border border-white/20 shadow-2xl"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password">Password</label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*******"
                    required
                    value={password}
                    className="border border-white/20 shadow-2xl"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-center text-white p-3 rounded-2xl bg-violet-500 hover:bg-violet-700 my-3 w-full cursor-pointer transition-colors duration-200"
              >
                Sign In
              </button>
            </form>

            {/* Google Sign In */}
            <GoogleAuth
              onSuccess={(dbUser) => {
                console.log("User signed in and saved to DB:", dbUser);
                router.push("/");
              }}
              onError={(err) => {
                console.error(err);
              }}
            />

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-base">
                Don&apos;t have an account?{" "}
                <a
                  href="/signup"
                  className="font-semibold text-purple-300 hover:text-purple-200 transition-all duration-200 hover:underline"
                >
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}