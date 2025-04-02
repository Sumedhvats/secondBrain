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
    type: zod_1.default.enum(["image", "video", "article", "audio"]),
    title: zod_1.default.string().min(1, "Title is required"),
    tags: zod_1.default.array(zod_1.default.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId")),
    userId: zod_1.default.string().regex(/^[a-fA-F0-9]{24}$/, "Invalid ObjectId"),
});
const addContent = async (req, res) => {
    try {
        const { type, link, title, tags } = req.body;
        const decoded = req.decoded;
        let tag = await tags_1.default.findOne({ title: tags }).lean();
        if (!tag) {
            tag = await tags_1.default.create({ title: tags });
        }
        const newContent = await content_1.default.create({
            type,
            link,
            title,
            //@ts-ignore
            userId: decoded.id,
            tags: [tag._id],
        });
        res.status(201).json({ message: "Content added successfully", content: newContent });
    }
    catch (e) {
        res.status(500).json({ message: "unexpected error", e });
    }
};
exports.addContent = addContent;
const content = async (req, res) => {
    try {
        const decoded = req.decoded;
        const contents = await content_1.default.find({ userId: decoded.id }).lean();
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
    catch (e) {
        res.status(500).json({
            message: "Internal Server error", e
        });
    }
};
exports.content = content;
const deleteContent = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            res.status(400).json({
                message: "no id send for content",
            });
        }
        ///check this
        const decoded = req.decoded;
        const deleted = await content_1.default.deleteOne({ _id: id, userId: decoded.id });
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
    }
    catch (e) {
        res.status(403).json({
            message: "error ", e
        });
    }
};
exports.deleteContent = deleteContent;
