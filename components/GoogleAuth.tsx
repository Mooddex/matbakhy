"use client";

import { signIn } from "next-auth/react";

const GoogleAuth = () => {
  

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/explore" });
  };

  return (
          <button
        
          className="w-full"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
  );
};

export default GoogleAuth;
