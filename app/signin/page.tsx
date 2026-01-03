import { SignInForm } from "@/components/forms/SigninForm";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500/30 border-t-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}