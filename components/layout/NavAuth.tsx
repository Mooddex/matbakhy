// NavAuth.tsx (Client Component)
"use client";

import Link from "next/link";
import { LogIn, UserPlus, User } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase-config";
import { useAuth } from "@/lib/firebase/auth/AuthProvider";

const NavAuth = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="w-24 h-8 rounded-xl bg-black animate-pulse" />; // skeleton instead of null

  return user ? (
    <>
      <Link href={`/profile/${user.uid}`} className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <User size={18} />
        <span className="hidden md:inline">Profile</span>
      </Link>
      <button
        onClick={() => signOut(auth)}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition font-semibold"
      >
        Sign Out
      </button>
    </>
  ) : (
    <>
      <Link href="/signin" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <LogIn size={18} />
        <span className="hidden md:inline">Log In</span>
      </Link>
      <Link href="/signup" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <UserPlus size={18} />
        <span className="hidden md:inline">Sign Up</span>
      </Link>
    </>
  );
};

export default NavAuth;