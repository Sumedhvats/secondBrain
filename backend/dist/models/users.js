"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users = new mongoose_1.default.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});
const userModel = mongoose_1.default.model("User", users);
exports.default = userModel;
