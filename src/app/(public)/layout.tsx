import type { ReactNode } from "react";
import Image from "next/image";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen w-full items-center bg-sidebar justify-center md:flex-row flex-col overflow-hidden">
      <div className="w-[130%] sm:w-[120%] sm:h-[460] sm:top-[-340] md:top-0 top-[-326] relative h-[400] md:h-screen">
        <Image
          alt=""
          src="/auth-bg-nobg.svg"
          fill
          className="object-contain hidden md:block"
        />
        <Image
          alt=""
          src="/auth-bg-2-nobg.svg"
          fill
          className="object-contain md:hidden"
        />
      </div>
      <div className="h-auto md:static absolute bottom-0 lg:top-0 top-60 flex items-start md:items-center w-full bg-background md:h-screen rounded-t-[60px] md:rounded-s-[60px] md:rounded-t-none py-10 px-6 sm:p-10 lg:p-16">
        {children}
      </div>
    </main>
  );
}
