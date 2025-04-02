import express from "express";
import {addContent,content,deleteContent} from "../controllers/content.controller";
import { auth } from "../middleware/auth";


const router = express.Router();

router.post("/deleteContent",auth, deleteContent);
router.get("/Content", auth,content);
router.post("/Content", auth,addContent);


export default router;