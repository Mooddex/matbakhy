// middleware.ts
// Temporarily disabled auth checks while switching to Firebase Auth
import { NextResponse } from "next/server";

// Updated routes to match your actual structure
const publicRoutes = ["/", "/explore"];
const authRoutes = ["/signin", "/signup"]; // Updated paths
const privateRoutes = ["/kitchen/new", "/profile", "/dashboard"];

export default async function middleware(req: any) {
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

  // For now, allow all routes - auth will be handled client-side with Firebase
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};