import { NextResponse } from "next/server";
import { usersCollection, serializeUserDoc } from "@/lib/firebase/firestore";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const users = usersCollection();
    if (!users) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const { id } = await params;
    const snapshot = await users.where("firebaseUid", "==", id).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(serializeUserDoc(snapshot.docs[0]));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const users = usersCollection();
    if (!users) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const { id: firebaseUid } = await params;
    const body = await req.json();
    const snapshot = await users.where("firebaseUid", "==", firebaseUid).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const docRef = snapshot.docs[0].ref;
    await docRef.update({
      ...body,
      updatedAt: new Date().toISOString(),
    });

    const updatedDoc = await docRef.get();
    return NextResponse.json(serializeUserDoc(updatedDoc));
  } catch (error) {
    console.error("PATCH /api/users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const users = usersCollection();
    if (!users) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const { id } = await params;
    const snapshot = await users.where("firebaseUid", "==", id).limit(1).get();

    if (snapshot.empty) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await snapshot.docs[0].ref.delete();
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    console.error("DELETE /api/users error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
