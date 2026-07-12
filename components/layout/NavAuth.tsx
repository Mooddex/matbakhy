// components/layout/NavAuth.tsx (Server Component — no "use client")
import Link from "next/link";
import { LogIn, UserPlus, User } from "lucide-react";
import { getServerUser } from "@/lib/firebase/auth/getServerUser";
import SignOutButton from "./SignOutButton";

const NavAuth = async () => {
  const user = await getServerUser();

  return user ? (
    <>
      <Link href={`/profile/${user.uid}`} className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <User size={18} />
        <span className="hidden md:inline">Profile</span>
      </Link>
      <SignOutButton />
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