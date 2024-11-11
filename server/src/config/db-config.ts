import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()
const db = process.env.MONGODB_URI as string;


const dbConnect = async() => {
    try{  
      await mongoose.connect(db);
      console.log('Database is connected');
    }catch (err){
      console.error(err);
      process.exit(1);
    }
  }

export default dbConnect;