import express from "express";
import linkModel from "../models/link";
import { JwtPayload } from "jsonwebtoken";
import { hash } from "bcrypt";
import { randomGen } from "../utils";
export const share = async(req: express.Request, res: express.Response) => {
  const { sharable } = req.body;
  if (sharable == null || sharable == undefined) {
    res.status(400).json({
      message: "please provide the sharable object",
    });
  }
  const decoded = req.decoded;
  if (sharable) {
  await  linkModel.create({
      userId: (decoded as JwtPayload).userId,
      hash: randomGen(10),
    });
  } else {
   await linkModel.deleteOne({
      userId: (decoded as JwtPayload).userId,
    });
  }
};
export const goto =async(req: express.Request, res: express.Response)=>{
  const hash = req.params.shareLink;
 const link = await linkModel.findOne({
    hash
  })
  if(!link){
    res.status(411).json({
      message:"link not found"
    })
    return
  }
  
}
