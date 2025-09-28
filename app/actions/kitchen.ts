"use server"

export async function fetchKitchens() {
  const res = await fetch("https://68d7dfef2144ea3f6da6b105.mockapi.io/kitchen");
  if (!res.ok) throw new Error("Failed to load kitchens");
  return res.json();
};
export async function getKitchenById(id: string) {
  const res = await fetch(`https://68d7dfef2144ea3f6da6b105.mockapi.io/kitchen/${id}`);
  if (!res.ok) throw new Error("Failed to load kitchen");
  return res.json();
}