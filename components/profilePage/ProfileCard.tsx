import Image from "next/image";
import BackButton from "../ui/Buttons/BackButton";
import { Button } from "../ui/Buttons/button";
import KitchensGrid from "../ui/Cards/KitchensGrid";

interface ProfileCardProps {
  userName?: string;
  profileImage?: string;
}

export default function ProfileCard({
  userName = "Mahmoud",
  profileImage = "https://placecats.com/300/200",
}: ProfileCardProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <div className="mt-25">
          <BackButton />
        </div>

        {/* Profile Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-10 mb-8 border border-purple-100">
          {/* Profile Picture */}
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6">
            <Image
              src={profileImage}
              alt={`${userName}'s profile picture`}
              width={192}
              height={192}
              className="rounded-full object-cover border-4 border-purple-400 shadow-lg ring-4 ring-purple-100"
              priority
            />
          </div>

          {/* User Info */}
          <div className="text-center space-y-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              {userName}
            </h2>
            
            {/* Contact Button */}
           <a href="tel:01066151547">
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-10 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              variant="default"
            >
              Get In Touch
            </Button>
            </a> 
          </div>
        </div>

        {/* Gallery Section */}
        <div>
          {/* Gallery Header */}
          <div className="mb-8 flex justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-12 rounded-full shadow-lg">
              Gallery
            </h1>
          </div>

          {/* Gallery Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-8 border border-purple-100">
            <KitchensGrid />
          </div>
        </div>
      </div>
    </div>
  );
}