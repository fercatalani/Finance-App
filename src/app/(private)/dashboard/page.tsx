"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOut } from "@/lib/auth-client";

export default function Dashboard() {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then((data) => {
      if (!data) {
        router.push("/sign-in");
        return;
      }

      setUser({ name: `${data.firstName} ${data.lastName}` });
      setLoading(false);
    });
  }, [router]);

  async function handleSignOut() {
    await signOut();
    router.push("/sign-in");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col">
      <p>Welcome, {user?.name}</p>
      <button className="bg-metallic-blue" onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
}
