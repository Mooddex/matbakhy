"use server"

import { TAddKitchenSchema, TEditKitchenSchema } from "@/lib/validators";
const API_URL = process.env.PlaceHolderURL;

// GET ALL KITCHENS
export async function fetchKitchens() {
  const res = await fetch(`${API_URL}`);
  if (!res.ok) throw new Error("Failed to load kitchens");
  return res.json();
};
// GET A SINGLE KITCHEN BY ID
export async function fetchKitchenById(id: string) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to load kitchen");
  return res.json();
}
// EDIT A KITCHEN BY ID
export async function updateKitchenAction(
  id: string,
  updatedKitchen: TEditKitchenSchema
) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
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
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
// ADD A NEW KITCHEN
export async function addKitchenAction(newKitchen: TAddKitchenSchema) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newKitchen),
  });

  if (!res.ok) {
    return { success: false, message: "Failed to create Kitchen" };
  }

  const data = await res.json();
  return { success: true, data };
}
// DELETE A KITCHEN BY ID
export async function deleteKitchenAction(id:string){
  const res = await fetch(`${API_URL}/${id}`, {
   method: "DELETE",
  });

  if (!res.ok) {
    return { success: false, message: "Failed to delete Kitchen" };
  }

  return { success: true };
}
