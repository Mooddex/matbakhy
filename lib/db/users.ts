// lib/db/users.ts - Database functions using Mongoose
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User, { IUser } from "@/models/User";
import { Types } from "mongoose";
import {UserLeanDocument} from '@/types/UserProfile'
import { UserResponse } from "@/types/UserProfile";



// Helper function to convert lean document to response format
function formatUser(user: UserLeanDocument | IUser): UserResponse {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    hashedPassword: user.hashedPassword,
    image: user.image,
    provider: user.provider,
    providerId: user.providerId,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export async function getUserByEmail(email: string): Promise<UserResponse | null> {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).lean<UserLeanDocument>();
    
    if (!user) return null;
    
    return formatUser(user);
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function getUserById(id: string): Promise<UserResponse | null> {
  try {
    await dbConnect();
    const user = await User.findById(id).lean<UserLeanDocument>();
    
    if (!user) return null;
    
    return formatUser(user);
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
}): Promise<UserResponse> {
  try {
    await dbConnect();
    
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user = new User({
      email: userData.email.toLowerCase(),
      hashedPassword,
      name: userData.name,
      provider: "credentials",
    });
    
    const savedUser = await user.save();
    return formatUser(savedUser);
    
  } catch (error) {
    throw new Error("Failed to create user");
    console.error("Database error:", error);
   
  }
}

export async function checkUserExists(email: string): Promise<boolean> {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).select("_id").lean<{_id: Types.ObjectId}>();
    return !!user;
  } catch (error) {
    console.error("Database error:", error);
    return false;
  }
}

export async function updateUser(
  id: string, 
  updateData: Partial<Pick<UserResponse, 'name' | 'image' | 'emailVerified'>>
): Promise<UserResponse | null> {
  try {
    await dbConnect();
    const user = await User.findByIdAndUpdate(
      id, 
      { ...updateData, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).lean<UserLeanDocument>();
    
    if (!user) return null;
    
    return formatUser(user);
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function verifyPassword(email: string, password: string): Promise<UserResponse | null> {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).lean<UserLeanDocument>();
    
    if (!user) return null;
    
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
    
    if (!isValidPassword) return null;
    
    return formatUser(user);
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}