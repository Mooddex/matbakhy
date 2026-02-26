// In @/lib/types/User.ts (or wherever your User type is)
export interface User {
  firebaseUid: string; // Changed from 'id'
  password: string,
  email: string;
  createdAt: number;
  name: string;
  username: string;
  avatar?: string;
  phone?: string;
  location?: string;
  bio?: string;
  provider?: string; // Added
  stats?: {
    totalKitchens: number;
    totalViews: number;
    rating: number;
    completedOrders: number;
  };
}