"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tags = new mongoose_1.default.Schema({
    title: { type: String, require: true }
});
const tagsModel = mongoose_1.default.model("Tag", tags);
exports.default = tagsModel;
