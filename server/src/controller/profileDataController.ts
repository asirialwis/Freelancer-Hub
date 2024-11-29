import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import saveProfileDetails from '../services/profileDetailService';

interface ProfileData{
  userId:ObjectId
  imgUrl:String
  videoUrl:String
}

const handleProfileDetails =  async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    try {
      const profileData:ProfileData =req.body
      const savedProfileData = await saveProfileDetails(profileData);

      res.status(201).json({
          sucess:true,
          message:"Details Saved Sucessfully",
          data:savedProfileData
      })

    } catch (error) {
      next(error)
    }
}

export default handleProfileDetails;





// import ProfileData from "../models/ProfileData";

// const createVideo = async (req: any, res: any, next: any) => {
//   const { imgUrl, videoUrl } = req.body;

//   // Validate required fields
//   if (!imgUrl || !videoUrl) {
//     res.status(400).json({ success: false, message: "imgUrl & videoUrl fields are required" });
//     return;
//   }

//   try {
//     // Create a new document in MongoDB
//     const video = new ProfileData({
//       imgUrl,
//       videoUrl,
//     });

//     // Save the document to the database
//     await video.save();

//     res.status(201).json({
//       success: true,
//       message: "Video created successfully",
//       video,
//     });
//   } catch (error) {
//     console.error("Error saving video:", error);
//     const errorMessage = error instanceof Error ? error.message : "Unknown error";
//     res.status(500).json({
//       success: false,
//       message: "An error occurred while creating the video",
//       error: errorMessage,
//     });
//   }
// };

// export default createVideo;
