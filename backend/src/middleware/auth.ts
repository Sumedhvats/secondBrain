// In your auth.ts file
import express from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      decoded?: JwtPayload | string;
    }
  }
}

export const auth = (
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
): void => {
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
    const decoded = jwt.verify(authHeader, secret);
    req.decoded = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};