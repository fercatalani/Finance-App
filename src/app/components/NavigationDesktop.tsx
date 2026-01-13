import Link from "next/link";

export default function NavigationDesktop() {
  return (
    <nav className="hidden justify-between lg:flex flex-col w-64 bg-[var(--charcoal-blue)] p-6 gap-4">
      <div>
        <div className="text-2xl font-bold">Finance</div>
        <ul className="flex flex-col gap-2 mt-6">
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-3 rounded hover:bg-black"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/finances"
              className="block py-2 px-3 rounded hover:bg-black"
            >
              Finance
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className="block py-2 px-3 rounded hover:bg-black"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <div className="px-4 pt-4 border-t border-gray-200/5">
        <div className="text-sm opacity-90">Signed in</div>
      </div>
    </nav>
  );
}
