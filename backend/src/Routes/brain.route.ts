import express from "express";

import { goto, share } from "../controllers/brain.controller";



const router = express.Router();

router.post("/share", share);
router.get("/share",goto);



export default router;