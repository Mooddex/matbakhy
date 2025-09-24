// auth.ts - Enhanced version using your existing Mongoose setup
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser, updateUser } from "@/lib/db/users";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      }
    }),
    
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await getUserByEmail(credentials.email as string);
          
          if (!user || !user.hashedPassword) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string, 
            user.hashedPassword
          );
          
          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image || null,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }
      
      // Handle Google OAuth sign-in
      if (account?.provider === "google" && profile) {
        try {
          let existingUser = await getUserByEmail(profile.email!);
          
          if (!existingUser) {
            // Create new user for Google OAuth
            existingUser = await createUser({
              email: profile.email!,
              name: profile.name || "Google User",
              password: Math.random().toString(36), // Random password for OAuth users
            });
            
            // Update user with Google-specific data
            await updateUser(existingUser.id, {
              image: profile.picture,
              emailVerified: new Date(), // Google emails are verified
            });
          } else {
            // Update existing user's image if they signed in with Google
            await updateUser(existingUser.id, {
              image: profile.picture,
            });
          }
          
          // Update token with user data
          token.id = existingUser.id;
          token.email = existingUser.email;
          token.name = existingUser.name;
          token.image = profile.picture;
        } catch (error) {
          console.error("Error handling Google OAuth:", error);
          return token;
        }
      }
      
      // Handle session updates (when user updates profile)
      if (trigger === "update" && session) {
        try {
          const updatedUser = await getUserByEmail(token.email as string);
          if (updatedUser) {
            token.name = updatedUser.name;
            token.image = updatedUser.image;
          }
        } catch (error) {
          console.error("Error updating token:", error);
        }
      }
      
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string;
      }
      return session;
    },
    
    async signIn({ user, account, profile, email, credentials }) {
      // For credentials provider
      if (account?.provider === "credentials") {
        return true;
      }
      
      // For OAuth providers (Google)
      if (account?.provider === "google" && profile?.email) {
        try {
          // Check if user exists or will be created in the JWT callback
          const existingUser = await getUserByEmail(profile.email);
          
          // Allow sign in - user creation/update happens in JWT callback
          return true;
        } catch (error) {
          console.error("Sign-in error:", error);
          return false;
        }
      }
      
      return true;
    },
  },

  pages: {
    signIn: "/auth/signin",
    // signUp: "/auth/signup", // If you have a custom signup page
  },

   events: {
    async signIn({ user, account, profile }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`);
    },
    async signOut() {
      console.log(`User signed out`);
    },
  },
});