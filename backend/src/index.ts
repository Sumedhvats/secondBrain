import dotenv from 'dotenv'; 
dotenv.config();
import express from "express";
const mongoose = require("mongoose");
import authRouter from './Routes/auth.route';
import contentRouter  from './Routes/content.route';
import brain from './Routes/brain.route';
import { auth } from './middleware/auth';
const app = express();
mongoose.connect(process.env.MONGODB_URL)
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content",auth, contentRouter);
app.use("/api/v1/brain",auth,brain);



app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
  });