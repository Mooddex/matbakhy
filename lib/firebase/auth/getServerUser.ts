// lib/firebase/auth/getServerUser.ts
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase/firebase-admin";

export async function getServerUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  try {
    const adminAuth = getAdminAuth();
    const decoded = await adminAuth.verifySessionCookie(session, true);
    return decoded; // { uid, email, ... }
  } catch {
    return null;
  }
}