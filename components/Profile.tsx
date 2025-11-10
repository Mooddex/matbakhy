import ProfileCard from "./profilePage/ProfileCard";
import KitchensGrid from "./ui/Cards/KitchensGrid";

export default function Profile() {
  return (
    <div>
     <ProfileCard />
      {/* Gallery Section */}
        <div>
          {/* Gallery Header */}
          <div className=" flex justify-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-12 rounded-full shadow-lg m-5">
              Gallery
            </h1>
          </div>

       
        </div>
        {/* Gallery Grid */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-4 sm:p-8 border border-purple-100">
            <KitchensGrid />
          </div>
    </div>
  );
}
