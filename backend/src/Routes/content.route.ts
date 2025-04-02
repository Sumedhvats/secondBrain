import express from "express";
import {addContent,content,deleteContent} from "../controllers/content.controller";


const router = express.Router();

router.post("/deleteContent", deleteContent);
router.get("/Content", content);
router.post("/Content", addContent);


export default router;