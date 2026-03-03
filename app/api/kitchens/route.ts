import { NextRequest, NextResponse } from "next/server";

// Lightweight type for objects returned by Mongoose `lean()` / `toObject()`
type KitchenDoc = Record<string, unknown> & {
  _id?: unknown;
  createdAt?: unknown;
  updatedAt?: unknown;
};
import  connectDB  from "@/lib/db/db";
import Kitchen from "@/lib/models/Kitchen";
import { adminAuth } from "@/lib/firebase/firebase-admin";

// GET ALL KITCHENS
export async function GET() {
  try {
    await connectDB();
    const kitchens = await Kitchen.find().sort({ createdAt: -1 }).lean();

    // Type for lean() result
    type KitchenDoc = Record<string, unknown> & {
      _id?: unknown;
      createdAt?: unknown;
      updatedAt?: unknown;
    };

    // Ensure response is JSON-serializable: convert ObjectId to string
    const safeKitchens = (kitchens as KitchenDoc[]).map((k) => ({
      ...k,
      _id: String(k._id ?? ""),
      createdAt: k.createdAt ? new Date(String(k.createdAt)).toISOString() : null,
      updatedAt: k.updatedAt ? new Date(String(k.updatedAt)).toISOString() : null,
    }));

    return NextResponse.json(safeKitchens, { status: 200 });
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

    const obj = kitchen.toObject() as unknown as KitchenDoc;
    const safeKitchen = {
      ...obj,
      _id: String(obj._id ?? ""),
      createdAt: obj.createdAt ? new Date(String(obj.createdAt)).toISOString() : null,
      updatedAt: obj.updatedAt ? new Date(String(obj.updatedAt)).toISOString() : null,
    };

    return NextResponse.json(safeKitchen, { status: 201 });
  } catch (error) {
    console.error("POST kitchen error:", error);
    return NextResponse.json({ message: "Failed to create kitchen" }, { status: 500 });
  }
}