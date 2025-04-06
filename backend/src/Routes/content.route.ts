import express from "express";
import {addContent,content, deleteContent,getByType} from "../controllers/content.controller";
import { auth } from "../middleware/auth";


const router = express.Router();

// router.post("/deleteContent",auth, deleteContent);
router.get("/", auth, (req, res) => {
    const { type } = req.query;
    if (type) {
      return getByType(req, res);
    }
    return content(req, res);
  });
  
router.post("/", auth,addContent);
router.delete("/", auth,deleteContent);
router.post("/:type", auth,getByType);



export default router;