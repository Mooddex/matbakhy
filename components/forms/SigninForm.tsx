/* eslint-disable */

"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Sparkles, CheckCircle } from "lucide-react";
import GoogleAuth from "../auth/GoogleAuth";

interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden flex items-center justify-center p-4">
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
          <div className="relative bg-gradient-to-r from-purple-600/80 via-blue-600/80 to-indigo-600/80 backdrop-blur-sm px-8 py-8 text-center">
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

          <div className="p-8">
            {/* Error Message with Animation */}
            {error && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300 backdrop-blur-sm">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-red-300 font-medium">
                    Authentication Error
                  </p>
                  <p className="text-sm text-red-200 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message with Animation */}
            {success && (
              <div className="mb-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4 flex items-start space-x-3 animate-in slide-in-from-top duration-300 backdrop-blur-sm">
                <CheckCircle className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-purple-300 font-medium">
                    Success!
                  </p>
                  <p className="text-sm text-purple-200 mt-1">{success}</p>
                </div>
              </div>
            )}

            {/* Google Sign In with Hover Effects */}
            <GoogleAuth
              onSuccess={(dbUser) => {
                console.log("User signed in and saved to DB:", dbUser);
                setSuccess("Google sign-in successful!");
                router.push("/");
              }}
              onError={(err) => {
                console.error(err);
                setError("Google sign-in failed. Please try again.");
              }}
            />
            {/* Enhanced Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-base">
                Don't have an account?{" "}
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

        {/* Enhanced Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-white/50 leading-relaxed">
            By signing in, you agree to our{" "}
            <a
              href="/terms"
              className="text-purple-300 hover:text-purple-200 transition-colors hover:underline"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-purple-300 hover:text-purple-200 transition-colors hover:underline"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
