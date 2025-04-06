"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValid = exports.signin = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = __importDefault(require("zod"));
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(16),
    password: zod_1.default
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
        message: "Password must contain at least one special character (!@#$%^&*)",
    }),
});
const signinSchema = zod_1.default.object({
    username: zod_1.default.string().min(3).max(16),
    password: zod_1.default.string().min(8).max(20),
});
const signup = async (req, res) => {
    try {
        const parsedData = userSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(411).json({
                message: "Error in inputs",
                errors: parsedData.error.format(),
            });
        }
        const { username, password } = parsedData.data;
        const existingUser = await users_1.default.findOne({ username });
        if (existingUser) {
            return res
                .status(403)
                .json({ message: "User already exists with this username" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new users_1.default({ username, password: hashedPassword });
        await newUser.save();
        return res.status(200).json({ message: "Signed up" });
    }
    catch (error) {
        console.error("Unexpected error: ", error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const parsedData = signinSchema.safeParse(req.body);
        if (!parsedData.success) {
            return res.status(411).json({
                message: "Error in inputs",
                errors: parsedData.error.format(),
            });
        }
        const { username, password } = parsedData.data;
        const user = await users_1.default.findOne({ username });
        if (!user || !user.password) {
            return res.status(403).json({ message: "User not found" });
        }
        const comparePassword = await bcrypt_1.default.compare(password, user.password);
        if (!comparePassword) {
            return res.status(403).json({ message: "Invalid password" });
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, secret, {
            expiresIn: "24h",
        });
        return res.status(200).send({ token: token });
    }
    catch (error) {
        console.error("Unexpected error: ", error);
        return res.status(500).json({ error: "Server error" });
    }
};
exports.signin = signin;
const isValid = (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(201).json({ isValid: false });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, secret);
        res.status(201).json({ isValid: true });
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({ isValid: false });
        }
        else if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({ isValid: false });
        }
        else {
            console.error("Auth middleware error:", error);
            res.status(500).json({ isValid: false });
        }
    }
};
exports.isValid = isValid;
