"use client";

import { signUpAction } from "@/actions/signup-action";
import { SubmitButton } from "@/components/parts/submit-button";
import { registerDto } from "@/dto/register-dto";
import type { IState } from "@/types/shared-t";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Register() {
  const [state, formAction] = useActionState<IState, FormData>(
    signUpAction,
    registerDto,
  );

  const router = useRouter();
  useEffect(() => {
    if (state.isSaved) {
      router.push("/profile");
    }
  }, [state.isSaved, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="space-y-4 w-full sm:w-96" action={formAction}>
        <h1 className="text-2xl font-bold text-primary">Sign Up</h1>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input name="email" type="email" placeholder="Enter email" />
          {state.errors?.email && (
            <p className="text-xs text-destructive">
              {state.errors.email.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Username</Label>
          <Input name="username" placeholder="Enter username" />
          {state.errors?.username && (
            <p className="text-xs text-destructive">
              {state.errors.username.join(" | ")}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label>Password</Label>
          <Input name="password" type="password" placeholder="Enter password" />
          {state.errors?.password && (
            <p className="text-xs text-destructive">
              {state.errors.password.join(" | ")}
            </p>
          )}
        </div>
        <SubmitButton label="Sign Up" />
        {state.errors?.general && (
          <div className="p-1 bg-red-100 italic text-sm">
            {state.errors.general.join(" | ")}
          </div>
        )}
        <div
          className={`text-sm italic p-1 ${state?.errors ? "bg-red-100" : state?.message ? "bg-green-100" : ""}`}
        >
          {state?.message}
        </div>
      </form>
    </div>
  );
}
