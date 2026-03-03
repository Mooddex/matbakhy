// types/Kitchens.ts

/**
 * Main Kitchen interface representing a document from MongoDB
 * - _id: MongoDB ObjectId as string
 * - userId: Firebase UID of the kitchen maker
 */
export interface Kitchen {
  _id: string; // MongoDB ObjectId
  name: string;
  maker: string;
  price: number;
  phoneNumber: number;
  description: string;
  location: string;
  imageUrl: string;
  userId: string; // Firebase UID of the kitchen maker
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Props interface for Kitchen card component
 * Subset of Kitchen interface used for rendering UI
 */
export interface KitchenCardProps {
  _id?: string; // MongoDB ObjectId
  name: string;
  maker: string;
  phoneNumber: number; // Must be number to match Kitchen model
  imageUrl?: string;
  description: string;
  price: number;
  location: string;
  userId?: string; // Firebase UID
}
