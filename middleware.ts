import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

// Route configuration for better maintainability
const publicRoutes = ["/", "/explore"];
const authRoutes = ["/login", "/register", "/forgot-password"];
const privateRoutes = ["/addkitchen", "/profile"];
// POTENTIAL IMPROVEMENT: Add role-based routes for future scalability
// const adminRoutes = ["/admin", "/users", "/analytics"];
// const moderatorRoutes = ["/moderate", "/reports"];

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  
  // POTENTIAL IMPROVEMENT: Extract user role for role-based access control
  // const userRole = req.auth?.user?.role;
  
  const isPublicRoute = publicRoutes.some(route => 
    nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
  );
  const isAuthRoute = authRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // POTENTIAL IMPROVEMENT: Add admin route protection
  // const isAdminRoute = adminRoutes.some(route => 
  //   nextUrl.pathname.startsWith(route)
  // );
  // if (isAdminRoute && (!isLoggedIn || userRole !== "admin")) {
  //   return NextResponse.redirect(new URL("/unauthorized", req.url));
  // }

  // Redirect authenticated users away from auth pages
  if (isLoggedIn && isAuthRoute) {
    // POTENTIAL IMPROVEMENT: Redirect to intended destination after login
    // const callbackUrl = nextUrl.searchParams.get("callbackUrl") || "/dashboard";
    // return NextResponse.redirect(new URL(callbackUrl, req.url));
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect unauthenticated users from private routes to login
  if (!isLoggedIn && isPrivateRoute) {
    // POTENTIAL IMPROVEMENT: Preserve intended destination for post-login redirect
    // const loginUrl = new URL("/login", req.url);
    // loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    // return NextResponse.redirect(loginUrl);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // POTENTIAL IMPROVEMENT: Add request logging for debugging
  // if (process.env.NODE_ENV === "development") {
  //   console.log(`[Middleware] ${req.method} ${nextUrl.pathname} - Auth: ${isLoggedIn}`);
  // }

  // POTENTIAL IMPROVEMENT: Add rate limiting for sensitive routes
  // if (isAuthRoute && process.env.NODE_ENV === "production") {
  //   // Implement rate limiting logic here
  // }

  // POTENTIAL IMPROVEMENT: Add security headers
  // const response = NextResponse.next();
  // response.headers.set("X-Frame-Options", "DENY");
  // response.headers.set("X-Content-Type-Options", "nosniff");
  // return response;

  // Allow the request to proceed
  return NextResponse.next();
});

export const config = {
  // POTENTIAL IMPROVEMENT: Current matcher is comprehensive but could be optimized
  // The current pattern excludes Next.js internals and covers all routes
  matcher: [
    // Match all routes except Next.js internals and static files
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
  
  // POTENTIAL IMPROVEMENT: More specific matchers for performance
  // If you want to be more selective about which routes run middleware:
  // matcher: [
  //   "/dashboard/:path*",
  //   "/profile/:path*", 
  //   "/settings/:path*",
  //   "/login",
  //   "/register",
  //   "/admin/:path*"
  // ],
};

// POTENTIAL IMPROVEMENT: Add helper functions for route checking
// export const isProtectedRoute = (pathname: string): boolean => {
//   return privateRoutes.some(route => pathname.startsWith(route));
// };

// export const isAuthenticationRoute = (pathname: string): boolean => {
//   return authRoutes.some(route => pathname.startsWith(route));
// };

// POTENTIAL IMPROVEMENT: Add TypeScript types for better type safety
// interface ExtendedNextRequest extends NextRequest {
//   auth?: {
//     user?: {
//       id: string;
//       email: string;
//       role: "user" | "admin" | "moderator";
//     };
//   };
// }

// POTENTIAL IMPROVEMENT: Add configuration object for easy customization
// const middlewareConfig = {
//   redirectAfterLogin: "/dashboard",
//   redirectAfterLogout: "/",
//   preserveCallbackUrl: true,
//   enableLogging: process.env.NODE_ENV === "development",
//   enableRateLimit: process.env.NODE_ENV === "production",
// };

/*
ADDITIONAL POTENTIAL IMPROVEMENTS:

1. **Error Handling**: Add try-catch blocks around auth operations
   try {
     const isLoggedIn = !!req.auth;
   } catch (error) {
     console.error("Auth error in middleware:", error);
     return NextResponse.redirect(new URL("/error", req.url));
   }

2. **Internationalization**: Support for multiple locales
   const locale = req.nextUrl.locale;
   return NextResponse.redirect(new URL(`/${locale}/login`, req.url));

3. **Custom Redirects**: Based on user preferences or subscription status
   const userPreferences = req.auth?.user?.preferences;
   if (userPreferences?.defaultRoute) {
     return NextResponse.redirect(new URL(userPreferences.defaultRoute, req.url));
   }

4. **Session Refresh**: Handle token refresh automatically
   if (req.auth?.expires && new Date(req.auth.expires) < new Date()) {
     // Trigger token refresh
   }

5. **Analytics Integration**: Track route access patterns
   if (isPrivateRoute) {
     // Send analytics event
   }

6. **Feature Flags**: Enable/disable routes based on feature flags
   const featureFlags = await getFeatureFlags(req.auth?.user?.id);
   if (nextUrl.pathname.startsWith("/beta") && !featureFlags.betaAccess) {
     return NextResponse.redirect(new URL("/coming-soon", req.url));
   }

7. **A/B Testing**: Route users to different experiences
   const experiment = getExperiment(req.auth?.user?.id);
   if (experiment.variant === "B" && nextUrl.pathname === "/pricing") {
     return NextResponse.redirect(new URL("/pricing-v2", req.url));
   }
*/