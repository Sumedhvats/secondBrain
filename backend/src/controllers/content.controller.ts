import express from "express";
import z from "zod";
import { JwtPayload } from "jsonwebtoken";

import Content from "../models/content";
import Tags from "../models/tags";

const contentSchema = z.object({
  link: z.string().url(),
  type: z.enum(["image", "video", "article", "audio", "tweet", "memory"]),
  title: z.string().min(1, "Title is required"),
  tags: z.union([
    z.string(),                
    z.array(z.string().min(1))   
  ]),
  userId: z.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
});

export const addContent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { type, link, title, tags } = req.body;
    const decoded = req.decoded;

    let tagArray: string[] = [];
    if (typeof tags === "string") {
      tagArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
    } else if (Array.isArray(tags)) {
      tagArray = tags.map((tag) => tag.trim()).filter(Boolean);
    }

    const tagIds = [];
    for (const tagTitle of tagArray) {
      let tag = await Tags.findOne({ title: tagTitle });
      if (!tag) {
        tag = await Tags.create({ title: tagTitle });
      }
      tagIds.push(tag._id);
    }

    const newContent = await Content.create({
      type,
      link,
      title,
      //@ts-ignore
      userId: decoded.id,
      tags: tagIds,
    });

    res.status(201).json({
      message: "Content added successfully",
      content: newContent,
    });
  } catch (e) {
    console.error("Error in addContent:", e);
    res.status(500).json({
      message: "Unexpected error",
      error: e instanceof Error ? e.message : e,
    });
  }
};

export const content = async (req: express.Request, res: express.Response) => {
  try {
    const decoded = req.decoded;

    const contents = await Content.find({ userId: (decoded as JwtPayload).id })
    .populate("tags", "title");
console.log("Raw contents after populate:", JSON.stringify(contents, null, 2));
    if (contents.length === 0) {
      
      res.status(200).json({ content: [] });
      return
    }
    
    
    const formatDate = (date: Date): string => {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, '0')}/${
        (d.getMonth() + 1).toString().padStart(2, '0')
      }/${d.getFullYear()}`;
    };
    
    const transformedContents = contents.map((doc) => {
      const content = doc.toObject();
      return {
        ...content,
        tags: (content.tags || []).map((tag: any) => tag.title),
        createdAt: formatDate(content.createdAt),
      };
    });
    console.log(transformedContents);

    res.status(200).json({ content: transformedContents });
  } catch (e) {
    console.error("Error in content controller:", e);
    res.status(500).json({
      message: "Internal Server Error",
      error: e instanceof Error ? e.message : e,
    });
  }
};

// ✅ Optional deleteContent function (still commented)

export const deleteContent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ message: "No content ID provided" });
      return
    }

    const decoded = req.decoded;
    const deleted = await Content.deleteOne({
      _id: id,
      userId: (decoded as JwtPayload).id,
    });

    if (deleted.deletedCount) {
      res.status(200).json({ message: "Content deleted successfully" });
    } else {
      res.status(403).json({ message: "Unauthorized to delete this content" });
    }
  } catch (e) {
    res.status(500).json({ message: "Delete failed", error: e });
  }
};

