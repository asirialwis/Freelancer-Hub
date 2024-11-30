import { Request, Response } from "express";
import { saveProfileDetails , getProfileDetails } from "../services/profileDetailService";


export async function saveProfileData(req: Request, res: Response):Promise<void> {
  try {
    const savedData = await saveProfileDetails(req.body);
     res.status(201).json({
      message: "Profile saved successfully",
      data: savedData,
    });
  } catch (error: any) {
    console.error("Error saving profile details:", error);

    res.status(500).json({
      message: "Failed to save profile details",
      error: error.message,
    });
  }
}
export async function getProfileData(req: Request, res: Response): Promise<Response> {
  try {
    const userId = req.params.userId;
    const data = await getProfileDetails(userId);

    if (!data) {
      return res.status(200).json({
        message: "Profile data not available",
        data: {
          userId: userId,
          imgUrl: null,
          videoUrl: null,
        },
      });
    }

    return res.status(200).json({
      message: "Profile details fetched successfully",
      data,
    });
  } catch (error: any) {
    console.error("Error fetching profile details:", error);

    return res.status(500).json({
      message: "Failed to fetch profile details",
      error: error.message,
    });
  }
}
