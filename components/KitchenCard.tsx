import { KitchenCardProps } from "@/types/Kitchens";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const KitchenCard = ({
  id,
  userName,
  imgUrl,
  makerName,
  description,
  location,
  price,
}: KitchenCardProps) => {
  return (
    <Card className="rounded-xl border border-gray-200 w-full max-w-xs shadow-sm hover:shadow-md transition duration-300 bg-white">
      {/* User Info */}
      <div className="flex items-center gap-2 px-4 pt-4">
        <div className="w-8 h-8 rounded-full bg-violet-300 flex items-center justify-center text-white text-sm font-semibold">
          <Link href='/profile/${id}'>
          {userName[0].toUpperCase()}
          </Link>
        </div>
        <p className="text-sm text-gray-600">@{userName}</p>
      </div>

      {/* Image */}
      <CardContent className="p-4 pt-2">
        <img
          src={imgUrl}
          alt={`${makerName} kitchen`}
          className="w-full h-36 object-cover rounded-md"
        />
      </CardContent>

      {/* Two-column Info */}
      <div className="px-4 pb-2 grid grid-cols-2 gap-y-1 text-sm text-gray-700">
        <p className="font-semibold col-span-2 text-violet-900">{makerName}</p>
        <span className="text-gray-500">📍 Location:</span>
        <span>{location}</span>
        <span className="text-gray-500">💰 Price:</span>
        <span>{price}</span>
        <span className="text-gray-500 col-span-2">📝 Description:</span>
        <span className="col-span-2">{description}</span>
      </div>

      {/* Buttons */}
      <CardFooter className="flex justify-between px-4 pb-4">
        <Button variant="outline" className="text-xs px-3 py-1">
          View
        </Button>
        <Button className="bg-violet-700 text-white hover:bg-violet-800 text-xs px-3 py-1">
          Contact
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KitchenCard;
