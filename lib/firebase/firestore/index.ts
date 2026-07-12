import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/firebase-admin";

export const usersCollection = () => adminDb?.collection("users") ?? null;
export const kitchensCollection = () => adminDb?.collection("kitchens") ?? null;

type FirestoreDoc = DocumentSnapshot | QueryDocumentSnapshot;

export function serializeKitchenDoc(doc: FirestoreDoc) {
  const data = doc.data() ?? {};
  return {
    id: doc.id,
    _id: doc.id,
    ...data,
  };
}

export function serializeUserDoc(doc: FirestoreDoc) {
  const data = doc.data() ?? {};
  const serialized: Record<string, unknown> = {
    id: doc.id,
    _id: doc.id,
  };

  for (const [key, value] of Object.entries(data)) {
    if (key === "password") continue;
    serialized[key] = value;
  }

  return serialized;
}
