import { NextResponse } from "next/server";
import connectDB from "@/lib/db/db";
import User from "@/lib/models/Users";

export async function POST(req: Request) {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    await connectDB();
    const { uid, email, name, avatar } = await req.json();

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user with Firebase info
      user = await User.create({
        name,
        email,
        avatar,
        provider: "google",
        isActive: true,
        firebaseUid: uid,
      });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error in google auth route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
