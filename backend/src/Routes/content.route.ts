import express from "express";
import {addContent,content,deleteContent} from "../controllers/content.controller";


const router = express.Router();

router.post("/deleteContent", deleteContent);
router.get("/allContent", content);
router.post("/addContent", addContent);


export default router;