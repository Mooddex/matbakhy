/* eslint-disable */


"use client";
import { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit3, 
  Save, 
  X, 
  Camera,
  Settings,
  Heart,
  ShoppingBag,
  Star,
  Calendar
} from "lucide-react";
import Image from "next/image";

// Mock user data - replace with your actual data fetching
const mockUser = {
  id: "user123",
  name: "Mahmoud Salama",
  email: "msalama027@gmail.com",
  phone: "01066151547",
  location: "Cairo, Egypt",
  joinedDate: "2023-06-15",
  avatar: "", // Will show placeholder if empty
  bio: "Kitchen designer with 10+ years of experience creating beautiful and functional spaces.",
  stats: {
    totalKitchens: 12,
    totalViews: 2547,
    rating: 4.8,
    completedOrders: 23
  }
};

interface UserProfile {
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
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile>(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>(mockUser);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Load user data on component mount
  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchUserProfile();
  }, []);

  const handleEdit = () => {
    setEditedUser({ ...user });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // await updateUserProfile(editedUser);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({ ...editedUser });
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatJoinDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const ProfileField = ({ 
    icon, 
    label, 
    value, 
    field, 
    type = "text",
    multiline = false 
  }: {
    icon: React.ReactNode;
    label: string;
    value: string;
    field: keyof UserProfile;
    type?: string;
    multiline?: boolean;
  }) => (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-violet-600 mt-1">{icon}</div>
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700 block mb-1">
          {label}
        </label>
        {isEditing ? (
          multiline ? (
            <textarea
              value={editedUser[field] as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
              rows={3}
            />
          ) : (
            <input
              type={type}
              value={editedUser[field] as string}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          )
        ) : (
          <p className="text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 h-32"></div>
          
          <div className="relative px-8 pb-8">
            {/* Avatar */}
            <div className="absolute -top-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={128}
                      height={128}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-violet-600 text-white rounded-full p-2 hover:bg-violet-700 transition">
                    <Camera size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar size={14} />
                  Member since {formatJoinDate(user.joinedDate)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="bg-violet-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-violet-700 transition"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-50"
                    >
                      <Save size={16} />
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-violet-600">{user.stats.totalKitchens}</div>
                <div className="text-sm text-gray-600">Kitchens Listed</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{user.stats.totalViews.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center gap-1">
                  {user.stats.rating}
                  <Star size={16} fill="currentColor" />
                </div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{user.stats.completedOrders}</div>
                <div className="text-sm text-gray-600">Completed Orders</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: "overview", label: "Overview", icon: <User size={16} /> },
                { id: "kitchens", label: "My Kitchens", icon: <ShoppingBag size={16} /> },
                { id: "favorites", label: "Favorites", icon: <Heart size={16} /> },
                { id: "settings", label: "Settings", icon: <Settings size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? "border-violet-500 text-violet-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
                
                <ProfileField
                  icon={<User size={16} />}
                  label="Full Name"
                  value={user.name}
                  field="name"
                />
                
                <ProfileField
                  icon={<Mail size={16} />}
                  label="Email Address"
                  value={user.email}
                  field="email"
                  type="email"
                />
                
                <ProfileField
                  icon={<Phone size={16} />}
                  label="Phone Number"
                  value={user.phone}
                  field="phone"
                  type="tel"
                />
                
                <ProfileField
                  icon={<MapPin size={16} />}
                  label="Location"
                  value={user.location}
                  field="location"
                />
                
                <ProfileField
                  icon={<Edit3 size={16} />}
                  label="Bio"
                  value={user.bio}
                  field="bio"
                  multiline
                />
              </div>
            )}

            {activeTab === "kitchens" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Kitchen Listings</h2>
                <div className="text-center py-12 text-gray-500">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your kitchen listings will appear here</p>
                  <button className="mt-4 bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700 transition">
                    Add New Kitchen
                  </button>
                </div>
              </div>
            )}

            {activeTab === "favorites" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Favorite Kitchens</h2>
                <div className="text-center py-12 text-gray-500">
                  <Heart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your favorite kitchens will appear here</p>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-600">Receive updates about your listings</p>
                    </div>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">SMS Notifications</h3>
                      <p className="text-sm text-gray-600">Get SMS alerts for important updates</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                  
                  <div className="pt-6 border-t">
                    <button className="text-red-600 hover:text-red-700 font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}