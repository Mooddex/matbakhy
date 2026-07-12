"use client";

import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-config";
import { User } from "@/lib/types/User";

interface GoogleAuthProps {
  isLoading?: boolean;
  onSuccess?: (dbUser: User) => void;
  onError?: (error: unknown) => void;
}

const GoogleAuth = ({ isLoading: parentLoading, onSuccess, onError }: GoogleAuthProps) => {
  const [localLoading, setLocalLoading] = useState(false);

  const isLoading = parentLoading ?? localLoading;

  const handleGoogleSignIn = async () => {
    if (!auth) {
      if (onError) onError(new Error("Firebase auth is not configured"));
      return;
    }

    setLocalLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create the server session cookie
      const idToken = await user.getIdToken();
      const sessionRes = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      if (!sessionRes.ok) {
        throw new Error("Failed to create session");
      }

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
        const text = await res.text();
        throw new Error(`Server error: ${res.status} ${text}`);
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