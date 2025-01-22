import Joi from "joi";

export const payloadSchema = Joi.object({
  fcmToken: Joi.string().required().messages({
    "any.required": "FCM token wajib diisi",
    "string.empty": "FCM token tidak boleh kosong",
  }),
  title: Joi.string().required().messages({
    "any.required": "Title wajib diisi",
    "string.empty": "Title tidak boleh kosong",
  }),
  body: Joi.string().required().messages({
    "any.required": "Body wajib diisi",
    "string.empty": "Body tidak boleh kosong",
  }),
});
