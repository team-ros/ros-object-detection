"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const indext_1 = require("../../detecor/indext");
const upload = multer_1.default({ dest: "/tmp" });
router.put("/", upload.single("file"), async (req, res) => {
    const file = req.file;
    try {
        const imageHandlerResponse = await indext_1.ImageHandler(file.path);
        if (!imageHandlerResponse)
            return res.json({
                status: false
            });
        return res.json({
            status: true,
            data: imageHandlerResponse
        });
    }
    catch (err) {
        return res.json({
            status: false,
            err
        });
    }
});
exports.default = router;
