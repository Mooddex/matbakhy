"use client";

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase-config';

const GoogleAuth = () => {
  

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
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
