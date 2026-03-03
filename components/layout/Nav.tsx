// Nav.tsx (Server Component - no "use client")
import Image from "next/image";
import Link from "next/link";
import loogo from "@/img/loogo.png";
import { Home } from "lucide-react";
import NavAuth from "./NavAuth"; // only this part is client

const Nav = () => {
  return (
    <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/30 backdrop-blur-xl shadow-2xl rounded-2xl px-8 py-4 flex items-center gap-8 border border-white/20 ring-1 ring-white/10">
      <Link href="/" className="flex items-center gap-2">
        <Image src={loogo} alt="LOGO" width={30} height={30} />
      </Link>
      <Link href="/kitchen/all" className="flex items-center gap-1 text-violet-800 hover:text-violet-600 transition">
        <Home size={18} />
        <span className="hidden md:inline">Explore</span>
      </Link>
      <NavAuth /> {/* only this bubbles up to client */}
    </nav>
  );
};

export default Nav;