"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import copyForgotPassword from "./forgotPassword.copy.json";
import Image from "next/image";
import { forgotPassword } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const { title, subtitle, emailLabel, resetButton, noAccount, logIn } =
  copyForgotPassword;
type ForgotPasswordData = {
  email: string;
};

export default function ForgotPasswordPage() {
  const router = useRouter();

  const form = useForm<ForgotPasswordData>({
    defaultValues: {
      email: "",
    },
  });

  // TODO: implement actual forgot password flow related to send code to email and reset password
  const onSubmit = async (data: ForgotPasswordData) => {
    const res = await forgotPassword(data);

    if (!res) return;

    return router.push("/log-in");
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

        <div className="w-full sm:w-[500px]">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Loading..." : resetButton}
                </Button>
              </form>
            </Form>
          </CardContent>
        </div>

        <CardFooter>
          <p>
            {noAccount}
            <Button variant="link" onClick={() => router.push("/log-in")}>
              {logIn}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
