import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/get-server-session";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getServerSession();

  if (!user) {
    redirect("/sign-in");
  }

  return <DashboardClient user={user!} />;
}
