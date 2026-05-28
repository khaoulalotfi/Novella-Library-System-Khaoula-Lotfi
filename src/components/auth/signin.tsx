"use client";

import { signInAction } from "@/actions/signin-action";
import { SubmitButton } from "@/components/parts/submit-button";
import { registerDto } from "@/dto/register-dto";
import type { IState } from "@/types/shared-t";
import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import type { IDict } from "@/lib/dictionary";

interface IProps {
  lang: string;
  dict: IDict["auth"];
}

export function SignIn(props: IProps) {
  const { lang, dict } = props;

  const [state, formAction] = useActionState<IState, FormData>(
    signInAction,
    registerDto,
  );

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-sm border-border/50 shadow-2xl bg-card/80 backdrop-blur">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-primary">
            {dict.signInTitle}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {dict.signInDescription}
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" action={formAction} noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email">{dict.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={dict.emailPlaceholder}
                autoComplete="email"
                required
              />
              {state.errors?.email && (
                <p className="text-xs text-destructive font-medium">
                  {state.errors.email.join(" | ")}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">{dict.password}</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder={dict.passwordPlaceholder}
                autoComplete="current-password"
                required
                minLength={8}
              />
              {state.errors?.password && (
                <p className="text-xs text-destructive font-medium">
                  {state.errors.password.join(" | ")}
                </p>
              )}
            </div>

            {state.errors?.general && (
              <p className="text-xs text-destructive font-medium rounded-md bg-destructive/10 px-3 py-2">
                {state.errors.general.join(" | ")}
              </p>
            )}

            {state.message && !state.errors && (
              <p className="text-xs text-green-400 font-medium rounded-md bg-green-400/10 px-3 py-2">
                {state.message}
              </p>
            )}

            <SubmitButton label={dict.signIn} savingLabel={dict.saving} />

            <p className="text-center text-sm text-muted-foreground">
              {dict.noAccount}{" "}
              <Link
                href={`/${lang}/signup`}
                className="text-primary hover:underline font-medium"
              >
                {dict.signUp}
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
