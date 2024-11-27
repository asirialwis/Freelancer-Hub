import express from "express";

import userRefreshTokens from "../models/userRefreshToken";
import logoutMiddleware from '../middleware/logoutMiddleware';

const router = express.Router();

router.post("/logout",logoutMiddleware, async (req: any, res: any) => {
    try {
        await userRefreshTokens.deleteMany({ userId: req.userId  });
        // console.log(req.userId);
        return res.status(200).json({ message: "Logged out successfully" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
    }
});

export default router;
