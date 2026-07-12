import { NextResponse } from "next/server";
import { usersCollection, serializeUserDoc } from "@/lib/firebase/firestore";

export async function POST(req: Request) {
  try {
    const users = usersCollection();
    if (!users) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const body = await req.json();
    const snapshot = await users.where("firebaseUid", "==", body.firebaseUid).limit(1).get();

    if (!snapshot.empty) {
      return NextResponse.json(serializeUserDoc(snapshot.docs[0]), { status: 200 });
    }

    const docRef = await users.add({
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const created = await docRef.get();
    return NextResponse.json(serializeUserDoc(created), { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "An error occurred" },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const users = usersCollection();
    if (!users) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const snapshot = await users.orderBy("createdAt", "desc").get();
    const docs = snapshot.docs.map((doc) => serializeUserDoc(doc));
    return NextResponse.json(docs);
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
