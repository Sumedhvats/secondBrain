"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goto = exports.share = void 0;
const link_1 = __importDefault(require("../models/link"));
const utils_1 = require("../utils");
const content_1 = __importDefault(require("../models/content"));
const users_1 = __importDefault(require("../models/users"));
const share = async (req, res) => {
    try {
        const { sharable } = req.body;
        if (sharable == null || sharable == undefined) {
            res.status(400).json({
                message: "please provide the sharable object",
            });
        }
        const hash = (0, utils_1.randomGen)(10);
        const decoded = req.decoded;
        console.log("Decoded JWT:", req.decoded);
        if (sharable) {
            const existingLink = await link_1.default.findOne({
                userId: decoded.id,
            });
            if (existingLink) {
                res.json({
                    link: "/share/" + existingLink.hash,
                });
                return;
            }
            await link_1.default.create({
                userId: decoded.id,
                hash,
            });
            res.json({
                link: "/share/" + hash,
            });
        }
        else {
            await link_1.default.deleteOne({
                userId: decoded.id,
            });
            res.json({
                message: "deleted link",
            });
        }
    }
    catch (e) {
        res.status(500).json({
            message: "Internal Server error",
            e,
        });
    }
};
exports.share = share;
const goto = async (req, res) => {
    try {
        const hash = req.params.shareLink;
        const link = await link_1.default.findOne({ hash: hash });
        if (!link) {
            res.status(404).json({ message: "Invalid share link" });
            return;
        }
        const content = await content_1.default.find({ userId: link.userId });
        const user = await users_1.default.findOne({ _id: link.userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json({
            username: user.username,
            content,
        });
    }
    catch (e) {
        console.error("Error:", e);
        res.status(500).json({
            message: "Internal Server Error",
            error: e,
        });
    }
};
exports.goto = goto;
