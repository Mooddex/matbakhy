"use server";
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
