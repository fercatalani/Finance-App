import type { ReactNode } from "react";
import NavigationDesktop from "@/app/components/NavigationDesktop";
import NavigationMobile from "@/app/components/NavigationMobile";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background text-[var(--pure-white)]">
      <NavigationDesktop />

      <main className="flex-1 p-6">{children}</main>

      <NavigationMobile />
    </div>
  );
}
