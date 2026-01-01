import { User } from "@/types/User";

// create
export const createUser = async (data: User) => {
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
//get all users
export const getUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};
//get single user
export const getUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
};
//update user
export const updateUser = async (id: string, data: User) => {
  const res = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
//delete user
export const deleteUser = async (id: string) => {
  const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
  return res.json();
};
