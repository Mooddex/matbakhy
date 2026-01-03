import { User } from "@/lib/types/User";

// -------------------------------
// Base URL for server-side fetch
// -------------------------------
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

// -------------------------------
// Create a user
// -------------------------------
export const createUser = async (data: User) => {
  const res = await fetch(`${baseUrl}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Create user failed:", res.status, await res.text());
    throw new Error("Failed to create user");
  }

  return res.json();
};

// -------------------------------
// Get all users
// -------------------------------
export const getUsers = async () => {
  const res = await fetch(`${baseUrl}/api/users`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Get users failed:", res.status, await res.text());
    throw new Error("Failed to fetch users");
  }

  return res.json();
};

// -------------------------------
// Get single user by firebaseUid
// -------------------------------
export const getUser = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/users/${id}`, { cache: "no-store" });

  if (!res.ok) {
    console.error("Fetch user failed:", res.status, await res.text());
    throw new Error("User not found");
  }

  return res.json();
};

// -------------------------------
// Update user
// -------------------------------
export const updateUser = async (id: string, data: User) => {
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    console.error("Update user failed:", res.status, await res.text());
    throw new Error("Failed to update user");
  }

  return res.json();
};

// -------------------------------
// Delete user
// -------------------------------
export const deleteUser = async (id: string) => {
  const res = await fetch(`${baseUrl}/api/users/${id}`, { method: "DELETE" });

  if (!res.ok) {
    console.error("Delete user failed:", res.status, await res.text());
    throw new Error("Failed to delete user");
  }

  return res.json();
};
