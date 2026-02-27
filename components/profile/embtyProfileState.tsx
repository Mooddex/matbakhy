import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";

export default function emptyProfileState() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-16 flex-col justify-items-center">
      <h2 className="text-2xl font-extrabold text-violet-900  mb-3">
        No kitchens listed yet
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 leading-relaxed">
        Start your journey on Matbakhy by listing your first professional
        kitchen.
      </p>
      <Link 
      href="/kitchen/new"
      className="bg-black text-white hover:bg-slate-800 transition-all px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl">
        <IoIosAddCircle />

        Host Your Kitchen
      </Link>
    </div>
  );
}
