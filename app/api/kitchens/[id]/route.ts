import { NextRequest, NextResponse } from "next/server";
import { kitchensCollection, serializeKitchenDoc } from "@/lib/firebase/firestore";
import { verifyFirebaseToken } from "@/lib/auth/verify-token";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const kitchens = kitchensCollection();
    if (!kitchens) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const { id } = await params;
    const doc = await kitchens.doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ message: "Kitchen not found" }, { status: 404 });
    }

    return NextResponse.json(serializeKitchenDoc(doc), { status: 200 });
  } catch (error) {
    console.error("GET kitchen error:", error);
    return NextResponse.json({ message: "Failed to load kitchen" }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyFirebaseToken(req);
    if (auth.error) return auth.error;

    const kitchens = kitchensCollection();
    if (!kitchens) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const { id } = await params;
    const doc = await kitchens.doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ message: "Kitchen not found" }, { status: 404 });
    }

    const currentData = doc.data();
    if (currentData?.userId !== auth.uid) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { name, maker, price, phoneNumber, description, location, imageUrl } = body;

    await kitchens.doc(id).update({
      name,
      maker,
      price,
      phoneNumber,
      description,
      location,
      imageUrl,
      updatedAt: new Date().toISOString(),
    });

    const updatedDoc = await kitchens.doc(id).get();
    return NextResponse.json(serializeKitchenDoc(updatedDoc), { status: 200 });
  } catch (error) {
    console.error("PUT kitchen error:", error);
    return NextResponse.json({ message: "Failed to update kitchen" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const auth = await verifyFirebaseToken(req);
    if (auth.error) return auth.error;

    const kitchens = kitchensCollection();
    if (!kitchens) {
      return NextResponse.json({ message: "Database unavailable" }, { status: 503 });
    }

    const { id } = await params;
    const doc = await kitchens.doc(id).get();

    if (!doc.exists) {
      return NextResponse.json({ message: "Kitchen not found" }, { status: 404 });
    }

    const currentData = doc.data();
    if (currentData?.userId !== auth.uid) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await kitchens.doc(id).delete();
    return NextResponse.json({ message: "Kitchen deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("DELETE kitchen error:", error);
    return NextResponse.json({ message: "Failed to delete kitchen" }, { status: 500 });
  }
}
