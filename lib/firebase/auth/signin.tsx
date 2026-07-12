import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";

export default async function signIn(email: string, password: string) {
  if (!auth) {
    return { result: null, error: new Error("Firebase auth is not configured") };
  }

  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    // Create the server session cookie
    try {
      const idToken = await result.user.getIdToken();
      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
    } catch (sessionError) {
      console.warn("Session cookie creation failed:", sessionError);
    }

    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
}