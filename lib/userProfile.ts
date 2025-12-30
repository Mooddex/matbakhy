import { db } from './firebase-config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';

export async function createOrUpdateUserProfile(user: User) {
  const userRef = doc(db, "users", user.uid);
  
  try {
    const docSnap = await getDoc(userRef);
    
    if (!docSnap.exists()) {
      // Create new user profile
      await setDoc(userRef, {
        uid: user.uid,
        displayName: user.displayName || "Anonymous User",
        photoURL: user.photoURL || "/default-avatar.png",
        email: user.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      console.log("User profile created");
    } else {
      // Update existing profile with latest auth data
      await updateDoc(userRef, {
        displayName: user.displayName || docSnap.data().displayName,
        photoURL: user.photoURL || docSnap.data().photoURL,
        email: user.email,
        updatedAt: new Date().toISOString()
      });
      console.log("User profile updated");
    }
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
  }
}

export async function getUserProfile(uid: string) {
  const userRef = doc(db, "users", uid);
  
  try {
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No user profile found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}