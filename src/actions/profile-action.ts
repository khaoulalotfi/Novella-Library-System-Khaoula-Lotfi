"use server";

import type { IState } from "@/types/shared-t";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { postApi } from "@/utils/server-api";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  surname: z.string().min(1, { error: "Surname is required" }),
  phone: z.string().min(1, { error: "Phone is required" }),
  dateOfBirth: z.string().min(1, { error: "Date of birth is required" }),
  idNumber: z.string().min(1, { error: "ID number is required" }),
  gender: z.enum(["male", "female"], { error: "Gender is required" }),
});

export async function profileAction(
  prevState: IState,
  formData: FormData,
): Promise<IState> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { isSaved: false, message: "Not authenticated" };
  }

  const rawFormData = {
    name: formData.get("name"),
    surname: formData.get("surname"),
    phone: formData.get("phone"),
    dateOfBirth: formData.get("dateOfBirth"),
    idNumber: formData.get("idNumber"),
    gender: formData.get("gender"),
  };

  const parse = profileSchema.safeParse(rawFormData);
  if (!parse.success) {
    const flat = z.flattenError(parse.error);
    return {
      errors: flat.fieldErrors,
      message: "Invalid form fields!",
      isSaved: false,
    };
  }

  const result = await postApi("/api/subscribers", {
    ...parse.data,
    email: session.user.email,
  });

  if (result && "error" in result) {
    return {
      errors: { general: [result.error] },
      message: result.error,
      isSaved: false,
    };
  }

  redirect("/");
}
