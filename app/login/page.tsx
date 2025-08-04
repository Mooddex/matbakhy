"use client";

import GoogleAuth from "@/components/GoogleAuth";

function SignIn() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <GoogleAuth />
    </main>
  );
}

export default SignIn;
