"use client";

import { useRouter } from "next/navigation";
import copySignUp from "./signUp.copy.json";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signUp } from "@/lib/auth";
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
  subtitle,
  nameLabel,
  surnameLabel,
  emailLabel,
  passwordLabel,
  confirmPasswordLabel,
  signUpButton,
  haveAccount,
  logIn,
} = copySignUp;

type SignUpData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export default function SignUpPage() {
  const router = useRouter();

  const form = useForm<SignUpData>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = form.watch("password");

  const onSubmit = async (data: SignUpData) => {
    const res = await signUp(data);

    if (!res) return;

    return router.push("/log-in");
  };

  return (
    <>
      <Card className="flex h-full flex-col justify-between">
        <div className="self-start border-solid border shadow-md p-3 sm:py-2 w-fit box-content border-secondary rounded-full items-center space-y-0 flex flex-row gap-2">
          <Image alt="" src="/images/app-icon.png" width={30} height={22} />
          <p className="hidden sm:block font-stretch-extra-condensed text-primary uppercase text-md md:text-lg">
            Catalani Control
          </p>
        </div>

        <div>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="w-[500px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    rules={{
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Only letters are allowed",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{nameLabel}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your name"
                            type="text"
                            autoComplete="given-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    rules={{
                      required: "Required",
                      pattern: {
                        value: /^[a-zA-Z]+$/,
                        message: "Only letters are allowed",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{surnameLabel}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your surname"
                            type="text"
                            autoComplete="family-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email",
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
                    required: "Required",
                    minLength: {
                      value: 8,
                      message: "At least 8 characters",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{passwordLabel}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  rules={{
                    required: "Required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{confirmPasswordLabel}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm your password"
                          type="password"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Loading..." : signUpButton}
                </Button>
              </form>
            </Form>
          </CardContent>
        </div>

        <CardFooter>
          <p>
            {haveAccount}
            <Button variant="link" onClick={() => router.push("/log-in")}>
              {logIn}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
