import express from "express";
import Link from "../models/link";
import { JwtPayload } from "jsonwebtoken";
import { randomGen } from "../utils";
import Content from "../models/content";
import User from "../models/users";
export const share = async (req: express.Request, res: express.Response) => {
  try {
    const { sharable } = req.body;
    if (sharable == null || sharable == undefined) {
      res.status(400).json({
        message: "please provide the sharable object",
      });
    }
    const hash = randomGen(10);
    const decoded = req.decoded;

    if (sharable) {
      const existingLink = await Link.findOne({
        userId: (decoded as JwtPayload).id,

      });


      if (existingLink) {
        res.json({
          link: "/share/" + existingLink.hash,
        });
        return;
      }
      await Link.create({
        userId: (decoded as JwtPayload).id,
        hash,
      });
      res.json({
        link: "/share/" + hash,
      });
    } else {
      await Link.deleteOne({
        userId: (decoded as JwtPayload).id,
      });
      res.json({
        message: "deleted link",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal Server error",
      e,
    });
  }
};
export const goto = async (req: express.Request, res: express.Response) => {
  try {
    const hash = req.params.shareLink;
    const link = await Link.findOne({ hash:hash });

    if (!link) {
      res.status(404).json({ message: "Invalid share link" });
      return;
    }

    const content = await Content.find({ userId: link.userId });

    const user = await User.findOne({ _id: link.userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      username: user.username,
      content,
    });
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};
