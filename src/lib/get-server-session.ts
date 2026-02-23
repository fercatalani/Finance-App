import { cookies } from "next/headers";

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
  email?: string;
};

export async function getServerSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

    const res = await fetch(`${baseUrl}/auth/session`, {
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
