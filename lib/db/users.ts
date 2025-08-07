// lib/db/users.ts
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import { getDatabase } from "@/lib/mongoClient";

export interface User {
  _id?: ObjectId;
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
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const db = await getDatabase();
    const user = await db.collection<User>("users").findOne({ email });
    
    if (!user) return null;
    
    return {
      ...user,
      id: user._id?.toString() || user.id,
    };
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}

export async function createUser(userData: {
  email: string;
  password: string;
  name: string;
}): Promise<User> {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const now = new Date();
  
  const newUser: Omit<User, '_id' | 'id'> = {
    email: userData.email,
    hashedPassword,
    name: userData.name,
    image: null,
    provider: "credentials",
    emailVerified: null,
    createdAt: now,
    updatedAt: now,
  };
  
  try {
    const db = await getDatabase();
    const result = await db.collection<User>("users").insertOne(newUser as User);
    
    return {
      ...newUser,
      _id: result.insertedId,
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Failed to create user");
  }
}

export async function checkUserExists(email: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    const user = await db.collection<User>("users").findOne({ email });
    return !!user;
  } catch (error) {
    console.error("Database error:", error);
    return false;
  }
}