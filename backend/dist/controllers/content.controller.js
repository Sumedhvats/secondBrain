"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.content = exports.addContent = void 0;
const zod_1 = __importDefault(require("zod"));
const content_1 = __importDefault(require("../models/content"));
const tags_1 = __importDefault(require("../models/tags"));
const contentSchema = zod_1.default.object({
    link: zod_1.default.string().url(),
    type: zod_1.default.enum(["image", "video", "article", "audio", "tweet", "memory"]),
    title: zod_1.default.string().min(1, "Title is required"),
    tags: zod_1.default.union([
        zod_1.default.string(),
        zod_1.default.array(zod_1.default.string().min(1))
    ]),
    userId: zod_1.default.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
});
const addContent = async (req, res) => {
    try {
        const { type, link, title, tags } = req.body;
        const decoded = req.decoded;
        let tagArray = [];
        if (typeof tags === "string") {
            tagArray = tags.split(",").map((tag) => tag.trim()).filter(Boolean);
        }
        else if (Array.isArray(tags)) {
            tagArray = tags.map((tag) => tag.trim()).filter(Boolean);
        }
        const tagIds = [];
        for (const tagTitle of tagArray) {
            let tag = await tags_1.default.findOne({ title: tagTitle });
            if (!tag) {
                tag = await tags_1.default.create({ title: tagTitle });
            }
            tagIds.push(tag._id);
        }
        const newContent = await content_1.default.create({
            type,
            link,
            title,
            //@ts-ignore
            userId: decoded.id,
            tags: tagIds,
        });
        res.status(201).json({
            message: "Content added successfully",
            content: newContent,
        });
    }
    catch (e) {
        console.error("Error in addContent:", e);
        res.status(500).json({
            message: "Unexpected error",
            error: e instanceof Error ? e.message : e,
        });
    }
};
exports.addContent = addContent;
const content = async (req, res) => {
    try {
        const decoded = req.decoded;
        const contents = await content_1.default.find({ userId: decoded.id })
            .populate("tags", "title");
        console.log("Raw contents after populate:", JSON.stringify(contents, null, 2));
        if (contents.length === 0) {
            res.status(200).json({ content: [] });
            return;
        }
        const formatDate = (date) => {
            const d = new Date(date);
            return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
        };
        const transformedContents = contents.map((doc) => {
            const content = doc.toObject();
            return {
                ...content,
                tags: (content.tags || []).map((tag) => tag.title),
                createdAt: formatDate(content.createdAt),
            };
        });
        console.log(transformedContents);
        res.status(200).json({ content: transformedContents });
    }
    catch (e) {
        console.error("Error in content controller:", e);
        res.status(500).json({
            message: "Internal Server Error",
            error: e instanceof Error ? e.message : e,
        });
    }
};
exports.content = content;
// ✅ Optional deleteContent function (still commented)
const deleteContent = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ message: "No content ID provided" });
            return;
        }
        const decoded = req.decoded;
        const deleted = await content_1.default.deleteOne({
            _id: id,
            userId: decoded.id,
        });
        if (deleted.deletedCount) {
            res.status(200).json({ message: "Content deleted successfully" });
        }
        else {
            res.status(403).json({ message: "Unauthorized to delete this content" });
        }
    }
    catch (e) {
        res.status(500).json({ message: "Delete failed", error: e });
    }
};
exports.deleteContent = deleteContent;
