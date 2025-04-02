"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contentTypes = ['image', 'video', 'article', 'audio', 'tweet']; // Extend as needed
const content = new mongoose_1.default.Schema({
    link: { type: String },
    type: { type: String, enum: contentTypes, require: true },
    title: { type: String, require: true },
    tags: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', require: true
    }
});
const contentModel = mongoose_1.default.model("Content", content);
exports.default = contentModel;
