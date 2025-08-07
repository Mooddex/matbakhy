// auth.config.ts - Simple approach without custom types
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        // Use type assertion to add custom properties
        (session.user as any).id = token.id;
        (session.user as any).provider = token.provider;
      }
      return session;
    },
    
    async signIn({ user, account, profile }) {
      return true;
    }
  },
  
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  
  events: {
    async signIn({ user, account }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`);
    }
  }
} satisfies NextAuthConfig;