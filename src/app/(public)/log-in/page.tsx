"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import copyLogIn from "./logIn.copy.json";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { logIn } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const {
  title,
  description,
  emailLabel,
  passwordLabel,
  forgotPassword,
  logInButton,
  noAccount,
  signUp,
} = copyLogIn;

type LogInData = {
  email: string;
  password: string;
};

export default function LogInPage() {
  const router = useRouter();

  const form = useForm<LogInData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (body: LogInData) => {
    setFormError(null);

    const res = await logIn(body);

    if (!res) {
      setFormError("Invalid email or password");
      return;
    }

    return router.push("/dashboard");
  };

  return (
    <>
      <Card className="flex h-full flex-col justify-between">
        <div className="self-start border-solid border  shadow-md p-3 sm:py-2 w-fit box-content border-secondary rounded-full items-center space-y-0 flex flex-row gap-2">
          <Image alt="" src="/images/app-icon.png" width={30} height={22} />
          <p className="hidden sm:block font-stretch-extra-condensed text-primary uppercase text-md md:text-lg">
            Catalani Control
          </p>
        </div>
        <div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="sm:w-[500px] w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                {formError && (
                  <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                    {formError}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{emailLabel}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{passwordLabel}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          autoComplete="current-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <Button
                        type="button"
                        variant="minorLink"
                        onClick={() => router.push("/forgot-password")}
                      >
                        {forgotPassword}
                      </Button>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Loading..." : logInButton}
                </Button>
              </form>
            </Form>
          </CardContent>
        </div>

        <CardFooter>
          <p>
            {noAccount}
            <Button variant="link" onClick={() => router.push("/sign-up")}>
              {signUp}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
