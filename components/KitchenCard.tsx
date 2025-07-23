import { KitchenCardProps } from "@/types/Kitchens";

const KitchenCard = ({
  userName,
  imageUrl,
  description,
  price,
  location,
}: KitchenCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg overflow-hidden transition duration-300 group mb-28">
      {/* 1. User Name */}
      <div className="px-4 pt-4">
        <h3 className="text-xl font-semibold text-violet-900">{userName}</h3>
      </div>

      {/* 2. Image */}
      <div className="relative w-full h-48 mt-2">
        <img
          src={imageUrl || "/default-kitchen.jpg"}
          alt={userName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 3. Description */}
      <div className="px-4 pt-4 text-sm text-gray-700 line-clamp-2">
        {description}
      </div>

      {/* 4. Price */}
      <div className="px-4 pt-2 text-lg font-bold text-violet-700">
        💰 {price} EGP
      </div>

      {/* 5. Location */}
      <div className="px-4 pb-4 pt-1 text-sm text-gray-600">
        📍 {location}
      </div>
    </div>
  );
};

export default KitchenCard;
