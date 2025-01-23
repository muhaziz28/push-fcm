import express, { Request, Response } from "express";
import dotenv from "dotenv";
import * as admin from "firebase-admin";
import { getMessaging } from "firebase-admin/messaging";
import { payloadSchema } from "./post.schema";

dotenv.config();
const credentialPath: string = process.env.GOOGLE_APPLICATION_CREDENTIALS ?? "";

if (!credentialPath) {
  throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not defined in .env file");
}

const app = express();
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(credentialPath),
});

const port = process.env.PORT || 3000;

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  const { error, value } = payloadSchema.validate(req.body);
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

    getMessaging()
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
  } catch (err) {
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
