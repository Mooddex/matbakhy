"use client";

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';
import { createOrUpdateUserProfile } from '@/lib/userProfile'; 

const GoogleAuth = () => {
  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Create or update user profile in Firestore
      await createOrUpdateUserProfile(result.user);
      
      console.log('User signed in and profile created/updated');
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  return (
    <button
      className="w-full"
      onClick={handleGoogleSignIn}
    >
      Sign in with Google
    </button>
  );
};

export default GoogleAuth;