"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payloadSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.payloadSchema = joi_1.default.object({
    fcmToken: joi_1.default.string().required().messages({
        "any.required": "FCM token wajib diisi",
        "string.empty": "FCM token tidak boleh kosong",
    }),
    title: joi_1.default.string().required().messages({
        "any.required": "Title wajib diisi",
        "string.empty": "Title tidak boleh kosong",
    }),
    body: joi_1.default.string().required().messages({
        "any.required": "Body wajib diisi",
        "string.empty": "Body tidak boleh kosong",
    }),
});
