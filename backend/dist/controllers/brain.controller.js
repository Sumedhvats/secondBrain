"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.share = void 0;
const share = (req, res) => {
    const { sharable } = req.body;
    if (sharable == null || sharable == undefined) {
        res.status(400).json({
            message: "please provide the sharable object",
        });
    }
};
exports.share = share;
