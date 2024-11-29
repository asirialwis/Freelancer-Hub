import { Schema } from "mongoose";
import mongoose from "mongoose";

const ProfileDataSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    imgUrl: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    },
})

export default mongoose.model("Profile_Details", ProfileDataSchema);