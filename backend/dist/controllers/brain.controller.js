"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.goto = exports.share = void 0;
const link_1 = __importDefault(require("../models/link"));
const utils_1 = require("../utils");
const share = async (req, res) => {
    const { sharable } = req.body;
    if (sharable == null || sharable == undefined) {
        res.status(400).json({
            message: "please provide the sharable object",
        });
    }
    const hash = (0, utils_1.randomGen)(10);
    const decoded = req.decoded;
    if (sharable) {
        const existingLink = await link_1.default.findOne({
            userId: decoded.userId
        });
        if (existingLink) {
            res.json({
                link: "/share/" + existingLink.hash
            });
            return;
        }
        await link_1.default.create({
            userId: decoded.userId,
            hash
        });
        res.json({
            link: "/share/" + hash
        });
    }
    else {
        await link_1.default.deleteOne({
            userId: decoded.userId,
        });
        res.json({
            message: "deleted link"
        });
    }
};
exports.share = share;
const goto = async (req, res) => {
    const hash = req.params.shareLink;
    const link = await link_1.default.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "link not found"
        });
        return;
    }
};
exports.goto = goto;
