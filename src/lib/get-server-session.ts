import { cookies } from "next/headers";

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export async function getServerSession(): Promise<User | null> {
  const cookieStore = cookies();
  const session = (await cookieStore).get("session")?.value;

  if (!session) return null;

  // During development with MSW, derive the mock user locally so server components
  // don't depend on the browser service worker.
  if (process.env.NODE_ENV === "development") {
    return {
      id: "1",
      firstName: "Jane",
      lastName: "Doe",
      email: "test@example.com",
    };
  }

  // In non-dev (real backend), call the session API with the cookie.
  try {
    const res = await fetch("/api/auth/session", {
      headers: { cookie: `session=${session}` },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.user ?? null;
  } catch (e) {
    console.error("Error fetching server session:", e);
    return null;
  }
}
