import { getServerSession } from "@/lib/get-server-session";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getServerSession();

  return <DashboardClient user={user!} />;
}
