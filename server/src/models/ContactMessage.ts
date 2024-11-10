import mongoose from "mongoose";
import { Schema } from "mongoose";

const contactMessageSchema = new Schema({
  topic: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("ContactMessage",contactMessageSchema)
