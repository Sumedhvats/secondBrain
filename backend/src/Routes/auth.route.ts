import express from "express";
import { isValid, signin, signup } from "../controllers/auth.controller";



const router = express.Router();
//@ts-ignore
router.post("/signup", signup);
//@ts-ignore
router.post("/signin", signin);
router.post("/isValid", isValid);

export default router;  