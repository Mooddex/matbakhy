'use client';

import Image from "next/image";
import Link from "next/link";
import loogo from "@/img/loogo.png";
import { Home, LogIn,  UserPlus, Plus, User  } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Nav = () => {
const { data: session, status } = useSession();

  if (status === "loading") return null;


  return (
<nav className="sticky top-1 z-50 bg-white/70 backdrop-blur-lg shadow-xl rounded-full px-6 py-3 flex items-center gap-6 border border-violet-200 mx-auto w-max">
      {/* shared pages in the navbar */}
      <Link href="/" className="flex items-center gap-2">
        <Image src={loogo} alt="LOGO" width={30} height={30} />
      </Link>
      <Link href="/kitchen/all" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <Home size={18} />
        <span className="hidden md:inline">
          Explore</span>
      </Link>
     
      {
        session? 
        (
          // signed in user
          <>
          <Link href="/kitchen/new" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <Plus size={18} />
        <span className="hidden md:inline">
          Add New
          </span>
      </Link>
    
      <Link href="/profile" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <User size={18} />
        <span className="hidden md:inline">profile</span>
      </Link> 
      <button
       onClick={() => signOut({ redirectTo: "/" })}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl transition font-semibold">
        Sign Out
      </button> 
          </>
        )
        // not signed in user
        :(
          <>
      <Link href="/signin" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <LogIn size={18} />
        <span className="hidden md:inline">
        Log In
        </span>
      </Link>
      <Link href="/signup" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <UserPlus size={18} />
        <span className="hidden md:inline">
          Sign UP
        </span>
      </Link>
          </>
        )
      }
    </nav>
  );
};

export default Nav;
