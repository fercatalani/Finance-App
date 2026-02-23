"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import copySignIn from "./signIn.copy.json";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { signIn } from "@/lib/auth";

const {
  title,
  emailLabel,
  passwordLabel,
  forgotPassword,
  loginButton,
  noAccount,
  signUp,
} = copySignIn;

const signInSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (body: SignInData) => {
    setFormError(null);

    const res = await signIn(body);

    if (!res) {
      setFormError("Invalid email or password");
      return;
    }

    return router.push("/dashboard");
  };

  return (
    <>
      <section className="flex flex-col min-w-10 lg:w-1/3 p-8">
        <h1 className="mb-4 text-3xl font-bold">Caleffi Catalani</h1>
        <h2 className="text-xl font-regular">{title}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-10"
        >
          {formError && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {formError}
            </div>
          )}
          <Input
            label={emailLabel}
            placeholder="Enter your email"
            type="email"
            register={register("email")}
            autocomplete="email"
            error={errors.email}
          />
          <Input
            label={passwordLabel}
            placeholder="Enter your password"
            type="password"
            register={register("password")}
            autocomplete="current-password"
            error={errors.password}
          />
          <Button type="submit" isLoading={isSubmitting}>
            {loginButton}
          </Button>
        </form>
        <hr className="my-16 w-80 self-center border-[var(--charcoal-blue)]" />

        <div className="items-center flex flex-col gap-2">
          <button
            className="text-sm w-fit text-sky-blue hover:underline cursor-pointer"
            onClick={() => router.push("/forgot-password")}
          >
            {forgotPassword}
          </button>
          <p className="text-sm">
            {noAccount}{" "}
            <button
              className="text-sky-blue hover:underline cursor-pointer"
              onClick={() => router.push("/sign-up")}
            >
              {signUp}
            </button>
          </p>
        </div>
      </section>
    </>
  );
}
