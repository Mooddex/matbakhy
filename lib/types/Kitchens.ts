// types/Kitchens.ts

/**
 * Kitchen document from Firestore
 * - _id / id: Firestore document ID
 * - userId: Firebase Auth UID of the kitchen maker
 * - imageUrl: Cloudinary secure_url stored in Firestore
 */
export interface Kitchen {
  _id: string;
  id: string;
  name: string;
  maker: string;
  price: number;
  phoneNumber: number;
  description: string;
  location: string;
  imageUrl: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface KitchenCardProps {
  _id?: string;
  name: string;
  maker: string;
  phoneNumber: number;
  imageUrl?: string;
  description: string;
  price: number;
  location: string;
  userId?: string;
}
