import { Types } from "mongoose";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
  avatar: string;
  bio: string;
  stats: {
    totalKitchens: number;
    totalViews: number;
    rating: number;
    completedOrders: number;
  };
};
export interface UserResponse {
  id: string;
  email: string;
  name: string;
  hashedPassword: string;
  image?: string | null;
  provider?: string;
  providerId?: string;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
// Type for lean query results
export type UserLeanDocument = {
  _id: Types.ObjectId;
  email: string;
  name: string;
  hashedPassword: string;
  image?: string | null;
  provider?: string;
  providerId?: string;
  emailVerified?: Date | null;
  createdAt: Date;
  updatedAt: Date;
};