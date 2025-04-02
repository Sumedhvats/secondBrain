"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "Access denied. No token provided." });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(authHeader, secret);
        req.decoded = decoded;
        next(); // Call next() to proceed to the next middleware
    }
    catch (error) {
        res.status(400).json({ error: "Invalid token." });
    }
};
exports.auth = auth;
