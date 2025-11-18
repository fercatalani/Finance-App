"use client";

import { useRouter } from "next/navigation";
import copySignIn from "./signUp.copy.json";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/app/components/Input";
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
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(6, "At least 6 characters")
      .max(20, "At most 20 characters"),
    confirmPassword: z
      .string()
      .min(6, "At least 6 characters")
      .max(20, "At most 20 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
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
    // const res = await signIn("credentials", {
    //   redirect: false,
    //   email: data.email,
    //   password: data.password,
    // });
    // if (!res?.error) {
    //   router.push("/dashboard");
    // } else {
    //   console.error("Invalid login");
    // }
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
            label={firstNameLabel}
            placeholder="Enter your first name"
            type="text"
            register={register("firstName")}
            error={errors.firstName}
          />
          <Input
            label={lastNameLabel}
            placeholder="Enter your last name"
            type="text"
            register={register("lastName")}
            error={errors.lastName}
          />
          <Input
            label={emailLabel}
            placeholder="Enter your email"
            type="email"
            register={register("email")}
            error={errors.email}
          />
          <Input
            label={passwordLabel}
            placeholder="Enter your password"
            type="password"
            register={register("password")}
            error={errors.password}
          />
          <button
            type="submit"
            className="primaryButton py-3 text-pure-white transition-colors cursor-pointer duration-400 ease-in-out"
          >
            {isSubmitting ? "Loading..." : signUpButton}
          </button>
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
    </div>
  );
}
