"use client";
import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <main className="flex min-h-screen items-center justify-center bg-background">
        {children}
      </main>
    </SessionProvider>
  );
}
