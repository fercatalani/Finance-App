import Link from "next/link";

export default function NavigationMobile() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:hidden  bg-[var(--charcoal-blue)]">
      <div className="flex text-center justify-around">
        <Link
          href="/dashboard"
          className="hover:bg-black w-1/3 p-4 cursor-pointer"
        >
          Dashboard
        </Link>
        <Link
          href="/finances"
          className="hover:bg-black w-1/3 p-4 cursor-pointer"
        >
          Finance
        </Link>
        <Link
          href="/settings"
          className="hover:bg-black w-1/3 p-4 cursor-pointer"
        >
          Settings
        </Link>
      </div>
    </nav>
  );
}
