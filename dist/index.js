"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
const post_schema_1 = require("./post.schema");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, app_1.initializeApp)({
    credential: (0, app_1.applicationDefault)(),
});
const port = process.env.PORT || 3000;
app.post("/", (req, res) => {
    console.log(req.body);
    const { error, value } = post_schema_1.payloadSchema.validate(req.body);
    if (error) {
        res.status(400).json({
            success: false,
            error: error.details.map((e) => e.message),
        });
    }
    const { fcmToken, title, body } = value;
    try {
        const registrationToken = fcmToken;
        const dataMessage = {
            notification: {
                title: title,
                body: body,
            },
            token: registrationToken,
        };
        (0, messaging_1.getMessaging)()
            .send(dataMessage)
            .then((response) => {
            console.log("Successfully sent message:", response);
        })
            .catch((error) => {
            console.log("Error sending message:", error);
        });
        res.status(200).json({
            success: true,
            message: "Notifikasi berhasil dikirim",
        });
    }
    catch (err) {
        console.error("Error sending message:", error);
        res.status(500).json({
            success: false,
            error: `Terjadi kesalahan : $e`,
        });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
