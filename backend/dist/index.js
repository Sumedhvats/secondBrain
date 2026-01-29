"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var cors = require('cors');
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const auth_route_1 = __importDefault(require("./Routes/auth.route"));
const content_route_1 = __importDefault(require("./Routes/content.route"));
const brain_route_1 = __importDefault(require("./Routes/brain.route"));
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
    console.log('✅ Connected to MongoDB successfully');
})
    .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('Please check your credentials in .env file');
    process.exit(1);
});
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/content", content_route_1.default);
app.use("/api/v1/brain", brain_route_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}/`);
});
