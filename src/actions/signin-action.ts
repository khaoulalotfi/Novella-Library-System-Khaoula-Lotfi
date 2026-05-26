"use server";

import type { IState } from "@/types/shared-t";
import { signInSchema } from "@/utils/form/login-validator";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import z from "zod";

export async function signInAction(
  prevState: IState,
  formData: FormData,
): Promise<IState> {
  const rawFormData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parse = signInSchema.safeParse(rawFormData);
  if (!parse.success) {
    const flat = z.flattenError(parse.error);
    return {
      errors: flat.fieldErrors,
      message: "Invalid form fields!",
      isSaved: false,
    };
  }

  const { email, password } = parse.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch (error) {
    console.error("Sign in error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (
      errorMessage.includes("Invalid email") ||
      errorMessage.includes("user not found")
    ) {
      return {
        errors: { email: ["User not found."] },
        message: "Failed to sign in",
        isSaved: false,
      };
    }

    if (
      errorMessage.includes("Invalid password") ||
      errorMessage.includes("password")
    ) {
      return {
        errors: { password: ["Incorrect password."] },
        message: "Failed to sign in",
        isSaved: false,
      };
    }

    return {
      errors: { general: [errorMessage] },
      message: "Failed to sign in",
      isSaved: false,
    };
  }

  redirect("/");
}
