"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const content_controller_1 = require("../controllers/content.controller");
const router = express_1.default.Router();
router.post("/deleteContent", content_controller_1.deleteContent);
router.get("/allContent", content_controller_1.content);
router.post("/addContent", content_controller_1.addContent);
exports.default = router;
