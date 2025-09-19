import { NextResponse } from "next/server";

export function middleware(request) {
  // Define protected routes
  const protectedRoutes = ["/admin", "/dashboard", "/profile"];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for auth token in cookies
    const authToken = request.cookies.get("auth-token");

    if (!authToken) {
      // Redirect to login page if no token
      return NextResponse.redirect(new URL("/demo-auth", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
