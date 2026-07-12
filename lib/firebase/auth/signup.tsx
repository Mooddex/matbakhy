import { auth } from "../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
export default async function signUp(email: string, password: string, name: string) {
  if (!auth) {
    return { result: null, error: new Error("Firebase auth is not configured") };
  }

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = result.user;

    // Create the server session cookie
    try {
      const idToken = await firebaseUser.getIdToken();
      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
    } catch (sessionError) {
      console.warn("Session cookie creation failed:", sessionError);
    }

    // Sync profile to Firestore
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firebaseUid: firebaseUser.uid,
          email: firebaseUser.email || "",
          name,
          username: firebaseUser.email?.split("@")[0] || "",
          avatar: firebaseUser.photoURL || "",
          phone: firebaseUser.phoneNumber || "",
          location: "",
          bio: "",
          provider: "email",
          stats: { totalKitchens: 0, totalViews: 0, rating: 0, completedOrders: 0 },
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Firestore profile sync failed:", res.status, text);
        return { result, error: new Error(`Account created, but profile save failed: ${text}`) };
      }
    } catch (syncError) {
      console.error("Profile sync to Firestore failed:", syncError);
      return { result, error: new Error("Account created, but profile save failed") };
    }

    return { result, error: null };
  } catch (error) {
    console.error("Signup error:", error);

    let message = "Sign up failed";
    if (error instanceof FirebaseError) {
      // e.g. "Firebase: Password should be at least 6 characters (auth/weak-password)."
      message = error.message
        .replace("Firebase: ", "")
        .replace(/\s*\(auth\/[^)]+\)\.?/, "")
        .trim();
    } else if (error instanceof Error) {
      message = error.message;
    }

    return { result: null, error: new Error(message) };
  }
}