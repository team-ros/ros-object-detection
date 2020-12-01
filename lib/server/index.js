"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.listen(process.env.PORT || 8080);
// import routes
const detect_1 = __importDefault(require("./routes/detect"));
// apply routes
app.use("/detect", detect_1.default);
