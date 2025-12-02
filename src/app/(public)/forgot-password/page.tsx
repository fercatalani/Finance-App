"use client";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/Input";
import Image from "next/image";
import imageGif from "@/app/assets/images/image.gif";
import copyForgotPassword from "./forgotPassword.copy.json";
import { useRouter } from "next/navigation";

const { title, subtitle, emailLabel, resetButton, noAccount, signIn } =
  copyForgotPassword;

const signInSchema = z.object({
  email: z.email("Enter a valid email"),
});

type ForgotPasswordData = z.infer<typeof signInSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(signInSchema),
  });

  // TODO: implement actual forgot password flow related to send code to email and reset password
  const onSubmit = async (data: ForgotPasswordData) => {
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return router.push("/sign-in");
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <section className="flex flex-col min-w-10 lg:w-1/3 p-8">
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <h2 className="text-lg font-regular">{subtitle}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-10"
        >
          <Input
            label={emailLabel}
            type="email"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email}
          />
          <button
            type="submit"
            className="primaryButton py-3 mt-6 text-pure-white transition-colors cursor-pointer duration-400 ease-in-out"
          >
            {isSubmitting ? "Loading..." : resetButton}
          </button>
        </form>
        <hr className="my-16 w-80 self-center border-[var(--charcoal-blue)]" />

        <p className="text-center text-sm">
          {noAccount}{" "}
          <button
            className="text-sky-blue hover:underline cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            {signIn}
          </button>
        </p>
      </section>
      <section className="h-screen lg:w-2/3 hidden py-6 pr-6 lg:flex items-center justify-center relative overflow-hidden bg-transparent">
        <Image
          src={imageGif}
          alt=""
          className="w-full h-full rounded-2xl object-fill"
          unoptimized
        />
      </section>
    </div>
  );
}
