import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserRefreshTokenSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    token:{
        type:String,
        required:true
    }
});

export default mongoose.model('UserRefreshToken',UserRefreshTokenSchema);