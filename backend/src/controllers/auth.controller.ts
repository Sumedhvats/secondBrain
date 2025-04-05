import express from "express";
import bcrypt from "bcrypt";
import z from "zod";
import User from "../models/users";
import jwt from "jsonwebtoken";

const userSchema = z.object({
  username: z.string().min(3).max(16),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain at least one number",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message:
        "Password must contain at least one special character (!@#$%^&*)",
    }),
});

const signinSchema = z.object({
  username: z.string().min(3).max(16),
  password: z.string().min(8).max(20),
});

export const signup = async (req: express.Request, res: express.Response) => {
  try {
    const parsedData = userSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(411).json({
        message: "Error in inputs",
        errors: parsedData.error.format(),
      });
    }

    const { username, password } = parsedData.data;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: "User already exists with this username" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(200).json({ message: "Signed up" });
  } catch (error) {
    console.error("Unexpected error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const signin = async (req: express.Request, res: express.Response) => {
  try {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(411).json({
        message: "Error in inputs",
        errors: parsedData.error.format(),
      });
    }

    const { username, password } = parsedData.data;
    const user = await User.findOne({ username });
    if (!user || !user.password) {
      return res.status(403).json({ message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    const token = jwt.sign({ id: user._id }, secret, {
      expiresIn: "24h",
    });

    return res.status(200).send({token:token});
  } catch (error) {
    console.error("Unexpected error: ", error);
    return res.status(500).json({ error: "Server error" });
  }
};
