"use client";

import { useRouter } from "next/navigation";
import copySignIn from "./signUp.copy.json";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/Input";
import { Button } from "@/app/components/Button";
import { signUp } from "@/lib/auth";
import Image from "next/image";
import imageGif from "@/app/assets/images/image.gif";

const {
  title,
  subtitle,
  firstNameLabel,
  lastNameLabel,
  emailLabel,
  passwordLabel,
  confirmPasswordLabel,
  signUpButton,
  haveAccount,
  signIn,
} = copySignIn;

const signUpSchema = z
  .object({
    firstName: z.string().min(1, "Required"),
    lastName: z.string().min(1, "Required"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpData = z.infer<typeof signUpSchema>;
export default function SignUpPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpData) => {
    const res = await signUp(data);

    if (!res) return;

    return router.push("/sign-in");
  };

  return (
    <>
      <section className="flex flex-col w-[480px] lg:w-1/3 p-8">
        <h1 className="mb-4 text-3xl font-bold">{title}</h1>
        <h2 className="text-lg font-regular">{subtitle}</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full mt-10"
        >
          <div className="flex flex-row gap-4">
            <Input
              label={firstNameLabel}
              placeholder="Enter your first name"
              type="text"
              register={register("firstName")}
              autocomplete="given-name"
              error={errors.firstName}
            />
            <Input
              label={lastNameLabel}
              placeholder="Enter your last name"
              type="text"
              register={register("lastName")}
              autocomplete="family-name"
              error={errors.lastName}
            />
          </div>
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
            autocomplete="new-password"
            error={errors.password}
          />
          <Input
            label={confirmPasswordLabel}
            placeholder="Confirm your password"
            type="password"
            register={register("confirmPassword")}
            autocomplete="new-password"
            error={errors.confirmPassword}
          />
          <Button type="submit" isLoading={isSubmitting}>
            {signUpButton}
          </Button>
        </form>
        <hr className="my-16 w-80 self-center border-[var(--charcoal-blue)]" />

        <p className="text-sm text-center">
          {haveAccount}{" "}
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
    </>
  );
}
