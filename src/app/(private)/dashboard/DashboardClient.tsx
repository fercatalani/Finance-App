"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function DashboardClient({
  user,
}: {
  user: { id?: string; firstName: string; lastName: string; email?: string };
}) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
  }

  return (
    <div className="flex flex-col">
      <p>
        Welcome, {user.firstName} {user.lastName}
      </p>
      <button className="bg-metallic-blue" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}
