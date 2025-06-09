"use client";

import { FC, useTransition } from "react";
import { CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { loginAction, signUpAction } from "@/actions/user";

type AuthFormProps = {
  type: "login" | "sign-up";
};

const AuthForm: FC<AuthFormProps> = ({ type }) => {
  const isLoginForm = type === "login";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      let errorMessage = "";
      let successMessage = "";

      if (isLoginForm) {
        errorMessage = (await loginAction(email, password))?.errorMessage ?? "";
        successMessage = "Login successful!";
      } else {
        errorMessage =
          (await signUpAction(email, password))?.errorMessage ?? "";
        successMessage =
          "Sign up successful! Check your email for verification.";
      }

      if (errorMessage) {
        toast.error(errorMessage);
      } else {
        toast.success(successMessage);
        router.push("/");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <CardContent className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
          />
        </div>
      </CardContent>
      <CardFooter className="mt-4 flex flex-col gap-6">
        <Button className="w-full" type="submit" disabled={isPending}>
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : isLoginForm ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-xs">
          {isLoginForm
            ? "Don't have an account yet?"
            : "Already have an account?"}{" "}
          <Link
            href={isLoginForm ? "/sign-up" : "login"}
            className={`text-amber-400 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}
          >
            {" "}
            {isLoginForm ? "Sign up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  );
};

export default AuthForm;
