import Image from "next/image";
import Link from "next/link";
import loogo from "@/img/loogo.png";

const Nav = () => {
  return (
    <div className="bg-violet-800 text-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between">

        {/* Logo and Name */}
        <div className="flex items-center space-x-3">
          <Link href="/home" className="flex items-center space-x-2">
            <Image src={loogo} alt="LOGO" width={40} height={40} />
            <span className="text-xl font-bold">My Kitchen</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-lg">
          <Link href="/home" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/user" className="hover:text-gray-300 transition-colors">
            Profile
          </Link>
          <Link href="/kitchens" className="hover:text-gray-300 transition-colors">
            All Kitchens
          </Link>
        </div>
        {/* Sign up and login */}
        <div className=" flex gap-2.5 justify-around">
            <Link href="/signin" className="text-white text-lg hover:text-gray-300 transition-colors">
            Sign In
          </Link>
          <Link href="/signup">
            <button className="bg-white text-violet-900 font-semibold px-4 py-1 rounded hover:bg-cyan-500 transition-colors">
              Sign Up
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Nav;
