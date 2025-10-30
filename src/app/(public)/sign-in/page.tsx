"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import copySignIn from "./copy/copySignIn.json";

const {
  title,
  emailLabel,
  passwordLabel,
  forgotPassword,
  loginButton,
  noAccount,
  signUp,
} = copySignIn;

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // fake login (replace with GraphQL mutation)
    if (email === "test@example.com" && password === "123456") {
      localStorage.setItem("token", "fake-jwt-token");
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-8 p-4 md:flex-row">
      <section className="flex flex-col w-1/3 w-xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Caleffi Catalani</h1>
        <h2 className="text-xl font-regular">{title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <label className="block text-sm font-medium">
            {emailLabel}
            <input
              type="email"
              placeholder={emailLabel}
              className="w-full placeholder:text-graphite bg-slate-blue-gray rounded-full border px-4 py-2 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium">
            {passwordLabel}
            <input
              type="password"
              placeholder={passwordLabel}
              className="w-full rounded-full border px-4 py-2 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="text-sm text-right text-[var(--sky-blue)] hover:underline cursor-pointer">
            {forgotPassword}
          </p>
          <button
            type="submit"
            className="w-full rounded-full py-3 mt-6 text-pure-white transition-colors cursor-pointer duration-400 ease-in-out"
          >
            {loginButton}
          </button>
        </form>

        <hr className="my-16 w-80 self-center border-[var(--charcoal-blue)]" />
        <p className="text-center text-sm">
          {noAccount}{" "}
          <span className="text-[var(--sky-blue)] hover:underline cursor-pointer">
            {signUp}
          </span>
        </p>
      </section>
      <section className="h-screen w-2/3 hidden lg:flex items-center justify-center relative overflow-hidden rounded-2xl bg-[var(--charcoal-blue)]">
        <div
          className="absolute bottom-40 left-20 w-300 h-300 rounded-full pointer-events-none 
           bg-[radial-gradient(circle_at_80%_20%,var(--sky-blue)_0%,var(--powder-blue)_10%,transparent_70%)]"
        ></div>
        <div
          className="absolute top-0 right-10 w-500 h-700 rounded-full pointer-events-none 
           bg-[radial-gradient(circle_at_50%_40%,var(--sky-blue)_0%,var(--powder-blue)_0%,transparent_40%)]"
        ></div>
      </section>
    </div>
  );
}
