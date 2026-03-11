import { NextRequest, NextResponse } from "next/server";
import  connectDB  from "@/lib/db/db";
import Kitchen from "@/lib/models/Kitchen";
import { adminAuth } from "@/lib/firebase/firebase-admin";

// GET ALL KITCHENS or filter by userId
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    const kitchens = await Kitchen.find(
      userId ? { userId } : {} // filter if userId provided, else return all
    ).sort({ createdAt: -1 });

    return NextResponse.json(kitchens, { status: 200 });
  } catch (error) {
    console.error("GET kitchens error:", error);
    return NextResponse.json({ message: "Failed to load kitchens" }, { status: 500 });
  }
}

// CREATE A KITCHEN

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Verify Firebase token from Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await adminAuth.verifyIdToken(token);
    const firebaseUid = decoded.uid;

    const body = await req.json();
    const { name, maker, price, phoneNumber, description, location, imageUrl } = body;

    const kitchen = await Kitchen.create({
      name,
      maker,
      price,
      phoneNumber,
      description,
      location,
      imageUrl,
      userId: firebaseUid, // from verified token, not from body
    });

    return NextResponse.json(kitchen, { status: 201 });
  } catch (error) {
    console.error("POST kitchen error:", error);
    return NextResponse.json({ message: "Failed to create kitchen" }, { status: 500 });
  }
}