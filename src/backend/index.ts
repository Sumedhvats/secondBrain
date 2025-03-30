import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use("/api/v1/content")
app.use("/api/v1/auth")


