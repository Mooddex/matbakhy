
export interface User {
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
