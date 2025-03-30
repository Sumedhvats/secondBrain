import express from "express";
import bcrypt
import { z } from "zod";
const signupSchema = z.object({
  username: z.string().min(3).max(16),
  password: z
    .string()
    .min(8, { message: "minLengthErrorMessage" })
    .max(20, { message: "maxLengthErrorMessage" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "uppercaseErrorMessage",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "lowercaseErrorMessage",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "numberErrorMessage",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "specialCharacterErrorMessage",
    }),
});

export const signup = (req: express.Request, res: express.Response) => {
  try {
    const parsedBody = signupSchema.parse(req.body);
    console.log("Validation passed: ", parsedBody);
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const issue of error.issues) {
        console.error("Validation failed: ", issue.message);
      }
    } else {
      console.error("Unexpected error: ", error);
    }
  }


};
