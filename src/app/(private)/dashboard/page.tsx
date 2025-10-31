"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  console.log("Session status:", status);
  console.log("Session data:", session);
  if (status === "loading") return <p>Loading...</p>;

  // TODO: Investigate why this line doesnt work as expected
  if (!session) return <p>Access denied</p>;

  return <p>Welcome, {session.user?.name}</p>;
}
