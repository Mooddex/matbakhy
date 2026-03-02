import admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID; // matches your .env
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(`Missing Firebase Admin env vars: 
      projectId: ${!!projectId}, 
      clientEmail: ${!!clientEmail}, 
      privateKey: ${!!privateKey}
    `);
  }

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });
}

export const adminAuth = admin.auth();