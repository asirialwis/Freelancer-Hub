import mongoose from "mongoose";
import { Schema } from "mongoose";

const contactMessageSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  topic: { type: String, required: true },
  message: { type: String, required: true },
});

export default mongoose.model("ContactMessage", contactMessageSchema);
