import { NextRequest, NextResponse } from "next/server";
import { kitchensCollection, serializeKitchenDoc } from "@/lib/firebase/firestore";
import { verifyFirebaseToken } from "@/lib/auth/verify-token";

export async function GET(req: NextRequest) {
  try {
    const kitchens = kitchensCollection();
    if (!kitchens) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    let query = kitchens.orderBy("createdAt", "desc");

    if (userId) {
      query = kitchens.where("userId", "==", userId).orderBy("createdAt", "desc");
    }

    const snapshot = await query.get();
    const docs = snapshot.docs.map((doc) => serializeKitchenDoc(doc));

    return NextResponse.json(docs, { status: 200 });
  } catch (error) {
    console.error("GET kitchens error:", error);
    return NextResponse.json({ message: "Failed to load kitchens" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await verifyFirebaseToken(req);
    if (auth.error) return auth.error;

    const kitchens = kitchensCollection();
    if (!kitchens) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const body = await req.json();
    const { name, maker, price, phoneNumber, description, location, imageUrl } = body;

    const docRef = await kitchens.add({
      name,
      maker,
      price,
      phoneNumber,
      description,
      location,
      imageUrl,
      userId: auth.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const createdDoc = await docRef.get();
    return NextResponse.json(serializeKitchenDoc(createdDoc), { status: 201 });
  } catch (error) {
    console.error("POST kitchen error:", error);
    return NextResponse.json({ message: "Failed to create kitchen" }, { status: 500 });
  }
}
