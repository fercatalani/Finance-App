import { NextResponse } from "next/server";

// Proxy to local Express API. We fetch server-side from the Next.js route
// so the browser only talks to the Next.js origin (no CORS). This is dev-only
// and demonstrates how Next can act as a safe proxy layer.

const API_BASE = process.env.EXPRESS_API_URL || "http://localhost:4000";

export async function GET() {
  const res = await fetch(`${API_BASE}/finances`);
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API_BASE}/finances`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
