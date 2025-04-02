import express from "express";
import linkModel from "../models/link";
import { JwtPayload } from "jsonwebtoken";
import { randomGen } from "../utils";
export const share = async(req: express.Request, res: express.Response) => {
  const { sharable } = req.body;
  if (sharable == null || sharable == undefined) {
    res.status(400).json({
      message: "please provide the sharable object",
    });
  }
  const hash = randomGen(10)
  const decoded = req.decoded;
  if (sharable) {
    const existingLink = await linkModel.findOne({
      userId: (decoded as JwtPayload).userId
    });
    
    if (existingLink) {
       res.json({
        link: "/share/" + existingLink.hash
      });
      return
    }
  await  linkModel.create({
      userId: (decoded as JwtPayload).userId,
      hash
    });
    res.json({
     link:"/share/"+hash
    })
  } else {
   await linkModel.deleteOne({
      userId: (decoded as JwtPayload).userId,
    });
    res.json({
      message:"deleted link"
    })
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
