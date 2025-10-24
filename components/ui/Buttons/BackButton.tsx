import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BackButton() {
    return(
        <div className=" shadow-sm flex items-center">
                <div className=" align-middle mx-auto px-4 py-4">
                  <Link
                    href="/kitchen/all"
                    className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-800 transition"
                  >
                    <ArrowLeft size={20} />
                    Back to Explore
                  </Link>
                </div>
              </div>
    )
}