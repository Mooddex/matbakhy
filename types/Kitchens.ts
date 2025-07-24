// types/Kitchens.ts
export interface KitchenCardProps {
  name: string;
  maker: string;
  phoneNumber: string | number;
  imageUrl?: string;
  description: string;
  price: number;
  location: string;
};
export interface Kitchen  {
  _id: string;
  name: string;
  maker: string;
  price: number;
  description: string;
  location: string;
  phoneNumber: number;
  imageUrl: string;
  createdAt: string;
};
