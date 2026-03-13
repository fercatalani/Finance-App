"use client";

import { useRouter } from "next/navigation";
import { logOut } from "@/lib/auth-client";

export default function DashboardClient({
  user,
}: {
  user: { id?: string; firstName: string; lastName: string; email?: string };
}) {
  const router = useRouter();

  async function handleLogOut() {
    await logOut();
    router.push("/log-in");
  }

  return (
    <div className="flex flex-col">
      <p>
        Welcome, {user.firstName} {user.lastName}
      </p>
      <button
        className="bg-primary text-primary-foreground px-4 py-2 rounded"
        onClick={handleLogOut}
      >
        Log Out
      </button>
    </div>
  );
}
