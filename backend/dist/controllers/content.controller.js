"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.content = exports.addContent = void 0;
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const content_1 = __importDefault(require("../models/content"));
const tags_1 = __importDefault(require("../models/tags"));
const contentSchema = zod_1.default.object({
    link: zod_1.default.string().url(),
    type: zod_1.default.enum(["image", "video", "article", "audio"]),
    title: zod_1.default.string().min(1, "Title is required"),
    tags: zod_1.default.array(zod_1.default.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId")),
    userId: zod_1.default.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
});
const addContent = async (req, res) => {
    try {
        const { type, link, title, tags } = req.body;
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ error: "Access denied. No token provided." });
        }
        else {
            const token = authHeader;
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                throw new Error("JWT_SECRET is not defined in the environment variables.");
            }
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            let tag = await tags_1.default.findOne({ title: tags }).lean();
            if (!tag) {
                tag = await tags_1.default.create({ title: tags });
            }
            const newContent = await content_1.default.create({
                type,
                link,
                title,
                //@ts-ignore
                userId: decoded.userId,
                tags: [tag._id],
            });
            res.status(201).json({ message: "Content added successfully", content: newContent });
        }
    }
    catch (e) {
        res.status(500).json({ message: "unexpected error", e });
    }
};
exports.addContent = addContent;
const content = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ error: "Access denied. No token provided." });
    }
    else {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        const decoded = jsonwebtoken_1.default.verify(authHeader, secret);
        //@ts-ignore
        const contents = await content_1.default.find({ userId: decoded.userId }).lean();
        if (contents.length == 0) {
            res.status(400).json({
                message: "no content for this user",
            });
        }
        else {
            res.json({
                content: contents,
            });
        }
    }
};
exports.content = content;
const deleteContent = async (req, res) => {
    const id = req.body;
    if (!id) {
        res.status(400).json({
            message: "no id send for content",
        });
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Access denied. No token provided." });
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }
    //@ts-ignore
    const decoded = jsonwebtoken_1.default.verify(authHeader, secret);
    const deleted = await content_1.default.deleteOne({ _id: id, userId: decoded.userId });
    if (deleted.deletedCount) {
        res.status(200).json({
            message: "successfully deleted content",
        });
    }
    else {
        res.status(403).json({
            message: "Trying to delete a doc you don’t own",
        });
    }
};
exports.deleteContent = deleteContent;
