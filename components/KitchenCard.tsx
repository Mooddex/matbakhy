// components/KitchenCard.tsx
import { KitchenCardProps } from "@/types/Kitchens";
import { User, Phone, MapPin, DollarSign } from "lucide-react";
import Image from "next/image";
const KitchenCard = ({
  name,
  maker,
  phoneNumber,
  imageUrl,
  description,
  price,
  location,
}: KitchenCardProps) => (
  <div className="bg-white rounded-2xl border shadow-sm hover:shadow-lg overflow-hidden transition">
    {/* Title */}
    <div className="px-4 pt-4">
      <h3 className="text-xl font-semibold text-violet-900">{name}</h3>
    </div>

    {/* Image */}
    <div className="relative w-full h-48 mt-2">
      <Image
        src={imageUrl || "/default-kitchen.jpg"}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>

    {/* Description */}
    <div className="px-4 pt-4 text-sm text-gray-700 line-clamp-3">
      {description}
    </div>

    {/* Price & Location */}
    <div className="px-4 pt-3 flex justify-between text-sm">
      <div className="flex items-center gap-1 text-gray-600">
        <DollarSign size={16} className="text-violet-600" />
        <span className="font-semibold text-gray-800">{price} EGP</span>
      </div>
      <div className="flex items-center gap-1 text-gray-600">
        <MapPin size={16} className="text-violet-600" />
        <span>{location}</span>
      </div>
    </div>

    {/* Maker & Phone */}
    <div className="px-4 pb-4 pt-2 flex justify-between text-sm text-gray-600">
      <div className="flex items-center gap-1">
        <User size={16} className="text-violet-600" />
        <span>{maker}</span>
      </div>
      <div className="flex items-center gap-1">
        <Phone size={16} className="text-violet-600" />
        <span>{phoneNumber}</span>
      </div>
    </div>
  </div>
);

export default KitchenCard;
