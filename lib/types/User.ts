// In @/lib/types/User.ts (or wherever your User type is)
export interface User {
  firebaseUid: string; // Changed from 'id'
  email: string;
  name: string;
  username: string;
  avatar: string;
  phone: string;
  location: string;
  bio: string;
  provider?: string; // Added
  stats: {
    totalKitchens: number;
    totalViews: number;
    rating: number;
    completedOrders: number;
  };
  // Remove joinedDate - handled by MongoDB timestamps
}