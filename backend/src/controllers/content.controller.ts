import express from "express";
import z from "zod";
import { JwtPayload } from "jsonwebtoken";

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
      const decoded = req.decoded;
    
      let tag = await Tags.findOne({ title: tags }).lean();
      if (!tag) {
        tag = await Tags.create({ title: tags });
      }
    
      const newContent = await Content.create({
        type,
        link,
        title,
        //@ts-ignore
        userId: decoded.id, 
        tags: [tag._id],
      });
    
      res.status(201).json({ message: "Content added successfully", content: newContent });
    }
    catch (e) {
    res.status(500).json({ message: "unexpected error",e });
  }
};


export const content = async (req: express.Request, res: express.Response) => {
  try {
    const decoded = req.decoded;
    const contents = await Content.find({ userId: (decoded as JwtPayload).id }).lean();

    if (contents.length === 0) {
       res.status(200).json({ content: [] }); 
       return
    }
console.log(contents);

    res.status(200).json({ content: contents });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

export const deleteContent = async (
  req: express.Request,
  res: express.Response
) => {
  try{
  const {id} = req.body;
  if (!id) {
    res.status(400).json({
      message: "no id send for content",
    });
  }
  ///check this
  const decoded = req.decoded;
  const deleted = await Content.deleteOne({ _id: id, userId: (decoded as JwtPayload).id });
  if (deleted.deletedCount) {
    res.status(200).json({
      message: "successfully deleted content",
    });
  } else {
    res.status(403).json({
      message: "Trying to delete a doc you don’t own",
    });
  }
}catch(e){
  res.status(403).json({
    message: "error ",e
  });
}
};
