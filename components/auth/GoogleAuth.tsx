"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase-config";
import { User } from "@/types/User";

interface GoogleAuthProps {
  isLoading?: boolean; // optional, parent can control
  onSuccess?: (dbUser: User) => void;
  onError?: (error: unknown) => void;
}

const GoogleAuth = ({ isLoading: parentLoading, onSuccess, onError }: GoogleAuthProps) => {
  const [localLoading, setLocalLoading] = useState(false);

  const isLoading = parentLoading ?? localLoading; // use parent prop if passed, else local state

  const handleGoogleSignIn = async () => {
    setLocalLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch("/api/users/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          avatar: user.photoURL,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const dbUser = await res.json();
      if (onSuccess) onSuccess(dbUser);
    } catch (err) {
      console.error(err);
      if (onError) onError(err);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      className="w-full py-3 px-6 rounded-lg bg-white/5 text-white font-semibold hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleGoogleSignIn}
    >
      {isLoading ? "Signing in..." : "Continue with Google"}
    </button>
  );
};

export default GoogleAuth;
