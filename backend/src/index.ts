import dotenv from 'dotenv'; 
dotenv.config();
var cors = require('cors');
import express from "express";
const mongoose = require("mongoose");
import authRouter from './Routes/auth.route';
import contentRouter  from './Routes/content.route';
import brain from './Routes/brain.route';
const app = express();
app.use(cors());
mongoose.connect(process.env.MONGODB_URL)
app.use(express.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", contentRouter);
app.use("/api/v1/brain",brain);



app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
  });