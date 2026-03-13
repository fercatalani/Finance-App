import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Minimal cookie-presence check for protected routes.
// Per project rules: do not parse or decode tokens here — only check cookie presence.
export function middleware(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    const logInUrl = new URL("/log-in", req.url);
    return NextResponse.redirect(logInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/finances/:path*"],
};
