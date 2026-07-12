import { NextResponse } from "next/server";
import { usersCollection, serializeUserDoc } from "@/lib/firebase/firestore";

export async function POST(req: Request) {
  try {
    const users = usersCollection();
    if (!users) {
      return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
    }

    const { uid, email, name, avatar } = await req.json();
    const snapshot = await users.where("firebaseUid", "==", uid).limit(1).get();

    let userDoc;
    if (snapshot.empty) {
      const docRef = await users.add({
        name,
        email,
        avatar,
        provider: "google",
        firebaseUid: uid,
        username: email?.split("@")[0] || "",
        stats: {
          totalKitchens: 0,
          totalViews: 0,
          rating: 0,
          completedOrders: 0,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      userDoc = await docRef.get();
    } else {
      userDoc = snapshot.docs[0];
    }

    return NextResponse.json(serializeUserDoc(userDoc));
  } catch (error) {
    console.error("Error in google auth route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
