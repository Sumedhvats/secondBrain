import express from "express";
import {addContent,content, deleteContent} from "../controllers/content.controller";
import { auth } from "../middleware/auth";


const router = express.Router();

// router.post("/deleteContent",auth, deleteContent);
router.get("/", auth,content);
router.post("/", auth,addContent);
router.delete("/", auth,deleteContent);


export default router;