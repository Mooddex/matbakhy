// app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAdminAuth } from "@/lib/firebase/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const adminAuth = getAdminAuth();
    const { idToken } = await req.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

    const res = NextResponse.json({ success: true });
    res.cookies.set("session", sessionCookie, {
      maxAge: expiresIn / 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("session");
  return res;
}