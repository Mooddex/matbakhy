"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-config";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    if (auth) await signOut(auth);
    await fetch("/api/session", { method: "DELETE" });
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition font-semibold"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;