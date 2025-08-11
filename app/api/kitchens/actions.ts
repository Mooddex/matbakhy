"use server";
import mongoose from "mongoose";
import Kitchens from "@/models/Kitchen";
import { revalidatePath } from "next/cache";

export async function createEntry(formData: FormData) {
  try {
    await Kitchens.create(Object.fromEntries(formData));
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to create entry:", error);
  }
}

export async function deleteEntry(id: string) {
  try {
    await Kitchens.findByIdAndDelete(id);
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete entry:", error);
  }
}

export async function getKitchenById(id: string) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid kitchen ID format");
    }
    const kitchen = await Kitchens.findById(id).lean();
    if (!kitchen) {
      throw new Error("Kitchen not found");
    }
    return JSON.parse(JSON.stringify(kitchen));
  } catch (error) {
    console.error("Failed to fetch kitchen:", error);
    return null;
  }
}
