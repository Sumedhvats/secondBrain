
import express from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

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
    const decoded = jwt.verify((authHeader as string), secret);
    req.decoded = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Invalid token" });
    } else if (error instanceof jwt.TokenExpiredError) {
       res.status(401).json({ error: "Token expired" });
    } else {
      console.error("Auth middleware error:", error);
       res.status(500).json({ error: "Authentication failed" });
    }
  }
}