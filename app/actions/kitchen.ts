"use server"

import { TEditKitchenSchema } from "@/lib/validators";

export async function fetchKitchens() {
  const res = await fetch("https://68d7dfef2144ea3f6da6b105.mockapi.io/kitchen");
  if (!res.ok) throw new Error("Failed to load kitchens");
  return res.json();
};
export async function fetchKitchenById(id: string) {
  const res = await fetch(`https://68d7dfef2144ea3f6da6b105.mockapi.io/kitchen/${id}`);
  if (!res.ok) throw new Error("Failed to load kitchen");
  return res.json();
}
export async function updateKitchenAction(
  id: string,
  updatedKitchen: TEditKitchenSchema
) {
  try {
    const res = await fetch(`https://68d7dfef2144ea3f6da6b105.mockapi.io/kitchen/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedKitchen),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to update kitchen" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
  console.error("Update kitchen error:", error);
  return { 
    success: false, 
    message: "Network error occurred", 
    error: error instanceof Error ? error.message : "Unknown error" 
  };
}};