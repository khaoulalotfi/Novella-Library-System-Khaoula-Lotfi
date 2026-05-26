"use client";

import { signInAction } from "@/actions/signin-action";
import { SubmitButton } from "@/components/parts/submit-button";
import { registerDto } from "@/dto/register-dto";
import type { IState } from "@/types/shared-t";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignIn() {
  const [state, formAction] = useActionState<IState, FormData>(
    signInAction,
    registerDto,
  );

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form className="space-y-4 w-full sm:w-96" action={formAction}>
        <h1 className="text-2xl font-bold text-primary">Sign In</h1>
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
          <Label>Password</Label>
          <Input name="password" type="password" placeholder="Enter password" />
          {state.errors?.password && (
            <p className="text-xs text-destructive">
              {state.errors.password.join(" | ")}
            </p>
          )}
        </div>
        <SubmitButton label="Sign In" />
        {state?.errors?.general && (
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
