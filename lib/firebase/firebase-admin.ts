// lib/firebase/firebase-admin.ts
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import { getFirestore, Firestore } from "firebase-admin/firestore";

let adminAuth: Auth | null = null;
let adminDb: Firestore | null = null;

if (!getApps().length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  } else {
    console.error("Firebase Admin NOT initialized — missing env vars above");
  }
}

if (getApps().length) {
  adminAuth = getAuth();
  adminDb = getFirestore();
}

// Helper functions بترجع النوع الصح (مش nullable) أو ترمي error واضح
export function getAdminAuth(): Auth {
  if (!adminAuth) {
    throw new Error(
      "Firebase Admin Auth is not initialized. Check your environment variables."
    );
  }
  return adminAuth;
}

export function getAdminDb(): Firestore {
  if (!adminDb) {
    throw new Error(
      "Firebase Admin Firestore is not initialized. Check your environment variables."
    );
  }
  return adminDb;
}

export { adminAuth, adminDb };