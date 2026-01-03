"use client";

import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import GoogleAuth from "../../lib/firebase/auth/GoogleAuth";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "react-toastify";
import signUp from "@/lib/firebase/auth/signup";

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  //* Create state variables for email and password
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  //* Create a function to handle the form
  const handleForm = async (event: React.FormEvent) => {
    //* Prevent the default form action
    event.preventDefault();
 
    const { result, error } = await signUp(email, password, name);

    if (error) {
      toast.error("Sign up failed, please try again!");
      return console.log(error);
    }

    //* else successful
    console.log(result);
    toast.success("Sign up successful!");
    return router.push("/");
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-emerald-950 to-slate-950 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/30 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Form Container */}
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="relative bg-linear-to-r from-emerald-600/80 via-green-600/80 to-teal-600/80 backdrop-blur-sm px-8 py-8 text-center">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="relative z-10">
              <div className="mb-4 flex justify-center">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Join the Community
              </h1>
              <p className="text-white/80 text-lg">Create your account today</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            <form onSubmit={handleForm}>
              <div className="text-start flex flex-col gap-6 text-white/70">
               <div className="grid gap-2">
                  <label htmlFor="email">Name</label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="mahmoud salama"
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="border-0 shadow-2xl"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email">Email</label>
                  <Input
                  value={email}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-0 shadow-2xl"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <label htmlFor="password">Password</label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*******"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 shadow-2xl"
                  />
                </div>
              </div>
              <button
              type="submit"
              className="text-center text-white p-3 rounded-2xl bg-green-500 hover:bg-green-700 my-3 w-full cursor-pointer"
              >
                Sign Up
              </button>
            </form>
            {/* Google Auth Button */}
            <GoogleAuth
              onSuccess={(dbUser) => {
                console.log("User signed up and saved to DB:", dbUser);
                router.push("/");
              }}
              onError={(err) => {
                console.error(err);
              }}
            />

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-white/70 text-base">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="font-semibold text-emerald-300 hover:text-emerald-200 transition-all duration-200 hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
