"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageHandler = void 0;
const cocoSsd = require("@tensorflow-models/coco-ssd");
const tf = require("@tensorflow/tfjs-node");
const translatte = require("translatte");
const fs_1 = __importDefault(require("fs"));
const ImageHandler = (path) => {
    return new Promise(response => {
        Promise.all([cocoSsd.load(), fs_1.default.readFileSync(path)])
            .then(results => {
            const model = results[0];
            const imgTensor = tf.node.decodeImage(new Uint8Array(results[1]), 3);
            return model.detect(imgTensor);
        })
            .then(predictions => {
            let results = predictions;
            let resultValues = [];
            for (let value of results) {
                resultValues.push(value.class);
            }
            let count = {};
            resultValues.forEach(function (i) { count[i] = (count[i] || 0) + 1; });
            let countString = "";
            for (let i in count) {
                countString += count[i] + " " + i + " ";
            }
            translatte(countString, { to: "de" })
                .then((transletedString) => {
                response(transletedString.text);
            })
                .catch((err) => {
                if (Boolean(process.env.DEV))
                    console.error(err);
                response(false);
            });
        })
            .catch((err) => {
            if (Boolean(process.env.DEV))
                console.error(err);
            response(false);
        });
    });
};
exports.ImageHandler = ImageHandler;
