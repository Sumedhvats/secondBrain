import dotenv from 'dotenv'; 
dotenv.config();
import express from "express";
const mongoose = require("mongoose");
const app = express();
mongoose.connect(process.env.MONGODB_URL)
app.use()
app.use(express.json());
app.use("/api/v1/content")
app.use("/api/v1/auth")



app.listen(process.env.port, () => {
    console.log(`Server running on http://localhost:${process.env.port}/`);
  });