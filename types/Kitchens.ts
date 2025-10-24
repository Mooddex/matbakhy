// types/Kitchens.ts
export interface KitchenCardProps {
  name: string;
  maker: string;
  phoneNumber: string ;
  imageUrl?: string;
  description: string;
  price: number;
  location: string;
};
export interface Kitchen  {
  id: string;
  name: string;
  maker: string;
  price: number;
  description: string;
  location: string;
  phoneNumber: string;
  imageUrl: string;
  createdAt: string;
};
