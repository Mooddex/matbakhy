import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase/firebase-admin";

export async function verifyFirebaseToken(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { error: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  if (!adminAuth) {
    return {
      error: NextResponse.json(
        { message: "Firebase admin is not configured" },
        { status: 500 }
      ),
    };
  }

  try {
    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return { error: NextResponse.json({ message: "Invalid token" }, { status: 401 }) };
  }
}
