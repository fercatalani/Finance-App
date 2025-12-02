export async function getCurrentUser() {
  const res = await fetch("/api/auth/session", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}

export async function signOut() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return false;

  return true;
}
