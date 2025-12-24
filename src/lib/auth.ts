type SignInBody = { email: string; password: string };
type SignUpBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export async function signIn(body: SignInBody) {
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) return null;
  return res.json();
}

export async function signUp(body: SignUpBody) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) return null;
  return res.json();
}

export async function forgotPassword(email: { email: string }) {
  const res = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  });

  if (!res.ok) return null;
  return res.json();
}
