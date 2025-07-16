import Image from "next/image";
import kidimg from "@/img/kidimg.jpg";
import KitchenCard from "@/components/KitchenCard";
import kimg from '@/img/collov-home-design--aDGbdTsBZg-unsplash.jpg'

const UserPage = () => {
  return (
    <div className="px-6 py-10 bg-gray-50 min-h-screen text-gray-900">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Image
            src={kidimg}
            alt="User profile"
            width={70}
            height={70}
            className="rounded-full object-cover border border-violet-300 shadow"
          />
          <div>
            <h3 className="text-2xl font-bold text-violet-900">Marlie Coper Justin</h3>
            <p className="text-gray-500 text-sm mt-1">📍 Cairo, Egypt</p>
          </div>
        </div>
      </div>

      {/* Kitchens Section */}
      <section>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <KitchenCard
            id="1"
            userName="mk"
            imgUrl='https://res.cloudinary.com/deq0w5tnr/image/upload/v1750050097/samples/coffee.jpg'
            makerName="Classic Interiors"
            description="Timeless handcrafted wooden cabinets and elegant brass finishes."
            location="Cairo"
            price="EGP 45,000"
          />
          {/* You can map more cards here */}
        </div>
      </section>
    </div>
  );
};

export default UserPage;
