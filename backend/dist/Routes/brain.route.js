"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const brain_controller_1 = require("../controllers/brain.controller");
const router = express_1.default.Router();
router.post("/share", brain_controller_1.share);
router.get("/share", brain_controller_1.goto);
exports.default = router;
