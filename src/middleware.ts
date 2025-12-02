import { NextResponse } from "next/server";

// TODO: implement actual middleware logic for auth protection when backend is ready
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/finances/:path*"],
};
