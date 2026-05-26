import z from "zod";

export const signInSchema = z.object({
  email: z
    .string({ error: "Email address is required" })
    .trim()
    .pipe(z.email({ error: "Invalid email address" })),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password must be no more than 32 characters long" }),
});

export const signUpSchema = signInSchema.extend({
  username: z
    .string({ error: "Username is required" })
    .min(2, { error: "Username must be at least 2 characters long" }),
});
