import express, { Request, Response } from 'express';
import { saveProfileData, getProfileData } from '../controller/profileDataController';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

// Route for saving profile data
router.post('/profile', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    await saveProfileData(req, res);
  } catch (error) {
    console.error("Error in saving profile data:", error);
    res.status(500).json({ message: "Failed to save profile data" });
  }
});

// Route for getting profile data
router.get('/profile/:userId', async (req: Request, res: Response): Promise<void> => {
  try {
    await getProfileData(req, res);
  } catch (error) {
    console.error("Error in getting profile data:", error);
    res.status(500).json({ message: "Failed to fetch profile data" });
  }
});

export default router;
