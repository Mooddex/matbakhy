"use server";

import { TAddKitchenSchema, TEditKitchenSchema } from "@/lib/validators";

const API_URL = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/kitchens`;

// GET ALL KITCHENS
export async function fetchKitchens() {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Status:", res.status, res.statusText, "Body:", body);
    throw new Error(`Failed to load kitchens: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// GET USER'S OWN KITCHENS
export async function fetchUserKitchens(userId?: string) {
  const url = userId ? `${API_URL}?userId=${userId}` : API_URL;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("Status:", res.status, res.statusText, "Body:", body);
    throw new Error(`Failed to load kitchens: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

// GET A SINGLE KITCHEN BY ID
export async function fetchKitchenById(id: string) {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load kitchen");
  return res.json();
}

export async function addKitchenAction(newKitchen: TAddKitchenSchema, token: string) {
  if (!token) {
    return { success: false, message: "Unauthorized user" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/kitchens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newKitchen),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to create kitchen" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Add kitchen error:", error);
    return { success: false, message: "Network error occurred" };
  }
}

export async function updateKitchenAction(
  id: string,
  updatedKitchen: TEditKitchenSchema,
  token: string
) {
  if (!token) {
    return { success: false, message: "Unauthorized user" };
  }

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedKitchen),
    });

    if (!res.ok) {
      return { success: false, message: "Failed to update kitchen" };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error("Update kitchen error:", error);
    return { success: false, message: "Network error occurred" };
  }
}

export async function deleteKitchenAction(id: string, token: string) {
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const data = await res.json();
      console.error("Delete failed:", data.message);
      return { success: false, message: data.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete kitchen error:", error);
    return { success: false, message: "Network error occurred" };
  }
}
