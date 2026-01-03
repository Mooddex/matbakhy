//* Import firebase_app from config.js, signInWithEmailAndPassword, and getAuth from firebase/auth
import { createUser } from "@/app/actions/user";
import {auth} from "../firebase-config";
import { User } from "@/lib/types/User";

import { createUserWithEmailAndPassword } from "firebase/auth";


//* Sign up (create user)
export default async function signUp(email: string, password: string, name: string) {
  let result = null,
    error = null;
  try {
    //* Create user with email and password (sign up)
    result = await createUserWithEmailAndPassword(auth, email, password);
    // send user data to mongodb 
    const firebaseUser = result.user;
    const user: User = {
      firebaseUid: firebaseUser.uid, // ✅ Changed from 'id'
      email: firebaseUser.email || '',
      name: name,
      username: firebaseUser.email?.split('@')[0] || '', // Default username from email
      avatar: firebaseUser.photoURL || '',
      phone: firebaseUser.phoneNumber || '',
      location: '',
      bio: '',
        provider: 'email', // ✅ Added this
      // ✅ Removed joinedDate - schema handles this with timestamps
      stats: { totalKitchens: 0, totalViews: 0, rating: 0, completedOrders: 0 },
    };
    const response = await createUser(user);
    console.log("User saved to MongoDB:", response);
    
  } catch (e) {
    error = e;
    console.error("Signup error:", e);
  }

  return { result, error };
}