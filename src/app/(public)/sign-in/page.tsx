"use client";

import { useRouter } from "next/navigation";
import copySignIn from "./signIn.copy.json";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Input } from "@/app/components/Input";
import Image from "next/image";
import imageGif from "@/app/assets/images/image.gif";

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

  const onSubmit = async (data: SignInData) => {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!res?.error) {
      router.push("/dashboard");
    } else {
      console.error("Invalid login");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-8 p-4 md:flex-row">
      <section className="flex flex-col w-1/3 w-xl p-6">
        <h1 className="mb-4 text-3xl font-bold">Caleffi Catalani</h1>
        <h2 className="text-xl font-regular">{title}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
          <Input
            label={emailLabel}
            type="email"
            register={register("email")}
            error={errors.email}
          />
          <Input
            label={passwordLabel}
            type="password"
            register={register("password")}
            error={errors.password}
          />
          <p className="text-sm text-right text-sky-blue hover:underline cursor-pointer">
            {forgotPassword}
          </p>
          <button
            type="submit"
            className="primaryButton py-3 mt-6 text-pure-white transition-colors cursor-pointer duration-400 ease-in-out"
          >
            {isSubmitting ? "Loading..." : loginButton}
          </button>
        </form>
        <hr className="my-16 w-80 self-center border-[var(--charcoal-blue)]" />

        <p className="text-center text-sm">
          {noAccount}{" "}
          <button className="text-sky-blue hover:underline cursor-pointer">
            {signUp}
          </button>
        </p>
      </section>
      <section className="h-screen w-2/3 hidden lg:flex items-center justify-center relative overflow-hidden rounded-2xl bg-transparent">
        <Image
          src={imageGif}
          alt=""
          className="w-full h-full object-cover"
          unoptimized
        />
      </section>
    </div>
  );
}
