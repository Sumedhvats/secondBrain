import express from "express";
import z from "zod";
import jwt from "jsonwebtoken";
import User from "../models/users";
import Content from "../models/content";
import Tags from "../models/tags";

const contentSchema = z.object({
  link: z.string().url(),
  type: z.enum(["image", "video", "article", "audio"]),
  title: z.string().min(1, "Title is required"),
  tags: z.array(z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId")),
  userId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
});

export const addContent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { type, link, title, tags } = req.body;
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }
    let tag = await Tags.findOne({ title: tags }).lean();
    if (!tag) {
      tag = await Tags.create({ title: tags });
    }

    const decoded = jwt.verify(authHeader, secret) as { userId: string };
    const newContent = Content.create({
      type,
      link,
      title,
      userId: decoded.userId,
      tags: [tag._id],
    });
  } catch (e) {
    res.status(500).json({ message: "unexpected error" });
  }
};

export const content = async (req: express.Request, res: express.Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  const decoded = jwt.verify(authHeader, secret) as { userId: string };
  const contents = await Content.find({ userId: decoded.userId }).lean();
  if (contents.length == 0) {
    res.status(400).json({
      message: "no content for this user",
    });
  } else {
    res.json({
      content: contents,
    });
  }
};

export const deleteContent = async (
  req: express.Request,
  res: express.Response
) => {
  const id = req.body;
  if (!id) {
    res.status(400).json({
      message: "no id send for content",
    });
  }
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  const decoded = jwt.verify(authHeader, secret) as { userId: string };
  const deleted = await Content.deleteOne({ _id: id, userId: decoded.userId });
  if (deleted.deletedCount) {
    res.status(200).json({
      message: "successfully deleted content",
    });
  } else {
    res.status(403).json({
      message: "Trying to delete a doc you don’t own",
    });
  }
};
