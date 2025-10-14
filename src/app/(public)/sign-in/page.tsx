"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
        <h2 className="text-xl font-regular">
          Focus on life. We’ll handle the numbers.
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <label className="block text-sm font-medium">
            Email
            <input
              type="email"
              placeholder="Email"
              className="w-full placeholder:text-graphite bg-slate-blue-gray rounded-full border p-2 mt-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block text-sm font-medium">
            Password
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-full border p-2 mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-charcoal-blue p-2 mt-6 text-pure-white hover:bg-steel-blue transition-colors"
          >
            Login
          </button>
        </form>
      </section>
      <section className="flex h-screen w-2/3 hidden lg:flex items-center justify-center">
        <div className="bg-charcoal-blue">Teste</div>
      </section>
    </div>
  );
}
