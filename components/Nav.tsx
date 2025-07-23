'use client';

import Image from "next/image";
import Link from "next/link";
import loogo from "@/img/loogo.png";
import { Home, User,  } from "lucide-react";

const Nav = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/70 backdrop-blur-lg shadow-xl rounded-full px-6 py-3 flex items-center gap-6 border border-violet-200">
      <Link href="/" className="flex items-center gap-2">
        <Image src={loogo} alt="LOGO" width={30} height={30} />
      </Link>

      <Link href="/home" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <Home size={18} />
        <span className="hidden md:inline">Home</span>
      </Link>

      <Link href="/addkitchen" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <User size={18} />
        <span className="hidden md:inline">kitchens</span>
      </Link>


    </nav>
  );
};

export default Nav;
