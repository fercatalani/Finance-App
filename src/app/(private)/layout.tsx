import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import NavigationDesktop from "@/app/components/NavigationDesktop";
import NavigationMobile from "@/app/components/NavigationMobile";
import { getServerSession } from "@/lib/get-server-session";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getServerSession();

  if (!user) {
    redirect("/log-in");
  }

  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <NavigationDesktop />

      <main className="flex-1 p-6">{children}</main>

      <NavigationMobile />
    </div>
  );
}
