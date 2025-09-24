"use server";

import mongoose from "mongoose";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/dbConnect"; 
// Create entry
export async function createEntry(formData: FormData) {
  try {
    await dbConnect();
    await User.create(Object.fromEntries(formData));
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create entry:", error);
  }
}

// Delete entry
export async function deleteEntry(id: string) {
  try {
    await dbConnect();
    await User.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete entry:", error);
  }
}

// Get user by ID
export async function getUserById(id: string) {
  try {
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID format");
    }

    const user = await User.findById(id).lean();
    if (!user) {
      throw new Error("User not found");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
