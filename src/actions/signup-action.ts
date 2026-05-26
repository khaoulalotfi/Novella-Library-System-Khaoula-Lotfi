"use server";

import type { IState } from "@/types/shared-t";
import { signUpSchema } from "@/utils/form/login-validator";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import z from "zod";

export async function signUpAction(
  prevState: IState,
  formData: FormData,
): Promise<IState> {
  const rawFormData = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parse = signUpSchema.safeParse(rawFormData);
  if (!parse.success) {
    const flat = z.flattenError(parse.error);
    return {
      errors: flat.fieldErrors,
      message: "Invalid form fields!",
      isSaved: false,
    };
  }

  const { email, password, username } = parse.data;

  try {
    const response = await auth.api.signUpEmail({
      body: { email, password, name: username },
      headers: await headers(),
    });

    if (!response) {
      return {
        errors: { email: ["Failed to create user."] },
        message: "Failed to sign up",
        isSaved: false,
      };
    }

    return { message: "User successfully created", isSaved: true };
  } catch (error) {
    console.error("Sign up error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    if (
      errorMessage.includes("already exists") ||
      errorMessage.includes("email")
    ) {
      return {
        errors: { email: ["This email is already registered"] },
        message: "Failed to sign up",
        isSaved: false,
      };
    }

    if (
      errorMessage.includes("Password too short") ||
      errorMessage.includes("Password is too short")
    ) {
      return {
        errors: { password: ["Password must be at least 8 characters long"] },
        message: "Password is too short",
        isSaved: false,
      };
    }

    return {
      errors: { general: [errorMessage] },
      message: errorMessage || "Failed to sign up",
      isSaved: false,
    };
  }
}
