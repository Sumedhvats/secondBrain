"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const link = new mongoose_1.default.Schema({
    hash: { type: String, require: true },
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User", require: true, unique: true }
});
const linkModel = mongoose_1.default.model("Link", link);
exports.default = linkModel;
