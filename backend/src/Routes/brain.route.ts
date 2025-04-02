import express from "express";

import { goto, share } from "../controllers/brain.controller";
import { auth } from "../middleware/auth";



const router = express.Router();

router.post("/share",auth, share);
router.get("/share/:shareLink",goto);



export default router;