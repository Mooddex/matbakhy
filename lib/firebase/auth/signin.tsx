//* Import firebase_app from config.js, signInWithEmailAndPassword, and getAuth from firebase/auth
import {auth} from "../firebase-config";

import { signInWithEmailAndPassword } from "firebase/auth";


//* Sign in (authenticate user)
export default async function signIn(email: string, password: string) {
  let result = null,
    error = null;
  try {
    //* Sign in user with email and password (sign in)
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    //! Handle errors here
    error = e;
  }

  return { result, error };
}