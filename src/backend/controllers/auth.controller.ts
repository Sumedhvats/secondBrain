import express from "express";
import bcrypt from "bcrypt";
import { z } from "zod";
import User from "../models/users"
const userSchema = z.object({
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

export const signup = async (req: express.Request, res: express.Response) => {
  const {username,password}= req.body;
  try {
    const checkUser = userSchema.safeParse(req.body);
    if (!checkUser.success) {
        return res.status(400).json({ message: "Invalid input format", errors: checkUser.error.format() });
    }
    
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
    }
     
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
      username,password:hashedPassword
    })
    await newUser.save()

    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    console.error("Unexpected error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};