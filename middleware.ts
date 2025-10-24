// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// Updated routes to match your actual structure
const publicRoutes = ["/", "/explore"];
const authRoutes = ["/auth/signin", "/auth/signup", "/auth/error"]; // Updated paths
const privateRoutes = ["/kitchen/new", "/profile", "/dashboard"];

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  
  const isPublicRoute = publicRoutes.some(route => 
    nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
  );
  const isAuthRoute = authRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url)); // Changed from /dashboard
  }

  // Redirect unauthenticated users from private routes to login
  if (!isLoggedIn && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/signin", req.url)); // Updated path
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};