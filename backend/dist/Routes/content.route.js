"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const content_controller_1 = require("../controllers/content.controller");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// router.post("/deleteContent",auth, deleteContent);
router.get("/", auth_1.auth, (req, res) => {
    const { type } = req.query;
    if (type) {
        return (0, content_controller_1.getByType)(req, res);
    }
    return (0, content_controller_1.content)(req, res);
});
router.post("/", auth_1.auth, content_controller_1.addContent);
router.delete("/", auth_1.auth, content_controller_1.deleteContent);
router.post("/:type", auth_1.auth, content_controller_1.getByType);
exports.default = router;
