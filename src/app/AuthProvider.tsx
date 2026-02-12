// Preserving the wrapper and avoiding unnecessary client bundling
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
